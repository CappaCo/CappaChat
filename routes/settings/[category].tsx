import { asset, Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

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
                <aside id="settings-select">
                    <ul>
                        <SettingsCategory category="General" />
                        <SettingsCategory category="Account" />
                        <SettingsCategory category="Freddy" />
                        <SettingsCategory category="Freddy" />
                        <SettingsCategory category="Freddy" />
                    </ul>
                </aside>
                <main>
                    <h2>{ctx.params.category} settings</h2>
                    <ul id="settings-things">
                        <li>Freddy mode</li>
                        <li>Change my settings</li>
                    </ul>
                </main>
            </div>
        </>
    );
});

// TODO: move this to an island
interface SettingsCategoryProps {
    category: string;
}

function SettingsCategory({ category }: SettingsCategoryProps) {
    return (
        <li>
            <a href={`/settings/${category.toLowerCase()}`}>
                {category}
            </a>
        </li>
    );
}
