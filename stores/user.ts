import { signal } from "@preact/signals";
import { User } from "@/lib/types.ts";

//export const currentUserId = signal<Id | undefined>();

export const user = signal<User>();

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
