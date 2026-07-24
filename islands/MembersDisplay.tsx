import UserDisplay from "@/islands/UserDisplay.tsx";
import { members } from "@/stores/members.ts";

export default function MembersDisplay() {
    // TODO: make the classes members instead of users
    return (
        <aside id="users">
            <ul id="users-group">
                {(() => {
                    if (members.value.size === 0) {
                        return "Members loading skeleton...";
                    }
                    return Array.from(members.value.values()).map((member) => {
                        return <UserDisplay key={member.id} user={member} />;
                    });
                })()}
            </ul>
        </aside>
    );
}
