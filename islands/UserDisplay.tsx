import { User } from "@/lib/types.ts";

export default function UserDisplay({ user }: { user: User }) {
    // TODO: add interactivity and stuff
    const pfpUrl = user.profilePictureUrl || "/testImages/users/0.webp";

    function doThings() {
        alert(
            user.description,
        );
    }

    return (
        <li class="user-display" onClick={doThings}>
            <img src={pfpUrl} />
            <span class="user-display-username">
                {user.username}
            </span>
        </li>
    );
}
