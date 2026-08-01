import ChannelDisplay from "@/islands/ChannelDisplay.tsx";
import { useEffect, useRef } from "preact/hooks";
import { server } from "@/stores/server.ts";
import { channels } from "@/stores/channels.ts";

export default function ServerInfo() {
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
            <ul id="channels-group">
                {(() => {
                    if (channels === undefined) return "Loading...";
                    if (channels.value.size === 0) return "Loading channels...";
                    return Array.from(channels.value.values()).map((
                        channel,
                    ) => (
                        <ChannelDisplay
                            key={channel.id}
                            channel={channel}
                        />
                    ));
                })()}
            </ul>
        </aside>
    );
}
