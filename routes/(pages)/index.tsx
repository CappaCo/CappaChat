import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>Home page</title>
            </Head>
            <div id="hero">
                <h1>Welcome to Cappachat</h1>
                <h2>Hello</h2>
            </div>
            <main id="index-page">
                <h1>Main page</h1>
                <h2>(Ancient Fuelweaver approved)</h2>
                <img src="fuelweaver.jfif"/>
                <p><a class="button try-now" href="/sign-up">Try now!</a></p>
            </main>
            <div id="login-modal" class="modal">

            </div>
            <div id="signup-modal" class="modal">

            </div>
        </>
    );
});
