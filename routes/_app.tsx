import { asset } from "fresh/runtime";

import { define } from "@/lib/utils.ts";
import BugWalkingAcrossScreen from "@/islands/funny/BugWalkingAcrossScreen.tsx";
import { KhezuAppearing } from "@/islands/funny/Khezu.tsx";

export default define.page(function ({ Component }) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />

                <link
                    id="stylesheet-main"
                    rel="stylesheet"
                    href={asset("/styles/main.css")}
                />

                {/* Google font (inter) */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />

                <title>CappaChat</title>
            </head>
            <body>
                <div style="overflow: hidden; width: 100%; height: 100%; position: fixed; overflow: hidden; pointer-events: none;">
                    <BugWalkingAcrossScreen />
                    <KhezuAppearing />
                </div>
                <Component />
            </body>
        </html>
    );
});
