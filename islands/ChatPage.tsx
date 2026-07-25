import { Id } from "@/lib/types.ts";
import { Head } from "fresh/runtime";
import { useEffect, useRef } from "preact/hooks";
import MessagesDisplay from "@/islands/MessagesDisplay.tsx";
import ChatControls from "@/islands/ChatControls.tsx";
import ServerInfo from "@/islands/ServerInfo.tsx";
import MembersDisplay from "@/islands/MembersDisplay.tsx";
import LeftBar from "@/islands/LeftBar.tsx";

import { fetchServers } from "@/stores/servers.ts";
import { currentServerId, server } from "@/stores/server.ts";
import { fetchChannels } from "@/stores/channels.ts";
import { channel, currentChannelId } from "@/stores/channel.ts";
import { fetchMembers } from "@/stores/members.ts";
import { fetchUser, user } from "@/stores/user.ts";
import { fetchRecentMessages } from "@/stores/messages.ts";

type ChatLocation =
    | {
        kind: "server";
        serverId: Id;
        channelId: Id;
    }
    | {
        kind: "dm";
        conversationId: Id;
    };

type ChatPageProps = {
    location: ChatLocation;
};

export default function ChatPage(
    { location }: ChatPageProps,
) {
    useEffect(() => {
        if (location.kind === "server") {
            initializeChatPage(location.serverId, location.channelId);
        } else if (location.kind === "dm") {
            initializeDmPage();
        }

        return () => {
            console.log("tearing down loading");
        };
    }, [location]);

    const appGridRef = useRef<HTMLDivElement>(null);

    console.log("chat page rendering now...");

    if (user.value?.username) {
        console.log("currently logged in as:", user.value.username);
    }

    return (
        <>
            <Head>
                <title>
                    {channel.value?.name} | {server.value?.name} | CappaChat
                </title>
            </Head>
            <div id="app-grid" ref={appGridRef}>
                <LeftBar />
                {location.kind === "server"
                    ? (
                        <>
                            <ServerInfo
                                appGridRef={appGridRef}
                            />
                            <MembersDisplay />

                            <div id="chat-container">
                                <MessagesDisplay />
                                <ChatControls />
                            </div>
                        </>
                    )
                    : <h1>dm page</h1>}
            </div>
        </>
    );
}

async function initializeChatPage(serverId: Id, channelId: Id) {
    console.log("initializing chat page");

    currentServerId.value = serverId;
    currentChannelId.value = channelId;

    await Promise.all([
        fetchServers(),
        fetchChannels(serverId),
        fetchMembers(serverId),
        fetchRecentMessages(serverId, channelId),
        fetchUser(),
    ]);

    const websocket = connectWebSocket();
    console.log("connected to websocket:", websocket);
    //return [websocket.close];
}

async function initializeDmPage() {
    console.log("initializing dm page");

    await Promise.all([
        fetchServers(),
    ]);
}

function connectWebSocket() {
    console.log("connecting to websocket...");

    //const websocketUrl = "ws://localhost:5173/api/websocket";
    //const websocketUrl = "ws://localhost:8000/";
    const websocketUrl = (() => {
        const location = globalThis.location;
        let url = "ws";
        if (location.protocol === "https:") url += "s";
        url += "://";
        url += location.host;
        url += "/api/websocket";
        return url;
    })();

    console.log("wsurl", websocketUrl);
    const websocket = new WebSocket(websocketUrl);

    websocket.addEventListener("open", () => {
        console.log("websocket open");
        websocket.send("heyyy");
    });

    websocket.addEventListener("close", () => {
        console.log("websocket close");
    });

    websocket.addEventListener("error", () => {
        console.log("websocket error");
    });

    websocket.addEventListener("message", (message: MessageEvent) => {
        console.log("websocket message:", message);
    });

    return websocket;
}
