import ChannelDisplay from "@/islands/ChannelDisplay.tsx";
import { Channel, Server } from "@/lib/types.ts";
// @ts-types="preact"
import { RefObject } from "preact";
import { useEffect, useRef } from "preact/hooks";

export default function ServerInfo(
    {
        server,
        channels,
        currentChannel,
        appGridRef,
    }: {
        server?: Server;
        channels?: Channel[];
        currentChannel?: Channel;
        appGridRef: RefObject<HTMLDivElement>;
    },
) {
    const serverInfoRef = useRef<HTMLElement>(null);
    const serverInfoResizerRef = useRef<HTMLDivElement>(null);

    const appGrid = appGridRef.current;

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
            return Number(serverInfoStyle.getPropertyValue(key).replace("px", ""));
        }

        const minWidth = getStyleValue("min-width");
        const maxWidth = getStyleValue("max-width");

        // Track mouse down event on the resizer bar
        serverInfoResizer.addEventListener("mousedown", startResize);

        function resize(event: MouseEvent) {
            if (serverInfo === null) return;
            if (appGrid === null) return;
            // Get the horizontal bounding coordinates of the grid container
            const containerRect = serverInfo.getBoundingClientRect();

            // Calculate the new width of the left section in pixels
            const newWidth = event.clientX - containerRect.left + resizeOffset;

            // Make sure nothing explodes by checking min-width and max-width
            if (minWidth < newWidth && newWidth < maxWidth) {
                // TODO: save this in some settings thing
                appGrid.style.setProperty(
                    "--server-info-width",
                    `${newWidth}px`,
                );
            }
        }

        function startResize(event: MouseEvent) {
            event.preventDefault();

            document.addEventListener("mousemove", resize);
            document.addEventListener("mouseup", stopResize);
        }

        function stopResize() {
            document.removeEventListener("mousemove", resize);
            document.removeEventListener("mouseup", stopResize);
        }
    });

    return (
        <aside id="server-info" ref={serverInfoRef}>
            <div id="server-info-resizer" ref={serverInfoResizerRef} />
            <div id="server-name-container">
                <h2 id="server-name">{server ? server.name : "Loading..."}</h2>
            </div>
            <ul id="channels-group">
                {(() => {
                    if (channels === undefined) return "Loading...";
                    if (channels.length === 0) return "No channels";
                    return channels.map((channel) => {
                        return (
                            <ChannelDisplay
                                key={channel.id}
                                channel={channel}
                                highlighted={currentChannel === undefined ||
                                    channel.id === currentChannel.id}
                            />
                        );
                    });
                })()}
            </ul>
        </aside>
    );
}
