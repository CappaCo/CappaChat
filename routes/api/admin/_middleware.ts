import { define } from "@/lib/utils.ts";
import { isAdminRequest } from "@/lib/adminAuth.ts";

export default define.middleware(async (ctx) => {
    if (!await isAdminRequest(ctx.req.headers)) {
        return new Response(
            JSON.stringify({
                message: "no lol, u not authenticated as admin",
            }),
            {
                status: 401,
            },
        );
    }

    return await ctx.next();
});
