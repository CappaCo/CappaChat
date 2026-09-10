import { define } from "@/lib/utils.ts";
import { Member } from "@/lib/types.ts";
import { hasPermission } from "@/lib/db/permissions.ts";
import { unjoinUser } from "@/lib/db/members.ts";

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
    async DELETE(ctx) {
        const serverId = ctx.state.serverId;
        const userId = ctx.params.userId;

        if (
            !hasPermission(ctx.state.requestingUser, "unjoin-user", {
                serverId,
            })
        ) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to unjoin this user",
                }),
                { status: 403 },
            );
        }

        await unjoinUser(userId, serverId);

        return new Response(null, { status: 204 });
    },
});
