import { define } from "@/lib/utils.ts";
import { getUserFromSession } from "@/lib/auth.ts";

export default define.middleware(async (ctx) => {
    const user = await getUserFromSession(ctx.req.headers);
    ctx.state.requestingUser = user;

    return await ctx.next();
});
