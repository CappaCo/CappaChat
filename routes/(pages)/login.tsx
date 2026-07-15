import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

export default define.page(function Login() {
    return (
        <>
            <Head>
                <title>Login page</title>
            </Head>
            <h1>Login page</h1>
        </>
    );
});
