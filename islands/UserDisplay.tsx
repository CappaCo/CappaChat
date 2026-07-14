import type { ComponentChildren } from "preact";

export interface UserDisplayProps {
    id?: string;
    imgSrc?: string;
    children?: ComponentChildren;
}

console.log("getting images");
const dirPath = "static/testImages/users/";

const files = (await Array.fromAsync(Deno.readDir(dirPath)))
    .filter((entry) => entry.isFile)
    .map((entry) => entry.name);

let thingo = 0;

export default function UserDisplay(props: UserDisplayProps) {
    const selectedImage = "/" + dirPath.split("/").slice(1).join("/") +
        files[thingo];
    thingo = (thingo + 1) % files.length;

    return (
        <li class="user-display" id={props.id}>
            <img src={props.imgSrc || selectedImage} />
            <span class="user-display-username">
                {props.children || "person"}
            </span>
        </li>
    );
}
