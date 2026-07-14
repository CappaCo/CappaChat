import { define } from "@/utils.ts";
import { Member } from "@/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;

        console.log("getting members in server:", serverID);
        // TODO: implement this
        const members: Member[] = [{
            user: {
                id: 0,
                username: "CappaBot",
                description: "Hi, I'm CappaBot",
            },
        }];

        return new Response(JSON.stringify(members));
    },
});
