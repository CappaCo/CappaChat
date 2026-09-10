import { query } from "@/lib/db.ts";
import { Id, Member } from "@/lib/types.ts";

export async function joinUser(userId: Id, serverId: Id): Promise<Member> {
    return (await query<Member>(
        `
        INSERT INTO members (
            user_id,
            server_id
        )
        VALUES ($1, $2)
        RETURNING *;
        `,
        [userId, serverId],
    ))[0];
}

export async function unjoinUser(userId: Id, serverId: Id) {
    await query(
        `
        DELETE FROM members
        WHERE user_id=$0
        AND server_id=$1;
        `,
        [userId, serverId],
    );
}
