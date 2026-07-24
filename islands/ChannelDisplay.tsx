import { Channel } from "@/lib/types.ts";

import * as state from "@/stores/channel.ts";

export default function ChannelDisplay(
    { channel }: {
        channel: Channel;
    },
) {
    const classes = "channel-display" +
        (state.channel.value && state.channel.value?.id === channel.id
            ? " selected"
            : "");

    return (
        <li class={classes}>
            <a href={channel.id}>{channel.name}</a>
        </li>
    );
}
