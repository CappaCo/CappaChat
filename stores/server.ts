import { computed, signal } from "@preact/signals";
import { Id, Server } from "@/lib/types.ts";
import { servers } from "@/stores/servers.ts";

export const currentServerId = signal<Id>();

export const server = computed<Server | undefined>(() =>
    currentServerId.value
        ? servers.value?.get(currentServerId.value)
        : undefined
);
