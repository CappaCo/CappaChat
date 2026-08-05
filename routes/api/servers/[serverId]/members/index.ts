import { define } from "@/lib/utils.ts";
import { getUsersInServer } from "@/lib/db/server.ts";
import { hasPermission } from "@/lib/db/permissions.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;

        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        if (!hasPermission(user, "members-list", { serverId })) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to list members",
                }),
                { status: 403 },
            );
        }

        const members = await getUsersInServer(serverId);

        return new Response(JSON.stringify(members));
    },
    POST(ctx) {
        const serverId = ctx.state.serverId;

        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        if (!hasPermission(user, "server-join", { serverId })) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to join this server",
                }),
                { status: 403 },
            );
        }

        // TODO: implement this
        console.log("joining user to server:", serverId);
        return new Response(JSON.stringify({
            message: "ok",
        }));
    },
});
