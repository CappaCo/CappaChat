import { define } from "@/lib/utils.ts";
import ChatPage from "@/islands/ChatPage.tsx";

export default define.page(function (ctx) {
    const conversationId = ctx.params.conversationId;
    return <ChatPage location={{ kind: "dm", conversationId }} />;
});
