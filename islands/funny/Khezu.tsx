import { useEffect, useRef } from "preact/hooks";
import { settings } from "@/stores/settings.ts";

let khezuTimeout: NodeJS.Timeout | undefined;

export function KhezuAppearing() {
    const khezuRef = useRef<HTMLImageElement>(null);
    let sound: HTMLAudioElement | undefined;

    const chance = settings.value.funny.khezuChance as number;
    const perTime = 1 * 1_000; // per second of khezu appearing
    const showTime = 1 * 1_000; // for 1 second

    if (khezuTimeout) clearTimeout(khezuTimeout);

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

        if (settings.value.funny.khezu) {
            khezuTimeout = setTimeout(randomKhezu, perTime);
        }
    }

    useEffect(randomKhezu, [
        settings.value.funny.khezu,
        settings.value.funny.khezuChance,
    ]);

    useEffect(() => {
        sound = new Audio("/funny/beefyscream.ogg");
        console.log("khezu roar loaded");
    }, []);

    return (
        <img
            ref={khezuRef}
            id="khezu"
            src="/funny/khezu.webp"
            style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        />
    );
}
