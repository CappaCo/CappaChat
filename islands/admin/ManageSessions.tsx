import { IS_BROWSER } from "fresh/runtime";
import { useEffect, useState } from "preact/hooks";

interface Session {
    hash: string;
    // deno-lint-ignore no-explicit-any
    value: any;
}

export default function ManageSessions() {
    const [sessions, setSessions] = useState<Session[] | null>(null);

    useEffect(reloadSessionsList, []);

    return (
        <section>
            <h3>Admin sessions</h3>
            <ul>
                {(() => {
                    if (sessions === null) return "Loading...";
                    if (sessions.length === 0) return "No sessionss";
                    return sessions.map((session) => (
                        <SessionItem key={session.hash} session={session} />
                    ));
                })()}
            </ul>
            <button type="button" onClick={clearSessions}>
                Clear all admin sessions
            </button>
        </section>
    );

    function reloadSessionsList() {
        if (!IS_BROWSER) return;

        fetch("/api/admin/sessions")
            .then((response) => response.json())
            .then((json) => {
                // deno-lint-ignore no-explicit-any
                setSessions(json.map((x: { key: string[]; value: any }) => {
                    return {
                        hash: x.key[1],
                        value: x.value,
                    };
                }));
            });
    }

    function SessionItem({ session: { hash } }: { session: Session }) {
        return (
            <li>
                <button
                    type="button"
                    onClick={() => {
                        deleteSession(hash);
                    }}
                >
                    x
                </button>
                {hash}
            </li>
        );
    }

    function deleteSession(hash: string) {
        console.log("deleting session:", hash);
        fetch(`/api/admin/sessions/${hash}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((json) => {
                console.log("json:", json);
                reloadSessionsList();
            });
    }

    function clearSessions() {
        console.log("clearing admin sessions");
        fetch("/api/admin/sessions", { method: "DELETE" })
            .then((res) => res.json())
            .then((json) => {
                console.log("json:", json);
                reloadSessionsList();
            });
    }
}
