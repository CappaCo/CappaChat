import { define } from "@/lib/utils.ts";
import { getUsersInServer } from "@/lib/db/server.ts";
import { hasPermission } from "@/lib/db/permissions.ts";
import { joinUser } from "@/lib/db/members.ts";
import { getUserIdFromUsername } from "@/lib/db/user.ts";

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
    async POST(ctx) {
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

        const formData = await ctx.req.formData();
        console.log({formData});

        const username = formData.get("username");

        if (username === null) {
            return new Response(
                JSON.stringify({ message: "no user name in form data" }),
                { status: 400 },
            );
        }

        const name = username.toString().trim();

        if (name === "") {
            return new Response(
                JSON.stringify({ message: "user name is empty" }),
                { status: 400 },
            );
        }

        const userId = await getUserIdFromUsername(name);

        if (userId === undefined) {
            return new Response(
                JSON.stringify({ message: "user not found" }),
                { status: 404 },
            );
        }

        // TODO: add logic to check if user is already in there
        /*
        if (e.name === "PostgresError") {
            // SOMETHING
        }
        throw e;
        */
        await joinUser(userId, serverId);

        return new Response(
            JSON.stringify({
                message: "ok",
            }),
            { status: 201 },
        );
    },
});
