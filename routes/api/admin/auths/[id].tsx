import { define } from "@/lib/utils.ts";
import {
    addAdminAuth,
    deleteAdminAuth,
    getAdminAuth,
} from "@/lib/adminAuth.ts";

export const handler = define.handlers({
    async GET(ctx) {
        return new Response(
            JSON.stringify(await getAdminAuth(ctx.params.id)),
        );
    },
    async POST(ctx) {
        return new Response(
            JSON.stringify(await addAdminAuth(ctx.params.id)),
        );
    },
    async DELETE(ctx) {
        return new Response(
            JSON.stringify(await deleteAdminAuth(ctx.params.id)),
        );
    },
});
