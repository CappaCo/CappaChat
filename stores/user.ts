import { signal } from "@preact/signals";
import { User } from "@/lib/types.ts";

export const user = signal<User | undefined>(undefined);

export async function fetchUser() {
    console.log("fetching user...");

    const response = await fetch(
        `/api/users/me`,
    );

    if (!response.ok) {
        throw "fetching user failed";
    }

    const fetchedUser: User = await response.json();

    user.value = fetchedUser;
}
