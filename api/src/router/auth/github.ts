import axios from "axios";
import { Router } from "express";
import { config } from "dotenv";
import {encrypt} from '../../utils/encryption';
import linkedAccounts from "../../utils/schema/linkedAccounts";

config();
const router = Router();

router.get("/cb", async(req, res) => {
    const {code} = req.query; 
    
    if(!code) {
        return res.status(400).send("No code provided");
    }

    // exchange code for access token
    const accessTokenUrl = `https://github.com/login/oauth/access_token`
    const params = {
        code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        accept : "json"
    }

    try {
        

        // access the token and get the user's profile
        const {data:Tokens} = await axios.post(accessTokenUrl, params, { headers : {'Content-Type': 'application/json'}});

            console.log(Tokens);
            
        const access_token = Tokens.split("&")[0].split("=")[1];
        
        if(!access_token) {
            return res.send("No access token provided").status(400);
        }

        const {data:user} = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });

        const {data:email} = await axios.get("https://api.github.com/user/emails", (
            {
                headers: {
                    Authorization: `token ${access_token}`
                }
            }
        ))

        const purifiedData = {
            id: user.id,
            name: user.name,
            email: email.length > 0 ? email[0].email : "",
            avatar: user.avatar_url,
            newUser: false,
            isSignedIn: false,
        }

        //check if user exists in db
        const acountExists = await linkedAccounts.findOne({id: user.id});
        if(acountExists) {
            res.send({user :  {...purifiedData, newUser : false}, token : encrypt(access_token)});
        }else{
            const newAccount = new linkedAccounts({
                _id: user.id,
                provider: "github",
                email: email.length > 0 ? email[0].email : "",
            });
            
            await newAccount.save();
            res.send({user : {...purifiedData, newUser : true}, token : encrypt(access_token)});
        }
        
    } catch (error:any) {
        res.status(500).send(error.response.data.message);
    }
})

export default router;