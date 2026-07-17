import type { ComponentChildren } from "preact";

export interface ServerIconProps {
    id?: string;
    imgSrc?: string;
    children?: ComponentChildren;
}

let thingo = 0;

export default function ServerIcon(props: ServerIconProps) {
    const selectedImage = "/testImages/servers/" + thingo + ".webp";
    thingo = (thingo + 1) % 3;

    return (
        <li class="server-icon" id={props.id}>
            <a href="#">
                <img src={props.imgSrc || selectedImage} />
            </a>
        </li>
    );
}
