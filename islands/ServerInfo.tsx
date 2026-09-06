import ChannelDisplay from "@/islands/ChannelDisplay.tsx";
import { useEffect, useRef } from "preact/hooks";
import { currentServerId, server } from "@/stores/server.ts";
import { channels } from "@/stores/channels.ts";
import Modal from "@/islands/Modal.tsx";
import EpicFormItem from "@/islands/EpicFormItem.tsx";

export function ServerInfo() {
    const serverInfoRef = useRef<HTMLElement>(null);
    const serverInfoResizerRef = useRef<HTMLDivElement>(null);

    useEffect(function setUpResizer() {
        const serverInfo = serverInfoRef.current;
        if (serverInfo === null) return;
        const serverInfoResizer = serverInfoResizerRef.current;
        if (serverInfoResizer === null) return;

        const resizeOffset = 2; // half of border width
        if (serverInfo === null || serverInfo === undefined) return;

        const serverInfoStyle = globalThis.getComputedStyle(serverInfo);
        function getStyleValue(key: string): number {
            if (serverInfo === null) {
                throw "um, yeah I don't know what to write here";
            }
            return Number(
                serverInfoStyle.getPropertyValue(key).replace("px", ""),
            );
        }

        const minWidth = getStyleValue("min-width");
        const maxWidth = getStyleValue("max-width");

        // Make sure nothing explodes by checking min-width and max-width
        function clampWidth(width: number): number {
            return Math.max(
                Math.min(
                    width,
                    maxWidth,
                ),
                minWidth,
            );
        }

        const serverInfoResizerWidthStorageKey =
            "cappachat-server-info-resizer-size";

        function resize(event: MouseEvent) {
            const containerRect = serverInfo!.getBoundingClientRect();

            setWidth(clampWidth(
                event.clientX - containerRect.left + resizeOffset,
            ));
        }

        let currentWidth: number = 400;

        function setWidth(width: number) {
            currentWidth = width;
            document.documentElement.style.setProperty(
                "--server-info-width",
                `${width}px`,
            );
        }

        function startResize(event: MouseEvent) {
            event.preventDefault();

            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", stopResize);
        }

        function stopResize() {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);

            localStorage.setItem(
                serverInfoResizerWidthStorageKey,
                currentWidth.toString(),
            );
        }

        serverInfoResizer.addEventListener("mousedown", startResize);

        return () => {
            serverInfoResizer.removeEventListener("mousedown", startResize);
        };
    }, []);

    return (
        <aside id="server-info" ref={serverInfoRef}>
            <div id="server-info-resizer" ref={serverInfoResizerRef} />
            <div id="server-name-container">
                <h2 id="server-name">
                    {server.value ? server.value.name : "Loading..."}
                </h2>
            </div>
            <ul id="channels-group" class="link-list">
                {(() => {
                    if (channels.value === undefined) {
                        return ["Loading channels skeleton..."];
                    }
                    if (channels.value.size === 0) {
                        return [<em key="no-channels">"No channels"</em>];
                    }
                    return channels.value.values().toArray().sort((a, b) =>
                        a.position - b.position
                    ).map((
                        channel,
                    ) => (
                        <ChannelDisplay
                            key={channel.id}
                            channel={channel}
                        />
                    ));
                })()}
                <NewChannel />
            </ul>
        </aside>
    );
}

function NewChannel() {
    return (
        <>
            <button
                type="button"
                id="new-channel-button"
                aria-label="New channel"
                command="show-modal"
                commandfor="new-channel-modal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 -960 960 960"
                    fill="#ffffff"
                >
                    <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                <span>New channel</span>
            </button>

            <Modal title="Make a new channel" id="new-channel-modal">
                <form
                    action={`/api/servers/${currentServerId.value}/channels`}
                    method="POST"
                >
                    <EpicFormItem>
                        <label for="channel-name">Channel name</label>
                        <input
                            id="channel-name"
                            name="channel-name"
                            autofocus
                        />
                    </EpicFormItem>

                    <input
                        style="display: none;"
                        name="channel-position"
                        value={(() => {
                            if (channels.value === undefined) return 100;

                            const newPosition =
                                channels.value.values().toArray().reduce((
                                    prev,
                                    curr,
                                ) => curr.position > prev.position
                                    ? curr
                                    : prev
                                )
                                    .position + 1;

                            return newPosition;
                        })()}
                    />

                    <button type="submit">Create</button>
                </form>
            </Modal>
        </>
    );
}
