import { asset, Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";
// @ts-types="preact"
import { ComponentChildren } from "preact";
import { useId } from "preact/hooks";

export default define.page(function Home(ctx) {
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
                <h1>Settings</h1>
                <aside id="settings-select">
                    <ul>
                        <SettingsCategory category="General" />
                        <SettingsCategory category="Account" />
                        <SettingsCategory category="Freddy" />
                        <SettingsCategory category="Freddy" />
                        <SettingsCategory category="Freddy" />
                    </ul>
                </aside>
                <div id="settings-header">
                    <h2>{ctx.params.category} settings</h2>
                </div>
                <main>
                    <SettingsSection title="Change my settings">
                        <SettingOption
                            name="Freddy mode"
                            description="You don't want to know what freddy mode does"
                        />
                        <SettingOption
                            name="Epic mode"
                            description="Totally 100% epic - fact nation approved"
                        />
                        <SettingOption
                            name="Bug mode"
                            description="A bug will walk across your screen"
                        />
                        <SettingOption
                            name="Khezu"
                            description="Longer description of the setting goes here"
                        />
                    </SettingsSection>
                </main>
            </div>
        </>
    );
});

// TODO: move these to an island

interface SettingsSelectionProps {
    title: string;
    children: ComponentChildren;
}

function SettingsSection(
    { title, children }: SettingsSelectionProps,
) {
    return (
        <section class="setting-section">
            <h3>{title}</h3>
            <ul>{children}</ul>
        </section>
    );
}

interface SettingsCategoryProps {
    category: string;
}

function SettingsCategory({ category }: SettingsCategoryProps) {
    return (
        <li class="setting-select">
            <a href={`/settings/${category.toLowerCase()}`}>
                {category}
            </a>
        </li>
    );
}

function SettingOption(
    { name, description }: { name: string; description: string },
) {
    return (
        <li class="setting-option">
            <div>
                <span class="setting-name">{name}</span>
                <small class="setting-description">{description}</small>
            </div>
            <SamSwitch name={name} />
        </li>
    );
}

function SamSwitch({ name }: { name: string }) {
    const id = useId();
    return (
        <div class="sam-switch">
            <input id={id} name={name} type="checkbox" />
            <label for={id}>
                <div class="sam-switch-slider"></div>
            </label>
        </div>
    );
}
