import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    GET(_ctx) {
        return new Response(`admin test run at ${Date.now()}ms`);
    },
});
