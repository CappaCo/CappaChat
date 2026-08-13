import { settingsSchema } from "@/lib/settings/schema.ts";
import { SamSwitch } from "@/components/SamSwitch.tsx";
import { changeSetting, saveSettings, settings } from "@/stores/settings.ts";
import { IS_BROWSER } from "fresh/runtime";

export function SettingOption(
    { categoryName, settingName }: {
        categoryName: string;
        settingName: string;
    },
) {
    const setting = settingsSchema[categoryName].settings[settingName];

    const id = `sam-switch-option-${categoryName}-${settingName}`;

    return (
        <li class="setting-option">
            <div>
                <span class="setting-name">{setting.title}</span>
                <small class="setting-description">{setting.description}</small>
            </div>
            {(() => {
                switch (setting.type) {
                    case "boolean":
                        return (
                            <SamSwitch
                                id={id}
                                checked={settings
                                    .value[categoryName][
                                        settingName
                                    ] as boolean}
                                disabled={!IS_BROWSER}
                                onChange={(checked) => {
                                    if (
                                        categoryName === "funny" &&
                                        settingName === "epicMode"
                                    ) {
                                        if (checked === true) return;
                                        setTimeout(() => {
                                            document.getElementById(id)
                                                ?.click();
                                        }, 100);
                                        return;
                                    }

                                    changeSetting(
                                        categoryName,
                                        settingName,
                                        checked,
                                    );
                                    saveSettings();
                                }}
                            />
                        );
                    
                    case "number":
                        console.log("rendering number input");
                        return (
                            <input
                                type="number"
                                id={id}
                                placeholder={settingsSchema[categoryName]
                                    .settings[settingName].default}
                                value={settings
                                    .value[categoryName][settingName] as number}
                                onInput={(event) => {
                                    console.log(
                                        "number changed with event:",
                                        event,
                                    );

                                    function shouldChange(
                                        value: string,
                                    ): boolean {
                                        console.log("checking value:", value);
                                        const num = Number(value);
                                        if (Number.isNaN(num)) return false;
                                        if (num > 1) return false;
                                        if (num === 0) return false;
                                        return true;
                                    }

                                    const value =
                                        (event.target as HTMLInputElement)
                                            .value;

                                    if (shouldChange(value)) {
                                        changeSetting(
                                            categoryName,
                                            settingName,
                                            value,
                                        );
                                        saveSettings();
                                    }
                                }}
                            />
                        );

                    default:
                        return (
                            <span>
                                Setting type: {setting.type} not implemented yet
                            </span>
                        );
                }
            })()}
        </li>
    );
}
