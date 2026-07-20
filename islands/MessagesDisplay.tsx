import { ID, Message, User } from "@/lib/types.ts";

function MessageElement({ message, user }: { message: Message; user?: User }) {
    if (message.content) {
        const username = user ? user.displayName : "loading username";
        const _pfpURL = user
            ? user.profilePictureURL
            : "/testImages/users/0.webp";

        return (
            <div class="message text">
                {/* TODO: add user profile picture into this */}
                <span class="message-header">
                    <span class="message-username">{username}</span>
                    <span class="message-timestamp">{message.createdAt}</span>
                </span>
                <span class="message-content">{message.content}</span>
            </div>
        );
    }

    return (
        <p class="message">
            <em>No message content</em>
        </p>
    );
}

function MessagesLoadingSkeleton() {
    return "Messages loading skeleton...";
}

export default function MessagesDisplay(
    { messages, users }: { messages?: Message[]; users?: User[] },
) {
    const usersMap = new Map<ID, User>();
    if (users !== undefined) {
        for (const user of users) {
            usersMap.set(user.id, user);
        }
    }
    return (
        <section id="messages">
            {(() => {
                if (messages === undefined) return <MessagesLoadingSkeleton />;
                if (messages.length === 0) return "No messages";

                return messages.map((message) => {
                    const user = usersMap.get(message.authorID);
                    return (
                        <MessageElement
                            key={message.id}
                            message={message}
                            user={user}
                        />
                    );
                });
            })()}
        </section>
    );
}
