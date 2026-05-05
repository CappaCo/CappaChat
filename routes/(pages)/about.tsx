import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>About page</title>
            </Head>
            <h1>About page</h1>
        </>
    );
});
