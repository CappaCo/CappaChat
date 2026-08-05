// ID type will be ulid https://github.com/ulid/javascript
export type Id = string;

// Timestamp type is ISO timestamp so new Date(Time) works
export type Timestamp = string;

// user
export interface User {
    id: Id;

    username: string;

    description: string;
    profilePictureUrl?: string;

    createdAt: Timestamp;
}

// kinda like user but in the context of a server
export interface Member {
    userId: Id;
    //permissions: number; // stored as bits, spec to come
    //roles: Id[];

    joinedAt: Timestamp;
}

// role
export interface Role {
    id: Id;
    //permissionsPlus: number;
    //permissionsMinus: number;
}

// server
export interface Server {
    id: Id;
    name: string;

    ownerId: Id;
    iconUrl?: string;

    createdAt: Timestamp;
}

// channel
export interface Channel {
    id: Id;
    name: string;
    type: ChannelType;

    position: number;

    serverId: Id;

    createdAt: Timestamp;
}

export type ChannelType = "text" | "voice";

// message
export interface Message {
    id: Id;
    authorId: Id;
    channelId: Id;

    content: string;
    //attachments?: Attachment[];

    createdAt: Timestamp;
    editedAt?: Timestamp;
}

/*export interface Attachment {
    //something
}*/
