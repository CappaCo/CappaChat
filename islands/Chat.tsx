//import type { Signal } from "@preact/signals";

export default function Chat() {
    return (
        <div id="chat-container">
            <main id="messages">
                <div id="messagesField" style="padding: 10px;">
                    <em>No messages...</em>
                </div>
            </main>
            <div id="chat-controls">
                <button
                    type="button"
                    id="changeUsernameButton"
                    style="flex-shrink: 0;"
                >
                    Change username
                </button>
                <input
                    type="checkbox"
                    style="display: none"
                    id="notificationsEnabledSwitch"
                />
                <input
                    id="inputField"
                    type="text"
                    placeholder="type yo stuff here"
                />
                <button type="submit" id="sendButton">Send</button>
            </div>
            <script src="/scripts/chat-old.js" />
        </div>
    );
}
