import { define } from "@/lib/utils.ts";
import ChatPage from "@/islands/ChatPage.tsx";

export default define.page(function (ctx) {
    const { serverId, channelId } = ctx.params;

    console.log("rendering ChatPage with:", serverId, channelId);

    return <ChatPage location={{ kind: "server", serverId, channelId }} />;
});
