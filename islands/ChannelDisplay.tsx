import { Channel } from "@/lib/types.ts";

export default function ChannelDisplay(
    { channel, highlighted }: {
        channel: Channel;
        highlighted: boolean;
    },
) {
    const classes = "channel-display" + (highlighted ? " selected" : "");

    return (
        <li class={classes}>
            <a href={channel.id}>{channel.name}</a>
        </li>
    );
}
