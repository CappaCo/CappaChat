import { Head } from "fresh/runtime";

import { define } from "@/lib/utils.ts";

export default define.page(() => {
    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
            <main>
                <h1>Admin page</h1>
                <section>
                    <p>hello, administrate my system - Adminweaver</p>
                </section>
            </main>
        </>
    );
});
