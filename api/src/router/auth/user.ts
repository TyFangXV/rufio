import { Request, Response, Router } from "express";
import { config } from "dotenv";
import linkedAccounts from "../../utils/schema/linkedAccounts";
import AccountData, { AccountDataType } from "../../utils/schema/user";

config();
const router = Router();



//endpoint to set the users custom username 
router.get("/", async(req:Request, res:Response)=>{
    try {
        //get the data from the body
        const {username, linkedAccountID} = req.query;


        if(!username || !linkedAccountID) {
            return res.status(400).send("invalid request");
        }

        //check if the linkedAccountID is in the database as well as the account data
        const isLinkedAccountValid = await linkedAccounts.findById(linkedAccountID);
        const accountData = await AccountData.findById(linkedAccountID);
        
        if(isLinkedAccountValid !== null)
        {
            if(accountData !== null)
            {
                //update the username in the database
                const d = await AccountData.updateOne({_id: linkedAccountID}, {username: username});
                
                return res.status(200).send(accountData);
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