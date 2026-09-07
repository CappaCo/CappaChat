import { define } from "@/lib/utils.ts";
import { getServersUserIsIn } from "@/lib/db/user.ts";
import { createServer } from "@/lib/db/server.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        const servers = await getServersUserIsIn(user.id);

        return new Response(JSON.stringify(servers));
    },
    async POST(ctx) {
        const user = ctx.state.requestingUser;
        if (user === undefined) {
            return new Response(
                JSON.stringify({ message: "you are not logged in" }),
                { status: 401 },
            );
        }

        const formData = await ctx.req.formData();

        const serverName = formData.get("server-name");
        const serverIcon = formData.get("server-icon");

        if (serverName === null) {
            return new Response(
                JSON.stringify({ message: "no server name in form data" }),
                { status: 400 },
            );
        }

        const name = serverName.toString().trim();

        if (name === "") {
            return new Response(
                JSON.stringify({ message: "server name is empty" }),
                { status: 400 },
            );
        }

        if (serverIcon === null) {
            return new Response(
                JSON.stringify({ message: "no server icon in form data" }),
                { status: 400 },
            );
        }

        const icon = serverIcon.toString().trim();

        if (icon === "") {
            return new Response(
                JSON.stringify({ message: "server icon is empty" }),
                { status: 400 },
            );
        }

        const server = await createServer({
            ownerId: user.id,
            name,
            icon,
        });

        return new Response(JSON.stringify({ message: "created", server }), {
            status: 302,
            headers: {
                "Location": `/app/${server.id}`,
            },
        });
    },
});
