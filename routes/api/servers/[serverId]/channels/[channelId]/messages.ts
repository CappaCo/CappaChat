import { define } from "@/lib/utils.ts";
import { createMessage, getMessages } from "@/lib/db/channel.ts";
import { pub } from "@/lib/pubsub.ts";

export const handler = define.handlers({
    // get messages in the channel
    async GET(ctx) {
        const channelId = ctx.state.channelId;

        const messages = await getMessages(channelId);

        return new Response(JSON.stringify(messages));
    },

    async POST(ctx) {
        const requestingUser = ctx.state.requestingUser;
        if (requestingUser === undefined) throw "no requesting user";

        const channelId = ctx.state.channelId;

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
            authorId: requestingUser.id,
            content,
        };

        const createdMessage = await createMessage(channelId, message);
        pub({ type: "channel", id: channelId }, createdMessage);

        return new Response(JSON.stringify({ message: "ok" }));
    },
});
