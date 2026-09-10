import { define } from "@/lib/utils.ts";
import { Channel } from "@/lib/types.ts";
import { hasPermission } from "@/lib/db/permissions.ts";
import { deleteChannel } from "@/lib/db/channel.ts";

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
    async DELETE(ctx) {
        const serverId = ctx.state.serverId;
        const channelId = ctx.state.channelId;

        if (
            !hasPermission(ctx.state.requestingUser, "delete-channel", {
                serverId,
                channelId,
            })
        ) {
            return new Response(
                JSON.stringify({
                    message:
                        "you don't have permissions to delete this channel",
                }),
                { status: 403 },
            );
        }

        await deleteChannel(serverId);

        return new Response(null, { status: 204 });
    },
});
