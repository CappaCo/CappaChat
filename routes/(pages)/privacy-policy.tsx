import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";
import BugWalkingAcrossScreen from "@/islands/funny/BugWalkingAcrossScreen.tsx";

export default define.page(function PrivacyPolicy() {
    return (
        <>
            <Head>
                <title>Privacy Policy page</title>
                <script>
                </script>
            </Head>
            <main>
                <h1>Privacy Policy page</h1>
                <BugWalkingAcrossScreen />
            </main>
        </>
    );
});
