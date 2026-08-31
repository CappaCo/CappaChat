import { signal } from "@preact/signals";
import { Id, User } from "@/lib/types.ts";

const cacheKey = "cappachat-cache-users";

function loadCachedUsers(): Map<Id, User> | undefined {
    const cached = localStorage.getItem(cacheKey);

    if (cached === null) return undefined;

    try {
        const parsed: User[] = JSON.parse(cached);

        console.log({ parsed });

        return new Map(
            parsed.map((user) => [user.id, user]),
        );
    } catch {
        localStorage.removeItem(cacheKey);
        return undefined;
    }
}

export const users = signal<Map<Id, User> | undefined>(loadCachedUsers());

export function saveUsersToCache() {
    localStorage.setItem(
        cacheKey,
        JSON.stringify(users.value?.values().toArray()),
    );
}
