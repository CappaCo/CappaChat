import { define } from "@/lib/utils.ts";
import { getUserFromSession } from "@/lib/auth.ts";

export default define.middleware(async (ctx) => {
    console.log("getting user from session for:", ctx.req.url);
    const user = await getUserFromSession(ctx.req.headers);
    ctx.state.requestingUser = user;

    return await ctx.next();
});
