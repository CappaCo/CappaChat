import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

import Chat from "@/islands/Chat.tsx";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverID = params.server;
    const channelID = params.channel;

    return (
        <>
            <Head>
                <title>s:{serverID} c:{channelID}</title>
            </Head>

            <Chat />
        </>
    );
});
