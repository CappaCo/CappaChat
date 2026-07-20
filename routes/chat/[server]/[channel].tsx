import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

import Chat from "@/islands/Chat.tsx";
import ServerInfo from "@/islands/ServerInfo.tsx";
import UsersDisplay from "@/islands/UsersDisplay.tsx";
import { Channel, Server } from "@/lib/types.ts";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverID = params.server;
    const channelID = params.channel;

    const server: Server = {
        id: "0",
        name: "Termite Piddle Atrium",
        description: "",
        ownerID: "0",
        createdAt: (new Date()).toISOString(),
    };

    const channel: Channel = {
        id: "0",
        serverID: server.id,
        type: "text",
        position: 0,
        name: "general",
        createdAt: (new Date()).toISOString(),
    };

    return (
        <>
            <Head>
                <title>s:{serverID} c:{channelID}</title>
            </Head>
            <ServerInfo server={server} highlightPosition={channel.position} />
            <UsersDisplay />
            <Chat serverID={serverID} channelID={channelID} />
        </>
    );
});
