import axios from "axios";
import { Router } from "express";
import { config } from "dotenv";
import localToken from '../../utils/token'
import linkedAccounts, {LinkedAccountsType} from "../../utils/schema/linkedAccounts";
import AccountData, {AccountDataType} from "../../utils/schema/user";

config();
const router = Router();

router.post("/cb", async (req, res) => {

    const { code } = req.query;

    if (!code) {
        return res.status(400).send("No code provided");
    }

    // exchange code for access token
    const accessTokenUrl = `https://github.com/login/oauth/access_token`
    const params = {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        accept: "json"
    }

    try {


        // access the token and get the user's profile
        const { data: Tokens } = await axios.post(accessTokenUrl, params, { headers: { 'Content-Type': 'application/json' } });

        const access_token = Tokens.split("&")[0].split("=")[1];

        if (!access_token) {
            return res.send("No access token provided").status(400);
        }

        //fetch the users profile data and email address
        const { data: user } = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });

        const { data: email } = await axios.get("https://api.github.com/user/emails", (
            {
                headers: {
                    Authorization: `token ${access_token}`
                }
            }
        ))  

        
        //A placeholder data for the user
        let purifiedData: AccountDataType= {
            _id: user.id,
            username: user.name,
            email: email.length > 0 ? email[0].email : "",
            avatar: user.avatar_url,
            accountLevel: 30,
            provider: "github",
            newUser: false,
            isSignedIn: false,
            
        }

        //check if user exists in db
        const acountExists = await linkedAccounts.findById(user.id);  
        const accountData = await AccountData.findById(user.id);
        

        if (acountExists === null) {
            const newAccount = new linkedAccounts<LinkedAccountsType>({
                _id: user.id,
                provider: "github",
                linkedAccountID: user.id,
                email : email.length > 0 ? email[0].email : ""
            });

            await newAccount.save();
        }


        //if user data does exist in db, then update the auth status 
        if(accountData !== null)
        {
            //if the account data exist then update the data being passed and send it back to the client
            purifiedData = {
                _id: user.id,
                username: accountData.username,
                email: email.length > 0 ? email[0].email : "",
                avatar: user.avatar_url,
                provider: "github",
                accountLevel : accountData.accountLevel,
                newUser: false,
                isSignedIn: false,
            }
        }else{
            //if the user data does not exist in db, then create a new user
            const newAccountData = new AccountData<AccountDataType>(purifiedData);
            await newAccountData.save();
        }



        //generate the token and set it as the cookie
        const localTks = await localToken(user.id);
        if(!purifiedData.newUser)
        {           
            res.cookie = localTks;
        }

        res.send({ user: { ...purifiedData, newUser: accountData?.username ===  "username" || accountData === null? true : false, isSignedIn: accountData === null ? false : true }});

    } catch (error: any) {
        console.log(error);
        
        res.status(500).send(error.response.data.message);
    }
})

export default router;