export const settingsSchema = {
    funny: {
        title: "Funny",
        settings: {
            bugCrawlingAcrossScreen: {
                title: "Bug mode",
                description: "Makes a bug walk across your screen",
                type: "boolean",
                default: false,
            },
            epicMode: {
                title: "Epic mode",
                description: "Activate epic mode for a 100% EPIC experience",
                type: "boolean",
                default: true,
            },
            freddyMode: {
                title: "Freddy mode",
                description: "freddy fazbear: hur hur hur hur",
                type: "boolean",
                default: false,
            },
            khezu: {
                title: "Khezu",
                description:
                    "BRINGS KHEZU TO THE BIG SCREEN (CONTENT WARNING!!!)",
                type: "boolean",
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
