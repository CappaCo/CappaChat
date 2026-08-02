import { signal } from "@preact/signals";
import { Id, Message } from "@/lib/types.ts";

export const messages = signal<Message[] | undefined>(undefined);

export async function fetchRecentMessages(serverId: Id, channelId: Id) {
    console.info("fetching recent messages...");

    const response = await fetch(
        `/api/servers/${serverId}/channels/${channelId}/messages`,
    );

    if (!response.ok) {
        throw "fetching recent messages failed";
    }

    const fetchedMessages: Message[] = await response.json();

    messages.value = fetchedMessages.reverse();
}
