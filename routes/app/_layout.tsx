import { asset, Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

export default define.layout(function ({ Component }) {
    return (
        <>
            <Head>
                <link
                    id="stylesheet-chat"
                    rel="stylesheet"
                    href={asset("/styles/chat.css")}
                />
            </Head>
            <Component />
        </>
    );
});
