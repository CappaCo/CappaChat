import Modal from "@/islands/Modal.tsx";
import EpicFormItem from "@/islands/EpicFormItem.tsx";
import { user } from "@/stores/user.ts";

export default function () {
    return (
        <>
            {(() => {
                if (user.value === undefined) {return (
                        <span>Loading skeleton...</span>
                    );}

                if (user.value.id === undefined) {
                    return (
                        <>
                            <LoginButton />
                            <SignUpButton />
                        </>
                    );
                }

                return (
                    <>
                        <span>you are: {user.value.username}</span>
                        <LogoutButton />
                        <a class="button secondary" href="/app">
                            Enter CappaChat
                        </a>
                    </>
                );
            })()}
        </>
    );
}

function LoginButton() {
    return (
        <>
            <button type="button" command="show-modal" commandfor="login-modal">
                Log In
            </button>

            <Modal title="Log in" id="login-modal">
                <form action="/api/login" method="POST">
                    <EpicFormItem>
                        <label for="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            // type="email"
                            autofocus
                            autocomplete="on"
                        />
                    </EpicFormItem>

                    <EpicFormItem>
                        <label for="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                        />
                    </EpicFormItem>

                    <a href="/forgot-password" class="forgot-password">
                        Forgot Password???
                    </a>

                    <button type="submit">Log in</button>
                </form>
            </Modal>
        </>
    );
}

function SignUpButton() {
    return (
        <>
            <button
                type="button"
                command="show-modal"
                commandfor="signup-modal"
                class="secondary"
            >
                Sign Up
            </button>

            <Modal title="Sign up" id="signup-modal">
                <form action="/api/signup" method="POST">
                    <EpicFormItem>
                        <label for="username">Username</label>
                        <input id="username" name="username" autofocus />
                    </EpicFormItem>

                    {
                        // I don't think we want email
                        /*<div class="form-item">
                        <label for="email">Email</label>
                        <input id="email" type="email" autocomplete="on" />
                    </div>*/
                    }

                    <EpicFormItem>
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" />
                    </EpicFormItem>

                    <EpicFormItem>
                        <label for="confirm-password">Confirm password</label>
                        <input id="confirm-password" type="password" />
                    </EpicFormItem>

                    <button type="submit">Sign Up</button>
                </form>
            </Modal>
        </>
    );
}

function LogoutButton() {
    function logOut() {
        alert(
            "implement the log out button!!!\n(for now, just clear your cookies)",
        );
    }

    return <button type="button" onClick={logOut}>Log out</button>;
}
