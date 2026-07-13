import UserDisplay from "@/islands/UserDisplay.tsx";

export default function UsersDisplay() {
    return (
        <aside id="users">
            <ul id="users-group">
                <UserDisplay>person1</UserDisplay>
                <UserDisplay>person2</UserDisplay>
                <UserDisplay>person3</UserDisplay>
            </ul>
        </aside>
    );
}
