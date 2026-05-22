import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverID = params.server;
    const channelID = params.channel;

    return (
        <>
            <Head>
                <title>s:{serverID} c:{channelID}</title>
            </Head>
            <main id="messages">
                <div id="messagesField" style="padding: 10px;">
                    <em>No messages...</em>
                </div>
            </main>
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
            <script src="/scripts/chat-old.js" />
        </>
    );
});
