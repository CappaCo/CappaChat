import { createUser } from "@/lib/db/user.ts";

import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    async POST(ctx) {
        const json = await ctx.req.json();

        const username = json.username;
        // TODO: encrypt password probably
        const password = json.password;

        const id = await createUser({
            username,
            password,
        });

        return new Response(JSON.stringify({
            message: "created user",
            id,
        }));
    },
});
