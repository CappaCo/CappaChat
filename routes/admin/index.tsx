import { Head } from "fresh/runtime";
import { define } from "@/lib/utils.ts";
import CopyCode from "@/islands/CopyCode.tsx";
import HashTest from "@/islands/admin/HashTest.tsx";
import ManageAuths from "@/islands/admin/ManageAuths.tsx";
import ManageSessions from "@/islands/admin/ManageSessions.tsx";

export default define.page(() => {
    const dataBaseTest = `
let query = "SELECT CURRENT_TIME;";
await fetch(\`http://localhost:5173/api/admin/db?query=\${query}\`, { method: "GET", })
    .then((x) => x.json())
    .then((result) => result.rows);    
`.trim();

    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
            <main>
                <h1>Admin page</h1>
                <section>
                    <p>hello, administrate my system - Adminweaver</p>
                    <p>use this code in the console to do fetch requests:</p>
                    <CopyCode
                        text={`await fetch("http://localhost:5173/api/admin/test", { method: "GET", }).then((x) => x.text());`}
                    />
                    <p>send a query to the database:</p>
                    <CopyCode text={dataBaseTest} />
                </section>
                <HashTest />
                <ManageAuths />
                <ManageSessions />
            </main>
        </>
    );
});
