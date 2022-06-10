import axios from "axios";
import { Router } from "express";
import { config } from "dotenv";
import {encrypt} from '../../utils/encryption';

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
        const {data:Tokens} = await axios.post(accessTokenUrl, params, { headers : {'Content-Type': 'application/json'}});

        
        const access_token = Tokens.split("&")[0].split("=")[1];
        
        if(!access_token) {
            return res.status(400).send("No access token provided");
        }
        // exchange access token for user data
        const userUrl = `https://api.github.com/user`;
        const {data:user} = await axios.get(userUrl, {
            headers: {
                Authorization: `token ${access_token}`
            }
        });

        res.send({user, token : encrypt(access_token)});
        
    } catch (error:any) {
        console.log(error.response.data);
        res.send(error.response.data.message).status(500);
    }
})

export default router;