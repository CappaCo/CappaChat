import { define } from "@/utils.ts";
import { Server } from "@/types.ts";

export const handler = define.handlers({
    GET(ctx) {
        const serverID = ctx.state.serverID;

        console.log("getting information for server:", serverID);

        // TODO: implement this
        const server: Server = {
            id: serverID,
            name: "Termite Piddle Atrium",
        };

        return new Response(JSON.stringify(server));
    },
});
