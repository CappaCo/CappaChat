import { define } from "@/lib/utils.ts";
import { Id } from "@/lib/types.ts";

export default define.middleware(async (ctx) => {
    const serverId: Id = ctx.params.serverId.padEnd(24, " ");
    ctx.state.serverId = serverId;

    return await ctx.next();
});
