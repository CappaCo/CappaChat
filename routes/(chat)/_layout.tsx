import { define } from "@/utils.ts";

import ServerIcon from "@/components/ServerIcon.tsx";

export default define.layout(function ({ Component }) {
    return (
        <>
            <aside>
                <ul id="servers-group">
                    <ServerIcon name="Server 1" />
                    <ServerIcon name="Server 2" />
                    <ServerIcon name="Server 3" />
                </ul>
            </aside>
            <Component />
        </>
    );
});
