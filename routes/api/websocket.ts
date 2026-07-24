import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    GET(_ctx) {
        return new Response(JSON.stringify({ message: "no" }), {
            status: 501,
        });
        /*ctx.state.isJsonReturn = false;

        if (ctx.req.headers.get("upgrade") != "websocket") {
            return new Response(null, { status: 426 });
        }

        console.log("getting websocket connection...");
        const { socket, response } = Deno.upgradeWebSocket(ctx.req);

        socket.addEventListener("open", () => {
            console.log("websocket open");
        });

        socket.addEventListener("message", (event) => {
            console.log("websocket message:", event);
        });

        return response;*/
    },
});
