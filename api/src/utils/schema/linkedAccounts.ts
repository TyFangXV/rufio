import { Schema, model } from "mongoose";

export type LinkedAccountsType = {
    linkedAccountID: string;
    provider: string;
    _id : string;
    email : string;
}

const LinkedAccountsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    linkedAccountID: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    }
}, { timestamps: true, id : false });

export default model("LinkedAccounts", LinkedAccountsSchema);