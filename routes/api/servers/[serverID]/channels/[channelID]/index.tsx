import { define } from "@/utils.ts";
import { Channel } from "@/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;
        const channelID = ctx.state.channelID;

        console.log(
            "getting channel information for server:",
            serverID,
            "channel:",
            channelID,
        );

        // TODO: implement this
        const channel: Channel = {
            id: channelID,
            name: "general",
            type: "text",
        };

        return new Response(JSON.stringify(channel));
    },
});
