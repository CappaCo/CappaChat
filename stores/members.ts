import { signal } from "@preact/signals";
import { Id, User } from "@/lib/types.ts";

export const members = signal<Map<Id, User> | undefined>(undefined);

export async function fetchMembers(serverId: Id) {
    console.log("fetching users...");

    const response = await fetch(
        `/api/servers/${serverId}/members`,
    );

    if (!response.ok) {
        throw "fetching users failed";
    }

    const fetchedUsers: User[] = await response.json();

    const next = new Map(members.value);
    for (const fetchedUser of fetchedUsers) {
        next.set(fetchedUser.id, fetchedUser);
    }

    members.value = next;
}
