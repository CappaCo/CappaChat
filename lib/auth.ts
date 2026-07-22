import * as cookie from "@std/http/cookie";
import { verify as verifyPassword } from "@/lib/hashPassword.ts";
import { Id, User } from "@/lib/types.ts";
import { query } from "@/lib/db.ts";
import { encodeBase64Url } from "@std/encoding/base64url";
import { generateId } from "@/lib/id.ts";

export type SessionToken = string;

async function hash(input: string) {
    const inputBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", inputBuffer);
    return encodeBase64Url(hashBuffer);
}

function generateSessionToken(): SessionToken {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return encodeBase64Url(bytes);
}

export async function checkPassword(
    userId: Id,
    password: string,
): Promise<boolean> {
    const { passwordHash } = (await query<{ passwordHash: string }>(
        `
        SELECT password_hash
        FROM users
        WHERE id = $1
        LIMIT 1;
        `,
        [userId],
    ))[0];

    return await verifyPassword(passwordHash, password);
}

export async function createSession(userId: Id): Promise<SessionToken> {
    const sessionToken: SessionToken = generateSessionToken();

    const sessionTokenHash = await hash(sessionToken);

    // I think expiry can be handled by the database
    // TODO: add more metadata like location or ip address?
    await query(
        `
        INSERT INTO sessions (
            id,
            token_hash,
            user_id,
            expires_at
        )
        VALUES ($1, $2, $3, NOW() + INTERVAL '1 week' );`,
        [generateId(), sessionTokenHash, userId],
    );

    return sessionToken;
}

export async function getUserFromSession(
    headers: Headers,
): Promise<User | undefined> {
    const sessionToken = cookie.getCookies(headers)["session"];

    if (sessionToken === undefined) return undefined;

    const sessionTokenHash = await hash(sessionToken);

    const user = (await query<User>(
        `
        SELECT
            u.id,
            u.username,
            u.description,
            u.profile_picture_url,
            u.created_at
        FROM sessions s
        JOIN users u
        ON s.user_id = u.id
        WHERE s.token_hash = $1
        AND s.expires_at > NOW()
        LIMIT 1;`,
        [sessionTokenHash],
    ))[0];

    return user;
}
