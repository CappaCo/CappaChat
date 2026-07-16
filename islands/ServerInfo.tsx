import ChannelDisplay from "@/islands/ChannelDisplay.tsx";

export interface ServerInfoProps {
    serverID: number;
    channelID: number;
}

export default function ServerInfo({ serverID, channelID }: ServerInfoProps) {
    console.log("getting server info for:", serverID);
    console.log("need to highlight channel:", channelID);

    const serverName = "Termite Piddle Atrium"; // TODO: fetch from the server

    return (
        <aside id="server-info">
            <div id="server-info-resizer"></div>
            <div id="server-name-container">
                <h2 id="server-name">{serverName}</h2>
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
