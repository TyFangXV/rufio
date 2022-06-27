import axios from "axios";
import { Router } from "express";
import { config } from "dotenv";
import localToken from '../../utils/token'
import linkedAccounts from "../../utils/schema/linkedAccounts";
import AccountData from "../../utils/schema/user";

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

        let purifiedData = {
            id: user.id,
            name: user.name,
            email: email.length > 0 ? email[0].email : "",
            avatar: user.avatar_url,
            provider: "github",
            newUser: false,
            isSignedIn: false,
            
        }


        //check if user exists in db
        const acountExists = await linkedAccounts.findById(user.id);  
        const accountData = await AccountData.findById(user.id);
        

        if (acountExists === null) {
            const newAccount = new linkedAccounts({
                _id: user.id,
                provider: "github",
                email: email.length > 0 ? email[0].email : "",
            });

            await newAccount.save();
        }


        if(accountData !== null)
        {
            purifiedData = {
                id: user.id,
                name: accountData.username,
                email: email.length > 0 ? email[0].email : "",
                avatar: user.avatar_url,
                provider: "github",
                newUser: false,
                isSignedIn: false,
            }
        }


        //generate the token
        const localTks = await localToken(user.id);
        if(!purifiedData.newUser)
        {           
            res.cookie = localTks;
        }

        res.send({ user: { ...purifiedData, newUser: accountData === null ? true : false, isSignedIn: accountData === null ? false : true }});

    } catch (error: any) {
        res.status(500).send(error.response.data.message);
    }
})

export default router;