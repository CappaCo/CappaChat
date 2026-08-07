import { useEffect, useRef } from "preact/hooks";
import { settings } from "@/stores/settings.ts";

export function KhezuAppearing() {
    const khezuRef = useRef<HTMLImageElement>(null);
    let sound: HTMLAudioElement | undefined;

    const chance = 1 / 10_000; // 1 in 10,000 chance
    const perTime = 1 * 1_000; // per second of khezu appearing
    const showTime = 1 * 1_000; // for 1 second

    function randomKhezu() {
        const number = Math.random();

        if (number <= chance) {
            if (khezuRef.current === null) return;
            khezuRef.current.style.display = "block";

            if (sound) {
                sound.play();
            }

            setTimeout(() => {
                if (khezuRef.current === null) return;
                khezuRef.current.style.display = "none";
            }, showTime);
        }

        if (settings.value.funny.khezu) setTimeout(randomKhezu, perTime);
    }

    useEffect(randomKhezu, [settings.value.funny.khezu]);

    useEffect(() => {
        sound = new Audio("/funny/beefyscream.ogg");
        console.log("khezu roar loaded");
    }, []);

    return (
        <div style="display: block; overflow: hidden; position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 43; pointer-events: none;">
            <img
                ref={khezuRef}
                id="khezu"
                src="/funny/khezu.webp"
                style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            />
        </div>
    );
}
