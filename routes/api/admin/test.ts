import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    GET(ctx) {
        ctx.state.isJSONReturn = false;
        return new Response(`admin test run at ${Date.now()}ms`);
    },
});
