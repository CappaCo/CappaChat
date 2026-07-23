import { define } from "@/lib/utils.ts";
import { getUsersInServer } from "@/lib/db/server.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;

        const members = await getUsersInServer(serverId);

        return new Response(JSON.stringify(members));
    },
    POST(ctx) {
        const serverId = ctx.state.serverId;

        // TODO: implement this
        console.log("joining user to server:", serverId);
        return new Response(JSON.stringify({
            message: "ok",
        }));
    },
});
