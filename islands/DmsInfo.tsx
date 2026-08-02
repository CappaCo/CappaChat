import { useEffect, useRef } from "preact/hooks";

export function DmsInfo() {
    const dmsInfoRef = useRef<HTMLElement>(null);
    const dmsInfoResizerRef = useRef<HTMLDivElement>(null);

    useEffect(function setUpResizer() {
        const dmsInfo = dmsInfoRef.current;
        if (dmsInfo === null) return;
        const dmsInfoResizer = dmsInfoResizerRef.current;
        if (dmsInfoResizer === null) return;

        const resizeOffset = 2; // half of border width
        if (dmsInfo === null || dmsInfo === undefined) return;

        const dmsInfoStyle = globalThis.getComputedStyle(dmsInfo);
        function getStyleValue(key: string): number {
            if (dmsInfo === null) {
                throw "um, yeah I don't know what to write here";
            }
            return Number(
                dmsInfoStyle.getPropertyValue(key).replace("px", ""),
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

        const dmsInfoResizerWidthStorageKey =
            "cappachat-server-info-resizer-size";
        // TODO: could be different system

        function resize(event: MouseEvent) {
            const containerRect = dmsInfo!.getBoundingClientRect();

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
                dmsInfoResizerWidthStorageKey,
                currentWidth.toString(),
            );
        }

        dmsInfoResizer.addEventListener("mousedown", startResize);

        return () => {
            dmsInfoResizer.removeEventListener("mousedown", startResize);
        };
    }, []);

    return (
        <aside id="server-info" ref={dmsInfoRef}>
            <div id="server-info-resizer" ref={dmsInfoResizerRef} />
            <div id="server-name-container">
                <a href="/">
                    <h2>
                        Go back to home
                    </h2>
                </a>
            </div>
            <ul id="channels-group">
                {
                    /*(() => {
                    if (channels === undefined) return "Loading...";
                    if (channels.value.size === 0) return "Loading dms...";
                    return Array.from(channels.value.values()).map((
                        channel,
                    ) => (
                        <ChannelDisplay
                            key={channel.id}
                            channel={channel}
                        />
                    ));
                })()*/
                }
                TODO: Implement dms
            </ul>
        </aside>
    );
}
