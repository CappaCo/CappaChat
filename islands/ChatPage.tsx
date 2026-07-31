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
import { fetchRecentMessages, messages } from "@/stores/messages.ts";

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
                <PageTitle />
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

function PageTitle() {
    return (
        <title>
            {channel.value?.name} | {server.value?.name} | CappaChat
        </title>
    );
}

async function initializeChatPage(serverId: Id, channelId: Id) {
    console.log("initializing chat page");

    // TODO: remove padding when serverId and channelId are actually normal generated ids
    currentServerId.value = serverId.padEnd(26, " ");
    currentChannelId.value = channelId.padEnd(26, " ");

    await Promise.all([
        fetchServers(),
        fetchChannels(serverId),
        fetchMembers(serverId),
        fetchRecentMessages(serverId, channelId),
        fetchUser(),
    ]);

    const websocket = connectWebSocket();

    return [websocket.close];
}

async function initializeDmPage() {
    console.log("initializing dm page");

    await Promise.all([
        fetchServers(),
        fetchUser(),
    ]);
}

function connectWebSocket() {
    console.log("connecting to websocket...");

    function getWebsocketUrl() {
        const location = globalThis.location;

        if (location.hostname === "localhost" && location.port === "5173") {
            throw "websocket not available on deno task dev";
        }

        let url = "ws";
        if (location.protocol === "https:") url += "s";
        url += "://";
        url += location.hostname;
        if (location.port !== "") {
            url += ":";
            url += location.port;
        }
        url += "/api/websocket";
        return url;
    }

    const websocketUrl = getWebsocketUrl();

    console.log("wsurl:", websocketUrl);
    const websocket = new WebSocket(websocketUrl);

    websocket.addEventListener("open", () => {
        console.log("websocket open");
        websocket.send(JSON.stringify({ message: "ping" }));
        websocket.send(
            JSON.stringify({
                type: "sub",
                to: { type: "channel", id: currentChannelId.value },
            }),
        );
    });

    websocket.addEventListener("close", () => {
        console.log("websocket close");
    });

    websocket.addEventListener("error", () => {
        console.log("websocket error");
    });

    websocket.addEventListener("message", (message: MessageEvent) => {
        let json;
        try {
            json = JSON.parse(message.data);
        } catch (error) {
            console.log("error parsing json:", error);
            return;
        }

        console.log("websocket message json:", json);

        if (json.type === "pub") {
            switch (json.to.type) {
                case "channel": {
                    if (!messages.value) return;
                    messages.value = [...messages.value, JSON.parse(json.data)];
                    break;
                }
            }
        }
    });

    return websocket;
}
