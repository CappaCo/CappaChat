export const settingsSchema = {
    funny: {
        title: "Funny",
        settings: {
            bugCrawlingAcrossScreen: {
                title: "Bug mode",
                type: "boolean",
                description: "Makes a bug walk across your screen",
                default: false,
            },
            epicMode: {
                title: "Epic mode",
                type: "boolean",
                description: "Activate epic mode for a 100% EPIC experience",
                default: true,
            },
            freddyMode: {
                title: "Freddy mode",
                type: "boolean",
                description: "freddy fazbear: hur hur hur hur",
                default: false,
            },
            khezu: {
                title: "Khezu",
                type: "boolean",
                description: "What does this one do again?",
                default: false,
            },
        },
    },
} as SettingsSchema satisfies SettingsSchema;

type SettingsSchema = Record<
    string,
    SettingsCategory
>;

export type SettingsCategory = {
    title: string;
    // deno-lint-ignore no-explicit-any
    settings: Record<string, Record<string, any>>;
};

export type SettingValue = boolean | number | string;

export type Settings = Record<string, Record<string, SettingValue>>;
