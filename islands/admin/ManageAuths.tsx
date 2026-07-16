import { IS_BROWSER } from "fresh/runtime";
import { useEffect, useState } from "preact/hooks";

interface Auth {
    hash: string;
    // deno-lint-ignore no-explicit-any
    value: any;
}

export default function ManageAuths() {
    const [auths, setAuths] = useState<Auth[] | null>(null);

    useEffect(reloadAuthList, []);

    return (
        <section>
            <h3>Admin auths (hashes of keys)</h3>
            <ul>
                {(() => {
                    if (auths === null) return "Loading...";
                    if (auths.length === 0) return "No auths";
                    return auths.map((auth) => (
                        <AuthItem key={auth.hash} auth={auth} />
                    ));
                })()}
            </ul>

            <button
                type="button"
                onClick={() => {
                    const key = prompt("enter key for auth");
                    if (!key) {
                        alert("alright then, don't enter a key, see if I care");
                        return;
                    }
                    addAuth(key);
                }}
            >
                Add new admin auth
            </button>
            <button type="button" onClick={clearAuths}>
                Clear all admin auths
            </button>
        </section>
    );

    function reloadAuthList() {
        if (!IS_BROWSER) return;

        fetch("/api/admin/auths")
            .then((response) => response.json())
            .then((json) => {
                // deno-lint-ignore no-explicit-any
                setAuths(json.map((x: { key: string[]; value: any }) => {
                    return {
                        hash: x.key[1],
                        value: x.value,
                    };
                }));
            });
    }

    function AuthItem({ auth: { hash } }: { auth: Auth }) {
        return (
            <li>
                <button
                    type="button"
                    onClick={() => {
                        deleteAuth(hash);
                    }}
                >
                    x
                </button>
                {hash}
            </li>
        );
    }

    function addAuth(key: string) {
        console.log("adding auth:", key);
        fetch(`/api/admin/auths/${key}`, { method: "POST" })
            .then((res) => res.json())
            .then((json) => {
                console.log("json:", json);
                reloadAuthList();
            });
    }

    function deleteAuth(hash: string) {
        console.log("deleting auth:", hash);
        fetch(`/api/admin/auths/${hash}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((json) => {
                console.log("json:", json);
                reloadAuthList();
            });
    }

    function clearAuths() {
        console.log("clearing admin auths");
        fetch("/api/admin/auths", { method: "DELETE" })
            .then((res) => res.json())
            .then((json) => {
                console.log("json:", json);
                reloadAuthList();
            });
    }
}
