import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import settings from "../../utils/constant/settings";

const auth = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const code = req.body.code;
        const serverApiUrl = process.env.NODE_ENV === 'development' ? settings.apiDev : settings.apiProd;
        if(!code) {
            return res.status(400).send("No code provided");
        }else{
            const apiReq = await axios.post(`${serverApiUrl}/api/auth/github/cb?code=${code}`, {withCredentials: true})
            const userData = apiReq.data;

            //set the cookie 
            console.log(apiReq.headers);
            
            return res.status(200).send(userData);
        } 

    } catch (error:any) {
        console.log(error);
        
        res.status(500).send(error.messgae);
    }

}

export default auth;