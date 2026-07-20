import { Channel, ID, Message, Server } from "@/lib/types.ts";
import { Head, IS_BROWSER } from "fresh/runtime";
import { useEffect, useState } from "preact/hooks";
import MessagesDisplay from "@/islands/MessagesDisplay.tsx";
import ChatControls from "@/islands/ChatControls.tsx";
import ServerInfo from "@/islands/ServerInfo.tsx";
import UsersDisplay from "@/islands/UsersDisplay.tsx";

export default function ChatPage(
    { serverID, channelID }: { serverID: ID; channelID: ID },
) {
    const [server, setServer] = useState<Server>();
    const [channel, setChannel] = useState<Channel>();
    const [channels, setChannels] = useState<Channel[]>();
    const [messages, setMessages] = useState<Message[]>();

    console.log("chat page rendering now...");

    // TODO: replace this with actually fetching the data
    if (server === undefined) {
        setServer({
            id: serverID,
            name: "Termite Piddle Atrium",
            description: "real",
            ownerID: "0",
            createdAt: (new Date()).toISOString(),
        });
    }

    if (channel === undefined) {
        setChannel({
            id: channelID,
            name: "test",
            type: "text",
            position: 0,
            serverID: "0",
            createdAt: (new Date()).toISOString(),
        });
    }

    if (channels === undefined && channel) setChannels([channel]);
    // up to here

    useEffect(() => {
        fetchRecentMessages();
    }, [server, channel]);

    async function fetchRecentMessages() {
        if (!IS_BROWSER) return;
        if (server === undefined || channel === undefined) return;

        console.log("fetching recent messages...");

        const response = await fetch(
            `/api/servers/${server.id}/channels/${channel.id}/messages`,
        );

        const messages: Message[] = await response.json();

        setMessages(messages.reverse());
    }

    return (
        <>
            <Head>
                <title>{channel?.name} | {server?.name} | CappaChat</title>
            </Head>
            <ServerInfo server={server} channels={channels} />
            <UsersDisplay />

            <div id="chat-container">
                <MessagesDisplay messages={messages} />
                <ChatControls server={server} channel={channel} />
            </div>
        </>
    );
}
