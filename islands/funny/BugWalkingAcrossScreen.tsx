import { useEffect, useRef } from "preact/hooks";

export default function BugWalkingAcrossScreen() {
    const bugImageRef = useRef<HTMLImageElement>(null);

    let running = false;

    type Direction = "left" | "right";

    let direction: Direction = "left";

    const offScreenAmount = 50;

    let startBugPosition = {
        x: -10,
        y: 50,
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
        direction = (direction === "right") ? "left" : "right";
        const tranformStyle = "scale" +
            ((direction === "right") ? "(-1, 1)" : "(1, 1)");
        console.log("adding style:", tranformStyle);
        bugImage.style.transform = tranformStyle;
        run();
    }

    function stopRunning() {
        running = false;
    }

    function run() {
        const bugImage = bugImageRef.current;
        if (bugImage === null) return;

        bugPosition.x += (direction === "right") ? 1 : -1;

        const completionPercent = (bugPosition.x - startBugPosition.x) /
            (endBugPosition.x - startBugPosition.x);

        bugPosition.y =
            completionPercent * (endBugPosition.y - startBugPosition.y) +
            startBugPosition.y;

        if ((bugPosition.x >= endBugPosition.x) === (direction === "right")) {
            stopRunning();
            startBugPosition = { ...endBugPosition };
            setTimeout(startRunning, (Math.random() * 9 + 1) * 1000);
        }

        bugImage.style.left = bugPosition.x.toString() + "%";
        bugImage.style.top = bugPosition.y.toString() + "%";

        if (running) {
            requestAnimationFrame(run);
        }
    }

    useEffect(startRunning);

    return (
        <div style="display: block; overflow: hidden; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -4;">
            <img
                ref={bugImageRef}
                src="/funny/bugwalking.gif"
                onClick={stopRunning}
                style="position: absolute; z-index: 1000000;"
            />
        </div>
    );
}
