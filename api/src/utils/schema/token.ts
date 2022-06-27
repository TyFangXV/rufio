import { Schema, model } from "mongoose";


const TokenSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    token  : {
        type : String,
        required : true
    },
    expiration : {
        type : Date,
        required : true
    }
}, { timestamps: true, id : false });

export default model("Tokens", TokenSchema);