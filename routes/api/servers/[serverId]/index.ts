import { define } from "@/lib/utils.ts";
import { deleteServer, getServer } from "@/lib/db/server.ts";
import { hasPermission } from "@/lib/db/permissions.ts";

export const handler = define.handlers({
    async GET(ctx) {
        const serverId = ctx.state.serverId;

        const server = await getServer(serverId);

        return new Response(JSON.stringify(server));
    },
    async DELETE(ctx) {
        const serverId = ctx.state.serverId;

        if (
            !hasPermission(ctx.state.requestingUser, "delete-server", {
                serverId,
            })
        ) {
            return new Response(
                JSON.stringify({
                    message: "you don't have permissions to delete this server",
                }),
                { status: 403 },
            );
        }

        await deleteServer(serverId);

        return new Response(null, { status: 204 });
    },
});
