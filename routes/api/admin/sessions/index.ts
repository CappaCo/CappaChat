import { define } from "@/lib/utils.ts";
import { clearAdminSessions, listAdminSessions } from "@/lib/adminAuth.ts";

export const handler = define.handlers({
    async GET() {
        return new Response(
            JSON.stringify(await listAdminSessions()),
        );
    },
    async DELETE() {
        return new Response(
            JSON.stringify(await clearAdminSessions()),
        );
    },
});
