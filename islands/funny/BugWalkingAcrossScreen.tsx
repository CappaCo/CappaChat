import { useEffect, useRef } from "preact/hooks";

export default function BugWalkingAcrossScreen() {
    const bugImageRef = useRef<HTMLImageElement>(null);

    let running = false;
    let bugSpeed = 0.5;

    type Direction = "left" | "right";

    let direction: Direction = "left";

    const offScreenAmount = 50;

    let startBugPosition = {
        x: offScreenAmount,
        y: 0,
    };

    const endBugPosition = {
        x: 110,
        y: 50,
    };

    const bugPosition = {
        x: 0,
        y: 0,
    };

    function startRunning() {
        const bugImage = bugImageRef.current;
        if (bugImage === null) return;

        running = true;

        endBugPosition.x = (direction === "right")
            ? -offScreenAmount
            : 100 + offScreenAmount;
        endBugPosition.y = Math.random() * 100;

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
            startBugPosition = { ...endBugPosition };
            setTimeout(startRunning, (Math.random() * 5 + 5) * 1000 * 60);
        }

        bugImage.style.left = bugPosition.x.toString() + "%";
        bugImage.style.top = bugPosition.y.toString() + "%";

        if (running) {
            requestAnimationFrame(run);
        }
    }

    useEffect(startRunning);

    return (
        <div style="display: block; overflow: hidden; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 44; pointer-events: none;">
            <img
                ref={bugImageRef}
                src="/funny/bugwalking.gif"
                width={100}
                style="position: absolute; top: -100%; left: -100%;"
            />
        </div>
    );
}
