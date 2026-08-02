import { computed, signal } from "@preact/signals";
import { Channel, Id } from "@/lib/types.ts";
import { channels } from "@/stores/channels.ts";

export const currentChannelId = signal<Id>();

export const channel = computed<Channel | undefined>(() =>
    currentChannelId.value
        ? channels.value?.get(currentChannelId.value)
        : undefined
);
