import { useSignal } from "@preact/signals";

export default function LoginButton() {
    const isOpen = useSignal(false);

    function openLoginModal() {
        console.log("opening modal");
        isOpen.value = true;
    }

    function closeLoginModal() {
        console.log("closing modal");
        isOpen.value = false;
    }

    return (
        <>
            <button type="button" onClick={openLoginModal}>
                Log In
            </button>

            <div id="login-modal" class="modal">
                <span class="close" onClick={closeLoginModal}>&times;</span>
                <p>Log In</p>
                <input id="freddy" placeholder="freddy" />
            </div>
        </>
    );
}
