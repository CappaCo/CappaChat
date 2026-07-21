import { Id, Message, User } from "@/lib/types.ts";

function MessageElement({ message, user }: { message: Message; user?: User }) {
    // TODO: check this with attachments later on
    if (!message.content) {
        return (
            <p class="message">
                <em>No message content</em>
            </p>
        );
    }

    //console.log("rendering user:", user);
    const username = user ? user.displayName : "loading username";
    const pfpURL = user ? user.profilePictureUrl : "/testImages/users/0.webp";

    // TODO: move this to a separate function because the logic is complex
    const now = new Date();
    const dateSent = new Date(message.createdAt);
    const verbosityThresholdDate = now;
    verbosityThresholdDate.setDate(verbosityThresholdDate.getDate() - 1);

    let timestamp = dateSent.toLocaleTimeString();

    if (dateSent.getTime() < verbosityThresholdDate.getTime()) {
        timestamp = dateSent.toLocaleDateString() + " " + timestamp;
    }

    return (
        <div class="message text">
            {/* TODO: add user profile picture into this */}
            <img src={pfpURL} />
            <div class="message-but-not-image">
                <span class="message-header">
                    <span class="message-username">{username}</span>
                    <small class="message-timestamp">{timestamp}</small>
                </span>
                <p class="message-content">{message.content}</p>
            </div>
        </div>
    );
}

function MessagesLoadingSkeleton() {
    return "Messages loading skeleton...";
}

export default function MessagesDisplay(
    { messages, users }: { messages?: Message[]; users?: User[] },
) {
    const usersMap = new Map<Id, User>();

    if (users !== undefined) {
        for (const user of users) {
            usersMap.set(user.id.trim(), user);
        }
        console.log(usersMap);
    }

    return (
        <div id="messages-container">
            <section id="messages">
                {(() => {
                    if (messages === undefined) {
                        return <MessagesLoadingSkeleton />;
                    }
                    if (messages.length === 0) return "No messages";

                    return messages.map((message) => {
                        const user = usersMap.get(message.authorId);
                        console.log("got user:", user);

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
        </div>
    );
}
