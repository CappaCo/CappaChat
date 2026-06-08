export default function LoginButton() {
    return (
        <>
            <button type="button" command="show-modal" commandfor="login-modal">
                Log In
            </button>

            <dialog id="login-modal" class="modal">
                <div class="modal-content">
                    <button
                        type="button"
                        class="close"
                        command="close"
                        commandfor="login-modal"
                    >
                        &times;
                    </button>
                    <p>Log In</p>
                    <label for="username">Username/Email</label>
                    <input id="username" placeholder="Username" />
                    <label for="password">Password</label>
                    <input id="password" placeholder="Strong password" />
                    <a href="/forgot-password">Forgot Password???</a>
                    <button type="submit">Log in</button>
                </div>
            </dialog>
        </>
    );
}
