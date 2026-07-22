import { query } from "@/lib/db.ts";
import { generateId } from "@/lib/id.ts";
import { hash } from "@/lib/hashPassword.ts";
import { Id, User } from "@/lib/types.ts";

// TODO: test this function
export async function createUser(
    { username, password }: { username: string; password: string },
) {
    const id = generateId();
    const passwordHash = await hash(password);

    await query(
        `
        INSERT INTO users (
            id,
            username,
            password_hash,
            avatar_url
        ) VALUES ($1, $2, $3, '/testImages/users/2.webp');
        `,
        [id, username, passwordHash],
    );

    return id;
}

export async function getUser(id: Id) {
    return await query<User>(
        `
        SELECT
            id,
            username,
            display_name,
            description,
            profile_picture_url,
            created_at
        FROM users
        WHERE id = $1;
        `,
        [id],
    );
}
