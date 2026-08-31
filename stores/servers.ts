import { signal } from "@preact/signals";
import { Id, Server } from "@/lib/types.ts";

const cacheKey = "cappachat-cache-servers";

function loadCachedServers(): Map<Id, Server> | undefined {
    const cached = localStorage.getItem(cacheKey);

    if (cached === null) return undefined;

    try {
        const parsed: Server[] = JSON.parse(cached);
        return new Map(parsed.map((server) => [server.id, server]));
    } catch {
        localStorage.removeItem(cacheKey);
        return undefined;
    }
}

export const servers = signal<Map<Id, Server> | undefined>(
    loadCachedServers(),
);

export async function fetchServers() {
    console.info("fetching servers...");

    const response = await fetch(
        `/api/servers/`,
    );

    if (!response.ok) {
        throw "fetching servers failed";
    }

    const fetchedServers: Server[] = await response.json();

    const next = new Map<Id, Server>();
    for (const fetchedServer of fetchedServers) {
        next.set(fetchedServer.id, fetchedServer);
    }

    servers.value = next;

    // update the cache
    localStorage.setItem(
        cacheKey,
        JSON.stringify(fetchedServers),
    );
}
