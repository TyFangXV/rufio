import { Schema, model } from "mongoose";


const LinkedAccountsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required : true
    }
}, { timestamps: true, id : false });

export default model("LinkedAccounts", LinkedAccountsSchema);