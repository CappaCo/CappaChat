import { define } from "@/utils.ts";
import { Channel } from "@/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;

        // TODO: implement this
        console.log("Getting channels in server:", serverID);
        const channels: Channel[] = [
            {
                id: 0,
                type: "text",
                name: "general",
            },
            {
                id: 1,
                type: "text",
                name: "activities",
            },
            {
                id: 1,
                type: "voice",
                name: "vc",
            },
        ];

        return new Response(JSON.stringify(channels));
    },
});
