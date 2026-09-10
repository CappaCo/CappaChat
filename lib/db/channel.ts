import { generateId } from "@/lib/id.ts";
import { query } from "@/lib/db.ts";
import type { Channel, ChannelType, Id, Message } from "@/lib/types.ts";

interface GetMessagesOptions {
    before?: Date;
    limit?: number;
}

export async function getMessages(
    channelId: Id,
    options: GetMessagesOptions = {},
) {
    const before = options.before ?? new Date();
    const limit = Math.min(options.limit ?? 50, 100);

    const response = await query<Message>(
        `
        SELECT id, author_id, channel_id, content, created_at, edited_at
        FROM messages
        WHERE channel_id = $1
          AND created_at < $2
        ORDER BY created_at DESC
        LIMIT $3;
        `,
        [channelId, before, limit],
    );

    return response;
}

export async function createChannel(serverId: Id, {
    name,
    type = "text",
    position = 0,
}: {
    name: string;
    type?: ChannelType;
    position?: number;
}): Promise<Channel> {
    const id = generateId();

    return (await query<Channel>(
        `
        INSERT INTO channels (
            id,
            server_id,
            name,
            type,
            position
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [id, serverId, name, type, position],
    ))[0];
}

export async function deleteChannel(channelId: Id) {
    await query(
        `
        DELETE FROM channels
        WHERE id=$0;
        `,
        [channelId],
    );
}

export async function createMessage(
    channelId: Id,
    {
        authorId,
        content,
    }: {
        authorId: Id;
        content: string;
    },
) {
    const id = generateId();

    const message = (await query<Message>(
        `
        INSERT INTO messages (
            id,
            channel_id,
            author_id,
            content
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
        [id, channelId, authorId, content],
    ))[0];

    return message;
}
