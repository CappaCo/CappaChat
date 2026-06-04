import { useSignal } from "@preact/signals";

export default function LoginButton() {
    const isOpen = useSignal(false);

    function openSignUpModal() {
        console.log("opening modal");
        isOpen.value = true;
    }

    function closeSignUpModal() {
        console.log("closing modal");
        isOpen.value = false;
    }

    return (
        <>
            <button type="button" onClick={openSignUpModal} class="secondary">
                Sign up
            </button>

            <div id="sign-up-modal" class="modal">
                <span class="close">&times;</span>
                <p>Sign Up</p>
                <input id="freddy" placeholder="freddy" />
            </div>
        </>
    );
}
