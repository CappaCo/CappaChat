import { IS_BROWSER } from "fresh/runtime";
import salt from "@/lib/adminSalt.ts";

export default function HashTest() {
    return (
        <section>
            <button
                type="button"
                onClick={() => {
                    if (!IS_BROWSER) return;
                    const message = prompt("message");
                    if (!message) {
                        alert("fine then, dont");
                        return;
                    }

                    const msgBuffer = new TextEncoder().encode(salt(message));

                    // Hash the message using SHA-256
                    crypto.subtle.digest("SHA-256", msgBuffer).then(
                        (hashBuffer) => {
                            // Convert the ArrayBuffer to a hex string
                            const hashHex = Array.from(
                                new Uint8Array(hashBuffer),
                            )
                                .map((b) => ("00" + b.toString(16)).slice(-2))
                                .join("");
                            alert(hashHex);
                        },
                    );
                }}
            >
                Hash test
            </button>
        </section>
    );
}
