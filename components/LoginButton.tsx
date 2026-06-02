import { useState } from "preact/hooks";

function openLoginModal() {
    console.log("hi");
}

export default function LoginButton() {
    const isOpen = useState(false);

    return (
        <>
            <button type="button" onClick={openLoginModal}>
                Log In
            </button>

            {isOpen && (
                <div id="login-modal" class="modal">
                    <span class="close">&times;</span>
                    <p>Log In</p>
                    <input id="freddy" placeholder="freddy" />
                </div>
            )}
        </>
    );
}
