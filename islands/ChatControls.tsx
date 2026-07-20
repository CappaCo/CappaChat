import { Channel, Server } from "@/lib/types.ts";
import { useRef } from "preact/hooks";

export default function ChatControls({
    server,
    channel,
}: {
    server?: Server;
    channel?: Channel;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    // TODO: debounce this function
    async function sendMessage() {
        if (inputRef.current === null) return;
        const content = inputRef.current.value.trim();
        if (content === "") return alert("Please enter a message");

        // TODO: maybe queue this up until it loads?
        if (server === undefined || channel === undefined) return;

        inputRef.current.value = "";
        const response = await fetch(
            `/api/servers/${server.id}/channels/${channel.id}/messages`,
            {
                method: "POST",
                body: JSON.stringify({
                    content,
                }),
            },
        );

        if (!response.ok) {
            inputRef.current.value = content;
            throw await response.text();
        }

        const json = await response.json();
        console.log("sending message response:", json);
    }

    inputRef.current?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    return (
        <section id="chat-controls">
            <input
                ref={inputRef}
                id="inputField"
                type="text"
                placeholder="type yo stuff here"
            />
            {/* TODO: make this hidden until user focuses it for accessability*/}
            <button
                ref={submitButtonRef}
                onClick={sendMessage}
                type="submit"
                id="sendButton"
            >
                Send
            </button>
        </section>
    );
}
