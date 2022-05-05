export type AccountType = {
    id: string;
    username: string;
    profilePic: string;
    email: string;
    isSignIn: boolean;
};



export type GuildType = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
}