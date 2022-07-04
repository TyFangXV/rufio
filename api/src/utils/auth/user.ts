import userSchema, { AccountDataType } from "../schema/user";
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
    private saveLinkedAccount = async() =>{
        try {
            const user = await userSchema.findById(this.id);
            
            //if user does not exist in db, then create a new user
            if(!user)
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


    //Saves user meta data to the database
    private saveUserData = async(userData:AccountDataType) => {
        try {
            const userExists = await userSchema.findById(userData._id);

            if(userExists !== null)
            {
                //check if the user is updated
                if(userExists.updatedAt.getTime() !== userData.updatedAt.getTime())
                {
                    //update the user
                    const newUser = await userSchema.findByIdAndUpdate(userData._id, userData); 
                    return newUser
                }else{                  
                    //return the user
                    return userExists
                }
            }else{
                //save the user data
                const newUser = new userSchema<AccountDataType>(userData);
                await newUser.save();
                return userData;
            }

        } catch (error) {
            throw error;
        }
    }


    //public method to initialize to get users account data
    public initialize = async(data:AccountDataType) => {
        try {
            //save linked account data
            await this.saveLinkedAccount();

            //save user data
            const userData = await this.saveUserData(data);

            //return data
            const message:MessageType = {
                status : "success",
                data : {
                    ...userData,
                    email: this.email,
                }
            }

            return message;
        } catch (error) {
            const message:MessageType = {
                status : "error",
                data : {
                    error
                }
            }
            return message;
        }
    }
}
