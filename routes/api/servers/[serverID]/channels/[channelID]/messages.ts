import { define } from "@/lib/utils.ts";
import { Message } from "@/lib/types.ts";

// TODO: implement this
const messages: Message[] = [];

export const handler = define.handlers({
    // get messages in the channel
    GET(ctx) {
        const serverID = ctx.state.serverID;
        const channelID = ctx.state.channelID;

        console.log(
            "Getting messages in server:",
            serverID,
            "channel:",
            channelID,
        );

        return new Response(JSON.stringify(messages));
    },

    // test this endpoint with:
    // await fetch("http://localhost:5173/api/servers/1/channels/2/messages", { method: "POST", body: JSON.stringify({ message: "hey what's up"}) })
    async POST(ctx) {
        const serverID = ctx.state.serverID;
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

        const message: Message = {
            id: 0, // TODO: generate unique id for this
            author: 0,
            content,
        };

        console.log("Creating message:", message);
        console.log("For server:", serverID);
        console.log("For channel:", channelID);
        // TODO: implement this with websockets and database
        messages.push(message);

        return new Response(JSON.stringify({ message: "ok" }));
    },
});
