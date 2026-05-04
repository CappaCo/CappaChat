import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {

    return (
        <>
            <Head>
                <title>Home page</title>
            </Head>
            <h1>Main page</h1>
        </>
    );
});
