import type { ComponentChildren } from "preact";

export interface ChannelDisplayProps {
    id?: string;
    children?: ComponentChildren;
}

export default function ChannelDisplay(props: ChannelDisplayProps) {
    return (
        <li class="channel-display" id={props.id}>
            <a href="#">{props.children || "sug"}</a>
        </li>
    );
}
