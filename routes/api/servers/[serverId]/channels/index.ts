import { define } from "@/lib/utils.ts";
import { ChannelSummary } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverId = ctx.state.serverId;

        // TODO: implement this
        console.log("Getting channels in server:", serverId);
        const channels: ChannelSummary[] = [
            {
                id: "0",
                type: "text",
                name: "general",
                position: 0,
            },
            {
                id: "1",
                type: "text",
                name: "activities",
                position: 0,
            },
            {
                id: "2",
                type: "voice",
                name: "vc",
                position: 0,
            },
        ];

        return new Response(JSON.stringify(channels));
    },
});
