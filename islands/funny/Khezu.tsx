import { useEffect, useRef } from "preact/hooks";
import { settings } from "@/stores/settings.ts";

export function KhezuAppearing() {
    const khezuRef = useRef<HTMLImageElement>(null);

    function showKhezu() {
        const khezu = khezuRef.current;
        if (khezu === null) return;
        const chance = 1 / 10;
        Math.random() * 100;
    }

    function killKhezu() {
        const khezu = khezuRef.current;
        if (khezu === null) return;
    }

    function randomKhezu() {
    }

    return <img src="/static/funny/khezu.webp" />;
}
