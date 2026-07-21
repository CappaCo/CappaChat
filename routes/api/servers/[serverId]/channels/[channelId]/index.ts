import { define } from "@/lib/utils.ts";
import { Channel } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverId = ctx.state.serverId;
        const channelId = ctx.state.channelId;

        console.log(
            "getting channel information for server:",
            serverId,
            "channel:",
            channelId,
        );

        // TODO: implement this
        const channel: Channel = {
            id: channelId,
            name: "general",
            type: "text",
            position: 0,
            serverId: "0",
            createdAt: (new Date()).toISOString(),
        };

        return new Response(JSON.stringify(channel));
    },
});
