import { define } from "@/lib/utils.ts";
import { Member } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverId = ctx.state.serverId;

        console.log("getting members in server:", serverId);

        // TODO: implement this
        const members: Member[] = [{
            userId: "0",
            joinedAt: (new Date()).toISOString(),
        }];

        return new Response(JSON.stringify(members));
    },
    POST(ctx) {
        const serverId = ctx.state.serverId;

        // TODO: implement this
        console.log("joining user to server:", serverId);
        return new Response(JSON.stringify({
            message: "ok",
        }));
    },
});
