import Events from "./Events";

class user {
    public Name: string;
    public Avatar: string;
    public Email: string;
    public Region: Object;
           id: number;
    public Events: Object[];

    constructor(
        name: string,
        avatar: string,
        email: string,
        id : number,
        region: Object,
        events: Events[]
        ) {
        this.Name = name;
        this.Avatar = avatar;
        this.Email = email;
        this.Region = region;
        this.id = id;
        this.Events = events;
    }


    public getUserName(): string {
        return this.Name;
    }

    public getAvatar(): string {
        return this.Avatar;
    }

    public getEmail(): string {
        return this.Email;
    }

    public getRegion(): Object {
        return this.Region;
    }

    public getEventUserEvent(id: number): Object {
        return this.Events[id];
    }



    public setRegion(region: Object) {
        this.Region = region;
    }

    public joinEvent(event: Object) {
        this.Events.push(event);
    }

    public leaveEvent(event: Object) {
        let index = this.Events.indexOf(event);
        this.Events.splice(index, 1);
    }

}


export default user;

