import { define } from "@/lib/utils.ts";
import { createMessage, getMessages } from "@/lib/db/channel.ts";

export const handler = define.handlers({
    // get messages in the channel
    async GET(ctx) {
        const channelId = ctx.state.channelId;

        const messages = await getMessages(channelId);

        return new Response(JSON.stringify(messages));
    },

    async POST(ctx) {
        const channelId = ctx.state.channelId;

        const json = await ctx.req.json();
        const {
            content,
        } = json;

        if (
            !content /* &&
            attachments.length === 0*/
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
            authorId: ctx.state.requestingUser.id, // TODO: get meeeee
            content,
        };

        // TODO: implement this with websockets
        await createMessage(channelId, message);

        return new Response(JSON.stringify({ message: "ok" }));
    },
});
