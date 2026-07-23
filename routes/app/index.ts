import { define } from "@/lib/utils.ts";

export const handler = define.handlers({
    GET() {
        return new Response("", {
            status: 302,
            headers: {
                "Location": "/app/dm",
            },
        });
    },
});
