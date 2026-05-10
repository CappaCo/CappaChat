import { define } from "@/utils.ts";

function serverIcon() {
    return (
        <li>
            <a>Server 1</a>
        </li>
    );
}

export default define.layout(function ({ Component }) {
    return (
        <>
            <aside>
                <ul id="server-group">
                    {/*<serverIcon />*/}
                </ul>
            </aside>
            <Component />
        </>
    );
});
