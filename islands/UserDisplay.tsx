import { User } from "@/lib/types.ts";

export default function UserDisplay({ user }: { user: User }) {
    // TODO: add interactivity and stuff
    const pfpURL = user.profilePictureURL || "/testImages/users/0.webp";

    function doThings() {
        alert(
            "do something like show the user description: " + user.description,
        );
    }

    return (
        <li class="user-display" onClick={doThings}>
            <img src={pfpURL} />
            <span class="user-display-username">
                {user.displayName}
            </span>
        </li>
    );
}
