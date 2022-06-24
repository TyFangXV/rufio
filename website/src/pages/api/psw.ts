import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import settings from "../../utils/constant/settings";


const auth = async(req:NextApiRequest, res:NextApiResponse) => {
    const {linkAcccountID, username, provider} = req.body;
    const serverApiUrl = process.env.NODE_ENV === 'development' ? settings.apiDev : settings.apiProd;

    if(!linkAcccountID || !username || !provider) {
        return res.status(400).send("invalid request");
    }
    try {
        const {data:UserData} = await axios.get(`${serverApiUrl}/auth/user?username=${username}&linkedAccountID=${linkAcccountID}`);
        res.status(200).send(UserData);
    } catch (error:any) {
        console.log(error);
        
        //log the messgae
        res.status(500).send(error);
    }
}


export default auth;