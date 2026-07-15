import { define } from "@/lib/utils.ts";

import LoginButton from "@/components/LoginButton.tsx";
import SignUpButton from "@/components/SignUpButton.tsx";

export default define.layout(function ({ Component }) {
    return (
        <>
            <nav>
                <div class="left">
                    <a href="/">
                        <img src="/logo.webp" />
                        <span>CappaChat</span>
                    </a>
                </div>
                <div class="right">
                    <LoginButton />
                    <SignUpButton />
                </div>
            </nav>
            <Component />
            <footer>
                <a href="/about">About Us</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-conditions">Terms and Conditions</a>
                CappaChat &copy; 2026
            </footer>
        </>
    );
});
