import { computed, signal } from "@preact/signals";
import { Id, Member, MemberResponse } from "@/lib/types.ts";
import { saveUsersToCache, users } from "@/stores/users.ts";
import { currentServerId } from "@/stores/server.ts";

const cacheKey = "cappachat-cache-members-";

function loadCachedMembers(serverId: Id): Map<Id, Member> | undefined {
    const memberCacheKey = cacheKey + serverId;
    const cached = localStorage.getItem(memberCacheKey);

    if (cached === null) return undefined;

    try {
        const parsed: MemberResponse[] = JSON.parse(cached);

        console.log({ parsed });
        const members = parsed.map(translateMemberResponse);

        return new Map(
            members.map((member) => [member.userId, member]),
        );
    } catch {
        localStorage.removeItem(memberCacheKey);
        return undefined;
    }
}

export const members = computed<Map<Id, Member> | undefined>(loadMembers);
const realMembers = signal<Map<Id, Member> | undefined>(undefined);

export async function fetchMembers(serverId: Id) {
    console.log("fetching members...");

    const response = await fetch(
        `/api/servers/${serverId}/members`,
    );

    if (!response.ok) {
        throw "fetching members failed";
    }

    const fetchedMembers: MemberResponse[] = await response.json();
    console.warn({ fetchedMembers });

    const nextMembers = new Map<Id, Member>();
    const nextUsers = new Map(users.value);
    for (const fetchedMember of fetchedMembers) {
        nextMembers.set(
            fetchedMember.user.id,
            translateMemberResponse(fetchedMember),
        );
        nextUsers.set(
            fetchedMember.user.id,
            fetchedMember.user,
        );
    }

    realMembers.value = nextMembers;
    users.value = nextUsers;

    // save the things to cache
    console.warn("saving to cache");
    console.warn({ fetchedMembers });
    const memberCacheKey = cacheKey + serverId;
    localStorage.setItem(memberCacheKey, JSON.stringify(fetchedMembers));
    saveUsersToCache();
}

function translateMemberResponse(response: MemberResponse): Member {
    // deno-lint-ignore no-explicit-any
    const translated: any = structuredClone(response);

    translated.userId = response.user.id;
    delete translated.user;

    return translated as Member;
}

function loadMembers(): Map<Id, Member> | undefined {
    if (realMembers.value !== undefined) return realMembers.value;

    const serverId = currentServerId.value;
    if (serverId === undefined) return undefined;

    const cached = loadCachedMembers(serverId);
    console.log({ cached });
    return cached;
}
