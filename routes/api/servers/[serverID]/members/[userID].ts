import { define } from "@/lib/utils.ts";
import { Member } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;
        const userID = ctx.params.userID; // TODO: validate this

        console.log("getting member:", userID, "in server:", serverID);

        // TODO: implement this
        const member: Member = {
            userID: "0",
            joinedAt: (new Date()).toISOString(),
            //permissions:
        };

        return new Response(JSON.stringify(member));
    },
});
