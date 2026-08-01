import { defaultSettings } from "@/lib/settings/defaults.ts";
import {
    type Settings,
    settingsSchema,
    SettingValue,
} from "@/lib/settings/schema.ts";
import { signal } from "@preact/signals";

const settingsLocalStorageKey = "cappachat-settings";

export const settings = signal<Settings>(loadSettings());
export const settingsSaved = signal<boolean>(true);

export function changeSetting(
    categoryName: string,
    settingName: string,
    value: SettingValue,
) {
    settings.value = {
        ...settings.value,
        [categoryName]: {
            ...settings.value[categoryName],
            [settingName]: value,
        },
    };
    settingsSaved.value = false;
}

export function saveSettings(): void {
    console.log("saving settings");
    localStorage.setItem(
        settingsLocalStorageKey,
        JSON.stringify(settings.value),
    );
    settingsSaved.value = true;
}

export function loadSettings(): Settings {
    const stored = localStorage.getItem(settingsLocalStorageKey);

    if (stored === null) {
        return structuredClone(defaultSettings);
    }

    try {
        const parsed = JSON.parse(stored);

        return mergeSettings(
            defaultSettings,
            parsed,
        );
    } catch {
        console.warn("Failed to load settings, using defaults.");

        return structuredClone(defaultSettings);
    }
}

function mergeSettings(
    defaults: Settings,
    loaded: unknown,
): Settings {
    if (
        loaded === null ||
        typeof loaded !== "object"
    ) {
        return structuredClone(defaults);
    }

    const result = structuredClone(defaults);

    for (const [categoryName, { settings }] of Object.entries(settingsSchema)) {
        const loadedCategory =
            (loaded as Record<string, unknown>)[categoryName];

        if (
            typeof loadedCategory !== "object" ||
            loadedCategory === null
        ) {
            continue;
        }

        for (const [settingName, definition] of Object.entries(settings)) {
            const value =
                (loadedCategory as Record<string, SettingValue>)[settingName];

            if (isValidValue(definition.type, value)) {
                result[categoryName][settingName] = value;
            }
        }
    }

    return result;
}

function isValidValue(
    type: "boolean" | "number" | "string",
    value: unknown,
): boolean {
    switch (type) {
        case "boolean":
            return typeof value === "boolean";
        case "number":
            return typeof value === "number";
        case "string":
            return typeof value === "string";
    }
}
