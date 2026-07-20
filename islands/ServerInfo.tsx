import ChannelDisplay from "@/islands/ChannelDisplay.tsx";
import { Channel, Server } from "@/lib/types.ts";

export default function ServerInfo(
    {
        server,
        channels,
        currentChannel,
    }: {
        server?: Server;
        channels?: Channel[];
        currentChannel?: Channel;
    },
) {
    return (
        <aside id="server-info">
            <div id="server-info-resizer"></div>
            <div id="server-name-container">
                <h2 id="server-name">{server ? server.name : "Loading..."}</h2>
            </div>
            <ul id="channels-group">
                {(() => {
                    if (channels === undefined) return "Loading...";
                    if (channels.length === 0) return "No channels";
                    return channels.map((channel) => {
                        return (
                            <ChannelDisplay
                                key={channel.id}
                                channel={channel}
                                highlighted={currentChannel === undefined ||
                                    channel.id === currentChannel.id}
                            />
                        );
                    });
                })()}
            </ul>
        </aside>
    );
}
