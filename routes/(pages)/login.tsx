import { Head } from "fresh/runtime";

import { define } from "@/utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>Login page</title>
            </Head>
            <h1>Login page</h1>
        </>
    );
});
