import { model, Schema } from "mongoose";


const AccountData = new Schema({
    username : {
        type : String,
        required : true
    },
    provider: {
        type: String,
        required: true,
    },
    linkedAccountID : {
        type: String,
        required: true,
    },
    _id : {
        type: String,
        required: true,
    }
}, {id: false});


export default model("AccountData", AccountData);