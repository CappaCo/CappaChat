import { define } from "@/lib/utils.ts";
import { getServer } from "@/lib/db/server.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;

        const server = await getServer(serverId);

        return new Response(JSON.stringify(server));
    },
});
