import { query } from "@/lib/db.ts";
import { generateId } from "@/lib/id.ts";
import { hash } from "@/lib/hashPassword.ts";
import { Id, User } from "@/lib/types.ts";

export async function createUser(
    { username, password }: { username: string; password: string },
): Promise<Id> {
    const id = generateId();
    const passwordHash = await hash(password);

    await query(
        `
        INSERT INTO users (
            id,
            username,
            password_hash,
            profile_picture_url
        ) VALUES ($1, $2, $3, '/testImages/users/2.webp');
        `,
        [id, username, passwordHash],
    );

    return id;
}

export async function getUser(id: Id): Promise<User> {
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
        [id],
    ))[0];
}

export async function getUserIdFromUsername(
    username: string,
): Promise<Id | undefined> {
    return (await query<{ id: Id | undefined }>(
        `
        SELECT
            id
        FROM users
        WHERE username = $1
        LIMIT 1;`,
        [username],
    ))[0].id;
}
