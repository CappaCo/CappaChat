import { define } from "@/lib/utils.ts";
import { getUser } from "@/lib/db/user.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const userId = ctx.state.userId;
        const user = await getUser(userId);
        return new Response(JSON.stringify(user));
    },
});
