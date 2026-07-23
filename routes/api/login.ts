import { define } from "@/lib/utils.ts";
import { checkPassword, createSession } from "@/lib/auth.ts";
import { getUserIdFromUsername } from "@/lib/db/user.ts";

export const handler = define.handlers({
    async POST(ctx) {
        const formData = await ctx.req.formData();

        const username = formData.get("username");
        const password = formData.get("password");

        if (password === null || password === "") {
            return new Response(
                JSON.stringify({
                    message: "no password in form data",
                }),
                {
                    status: 400,
                },
            );
        }

        if (username === null || username === "") {
            return new Response(
                JSON.stringify({
                    message: "no username in form data",
                }),
                {
                    status: 400,
                },
            );
        }

        const userId = await getUserIdFromUsername(username.toString());

        if (userId === undefined) {
            return new Response(
                JSON.stringify({
                    message: "user does not exist",
                }),
                {
                    status: 404,
                },
            );
        }

        if (!await checkPassword(userId, password.toString())) {
            return new Response(
                JSON.stringify({
                    message: "wrong password",
                }),
                {
                    status: 401,
                },
            );
        }

        const sessionToken = await createSession(userId);
        const cookie = [
            `session=${sessionToken}`,
            "HttpOnly",
            "Secure",
            "Path=/",
            "SameSite=Lax",
        ].join("; ");

        return new Response(
            JSON.stringify({
                message: "yeah ok, go to /app/0/0",
            }),
            {
                status: 302,
                headers: {
                    "Location": "/app",
                    "Set-Cookie": cookie,
                },
            },
        );
    },
});
