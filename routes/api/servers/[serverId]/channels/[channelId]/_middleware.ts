import { define } from "@/lib/utils.ts";
import { Id } from "@/lib/types.ts";

export default define.middleware(async (ctx) => {
    const channelId: Id = ctx.params.channelId.padEnd(24, " ");
    ctx.state.channelId = channelId;

    return await ctx.next();
});
