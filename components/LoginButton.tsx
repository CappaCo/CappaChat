export default function LoginButton() {
    return (
        <>
            <button type="button" command="show-modal" commandfor="login-modal">
                Log In
            </button>

            <dialog id="login-modal" class="modal">
                <button
                    type="button"
                    class="close"
                    command="close"
                    commandfor="login-modal"
                >
                    &times;
                </button>

                <form method="dialog">
                    <span>Log In</span>

                    <div class="form-item">
                        <label for="username">Username/Email</label>
                        <input id="username" type="email" autofocus />
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
