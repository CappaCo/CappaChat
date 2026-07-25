export function handleWebsocketConnection(req: Request) {
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

        if (json.message === "ping") {
            console.log("echoing message:", event);
            socket.send(JSON.stringify({ message: "pong" }));
        }
    });

    return response;
}
