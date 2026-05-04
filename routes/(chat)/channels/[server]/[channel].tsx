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
            <h1>Title</h1>
        </>
    );
});
