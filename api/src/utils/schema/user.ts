import { model, Schema } from "mongoose";


export type AccountDataType =  {
    username: string;
    _id : string;
    role : number;
    provider: string;
    email : string;
    newUser?: boolean;
    avatar?: string;
    isSignedIn?: boolean;
    createdAt: Date;
    updatedAt: Date;

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
    role :{
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
    },
    createdAt : {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt : {
        type: Date,
        default: Date.now,
        required: true,
    }
}, {id: false});


export default model("AccountData", AccountData);