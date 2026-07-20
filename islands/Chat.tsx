import { ID, Message, User } from "@/lib/types.ts";
import { IS_BROWSER } from "fresh/runtime";
import { useEffect, useRef, useState } from "preact/hooks";

// TODO: move this to another file
function MessageElement({ message }: { message: Message }) {
    if (message.content) {
        return (
            <div class="message text">
                <span class="message-header">
                    <span class="message-username">username</span>
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

export default function Chat(
    { serverID, channelID }: { serverID: ID; channelID: ID },
) {
    const [messages, setMessages] = useState<Message[] | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(fetchRecentMessages, []);

    function fetchRecentMessages() {
        if (!IS_BROWSER) return;

        fetch(`/api/servers/${serverID}/channels/${channelID}/messages`)
            .then((response) => response.json())
            .then((messages: Message[]) => {
                setMessages(messages.reverse());
            });
    }

    function sendMessage() {
        if (inputRef.current === null) return;
        const content = inputRef.current.value;
        fetch(`/api/servers/${0}/channels/${channelID}/messages`, {
            method: "POST",
            body: JSON.stringify({
                content,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log("response json:", json);
                if (inputRef.current) inputRef.current.value = "";
                fetchRecentMessages(); // TODO: change this I think
            });
    }

    return (
        <div id="chat-container">
            <section id="messages" style="padding: 10px;">
                {(() => {
                    if (messages === null) return "Loading...";
                    if (messages.length === 0) return "No messages";
                    return messages.map((message) => (
                        <MessageElement key={message.id} message={message} />
                    ));
                })()}
            </section>
            <section id="chat-controls">
                <input
                    ref={inputRef}
                    onSubmit={sendMessage}
                    id="inputField"
                    type="text"
                    placeholder="type yo stuff here"
                />
                {/* TODO: make this hidden until user focuses it for accessability*/}
                <button
                    ref={submitButtonRef}
                    onClick={sendMessage}
                    type="submit"
                    id="sendButton"
                >
                    Send
                </button>
            </section>
        </div>
    );
}

function MessagesDisplay({ messages }: { messages: Message[] }) {

}
