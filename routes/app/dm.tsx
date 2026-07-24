import { define } from "@/lib/utils.ts";
import ChatPage from "@/islands/ChatPage.tsx";

export default define.page(function () {
    const conversationId = "0"; // TODO: get meeeee
    return <ChatPage location={{ kind: "dm", conversationId }} />;
});
