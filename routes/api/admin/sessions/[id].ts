import { define } from "@/lib/utils.ts";
import { deleteAdminSession, getAdminSession } from "@/lib/adminAuth.ts";

export const handler = define.handlers({
    async GET(ctx) {
        return new Response(
            JSON.stringify(await getAdminSession(ctx.params.id)),
        );
    },
    async DELETE(ctx) {
        return new Response(
            JSON.stringify(await deleteAdminSession(ctx.params.id)),
        );
    },
});
