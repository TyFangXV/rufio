import mongoose, { Schema } from "mongoose";
import { GuildType } from "../../Types";

interface IAccount {
    email: string;
    username: string;
    _id : string;
    createdAt: Date;
    updatedAt: Date;
    guilds : GuildType[];
}


const AccountSchema = new Schema<IAccount>({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    guilds : {
        type: [Object],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    },
    _id : {
        type: String,
        required: true
    }
})

export default mongoose.model<IAccount>("Account", AccountSchema);
