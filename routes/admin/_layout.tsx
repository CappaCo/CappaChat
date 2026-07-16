import { define } from "@/lib/utils.ts";
import { isAdminRequest } from "@/lib/adminAuth.ts";
import AdminAuth from "@/islands/AdminAuth.tsx";

export default define.layout(async (ctx) => {
    if (!await isAdminRequest(ctx.req.headers)) {
        return <AdminAuth />;
    }

    return <ctx.Component />;
});
