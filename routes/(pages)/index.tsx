import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>Home page</title>

                <script defer src="/scripts/main.js" />
            </Head>

            <div id="hero">
                <h1>Welcome to Cappachat</h1>
                <h2>The customisable, user first chat app</h2>
            </div>

            <main id="index-page">
                <h1>Main page</h1>
                <h2>(Ancient Fuelweaver approved)</h2>
                <img src="fuelweaver.jfif" />
            </main>
            
            <section>
                <p>hello</p>
            </section>
        </>
    );
});
