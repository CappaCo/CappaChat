import { define } from "@/lib/utils.ts";
import { createMessage, getMessages } from "@/lib/db/channel.ts";
import { pub } from "@/lib/pubsub.ts";
import { hasPermission } from "@/lib/db/permissions.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;
        const channelId = ctx.state.channelId;

        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        if (!hasPermission(user, "messages-list", { serverId, channelId })) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to list messages",
                }),
                { status: 403 },
            );
        }

        const messages = await getMessages(channelId);

        return new Response(JSON.stringify(messages));
    },

    async POST(ctx) {
        const serverId = ctx.state.serverId;
        const channelId = ctx.state.channelId;

        const user = ctx.state.requestingUser;

        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        if (!hasPermission(user, "message-create", { serverId, channelId })) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to send messages",
                }),
                { status: 403 },
            );
        }

        const json = await ctx.req.json();
        const {
            content,
        } = json;

        if (
            !content /* &&
            attachments.length === 0*/
            // TODO: add attachments
        ) {
            return new Response(
                JSON.stringify({
                    message: "no content",
                }),
                {
                    status: 400,
                },
            );
        }

        const message = {
            authorId: user.id,
            content,
        };

        const createdMessage = await createMessage(channelId, message);
        pub({ type: "channel", id: channelId }, createdMessage);

        return new Response(JSON.stringify({ message: "ok" }));
    },
});
