import { define } from "@/lib/utils.ts";
import { handleWebsocketConnection } from "@/lib/websocket.ts";

export const handler = define.handlers({
    GET(ctx) {
        /*return new Response(JSON.stringify({ message: "no" }), {
            status: 501,
        });*/
        ctx.state.isJsonReturn = false;
        console.log("endpoint for websocket being hit");

        if (ctx.req.headers.get("upgrade") != "websocket") {
            return new Response(null, { status: 426 });
        }

        return handleWebsocketConnection(ctx.req);
    },
});
