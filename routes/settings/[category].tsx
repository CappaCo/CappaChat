import { asset, Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";
// @ts-types="preact"
import { ComponentChildren } from "preact";
import { SettingsBackButton } from "@/islands/SettingsBackButton.tsx";

import {
    type SettingsCategory,
    settingsSchema,
} from "@/lib/settings/schema.ts";
import { SettingOption } from "@/islands/SettingOption.tsx";

export default define.page(function Home(ctx) {
    const selectedCategory = ctx.params.category;
    const category = settingsSchema[selectedCategory] as
        | undefined
        | SettingsCategory;

    return (
        <>
            <Head>
                <title>Settings page</title>
                <link
                    rel="stylesheet"
                    href={asset("/styles/settings.css")}
                />
            </Head>
            <div id="settings-page">
                <h1>
                    <SettingsBackButton />
                    <span>Settings</span>
                </h1>
                <aside id="settings-select">
                    <ul class="link-list">
                        {Object.keys(settingsSchema).map((categoryKey) => {
                            return (
                                <SettingsCategory
                                    key={categoryKey}
                                    category={categoryKey}
                                />
                            );
                        })}
                    </ul>
                </aside>
                <div id="settings-header">
                    <h2>{category?.title || "Category not found"}</h2>
                </div>
                <main>
                    <SettingsSection>
                        {category?.settings
                            ? Object.keys(category.settings).map(
                                (settingKey) => {
                                    return (
                                        <SettingOption
                                            key={settingKey}
                                            categoryName={selectedCategory}
                                            settingName={settingKey}
                                        />
                                    );
                                },
                            )
                            : (
                                <a href="/settings/funny">
                                    Go back to funny settings
                                </a>
                            )}
                    </SettingsSection>
                </main>
            </div>
        </>
    );
});

interface SettingsSelectionProps {
    title?: string;
    children: ComponentChildren;
}

function SettingsSection(
    { title, children }: SettingsSelectionProps,
) {
    return (
        <section class="setting-section">
            {title ? <h3>{title}</h3> : null}
            <ul>{children}</ul>
        </section>
    );
}

interface SettingsCategoryProps {
    category: string;
}

function SettingsCategory({ category }: SettingsCategoryProps) {
    console.log("settings category:", category);
    return (
        <li class="setting-select">
            <a href={`/settings/${category.toLowerCase()}`}>
                {settingsSchema[category].title}
            </a>
        </li>
    );
}
