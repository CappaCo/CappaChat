import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>Settings page</title>
            </Head>
            <main>
                <div class="settings-top">
                    <h1>Settings page</h1>
                </div>
                <section>
                    <p>hello, change my settings</p>
                </section>
            </main>
        </>
    );
});
