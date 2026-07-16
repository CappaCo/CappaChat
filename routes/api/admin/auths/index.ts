import { define } from "@/lib/utils.ts";
import { clearAdminAuths, listAdminAuths } from "@/lib/adminAuth.ts";

export const handler = define.handlers({
    async GET() {
        return new Response(
            JSON.stringify(await listAdminAuths()),
        );
    },
    async DELETE() {
        return new Response(
            JSON.stringify(await clearAdminAuths()),
        );
    },
});
