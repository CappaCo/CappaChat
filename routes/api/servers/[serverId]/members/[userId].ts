import { define } from "@/lib/utils.ts";
import { Member } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverId = ctx.state.serverId;
        const userId = ctx.params.userId; // TODO: validate this

        console.log("getting member:", userId, "in server:", serverId);

        // TODO: implement this
        const member: Member = {
            userId: "0",
            joinedAt: (new Date()).toISOString(),
            //permissions:
        };

        return new Response(JSON.stringify(member));
    },
});
