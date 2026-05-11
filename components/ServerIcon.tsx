import type { ComponentChildren } from "preact";

export interface ServerIconProps {
    id?: string;
    name?: string;
    children?: ComponentChildren;
}

export default function ServerIcon(props: ServerIconProps) {
    return (
        <li>
            <a>{props.name || "gus"}</a>
        </li>
    );
}
