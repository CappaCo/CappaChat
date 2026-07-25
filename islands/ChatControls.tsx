import { useEffect, useRef } from "preact/hooks";
import { server } from "@/stores/server.ts";
import { channel } from "@/stores/channel.ts";

export default function ChatControls() {
    const inputRef = useRef<HTMLInputElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    // TODO: debounce this function
    async function sendMessage() {
        if (inputRef.current === null) return;

        const content = inputRef.current.value.trim();

        if (content === "") {
            alert("no content");
            return;
        }

        console.log("sending message for real!!!");

        // TODO: maybe queue this up until it loads?
        if (server.value === undefined || channel.value === undefined) return;

        inputRef.current.value = "";
        const response = await fetch(
            `/api/servers/${server.value.id}/channels/${channel.value.id}/messages`,
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

    useEffect(() => {
        if (inputRef.current === null) return;

        console.log("adding event listener");

        function handleKeyPressEvent(event: KeyboardEvent) {
            if (event.key === "Enter") {
                sendMessage();
            }
        }

        inputRef.current.addEventListener("keydown", handleKeyPressEvent);

        return () => {
            if (inputRef.current === null) return;

            console.log("removing event listener");

            inputRef.current.removeEventListener(
                "keydown",
                handleKeyPressEvent,
            );
        };
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
                type="button"
                id="sendButton"
            >
                Send
            </button>
        </section>
    );
}
