import { define } from "@/lib/utils.ts";
import { Server } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;

        console.log("getting information for server:", serverID);

        // TODO: implement this
        const server: Server = {
            id: serverID,
            name: "Termite Piddle Atrium",
            description: "",
            ownerID: "0",
            createdAt: (new Date()).toISOString(),
        };

        return new Response(JSON.stringify(server));
    },
});
