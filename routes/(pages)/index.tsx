import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>Home page</title>
            </Head>
            <div id="hero">
                <h1>Hello</h1>
                <h2>Hi</h2>
            </div>
            <h1>Main page</h1>
        </>
    );
});
