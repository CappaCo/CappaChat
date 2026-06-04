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
                <h2>Hello</h2>
            </div>

            <main id="index-page">
                <h1>Main page</h1>
                <h2>(Ancient Fuelweaver approved)</h2>
                <img src="fuelweaver.jfif" />
                <div id="login-modal" class="modal">
                    <span class="close">&times;</span>
                    <p>Log In</p>
                    <p>Username/Email</p>
                    <input id="username" placeholder="Type here" />
                    <p>Password</p>
                    <input id="password" placeholder="Type here" />
                    <p>Forgot Password???</p>
                    <button type="submit">Log in</button>
                </div>
                <p>
                    <a class="button secondary" href="/sign-up">Try now!</a>
                </p>
            </main>
        </>
    );
});
