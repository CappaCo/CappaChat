// ID type will be ulid https://github.com/ulid/javascript
export type ID = string;

// Timestamp type is ISO timestamp so new Date(Time) works
export type Timestamp = string;

// user
export interface User {
    id: ID;

    username: string;
    displayName: string;

    description: string;
    profilePictureURL?: string;

    createdAt: Timestamp;
}

// kinda like user but in the context of a server
export interface Member {
    userID: ID;
    //permissions: number; // stored as bits, spec to come
    //roles: ID[];

    joinedAt: Timestamp;
}

// role
export interface Role {
    id: ID;
    //permissionsPlus: number;
    //permissionsMinus: number;
}

// server
export interface Server {
    id: ID;
    name: string;
    description: string;

    ownerID: ID;

    createdAt: Timestamp;
}

export interface ServerSummary {
    id: ID;
    name: string;
    description: string;
    iconURL?: string;
}

// channel
export interface Channel {
    id: ID;
    name: string;
    type: "text" | "voice";

    position: number;

    serverID: ID;

    createdAt: Timestamp;
}

export interface ChannelSummary {
    id: ID;
    name: string;
    type: "text" | "voice";

    position: number;
}

// message
export interface Message {
    id: ID;
    authorID: ID;
    channelID: ID;

    content: string;
    //attachments?: Attachment[];

    createdAt: Timestamp;
    editedAt?: Timestamp;
}

/*export interface Attachment {
    //something
}*/

export type AuthType = "None" | "User" | "Bot";
