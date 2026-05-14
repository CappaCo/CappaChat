import type { ComponentChildren } from "preact";

export interface ChannelIconProps {
    id?: string;
    children?: ComponentChildren;
}

export default function ChannelIcon(props: ChannelIconProps) {
    return (
        <li>
            <a>{props.children || "sug"}</a>
        </li>
    );
}
