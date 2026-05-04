import { define } from "@/utils.ts";

export default define.layout(function ({ Component }) {
    return (
        <>
            <nav>navbar</nav>
            <Component />
            <footer>footer &copy; 2026</footer>
        </>
    );
});
