import { define } from "@/lib/utils.ts";
import { db } from "@/lib/db.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const query = ctx.url.searchParams.get("query");
        console.log("query:", query);

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

        const response = await db.queryObject(query);

        return new Response(JSON.stringify(response));
    },
});
