import { Server } from "@/lib/types.ts";
import { servers } from "@/stores/servers.ts";
import Modal from "@/islands/Modal.tsx";
import EpicFormItem from "@/islands/EpicFormItem.tsx";

export default function LeftBar() {
    console.log("rendering left bar");
    return (
        <aside id="left-bar">
            <div>
                <a href="/app/dm" aria-label="go to direct messages">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="64px"
                        viewBox="0 -960 960 960"
                        width="64px"
                        fill="#ffffff"
                    >
                        <path d="M348.5-531.5Q360-543 360-560t-11.5-28.5Q337-600 320-600t-28.5 11.5Q280-577 280-560t11.5 28.5Q303-520 320-520t28.5-11.5Zm160 0Q520-543 520-560t-11.5-28.5Q497-600 480-600t-28.5 11.5Q440-577 440-560t11.5 28.5Q463-520 480-520t28.5-11.5Zm160 0Q680-543 680-560t-11.5-28.5Q657-600 640-600t-28.5 11.5Q600-577 600-560t11.5 28.5Q623-520 640-520t28.5-11.5ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                    </svg>
                </a>
                <ul id="server-select">
                    {(() => {
                        if (servers.value === undefined) {
                            return "Loading servers skeleton...";
                        }
                        if (servers.value.size === 0) {
                            return <em>No servers</em>;
                        }
                        return Array.from(servers.value.values()).map(
                            (server) => {
                                return (
                                    <ServerIcon
                                        key={server.id}
                                        server={server}
                                    />
                                );
                            },
                        );
                    })()}
                </ul>
                <AddServerButton />
            </div>
            <ul id="left-bar-other">
                <a href="/settings/general">
                    <SettingsIcon />
                </a>
            </ul>
        </aside>
    );
}

function ServerIcon({ server }: { server: Server }) {
    const serverLink = `/app/${server.id}`;
    return (
        <li class="server-icon" title={server.name}>
            <a href={serverLink}>
                {/* TODO: put actual image source here */}
                <img src={server.iconUrl} alt={server.name} />
            </a>
        </li>
    );
}

function SettingsIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="64px"
            viewBox="0 -960 960 960"
            width="64px"
            fill="#FFFFFF"
        >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
        </svg>
    );
}

function AddServerButton() {
    return (
        <>
            <button
                type="button"
                id="add-server-button"
                aria-label="Make server"
                command="show-modal"
                commandfor="add-server-modal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="64px"
                    viewBox="0 -960 960 960"
                    width="64px"
                    fill="#ffffff"
                >
                    <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
            </button>

            <Modal title="Make a Server" id="add-server-modal">
                <form action="/api/login" method="POST">
                    <EpicFormItem>
                        <label for="servername">Server Name</label>
                        <input
                            id="servername"
                            name="servername"
                            // type="email"
                            autofocus
                        />
                    </EpicFormItem>

                    <EpicFormItem>
                        <label for="servericon">Server Icon</label>
                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </EpicFormItem>

                    <button type="submit">Create</button>
                </form>
            </Modal>
        </>
    );
}
