import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

import Chat from "@/islands/Chat.tsx";
import ServerInfo from "@/islands/ServerInfo.tsx";
import UsersDisplay from "@/islands/UsersDisplay.tsx";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverID = Number(params.server);
    const channelID = Number(params.channel);

    return (
        <>
            <Head>
                <title>s:{serverID} c:{channelID}</title>
            </Head>
            <ServerInfo serverID={serverID} channelID={channelID} />
            <UsersDisplay />
            <Chat />
        </>
    );
});
