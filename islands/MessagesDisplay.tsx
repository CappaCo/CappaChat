import { Id, Message, User } from "@/lib/types.ts";

export default function MessagesDisplay(
    { messages, users }: { messages?: Message[]; users?: User[] },
) {
    const usersMap = new Map<Id, User>();

    if (users !== undefined) {
        for (const user of users) {
            usersMap.set(user.id, user);
        }
    } else {
        console.error("no users???");
    }

    return (
        <section id="messages-container">
            <ol id="messages">
                {(() => {
                    if (messages === undefined) {
                        return <MessagesLoadingSkeleton />;
                    }
                    if (messages.length === 0) return "No messages";

                    return messages.map((message, index) => {
                        const user = usersMap.get(message.authorId);
                        const prevMessage = (index !== messages.length)
                            ? messages[index - 1]
                            : undefined;

                        return (
                            <MessageElement
                                key={message.id}
                                message={message}
                                prevMessage={prevMessage}
                                user={user}
                            />
                        );
                    });
                })()}
            </ol>
        </section>
    );
}

function MessagesLoadingSkeleton() {
    return "Messages loading skeleton...";
}

function MessageElement(
    { message, user, prevMessage }: {
        message: Message;
        user?: User;
        prevMessage?: Message;
    },
) {
    // TODO: check this with attachments later on
    if (!message.content) {
        return (
            <li class="message">
                <em>No message content</em>
            </li>
        );
    }

    //console.log("rendering user:", user);
    const username = user ? user.displayName : "loading username";
    const pfpURL = user ? user.profilePictureUrl : "/testImages/users/0.webp";

    // TODO: move this to a separate function because the logic is complex
    const now = new Date();
    const dateSent = new Date(message.createdAt);
    const verbosityThresholdDate = now;
    // TODO: make this into a helper function that checks if something is more than a day before
    verbosityThresholdDate.setDate(verbosityThresholdDate.getDate() - 1);

    let timestamp = dateSent.toLocaleTimeString();

    if (dateSent.getTime() < verbosityThresholdDate.getTime()) {
        timestamp = dateSent.toLocaleDateString() + " " + timestamp;
    }

    function shouldGroupMessage() {
        //return false;
        // if this is the first message, don't group
        if (prevMessage === undefined) return false;
        // if the messages aren't sent by the same user, don't group
        if (message.authorId !== prevMessage.authorId) return false;

        // if the messages aren't sent within 1 hour of eachother, don't group
        const lastMessageButABitLater = new Date(prevMessage.createdAt);
        lastMessageButABitLater.setHours(
            lastMessageButABitLater.getHours() + 1,
        );
        if (dateSent > lastMessageButABitLater) return false;
        return true;
    }

    const groupMessage = shouldGroupMessage();

    const messageClasses = [
        "message",
        "text",
    ];

    if (groupMessage) {
        messageClasses.push("group");
    }

    return (
        <li class={messageClasses.join(" ")}>
            {groupMessage ? null : <img src={pfpURL} />}
            <div class="message-body">
                {groupMessage ? null : (
                    <h3 class="message-header">
                        <span class="message-username">{username}</span>
                        <small class="message-timestamp">{timestamp}</small>
                    </h3>
                )}
                <p class="message-content">{message.content}</p>
            </div>
        </li>
    );
}
