export default function SignUpButton() {
    return (
        <>
            <button
                type="button"
                command="show-modal"
                commandfor="sign-up-modal"
                class="secondary"
            >
                Sign Up
            </button>

            <dialog id="sign-up-modal" class="modal">
                <div class="modal-header">
                    <span>Sign Up</span>
                    <button
                        type="button"
                        class="close"
                        command="close"
                        commandfor="sign-up-modal"
                    >
                        &times;
                    </button>
                </div>

                <form method="dialog">
                    <div class="form-item">
                        <label for="username">Username</label>
                        <input id="username" autofocus />
                    </div>

                    <div class="form-item">
                        <label for="email">Email</label>
                        <input id="email" type="email" autocomplete="on" />
                    </div>

                    <div class="form-item">
                        <label for="password">Password</label>
                        <input id="password" type="password" />
                    </div>

                    <div class="form-item">
                        <label for="confirm-password">Confirm password</label>
                        <input id="confirm-password" type="password" />
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
            </dialog>
        </>
    );
}
