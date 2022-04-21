import axios from "axios";
import Settings from '../utils/constant/index'

type TokenType = {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string | string[];
}

const getAccountDetail = async(code:string) => {
    try {
        const {data} = await axios.get(`${Settings.ApiDevUrl}/auth/discord/callback?code=${code}`);
        return data
    } catch (error) {
        return error
    }
}


const Main = async(code:string) => {
    try {
       const accountDetails = await  getAccountDetail(code);
        return accountDetails
    } catch (error) {
        console.error(error);
    }

}

export default Main;
