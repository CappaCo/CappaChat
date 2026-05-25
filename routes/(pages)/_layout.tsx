import { define } from "@/utils.ts";

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
                    <a class="button" href="/login">Login</a>
                    <a class="button secondary" href="/sign-up">Sign up</a>
                </div>
            </nav>
            <Component />
            <footer>
                <a href="/about">About Us</a>
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-conditions">Terms and Conditions</a>
                Cappachat &copy; 2026
            </footer>
        </>
    );
});
