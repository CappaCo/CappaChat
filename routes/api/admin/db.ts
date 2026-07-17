import { define } from "@/lib/utils.ts";
import * as db from "@/lib/db.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const query = ctx.url.searchParams.get("query");

        const argsString = ctx.url.searchParams.get("args");
        const args = (argsString === null) ? [] : JSON.parse(argsString);

        console.log("admin query:", query, "args:", args);

        if (query === null) {
            return new Response(
                JSON.stringify({
                    message: "no query",
                }),
                {
                    status: 400,
                },
            );
        }

        const response = await db.query(query, args);

        return new Response(JSON.stringify(response));
    },
});
