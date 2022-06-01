import user from "./user";

class Events{
    public Name:string;
    public Avatar:string;
    private banList:user[];
    public Description:string;
    public CreateAt:Date;
    public Region:Object;
    public organizationID:number;
    public Participants:user[];
    public moderators:user[];
    public id:number;
    public isPublic:boolean;
    public isFinished:boolean;
    public isDeleted:boolean;
    public isInvited:boolean;
    public isInvitedByOwner:boolean;
    public isInvitedByModerator:boolean;
    public isInvitedByParticipant:boolean;

    constructor(
        name:string,
        description:string,
        CreateAt:Date,
        avatar:string,
        region:Object,
        organizationID:number,
        participants:user[],
        moderators:user[],
        id:number,
        isPublic:boolean,
        isFinished:boolean,
        isDeleted:boolean,
        isInvited:boolean,
        isInvitedByOwner:boolean,
        isInvitedByModerator:boolean,
        isInvitedByParticipant:boolean
    )
    {
        this.Name = name;
        this.Description = description;
        this.CreateAt = CreateAt;
        this.Avatar = avatar;
        this.Region = region;
        this.organizationID = organizationID;
        this.Participants = participants;
        this.moderators = moderators;
        this.id = id;
        this.isPublic = isPublic;
        this.isFinished = isFinished;
        this.isDeleted = isDeleted;
        this.isInvited = isInvited;
        this.isInvitedByOwner = isInvitedByOwner;
        this.isInvitedByModerator = isInvitedByModerator;
        this.isInvitedByParticipant = isInvitedByParticipant;
    }


    banUser(user:user)
    {
        let index = this.Participants.indexOf(user);
        this.Participants.splice(index, 1);
        this.banList.push(user);
    }

    unbanUser(user:user)
    {
        let index = this.banList.indexOf(user);
        this.banList.splice(index, 1);
    }

    kickUser(user:user)
    {
        let index = this.Participants.indexOf(user);
        this.Participants.splice(index, 1);
    }

    public getInfo():Object
    {
        return {
            Name:this.Name,
            Description:this.Description,
            CreateAt:this.CreateAt,
            Region:this.Region,
            organizationID:this.organizationID,
        }
    }

    public getName():string
    {
        return this.Name;
    }


    public getCreateAt():Date
    {
        return this.CreateAt;
    }

    public getRegion():Object
    {
        return this.Region;
    }

    public getOrganization():number
    {
        return this.organizationID;
    }

    getParticipantsById(id:number):user
    {
        return this.Participants[id];
    }

    getParticipants():user[]
    {
        return this.Participants;
    }
    

    public inviteUser():string
    {
        return "link"
    }
}

export default Events;