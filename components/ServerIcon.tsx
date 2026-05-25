import type { ComponentChildren } from "preact";

export interface ServerIconProps {
    id?: string;
    imgSrc?: string;
    children?: ComponentChildren;
}

const dirPath = "static/testImages/servers/";

const files = (await Array.fromAsync(Deno.readDir(dirPath)))
  .filter(entry => entry.isFile)
  .map(entry => entry.name);

let thingo = 0;

export default function ServerIcon(props: ServerIconProps) {
    const selectedImage = "/" + dirPath.split("/").slice(1).join("/") + files[thingo];
    thingo = (thingo + 1) % files.length;

    return (
        <li class="server-icon">
            <a href="#">
                <img src={props.imgSrc || selectedImage} />
            </a>
        </li>
    );
}
