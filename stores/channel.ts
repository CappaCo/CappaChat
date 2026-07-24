import { computed, signal } from "@preact/signals";
import { Channel, Id } from "@/lib/types.ts";
import { channels } from "@/stores/channels.ts";

export const currentChannelId = signal<Id>();

export const channel = computed<Channel | undefined>(() =>
    currentChannelId.value
        ? channels.value.get(currentChannelId.value.padEnd(26, " "))
        : undefined
);

/*export async function fetchChannel() {
    console.info("fetching channel...");

    const response = await fetch(
        `/api/servers/${serverId}/channels/${channelId}`,
    );

    if (!response.ok) {
        throw "fetching channel failed";
    }

    const fetchedChannel: Channel = await response.json();

    channel.value = fetchedChannel;
}*/
