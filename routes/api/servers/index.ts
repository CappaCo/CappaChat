import { define } from "@/lib/utils.ts";
import { ServerSummary } from "@/lib/types.ts";

export const handler = define.handlers({
    GET(_ctx) {
        const servers: ServerSummary[] = [{
            id: "0",
            name: "Termite Piddle Atrium",
            description: "",
        }];

        // TODO: make this return a defined type
        return new Response(JSON.stringify({
            servers: servers,
        }));
    },
});
