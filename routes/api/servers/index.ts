import { define } from "@/lib/utils.ts";
import { getServersUserIsIn } from "@/lib/db/user.ts";

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

        const id = await ""; // TODO: create server from form data probably

        return new Response(JSON.stringify({ message: "created", id }), {
            status: 201,
        });
    },
});
