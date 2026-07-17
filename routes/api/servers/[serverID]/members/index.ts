import { define } from "@/lib/utils.ts";
import { Member } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;

        console.log("getting members in server:", serverID);

        // TODO: implement this
        const members: Member[] = [{
            userID: "0",
            joinedAt: (new Date()).toISOString(),
        }];

        return new Response(JSON.stringify(members));
    },
    POST(ctx) {
        const serverID = ctx.state.serverID;

        // TODO: implement this
        console.log("joining user to server:", serverID);
        return new Response(JSON.stringify({
            message: "ok",
        }));
    },
});
