import { query } from "@/lib/db.ts";
import { generateId } from "@/lib/id.ts";
import { hash } from "@/lib/hashPassword.ts";
import { Id, Server, User } from "@/lib/types.ts";

export async function createUser(
    { username, password }: { username: string; password: string },
): Promise<User> {
    const id = generateId();
    const passwordHash = await hash(password);

    return (await query<User>(
        `
        INSERT INTO users (
            id,
            username,
            password_hash,
            profile_picture_url
        ) VALUES ($1, $2, $3, '/testImages/users/2.webp')
        RETURNING id, username, description, profile_picture_url, created_at;
        `,
        [id, username, passwordHash],
    ))[0];
}

export async function deleteUser(userId: Id) {
    await query(
        `
        DELETE FROM users
        WHERE id=$0;
        `,
        [userId],
    );
}

export async function getUser(userId: Id): Promise<User> {
    return (await query<User>(
        `
        SELECT
            id,
            username,
            description,
            profile_picture_url,
            created_at
        FROM users
        WHERE id = $1
        LIMIT 1;
        `,
        [userId],
    ))[0];
}

export async function getUserIdFromUsername(
    username: string,
): Promise<Id | undefined> {
    const user = (await query<{ id: Id | undefined }>(
        `
        SELECT
            id
        FROM users
        WHERE username = $1
        LIMIT 1;
        `,
        [username],
    ))[0];

    if (user === undefined) return undefined;

    return user.id;
}

export async function getServersUserIsIn(userId: Id): Promise<Server[]> {
    return await query<Server>(
        `
        SELECT
            s.id,
            s.name,
            s.owner_id,
            s.icon_url,
            s.created_at
        FROM servers s
        JOIN members m
        ON m.server_id = s.id
        WHERE m.user_id = $1;
        `,
        [userId],
    );
}
