import { computed, signal } from "@preact/signals";
import { Channel, Id } from "@/lib/types.ts";
import { currentServerId } from "@/stores/server.ts";

const cacheKey = "cappachat-cache-channels-";

function loadCachedChannels(serverId: Id): Map<Id, Channel> | undefined {
    const channelCacheKey = cacheKey + serverId;
    const cached = localStorage.getItem(channelCacheKey);

    if (cached === null) return undefined;

    try {
        const parsed: Channel[] = JSON.parse(cached);

        return new Map(
            parsed.map((channel) => [channel.id, channel]),
        );
    } catch {
        localStorage.removeItem(channelCacheKey);
        return undefined;
    }
}

export const channels = computed<Map<Id, Channel> | undefined>(loadChannels);
const realChannels = signal<Map<Id, Channel> | undefined>(undefined);

export async function fetchChannels(serverId: Id) {
    console.info("fetching channels...");

    const response = await fetch(
        `/api/servers/${serverId}/channels`,
    );

    if (!response.ok) {
        throw "fetching channels failed";
    }

    const fetchedChannels: Channel[] = await response.json();

    const next = new Map<Id, Channel>();
    for (const fetchedChannel of fetchedChannels) {
        next.set(fetchedChannel.id, fetchedChannel);
    }

    realChannels.value = next;

    // cache the things
    const channelCacheKey = cacheKey + serverId;
    localStorage.setItem(channelCacheKey, JSON.stringify(fetchedChannels));
}

function loadChannels(): Map<Id, Channel> | undefined {
    if (realChannels.value !== undefined) return realChannels.value;

    const serverId = currentServerId.value;
    if (serverId === undefined) return undefined;
    
    const cached = loadCachedChannels(serverId);
    return cached;
}
