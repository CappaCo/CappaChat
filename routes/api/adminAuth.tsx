import { define } from "@/lib/utils.ts";
import { checkAdminAuth, createAdminSession } from "@/lib/adminAuth.ts";

export const handler = define.handlers({
    async POST(ctx) {
        const formData = await ctx.req.formData();

        const key = formData.get("key");

        if (key === null || key === "") {
            return new Response(
                JSON.stringify({
                    message: "no key in form data",
                }),
                {
                    status: 400,
                },
            );
        }

        if (!await checkAdminAuth(key as string)) {
            return new Response(
                JSON.stringify({
                    message: "no bro, wrong key",
                }),
                {
                    status: 401,
                },
            );
        }

        const adminSession = await createAdminSession();
        const cookie = [
            `adminAuth=${adminSession}`,
            "HttpOnly",
            "Secure",
            "Path=/",
            "SameSite=Lax",
        ].join("; ");

        return new Response(
            JSON.stringify({
                message: "yeah ok",
            }),
            {
                headers: {
                    "Set-Cookie": cookie,
                },
            },
        );
    },
});
