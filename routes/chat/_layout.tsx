import { asset, Head } from "fresh/runtime";

import { define } from "@/utils.ts";

import ServerIcon from "@/components/ServerIcon.tsx";
import ChannelDisplay from "@/components/ChannelDisplay.tsx";
import UserDisplay from "@/components/UserDisplay.tsx";

export default define.layout(function ({ Component }) {
    return (
        <>
            <Head>
                <link
                    id="stylesheet-chat"
                    rel="stylesheet"
                    href={asset("/styles/chat.css")}
                />
            </Head>
            <div id="chat-grid">
                <aside id="server-select">
                    <ul id="servers-group">
                        <ServerIcon imgSrc="/testImages/servers/geeked.webp"/>
                        <ServerIcon imgSrc="/testImages/servers/rio.webp"/>
                        <ServerIcon imgSrc="/testImages/servers/wariotoilet.webp"/>
                    </ul>
                </aside>
                <aside id="server-info">
                    <h3 id="server-name">Termite Piddle Atrium</h3>
                    <ul id="channels-group">
                        <ChannelDisplay>General</ChannelDisplay>
                        <ChannelDisplay>Activities</ChannelDisplay>
                        <ChannelDisplay>Thoughts</ChannelDisplay>
                        <ChannelDisplay>Mutations</ChannelDisplay>
                        <ChannelDisplay>News</ChannelDisplay>
                    </ul>
                </aside>
                <div id="server-info-resizer"></div>
                <aside id="users">
                    <ul id="users-group">
                        <UserDisplay>person1</UserDisplay>
                        <UserDisplay>person2</UserDisplay>
                        <UserDisplay>person3</UserDisplay>
                    </ul>
                </aside>
                <section id="page-content">
                    <Component />
                </section>
            </div>
        </>
    );
});
