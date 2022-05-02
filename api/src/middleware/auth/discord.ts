import { Router } from "express";
import * as dotenv from 'dotenv'
import axios from "axios";


const router = Router();
dotenv.config();

const getAccountInfo = async (accessToken: string) => {
    try {
        const { data } = await axios.get(`https://discord.com/api/v9/users/@me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};






router.get("/callback", async(req, res) => {
    try {
        const { code } = req.query;
        if(code)
        {
            //get the tokens required to get the account info
            const param = new URLSearchParams;
            param.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID as string);
            param.append('client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET as string);
            param.append('code', code as string);
            param.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI as string);
            param.append('grant_type', 'authorization_code');

            const {data:tokens} = await axios.post("https://discord.com/api/v9/oauth2/token", param, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })


            //get the account info and filter the data to send to the client 
            const {access_token} = tokens;
            const accountInfo = await getAccountInfo(access_token);
            
            const filteredData = {
                tokens : {
                    ...tokens
                },
                account : {
                    ...accountInfo
                }
            }

            res.send(filteredData);
        }else{
            res.status(400).send("No code provided");
        }
    } catch (error:any) {
        //log the data from the error
        const errorCode = error.response.data;
        if(errorCode.error_description === 'Invalid "code" in request.')
        {
            res.status(400).send("Invalid code provided");
        }else{
            res.status(500).send(errorCode);    
        }
    }
})


router.get("/refresh", async(req, res) => {
    const { refresh_token } = req.query;
    if(refresh_token)
    {
        try {
                //get the tokens required to get the account info
                const param = new URLSearchParams;
                param.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID as string);
                param.append('client_secret', process.env.NEXT_PUBLIC_CLIENT_SECRET as string);
                param.append('refresh_token', refresh_token as string);
                param.append('grant_type', 'refresh_token');
        
                const {data:tokens} = await axios.post("https://discord.com/api/v9/oauth2/token", param, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })

                res.send(tokens);            
        } catch (error:any){
            console.log(error);
            
             res.status(500).send(error.message)
        }

    }else{
        res.status(400).send("No refresh token provided");
    }
})

export default router;