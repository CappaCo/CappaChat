import { define } from "@/lib/utils.ts";
import { createMessage, getMessages } from "@/lib/db/channel.ts";
import { User } from "@/lib/types.ts";

export const handler = define.handlers({
    // get messages in the channel
    async GET(ctx) {
        const channelID = ctx.state.channelID;

        const messages = await getMessages(channelID);
        // TODO: return some user objects
        const users: User[] = []; // TODO: don't return full users, just the relevant info

        return new Response(JSON.stringify({
            messages,
            users,
        }));
    },

    async POST(ctx) {
        const channelID = ctx.state.channelID;

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
            authorID: "0", // TODO: get meeeee
            content,
        };

        // TODO: implement this with websockets
        await createMessage(channelID, message);

        return new Response(JSON.stringify({ message: "ok" }));
    },
});
