import Events from "./Events";
import user from "./user";

class Organization {
    public Name: string;
    public Avatar: string;
    public Description: string;
    public CreateAt: Date;
    public id: number;
    public Region: Object;
    public Events: Events[];
    public followers:user[];
    

    constructor(
        name: string,
        avatar: string,
        description: string,
        createAt: Date,
        id: number,
        region: Object,
        events: Events[],
        followers:user[]
    ) {
        this.Name = name;
        this.Avatar = avatar;
        this.Description = description;
        this.CreateAt = createAt;
        this.id = id;
        this.Region = region;
        this.Events = events;
        this.followers = followers;
    }

    getOrganizationNamePublicData():Object 
    {
        return {
            Name: this.Name,
            Avatar: this.Avatar,
            Description: this.Description,
            CreateAt: this.CreateAt,
            Region: this.Region,
            id: this.id,
            Events: this.Events,
            followers: this.followers
        }
    }   


    getFollowerCount():number
    {
        return this.followers.length;
    }
}


export default Organization;