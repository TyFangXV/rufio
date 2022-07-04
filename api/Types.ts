export type AccountType = {
    id: string;
    username: string;
    profilePic: string;
    email: string;
    isSignIn: boolean;
};



export type GuildType = {
    id: string;
    ownerID: string;
    permissions: string;
    owner: boolean;
}

export type MixedAccountType = {
    account : AccountType;
    guilds : GuildType[];
    [key:string]: any
}

export type MessageType = {
    status : string;
    data : any;
}
