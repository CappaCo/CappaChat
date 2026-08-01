import { settingsSchema } from "@/lib/settings/schema.ts";

export const defaultSettings = Object.fromEntries(
    Object.entries(settingsSchema).map(([categoryName, category]) => [
        categoryName,
        Object.fromEntries(
            Object.entries(category.settings).map(([settingName, setting]) => [
                settingName,
                setting.default,
            ]),
        ),
    ]),
);
