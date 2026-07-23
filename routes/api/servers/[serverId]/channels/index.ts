import { define } from "@/lib/utils.ts";
import { getChannelsInServer } from "@/lib/db/server.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;

        const channels = await getChannelsInServer(serverId);

        return new Response(JSON.stringify(channels));
    },
    async POST(ctx) {
        const serverId = ctx.state.serverId;
        serverId;

        const id = await ""; // TODO: create channel

        return new Response(JSON.stringify({ message: "created", id }), {
            status: 201,
        });
    },
});
