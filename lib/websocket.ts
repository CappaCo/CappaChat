import { sub } from "@/lib/pubsub.ts";

export function handleWebsocketConnection(req: Request): Response {
    if (req.headers.get("upgrade") != "websocket") {
        return new Response(null, { status: 426 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.addEventListener("open", () => {
        console.log("a client connected!");
    });

    socket.addEventListener("message", (event) => {
        let json;
        try {
            json = JSON.parse(event.data);
        } catch (error) {
            socket.send(
                JSON.stringify({
                    message: "error when parsing your json: " + error,
                }),
            );
            return;
        }

        console.log("got ws message:", json);

        if (json.message === "ping") {
            console.log("sending pong");
            socket.send(JSON.stringify({ message: "pong" }));
        }

        if (json.type === "sub") {
            handleSub(socket, json);
        }
    });

    return response;
}

// deno-lint-ignore no-explicit-any
function handleSub(socket: WebSocket, json: any) {
    if (json.to === undefined) return;

    sub(socket, json.to);
}
