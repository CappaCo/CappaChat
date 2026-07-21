import { Channel, ID, Message, Server, User } from "@/lib/types.ts";
import { Head, IS_BROWSER } from "fresh/runtime";
import { useEffect, useRef, useState } from "preact/hooks";
import MessagesDisplay from "@/islands/MessagesDisplay.tsx";
import ChatControls from "@/islands/ChatControls.tsx";
import ServerInfo from "@/islands/ServerInfo.tsx";
import UsersDisplay from "@/islands/UsersDisplay.tsx";
import LeftBar from "@/islands/LeftBar.tsx";

export default function ChatPage(
    { serverID, channelID }: { serverID: ID; channelID: ID },
) {
    const [server, setServer] = useState<Server>();
    const [servers, setServers] = useState<Server[]>();
    const [channel, setChannel] = useState<Channel>();
    const [channels, setChannels] = useState<Channel[]>();
    const [users, setUsers] = useState<User[]>();
    const [messages, setMessages] = useState<Message[]>();

    const appGridRef = useRef<HTMLDivElement>(null);

    console.log("chat page rendering now...");

    // TODO: replace this with actually fetching the data
    if (server === undefined) {
        setServer({
            id: serverID,
            name: "Test server",
            description: "real",
            ownerID: "0",
            iconURL: "/testImages/servers/0.webp",
            createdAt: (new Date()).toISOString(),
        });
    }

    if (servers === undefined && server) setServers([server]);

    if (channel === undefined) {
        setChannel({
            id: channelID,
            name: "test channel",
            type: "text",
            position: 0,
            serverID: "0",
            createdAt: (new Date()).toISOString(),
        });
    }

    if (channels === undefined && channel) setChannels([channel]);

    if (users === undefined) {
        setUsers([
            {
                id: "0" + new Array(25).fill(" ").join(""), // add padding
                displayName: "testUserReal",
                username: "testuser#444",
                description: "testing user",
                profilePictureURL: "/testImages/users/2.webp",
                createdAt: (new Date()).toISOString(),
            },
            {
                id: "1" + new Array(25).fill(" ").join(""), // add freddy padding
                displayName: "Scrom Doglin",
                username: "freddy#4",
                description: "Wabungus Burger",
                profilePictureURL: "/testImages/users/0.webp",
                createdAt: (new Date()).toISOString(),
            },
            {
                id: "2" + new Array(25).fill(" ").join(""), // add padding
                displayName: "NahI'dWeave",
                username: "AncientMichaelWeaver",
                description: "Michael",
                profilePictureURL: "/testImages/users/1.webp",
                createdAt: (new Date()).toISOString(),
            },
        ]);
    }
    // ------------------- up to here

    useEffect(() => {
        fetchRecentMessages();
    }, []);

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
            <div id="app-grid" ref={appGridRef}>
                <LeftBar servers={servers} />
                <ServerInfo
                    server={server}
                    channels={channels}
                    appGridRef={appGridRef}
                />
                <UsersDisplay users={users} />

                <div id="chat-container">
                    <MessagesDisplay messages={messages} users={users} />
                    <ChatControls server={server} channel={channel} />
                </div>
            </div>
        </>
    );
}
