import { Server } from "@/lib/types.ts";

let thingo = 0;

export default function ServerIcon({ server }: { server: Server }) {
    const selectedImage = "/testImages/servers/" + thingo + ".webp";
    thingo = (thingo + 1) % 3;

    // TODO: add interactivity and stuff
    const serverLink = `../${server.id}`;
    return (
        <li class="server-icon">
            <a href={serverLink}>
                {/* TODO: put actual image source here */}
                <img src={false || selectedImage} />
            </a>
        </li>
    );
}
