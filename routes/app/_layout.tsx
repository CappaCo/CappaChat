import { asset, Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

import LeftBar from "@/islands/LeftBar.tsx";

export default define.layout(function ({ Component }) {
    return (
        <>
            <Head>
                <link
                    id="stylesheet-chat"
                    rel="stylesheet"
                    href={asset("/styles/chat.css")}
                />
                <script defer src="/scripts/chat.js"></script>
            </Head>
            <div id="app-grid">
                <LeftBar />
                <Component />
            </div>
        </>
    );
});
