import { define } from "@/utils.ts";

export default define.layout(function ({ Component }) {
    return (
        <>
            <nav>
                <div class="left">
                    <img src="/logo.webp" />
                    <span>CappaChat</span>
                </div>
                <div class="right">
                    <a class="button" href="/login">Login</a>
                    <a class="button" href="/sign-up">Sign up</a>
                </div>
            </nav>
            <Component />
            <footer>footer &copy; 2026</footer>
        </>
    );
});
