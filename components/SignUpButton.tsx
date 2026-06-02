import { useState } from "preact/hooks";

function openSignUpModal() {
    console.log("hi");
}

export default function SignUpButton() {
    const isOpen = useState(false);
    
        return (
            <>
                <button type="button" onClick={openSignUpModal}>
                    Log In
                </button>
    
                {isOpen && (
                    <div id="sign-up-modal" class="modal">
                        <span class="close">&times;</span>
                        <p>Sign Up</p>
                        <input id="freddy" placeholder="freddy" />
                    </div>
                )}
            </>
        );
}
