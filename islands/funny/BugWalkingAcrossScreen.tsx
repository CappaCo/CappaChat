import { useRef } from "preact/hooks";

export default function BugWalkingAcrossScreen() {
    const bugImageRef = useRef<HTMLImageElement>(null);

    let running = false;

    function startRunning() {
        running = true;
    }

    function stopRunning() {
        running = false;
    }
    
    function run() {
        const bugImage = bugImageRef.current;
        if (bugImage === null) return;
        
        console.log("running")

        if (running) {
            requestAnimationFrame(run);
        }
    }

    startRunning();

    return (
        <img
            ref={bugImageRef}
            src="/testImages/users/0.webp"
            onClick={stopRunning}
            style="position:absolute"
        />
    );
}
