import type { ComponentChildren } from "preact";

export interface UserDisplayProps {
    id?: string;
    imgSrc?: string;
    children?: ComponentChildren;
}

let thingo = 0;

export default function UserDisplay(props: UserDisplayProps) {
    const selectedImage = "/testImages/users/" + thingo + ".webp";
    thingo = (thingo + 1) % 3;

    return (
        <li class="user-display" id={props.id}>
            <img src={props.imgSrc || selectedImage} />
            <span class="user-display-username">
                {props.children || "person"}
            </span>
        </li>
    );
}
