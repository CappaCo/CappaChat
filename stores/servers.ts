import { signal } from "@preact/signals";
import { Id, Server } from "@/lib/types.ts";

export const servers = signal<Map<Id, Server> | undefined>(undefined);

export async function fetchServers() {
    console.info("fetching servers...");

    const response = await fetch(
        `/api/servers/`,
    );

    if (!response.ok) {
        throw "fetching servers failed";
    }

    const fetchedServers: Server[] = await response.json();

    const next = new Map(servers.value);
    for (const fetchedServer of fetchedServers) {
        next.set(fetchedServer.id, fetchedServer);
    }

    servers.value = next;
}
