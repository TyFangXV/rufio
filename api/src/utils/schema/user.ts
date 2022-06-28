import { model, Schema } from "mongoose";


export type AccountDataType =  {
    username: string;
    _id : string;
    accountLevel : number;
    provider: string;
    email : string;
    newUser?: boolean;
    avatar?: string;
    isSignedIn?: boolean;
}
const AccountData = new Schema<AccountDataType>({
    username : {
        type : String,
        required : true
    },
    provider: {
        type: String,
        required: true,
    },
    accountLevel :{
        type: Number,
        required: true,
    },
    email : {
        type : String,
        required : true
    },
    _id : {
        type: String,
        required: true,
    }
}, {id: false});


export default model("AccountData", AccountData);