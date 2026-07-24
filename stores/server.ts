import { computed, signal } from "@preact/signals";
import { Id, Server } from "@/lib/types.ts";
import { servers } from "@/stores/servers.ts";

export const currentServerId = signal<Id>();

export const server = computed<Server | undefined>(() =>
    currentServerId.value
        ? servers.value.get(currentServerId.value.padEnd(26, " "))
        : undefined
);

/*export async function fetchServer() {
    console.info("fetching server...");

    const response = await fetch(
        `/api/servers/${serverId}`,
    );

    if (!response.ok) {
        throw "fetching server failed";
    }

    const fetchedServer: Server = await response.json();

    server.value = fetchedServer;
}*/
