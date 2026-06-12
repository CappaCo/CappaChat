export default function LoginButton() {
    return (
        <>
            <button type="button" command="show-modal" commandfor="login-modal">
                Log In
            </button>

            <dialog id="login-modal" class="modal">
                <div class="modal-header">
                    <span>Log In</span>
                    <button
                        type="button"
                        class="close"
                        command="close"
                        commandfor="login-modal"
                    >
                        &times;
                    </button>
                </div>

                <form method="dialog">
                    <div class="form-item">
                        <label for="username-email">Username/Email</label>
                        <input
                            id="username-email"
                            type="email"
                            autofocus
                            autocomplete="on"
                        />
                    </div>

                    <div class="form-item">
                        <label for="password">Password</label>
                        <input id="password" type="password" />
                    </div>

                    <a href="/forgot-password" class="forgot-password">
                        Forgot Password???
                    </a>

                    <button type="submit">Log in</button>
                </form>
            </dialog>
        </>
    );
}
