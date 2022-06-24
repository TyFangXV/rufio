import axios from "axios";
import { Request, Response, Router } from "express";
import { config } from "dotenv";
import {encrypt} from '../../utils/encryption';
import linkedAccounts from "../../utils/schema/linkedAccounts";
import AccountData from "../../utils/schema/user";
import { model } from "mongoose";

config();
const router = Router();



router.get("/", async(req:Request, res:Response)=>{
    try {
        //get the data from the body
        const {username, linkedAccountID} = req.query;


        if(!username || !linkedAccountID) {
            return res.status(400).send("invalid request");
        }

        //check if the linkedAccountID is in the database
        const isLinkedAccountValid = await linkedAccounts.findById(linkedAccountID);
        const accountData = await AccountData.findById(linkedAccountID);
        
        if(isLinkedAccountValid !== null)
        {
   
            if(accountData !== null)
            {
                return res.status(200).send(accountData);
            }else if(accountData === null){
                //save the userData to the database
                const data = {
                    username,
                    linkedAccountID,
                    provider: isLinkedAccountValid.provider,
                    _id: isLinkedAccountValid._id
                }
                
                const userData = new AccountData(data)

                await userData.save();

                //send the userData to the client
                res.status(200).send(data);                
            }else{
                return res.status(400).send("invalid request");
            }


        }else{
            res.status(400).send("Invalid linked account ID");
        }
        
    } catch (error:any) {
        console.log(error);
        
        res.status(500).send(error);
    }
})

export default router;