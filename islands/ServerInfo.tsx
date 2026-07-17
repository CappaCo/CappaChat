import ChannelDisplay from "@/islands/ChannelDisplay.tsx";
import { ID, Server } from "@/lib/types.ts";

export interface ServerInfoProps {
    serverID: ID;
    channelID: ID;
}

export default function ServerInfo(
    {
        server,
        highlightPosition,
    }: {
        server: Server;
        highlightPosition: number;
    },
) {
    highlightPosition; // TODO: do something with this
    return (
        <aside id="server-info">
            <div id="server-info-resizer"></div>
            <div id="server-name-container">
                <h2 id="server-name">{server.name}</h2>
            </div>
            <ul id="channels-group">
                {/* TODO: fetch these from the server */}
                <ChannelDisplay>General</ChannelDisplay>
                <ChannelDisplay>Activities</ChannelDisplay>
                <ChannelDisplay>Thoughts</ChannelDisplay>
                <ChannelDisplay>Mutations</ChannelDisplay>
                <ChannelDisplay>News</ChannelDisplay>
            </ul>
        </aside>
    );
}
