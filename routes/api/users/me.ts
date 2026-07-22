import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    GET(ctx) {
        const user = ctx.state.requestingUser;
        return new Response(JSON.stringify(user || {}));
    },
});
