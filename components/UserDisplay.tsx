import type { ComponentChildren } from "preact";

export interface UserDisplayProps {
    id?: string;
    children?: ComponentChildren;
}

export default function UserDisplay(props: UserDisplayProps) {
    return (
        <li>
            {props.children || "person"}
        </li>
    );
}
