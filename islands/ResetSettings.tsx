import { resetSettings } from "@/stores/settings.ts";

export function ResetSettings() {
    return (
        <button type="button" onClick={resetSettings}>
            Reset settings
        </button>
    );
}
