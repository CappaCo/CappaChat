import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    GET(ctx) {
        ctx.state.isJsonReturn = false;
        return new Response(`admin test run at ${Date.now()}ms`);
    },
});
