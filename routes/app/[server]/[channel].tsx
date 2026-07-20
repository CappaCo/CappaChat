import { define } from "@/lib/utils.ts";
import ChatPage from "@/islands/ChatPage.tsx";

export default define.page(function (ctx) {
    const { params } = ctx;

    const serverID = params.server;
    const channelID = params.channel;

    console.log("rendering ChatPage with:", serverID, channelID);

    return <ChatPage serverID={serverID} channelID={channelID} />;
});
