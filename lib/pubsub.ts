import { Id } from "@/lib/types.ts";

type Client = { socket: WebSocket };
type Topic = { type: "channel"; id: Id };

const channels = new Map<Id, Set<Client>>();

export function pub(to: Topic, data: object) {
    // console.log("pubbing");
    // console.log("to:", to);

    switch (to.type) {
        case "channel": {
            const clients = channels.get(to.id);

            if (clients === undefined) return;

            for (const client of clients) {
                client.socket.send(JSON.stringify({ type: "pub", to, data }));
            }

            break;
        }
    }
}

export function sub(client: Client, to: Topic) {
    // console.log("subbing");
    // console.log("to:", to);

    switch (to.type) {
        case "channel": {
            let clients = channels.get(to.id);

            if (clients === undefined) {
                clients = new Set();
                channels.set(to.id, clients);
            }

            clients.add(client);

            break;
        }
    }
}
