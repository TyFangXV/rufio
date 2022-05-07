import { Router } from "express";
import * as dotenv from 'dotenv'
import axios from "axios";
import { decrypt } from "../../utils/encryption";
import accountModal from '../../modal/Account';
import { MixedAccountType } from "../../../Types";

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


const getAccountGuilds = async(accessToken: string) => {
    try {
        const { data } = await axios.get(`https://discord.com/api/v9/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    }
    catch (error) {
        console.error(error);
        return null;
    }
};



const saveAccount = async (accountData: MixedAccountType) => {
    try {
        let {account, guilds} = accountData;
        let filtredGuilds = guilds.map(guild => {
            return {
                id: guild.id,
                ownerID: guild.owner ? account.id : null,
                permissions: guild.permissions,
                owner : guild.owner
            }
        })
        
       const DBStatus= await accountModal.create({
              email: account.email,
                username: account.username,
                _id : account.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                guilds : filtredGuilds
        });

    } catch (error) {
        
    }
}


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
            const guilds = await getAccountGuilds(access_token);
            
            const filteredData = {
                tokens : {
                    ...tokens
                },
                account : {
                    ...accountInfo
                },
                guilds
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


router.get("/getUserData" , async(req, res) => {
    let { access_token } = req.headers;
    
    if (!access_token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }
    
    try {
        access_token = decrypt(access_token as string);
        const { data:AccountData } = await axios.get(`https://discord.com/api/v9/users/@me`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const {data:Guilds} = await axios.get(`https://discord.com/api/v9/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        res.status(200).json({AccountData, Guilds});
    } catch (error:any) {
        res.status(500).json({ message: error.message });
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
        } 
        catch (error:any){
             res.status(500).send(error.message)
        }

    }else{
        res.status(400).send("No refresh token provided");
    }
})

export default router;