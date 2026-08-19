import { define } from "@/lib/utils.ts";
import { getChannelsInServer } from "@/lib/db/server.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.params.serverId;

        const channels = await getChannelsInServer(serverId);
        // TODO: get better channel?
        // TODO: actually this should be replaced with the Chat page but loading
        const channelId = channels[0].id;
        if (channelId === undefined) {
            return new Response("no channel in server???", { status: 500 });
        }

        return new Response("", {
            status: 302,
            headers: {
                "Location": `${serverId}/${channelId}`,
            },
        });
    },
});
