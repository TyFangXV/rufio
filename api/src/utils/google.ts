import {google} from 'googleapis';
import * as dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library';
dotenv.config()

// configs for google auth 
const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirect: process.env.GOOGLE_REDIRECT_URI
}


//scope for getting user info
const Scope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
]

const createConnectionToGoogle = () => {
    return new google.auth.OAuth2(
        googleConfig.clientID,
        googleConfig.clientSecret,
        googleConfig.redirect
    )
}

// call back function

const getGoogleAuthApi = (auth:any) => {
    return google.oauth2({
        auth: auth,
        version: 'v2'
    })
}





export const getGoogleAccountFromCode = async(code:string) => {
    const auth = createConnectionToGoogle();
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    auth.setCredentials(tokens);
    const Oauth = getGoogleAuthApi(auth);
    const me = await Oauth.userinfo.get();  
    console.log({token : tokens, user: me.data});
}

