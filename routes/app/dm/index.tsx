import { define } from "@/lib/utils.ts";
import ChatPage from "@/islands/ChatPage.tsx";

export default define.page(function () {
    return <ChatPage location={{ kind: "none" }} />;
});
