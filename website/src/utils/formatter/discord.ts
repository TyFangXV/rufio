export class DiscordServer {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;


    constructor(id: string, name: string, icon: string, owner: boolean, permissions: string) 
    {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.owner = owner;
        this.permissions = permissions;

    }


    getServer = () => {
        const icon = this.icon ? `https://cdn.discordapp.com/icons/${this.id}/${this.icon}.png` : "https://cdn.discordapp.com/embed/avatars/0.png";
        const data = {
            id: this.id,
            name: this.name,
            icon: icon,
            owner: this.owner,
            permissions: this.permissions
        }

        return data;
    }

}

