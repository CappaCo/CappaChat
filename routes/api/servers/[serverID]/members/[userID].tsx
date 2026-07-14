import { define } from "@/utils.ts";
import { Member } from "@/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;
        const userID = ctx.params.userID; // TODO: validate this

        console.log("getting member:", userID, "in server:", serverID);

        // TODO: implement this
        const member: Member = {
            user: {
                id: 0,
                username: "CappaBot",
                description: "Hi, I'm CappaBot",
            },
            //permissions:
        };

        return new Response(JSON.stringify(member));
    },
});
