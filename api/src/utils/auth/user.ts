import { AccountDataType } from "../schema/user";
import linkedAccounts, {LinkedAccountsType} from "../schema/linkedAccounts";
import { MessageType } from "../../../Types";

export class UserDataInitializer {
    id:string;
    name:string;
    email:string;
    role:number;
    provider:string;
    createdAt:Date;
    updatedAt:Date;

    constructor(
        id:string,
        name:string,
        provider:string,
        email:string,
        role:number,
        createdAt:Date,
        updatedAt:Date
    ){
        this.id = id;
        this.name = name;
        this.provider = provider;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    //Saves users primary data such as email to prevent duplicates & spam
    public saveLinkedAccount = async() =>{
        try {
            const user = await linkedAccounts.findById(this.id);
            
            //if user does not exist in db, then create a new user
            if(user === null)
            {
                const newUser = new linkedAccounts<LinkedAccountsType>({
                    _id: this.id,
                    provider: this.provider,
                    linkedAccountID : this.id,
                    email: this.email,
                });
                await newUser.save();

                return true;
            }else{
                return true;
            }
        } catch (error) {
            throw error;
        }
    }


}
