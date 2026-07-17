import { define } from "@/lib/utils.ts";
import { User } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(_ctx) {
        const user: User = {
            id: "0",
            username: "CappaBot",
            displayName: "CappaBot",
            description: "",
            createdAt: (new Date()).toISOString(),
        };
        return new Response(JSON.stringify(user));
    },
    POST(_ctx) {
        return new Response(JSON.stringify({
            message: "created user",
        }));
    },
});
