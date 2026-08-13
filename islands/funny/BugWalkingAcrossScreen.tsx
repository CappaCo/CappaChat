import { useEffect, useRef } from "preact/hooks";
import { settings } from "@/stores/settings.ts";

export default function BugWalkingAcrossScreen() {
    const bugImageRef = useRef<HTMLImageElement>(null);

    let running = false;
    let bugSpeed = 0.5;

    type Direction = "left" | "right";

    let direction: Direction = "left";

    const offScreenAmount = 50;

    function randomY(): number {
        return Math.random() * 100;
    }

    let startBugPosition = generateRandomPosition("right");
    let endBugPosition = generateRandomPosition("left");

    const bugPosition = {
        x: 0,
        y: 0,
    };

    function generateRandomPosition(d: "left" | "right") {
        return {
            x: (d === "right") ? -offScreenAmount : 100 + offScreenAmount,
            y: randomY(),
        };
    }

    function startRunning() {
        const bugImage = bugImageRef.current;
        if (bugImage === null) return;

        running = true;

        endBugPosition = generateRandomPosition(direction);

        bugSpeed = Math.random() * 5 + 0.1;

        const tranformStyle = "scale" +
            ((direction === "left") ? "(-1, 1)" : "(1, 1)");
        bugImage.style.transform = tranformStyle;

        direction = (direction === "right") ? "left" : "right";

        run();
    }

    function stopRunning() {
        running = false;
    }

    function run() {
        const bugImage = bugImageRef.current;
        if (bugImage === null) return;

        bugPosition.x += bugSpeed * ((direction === "right") ? 1 : -1);

        const completionPercent = (bugPosition.x - startBugPosition.x) /
            (endBugPosition.x - startBugPosition.x);

        bugPosition.y =
            completionPercent * (endBugPosition.y - startBugPosition.y) +
            startBugPosition.y;

        if ((bugPosition.x >= endBugPosition.x) === (direction === "right")) {
            stopRunning();
            startBugPosition = structuredClone(endBugPosition);
            setTimeout(startRunning, (Math.random() * 5 + 5) * 1000 * 60);
        }

        bugImage.style.left = bugPosition.x.toString() + "%";
        bugImage.style.top = bugPosition.y.toString() + "%";

        if (running) {
            requestAnimationFrame(run);
        }
    }

    function bugClick() {
        stopRunning();
        // TODO: make bug explode! 😮😮😮💥💥💥
        setTimeout(() => {
            alert("yeaowch!!!");
            globalThis.location.reload();
        }, 1000);
    }

    useEffect(() => {
        if (settings.value.funny.bugCrawlingAcrossScreen) {
            startRunning();
        }
    }, [settings.value.funny.bugCrawlingAcrossScreen]);

    return (
        <img
            ref={bugImageRef}
            src="/funny/bugwalking.gif"
            width={100}
            style="position: absolute; top: -100%; left: -100%; pointer-events: auto; z-index: 400;"
            alt="bug crawling"
            onClick={bugClick}
        />
    );
}
