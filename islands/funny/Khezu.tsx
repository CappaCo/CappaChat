import { useEffect, useRef } from "preact/hooks";
import { settings } from "@/stores/settings.ts";

let khezuTimeout: NodeJS.Timeout | undefined;

export function KhezuAppearing() {
    const khezuRef = useRef<HTMLImageElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const chance = settings.value.funny.khezuChance as number;
    const perTime = 1 * 1_000; // per second of khezu appearing
    const showTime = 1 * 1_000; // for 1 second

    if (khezuTimeout) clearTimeout(khezuTimeout);

    function randomKhezu() {
        const number = Math.random();

        if (number <= chance) {
            if (khezuRef.current === null) return;
            khezuRef.current.style.display = "block";

            if (audioRef.current) {
                audioRef.current.play();
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

    return (<>
            <audio ref={audioRef} src="/funny/beefyscream.ogg" />
        <img
            ref={khezuRef}
            id="khezu"
            src="/funny/khezu.webp"
            style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        /></>
    );
}
