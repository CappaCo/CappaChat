import { Channel, Id, Server, User } from "@/lib/types.ts";
import { query } from "@/lib/db.ts";
import { generateId } from "@/lib/id.ts";

export async function getServer(serverId: Id): Promise<Server> {
    return (await query<Server>(
        `
        SELECT
            s.id,
            s.name,
            s.owner_id,
            s.icon_url,
            s.created_at
        FROM servers s
        WHERE s.id = $1
        LIMIT 1;
        `,
        [serverId],
    ))[0];
}

export async function createServer(
    { ownerId, name, icon }: { ownerId: Id; name: string; icon?: string },
): Promise<Server> {
    const id = generateId();

    return (await query<Server>(
        `
        INSERT INTO servers (
            id,
            owner_id,
            name,
            icon_url,
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
        [id, ownerId, name, icon],
    ))[0];
}

export async function getChannelsInServer(serverId: Id): Promise<Channel[]> {
    return await query<Channel>(
        `
        SELECT
            c.id,
            c.name,
            c.type,
            c.position,
            c.server_id,
            c.created_at
        FROM channels c
        JOIN servers s
        ON c.server_id = s.id
        WHERE s.id = $1;
        `,
        [serverId],
    );
}

export async function getUsersInServer(serverId: Id): Promise<User[]> {
    return await query<User>(
        `
        SELECT
            u.id,
            u.username,
            u.description,
            u.profile_picture_url,
            u.created_at
        FROM users u
        JOIN members m
        ON m.user_id = u.id
        WHERE m.server_id = $1;
        `,
        [serverId],
    );
}
