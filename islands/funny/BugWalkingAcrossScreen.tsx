import { useEffect, useRef } from "preact/hooks";
import { changeSetting, saveSettings, settings } from "@/stores/settings.ts";

export default function BugWalkingAcrossScreen() {
    const bugImageRef = useRef<HTMLImageElement>(null);
    const explodeRef = useRef<HTMLImageElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const thingSize = 75;

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

        const bugSlowMode = false;
        bugSpeed = bugSlowMode ? 0.1 : Math.random() * 5 + 0.1;

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

        setPosition(bugPosition);

        if (running) {
            requestAnimationFrame(run);
        }
    }

    function setPosition({ x, y }: { x: number; y: number }) {
        const bugImage = bugImageRef.current;
        if (bugImage === null) return;
        bugImage.style.left = x.toString() + "%";
        bugImage.style.top = y.toString() + "%";
        const explodeImage = explodeRef.current;
        if (explodeImage === null) return;
        explodeImage.style.left = (x - thingSize / 2).toString() + "%";
        explodeImage.style.top = (y - thingSize / 2).toString() + "%";
    }

    function bugClick() {
        stopRunning();
        if (explodeRef.current === null) return;
        explodeRef.current.style.display = "block";
        console.log("exploding sound:", audioRef.current);
        if (audioRef.current) {
            console.log("playing sound");
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }

        setTimeout(() => {
            if (explodeRef.current === null) return;
            explodeRef.current.style.display = "none";
            setPosition({ x: -100, y: -100 });
            changeSetting("funny", "bugCrawlingAcrossScreen", false);
            saveSettings();
        }, 1500);
    }

    useEffect(() => {
        if (settings.value.funny.bugCrawlingAcrossScreen) {
            startRunning();
        }
    }, [settings.value.funny.bugCrawlingAcrossScreen]);

    return (
        <>
            <audio ref={audioRef} src="/funny/bombexplode.mp3" />
            <img
                ref={explodeRef}
                src="/funny/realbombtoexploderealbugsandalsomichael.gif"
                style={`position: absolute; top: 0; left: 0; width: ${thingSize}%; height: ${thingSize}%; display: none; z-index: 401;`}
            />
            <img
                ref={bugImageRef}
                src="/funny/bugwalking.gif"
                width={100}
                style="position: absolute; top: -100%; left: -100%; pointer-events: auto; z-index: 400;"
                alt="bug crawling"
                onClick={bugClick}
            />
        </>
    );
}
