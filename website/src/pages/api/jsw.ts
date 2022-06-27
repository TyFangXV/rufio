import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import settings from "../../utils/constant/settings";

const auth = async(req:NextApiRequest, res:NextApiResponse) => {
    try {
        const code = req.query.code;
        const serverApiUrl = process.env.NODE_ENV === 'development' ? settings.apiDev : settings.apiProd;
        if(!code) {
            return res.status(400).send("No code provided");
        }else{
            const {data:UserData} = await axios.post(`${serverApiUrl}/v1/auth/github/cb?code=${code}`)
            return res.status(200).send(UserData);
        } 

    } catch (error) {
        res.status(500).send(error);
    }

}

export default auth;