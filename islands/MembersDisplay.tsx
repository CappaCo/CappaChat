import UserDisplay from "@/islands/UserDisplay.tsx";
import { members } from "@/stores/members.ts";
import Modal from "@/islands/Modal.tsx";
import EpicFormItem from "@/islands/EpicFormItem.tsx";
import { currentServerId } from "@/stores/server.ts";
import { User } from "@/lib/types.ts";
import { useSignal } from "@preact/signals";
import { users } from "@/stores/users.ts";

export default function MembersDisplay() {
    // TODO: make the classes members instead of users
    return (
        <aside id="users">
            <ul id="users-group">
                {(() => {
                    if (members.value === undefined) {
                        return "Members loading skeleton...";
                    }
                    if (members.value.size === 0) {
                        return <em>No members</em>;
                    }
                    return Array.from(members.value.values()).map((member) => {
                        const user = users.value?.get(member.userId);
                        if (user === undefined) {
                            return (
                                <em key={member.userId}>
                                    User is somehow undefined
                                </em>
                            );
                        }
                        return <UserDisplay key={member.userId} user={user} />;
                    });
                })()}
            </ul>
            <AddMemberButton />
        </aside>
    );
}

function AddMemberButton() {
    const user = useSignal<User>();
    return (
        <>
            <button
                type="button"
                id="add-member-button"
                aria-label="Add member"
                command="show-modal"
                commandfor="add-member-modal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#ffffff"
                >
                    <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                <span>Add member</span>
            </button>

            <Modal title="Add a member" id="add-member-modal">
                <form
                    action={`/api/servers/${currentServerId.value}/members`}
                    method="POST"
                >
                    <EpicFormItem>
                        <label for="username">Server Name</label>
                        <input
                            id="username"
                            name="username"
                            autofocus
                        />
                    </EpicFormItem>

                    <UserPreview user={user.value} />

                    <button type="submit">Add user</button>
                </form>
            </Modal>
        </>
    );
}

function UserPreview({ user }: { user?: User }) {
    if (user === undefined) {
        return <em>User not found</em>;
    }

    return <span>Show user things here</span>;
}
