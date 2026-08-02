import { signal } from "@preact/signals";
import { Channel, Id } from "@/lib/types.ts";

export const channels = signal<Map<Id, Channel> | undefined>(undefined);

export async function fetchChannels(serverId: Id) {
    console.info("fetching channels...");

    const response = await fetch(
        `/api/servers/${serverId}/channels`,
    );

    if (!response.ok) {
        throw "fetching channels failed";
    }

    const fetchedChannels: Channel[] = await response.json();

    const next = new Map(channels.value);
    for (const fetchedChannel of fetchedChannels) {
        next.set(fetchedChannel.id, fetchedChannel);
    }

    channels.value = next;
}
