import { define } from "@/utils.ts";

export default define.layout(function ({ Component }) {
    return (
        <>
            <aside>
                <ul id="server-group">
                    <li><a>Server 1</a></li>
                    <li><a>Server 2</a></li>
                    <li><a>Server 3</a></li>
                </ul>
            </aside>
            <Component />
        </>
    );
});
