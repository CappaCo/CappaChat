import { define } from "@/lib/utils.ts";
import { getChannelsInServer } from "@/lib/db/server.ts";
import { createChannel } from "@/lib/db/channel.ts";
import { hasPermission } from "@/lib/db/permissions.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;

        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        if (!hasPermission(user, "channel-list", { serverId })) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to list channels",
                }),
                { status: 403 },
            );
        }

        const channels = await getChannelsInServer(serverId);

        return new Response(JSON.stringify(channels));
    },
    async POST(ctx) {
        const serverId = ctx.state.serverId;

        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        if (!hasPermission(user, "channel-create", { serverId })) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to make a channel",
                }),
                { status: 403 },
            );
        }

        const formData = await ctx.req.formData();

        const channelName = formData.get("channel-name");

        if (channelName === null) {
            return new Response(
                JSON.stringify({ message: "no server name in form data" }),
                { status: 400 },
            );
        }

        const name = channelName.toString().trim();

        if (name === "") {
            return new Response(
                JSON.stringify({ message: "server name is empty" }),
                { status: 400 },
            );
        }

        const channel = await createChannel(serverId, {
            name,
        });

        return new Response(
            JSON.stringify({ message: "created", server: channel }),
            {
                status: 201,
            },
        );
    },
});
