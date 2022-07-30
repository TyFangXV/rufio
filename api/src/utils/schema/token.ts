import { Schema, model } from "mongoose";

export type tokenType = {
    token: string;
    _id: string;
    expiration : Date;

}

const TokenSchema = new Schema<tokenType>({
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