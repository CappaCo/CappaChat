import UserDisplay from "@/islands/UserDisplay.tsx";
import { User } from "@/lib/types.ts";

export default function UsersDisplay({ users }: { users?: User[] }) {
    return (
        <aside id="users">
            <ul id="users-group">
                {(() => {
                    if (users === undefined) return "Users loading skeleton...";
                    return users.map((user) => {
                        return <UserDisplay key={user.id} user={user} />;
                    });
                })()}
            </ul>
        </aside>
    );
}
