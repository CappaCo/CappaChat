import { Id, User } from "@/lib/types.ts";

interface hasPermissionsOption {
    serverId?: Id;
    channelId?: Id;
}

export function hasPermission(
    user: User | undefined,
    permission: string, // TODO: make permission type
    { serverId, channelId }: hasPermissionsOption,
): boolean {
    if (user === undefined) return false;
    permission;
    serverId;
    channelId;

    // TODO: implement this
    return true;
}
