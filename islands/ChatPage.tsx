import { Channel, Id, Message, Server, User } from "@/lib/types.ts";
import { Head, IS_BROWSER } from "fresh/runtime";
import { useEffect, useRef, useState } from "preact/hooks";
import MessagesDisplay from "@/islands/MessagesDisplay.tsx";
import ChatControls from "@/islands/ChatControls.tsx";
import ServerInfo from "@/islands/ServerInfo.tsx";
import UsersDisplay from "@/islands/UsersDisplay.tsx";
import LeftBar from "@/islands/LeftBar.tsx";

export default function ChatPage(
    { serverId, channelId }: { serverId: Id; channelId: Id },
) {
    const [server, setServer] = useState<Server>();
    const [servers, setServers] = useState<Server[]>();

    const [channel, setChannel] = useState<Channel>();
    const [channels, setChannels] = useState<Channel[]>();

    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>();

    const [messages, setMessages] = useState<Message[]>();

    const appGridRef = useRef<HTMLDivElement>(null);

    console.log("chat page rendering now...");

    useEffect(() => {
        if (IS_BROWSER) {
            // TODO: only do these if they aren't already loaded somewhere
            fetchServer();
            fetchServers();
            fetchChannel();
            fetchChannels();
            fetchUser(); // Do this once if it can't be loaded from cache
            fetchUsers();
            fetchRecentMessages();
        }
    }, []);

    async function fetchRecentMessages() {
        console.info("fetching recent messages...");

        const response = await fetch(
            `/api/servers/${serverId}/channels/${channelId}/messages`,
        );

        const messages: Message[] = await response.json();

        setMessages(messages.reverse());
    }

    async function fetchServer() {
        console.info("fetching server...");

        const response = await fetch(
            `/api/servers/${serverId}`,
        );

        const server: Server = await response.json();

        setServer(server);
    }

    async function fetchServers() {
        console.info("fetching servers...");

        const response = await fetch(
            `/api/servers/`,
        );

        const servers: Server[] = await response.json();

        setServers(servers);
    }

    async function fetchChannel() {
        console.info("fetching channel...");

        const response = await fetch(
            `/api/servers/${serverId}/channels/${channelId}`,
        );

        const channel: Channel = await response.json();

        setChannel(channel);
    }

    async function fetchChannels() {
        console.info("fetching channels...");

        const response = await fetch(
            `/api/servers/${serverId}/channels`,
        );

        const channels: Channel[] = await response.json();

        setChannels(channels);
    }

    async function fetchUser() {
        console.log("fetching user...");

        const response = await fetch(
            `/api/users/me`,
        );

        const user: User = await response.json();

        setUser(user);
    }

    async function fetchUsers() {
        console.log("fetching users...");

        const response = await fetch(
            `/api/servers/${serverId}/members`,
        );

        const users: User[] = await response.json();

        setUsers(users);
    }

    if (user?.username) {
        console.log("currently logged in as:", user.username);
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
