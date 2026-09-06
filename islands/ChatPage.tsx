import { Id } from "@/lib/types.ts";
import { Head } from "fresh/runtime";
import { useEffect } from "preact/hooks";
import MessagesDisplay from "@/islands/MessagesDisplay.tsx";
import ChatControls from "@/islands/ChatControls.tsx";
import { ServerInfo } from "@/islands/ServerInfo.tsx";
import MembersDisplay from "@/islands/MembersDisplay.tsx";
import LeftBar from "@/islands/LeftBar.tsx";

import { fetchServers } from "@/stores/servers.ts";
import { currentServerId, server } from "@/stores/server.ts";
import { fetchChannels } from "@/stores/channels.ts";
import { channel, currentChannelId } from "@/stores/channel.ts";
import { fetchMembers } from "@/stores/members.ts";
import { fetchUser } from "@/stores/user.ts";
import { fetchRecentMessages, messages } from "@/stores/messages.ts";
import { connection } from "@/stores/websocket.ts";
import { DmsInfo } from "@/islands/DmsInfo.tsx";

type ChatLocation =
    | {
        kind: "server";
        serverId: Id;
        channelId: Id;
    }
    | {
        kind: "dm";
        conversationId: Id;
    }
    | {
        kind: "none";
    };

type ChatPageProps = {
    location: ChatLocation;
};

export default function ChatPage(
    { location }: ChatPageProps,
) {
    useEffect(() => {
        try {
            connection.connect();
        } catch (error) {
            console.error("failed to connect to websocket:", error);
        }
    }, []);

    useEffect(() => {
        const fetchingStartTime = performance.now();
        fetchServers();
        fetchUser();

        (() => {
            switch (location.kind) {
                case "server":
                    return initializeChatPage(
                        location.serverId,
                        location.channelId,
                    );
                case "dm":
                    return initializeDmPage();
                case "none":
                    return new Promise(() => {});
            }
        })().then(function finishedLoading() {
            const now = performance.now();
            const timeTakenToFetch = now - fetchingStartTime;
            const timeTakenToFetchFormatted = (timeTakenToFetch / 1000).toFixed(
                2,
            );
            console.log(
                `really finished fetching in ${timeTakenToFetchFormatted}s`,
            );
        });

        return () => {
            console.log("tearing down loading");
            connection.disconnect();
        };
    }, [location]);

    console.log("chat page rendering now...");

    const defaultResizerSize = 400; // px
    const serverInfoResizerWidthStorageKey =
        "cappachat-server-info-resizer-size";

    return (
        <>
            <script
                // deno-lint-ignore react-no-danger
                dangerouslySetInnerHTML={{
                    __html: `
(() => {
    const width = (() => {
        const storageValue = localStorage.getItem("${serverInfoResizerWidthStorageKey}");
        if (storageValue === null || !Number.isFinite(Number(storageValue))) {
            localStorage.setItem("${serverInfoResizerWidthStorageKey}", "${defaultResizerSize}");
            return ${defaultResizerSize};
        }
        return Number(storageValue);
    })();
    document.documentElement.style.setProperty(
        "--server-info-width",
        width + "px"
    );
})();
`,
                }}
            />
            <div id="app-grid">
                <LeftBar />
                {(() => {
                    switch (location.kind) {
                        case "server":
                            return (
                                <>
                                    <PageTitle
                                        parts={[
                                            channel.value?.name,
                                            server.value?.name,
                                        ].map((x) => String(x || ""))}
                                    />

                                    <ServerInfo />
                                    <MembersDisplay />

                                    <div id="chat-container">
                                        <MessagesDisplay />
                                        <ChatControls />
                                    </div>
                                </>
                            );

                        case "dm":
                            return (
                                <>
                                    <PageTitle
                                        parts={[
                                            // TODO: dm name
                                            "dm page",
                                        ]}
                                    />

                                    <DmsInfo />
                                    <div id="chat-container">
                                        <MessagesDisplay />
                                        <ChatControls />
                                    </div>
                                </>
                            );

                        case "none":
                            return (
                                <>
                                    <PageTitle />
                                    <DmsInfo />
                                    <p>hi lol 🎉🎉🎉</p>
                                </>
                            );

                        default:
                            return <p>Location not found???</p>;
                    }
                })()}
            </div>
        </>
    );
}

// TODO: trim names if they're too long
function PageTitle({ parts = [] }: { parts?: string[] }) {
    parts.push("CappaChat");
    return (
        <Head>
            <title>
                {parts.join(" | ")}
            </title>
        </Head>
    );
}

async function initializeChatPage(serverId: Id, channelId: Id) {
    console.log("initializing chat page");

    // TODO: remove padding when serverId and channelId are actually normal generated ids
    currentServerId.value = serverId.padEnd(26, " ");
    currentChannelId.value = channelId.padEnd(26, " ");

    await Promise.all([
        fetchChannels(serverId),
        fetchMembers(serverId),
        fetchRecentMessages(serverId, channelId),
    ]).then(() => {
        console.log("all data fetched!");
    });

    connection.send({
        type: "sub",
        to: { type: "channel", id: currentChannelId.value },
    });

    connection.onPub("channel", (data) => {
        if (!messages.value) return;
        // TODO: insert message in order (what happens if latency)
        messages.value = [
            ...messages.value,
            data,
        ];
    });
}

async function initializeDmPage() {
    console.log("initializing dm page");

    await Promise.all([
        // TODO: fetch dms
    ]);
}
