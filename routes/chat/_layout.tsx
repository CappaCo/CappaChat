import { asset, Head } from "fresh/runtime";

import { define } from "@/utils.ts";

import ServerIcon from "@/components/ServerIcon.tsx";
import ChannelIcon from "@/components/ChannelIcon.tsx";
import UserDisplay from "@/components/UserDisplay.tsx";

export default define.layout(function ({ Component }) {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href={asset("/styles/chat.css")}
                />
            </Head>
            <div id="chat-grid">
                <aside id="server-select">
                    <ul id="servers-group">
                        <ServerIcon>Server 1</ServerIcon>
                        <ServerIcon>Server 2</ServerIcon>
                        <ServerIcon>Server 3</ServerIcon>
                    </ul>
                </aside>
                <aside id="server-info">
                    <h3 id="server-name">Termite Piddle Atrium</h3>
                    <ul id="channels-group">
                        <ChannelIcon>General</ChannelIcon>
                        <ChannelIcon>Activities</ChannelIcon>
                        <ChannelIcon>Thoughts</ChannelIcon>
                        <ChannelIcon>Mutations</ChannelIcon>
                        <ChannelIcon>News</ChannelIcon>
                    </ul>
                </aside>
                <section id="users">
                    <ul id="users-group">
                        <UserDisplay>person1</UserDisplay>
                        <UserDisplay>person2</UserDisplay>
                        <UserDisplay>person3</UserDisplay>
                    </ul>
                </section>
                <section id="page-content">
                    <Component />
                </section>
            </div>
        </>
    );
});
