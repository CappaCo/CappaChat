import { ulid } from "@std/ulid";
import { query } from "@/lib/db.ts";
import type { ID, Message } from "@/lib/types.ts";

interface GetMessagesOptions {
    before?: Date;
    limit?: number;
}

export async function getMessages(
    channelID: ID,
    options: GetMessagesOptions = {},
) {
    const before = options.before ?? new Date();
    const limit = Math.min(options.limit ?? 50, 100);

    const response = await query<Message>(
        `
        SELECT id, author_id as "authorID", channel_id as "channelID", content, created_at as "createdAt", edited_at as "aditedAt"
        FROM messages
        WHERE channel_id = $1
          AND created_at < $2
        ORDER BY created_at DESC
        LIMIT $3
        `,
        [channelID, before, limit],
    );

    return response;
}

export async function createMessage(
    channelID: ID,
    {
        authorID,
        content,
    }: {
        authorID: ID;
        content: string;
    },
) {
    const id = ulid();

    await query(
        `
        INSERT INTO messages (
            id,
            channel_id,
            author_id,
            content
        )
        VALUES ($1, $2, $3, $4)
        `,
        [id, channelID, authorID, content],
    );

    return id;
}
