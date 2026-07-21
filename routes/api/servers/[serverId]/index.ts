import { define } from "@/lib/utils.ts";
import { Server } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverId = ctx.state.serverId;

        console.log("getting information for server:", serverId);

        // TODO: implement this
        const server: Server = {
            id: serverId,
            name: "Termite Piddle Atrium",
            description: "",
            ownerId: "0",
            createdAt: (new Date()).toISOString(),
        };

        return new Response(JSON.stringify(server));
    },
});
