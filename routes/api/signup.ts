import { createUser } from "@/lib/db/user.ts";

import { define } from "@/lib/utils.ts";

// best code ever right here
function isAcceptingNewUsers(): boolean {
    return false;
}

export const handler = define.handlers({
    async POST(ctx) {
        if (!isAcceptingNewUsers()) {
            return new Response(
                JSON.stringify({
                    message: "not currently accepting new registrations",
                }),
                { status: 418 }, // maybe this should be 503 or 200?
            );
        }

        // TODO: FIXME: get this from formdata instead of json
        let json;

        try {
            json = await ctx.req.json();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.name);
                if (
                    error.name === "SyntaxError" &&
                    error.message === "Unexpected end of JSON input"
                ) {
                    console.error(error.message);
                    console.error(error.cause);
                    return new Response(
                        JSON.stringify({
                            message:
                                "400 Bad request: no json was found in your request",
                        }),
                        { status: 400 },
                    );
                }
            }
            throw error;
        }

        const username = json.username;
        const password = json.password;

        // TODO: maybe some more advanced username validation?
        if (
            username === undefined || username === null ||
            username.trim() === ""
        ) {
            return new Response(
                JSON.stringify({
                    message: "400 Bad request: username invalid",
                }),
                { status: 400 },
            );
        }

        // TODO: maybe some more advanced password validation?
        if (
            password === undefined || password === null ||
            password.trim() === ""
        ) {
            return new Response(
                JSON.stringify({
                    message: "400 Bad request: password invalid",
                }),
                { status: 400 },
            );
        }

        const id = await createUser({
            username,
            password,
        });

        return new Response(
            JSON.stringify({
                message: "created user",
                id,
            }),
            { status: 201 },
        );
    },
});
