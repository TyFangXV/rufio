import axios from 'axios';
import * as uuid from 'uuid';
import tokenSchema from '../schema/token';
import userSchema, { AccountDataType } from '../schema/user';
import linkedAccounts, { LinkedAccountsType } from '../schema/linkedAccounts';
import { UserDataInitializer } from './user';
import { encrypt } from '../encryption';

type Tokens = {
    access_token: string;
    scope: string;
    token_type: string;
}

type MessageType = {
    status : string;
    data : any;
}

class GithubAuth {
  clientID: string;
  clientSecret: string;

  constructor(clientID: string, clientSecret: string) {
    this.clientID = clientID
    this.clientSecret = clientSecret;
  }


    getAccessToken = async(code: string) => {
        const accessTokenUrl = `https://github.com/login/oauth/access_token`
        const params = {
            code,
            client_id: this.clientID,
            client_secret: this.clientSecret,
            accept: "json"
        }

        try {
          const {data:Tokens} = await axios.post(accessTokenUrl, params, {headers: {'Accept': 'application/json'}});
          
          //sanitized data
          const message:MessageType = {
            status : "success",
            data : {
                ...Tokens
            }
          }

          return message;
        } catch (error:any) {
            
          //Error handling for the user
          if(error.error === "bad_verification_code")
          {
            const message:MessageType = {
              status : "error",
              data : {
                  code : 400,
                  error : "bad_verification_code"
              }
            }

            return message;
          }else{
            const message:MessageType = {
              status : "error",
              data : {
                code : 500,
                  error : error
              }
            }

            return message;
          }

        }

    }


    getUserProfileData = async(access_token: string) => {
        try {

            //fetch the users profile data and email address
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

        const userProfile = await userSchema.findById(user.id);
    
        if(userProfile !== null)
        {
            //A placeholder data for the user
            let purifiedData: AccountDataType = {
                _id: user.id,
                username: userProfile.username,
                email: email.length > 0 && email[0].email,
                avatar: user.avatar_url,
                role: 30,
                provider: "github",
                newUser: true,
                isSignedIn: false,
                createdAt: new Date,
                updatedAt: new Date
            } 
            
            //replace the placeholder data
            purifiedData = {
                ...purifiedData,
                newUser : purifiedData.username === "username" ? true : false,
                isSignedIn : purifiedData.username === "username" ? false : true,
            } 
    
            
                //return data
                const message:MessageType = {
                    status : "success",
                    data : {
                        ...purifiedData,
                    }
                }
                return message;
        }else{
            
            return {
                status : "error",
                data : {
                    code : 404,
                    error : "User not found"
                }
            }
        }
        } catch (error) {
            const message:MessageType = {
                status : "error",
                data : {
                    code : 500,
                    error
                }
            }
            return message;
        }
    }

    private setUserProfileData = async(access_token: string, userData: AccountDataType) => {
        try {
            //fetch the users profile data and email address
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

            const userProfile = await userSchema.findById(user.id);

            if(userProfile !== null)
            {
                return {
                    status : "error",
                    data : {
                        code : 302 ,
                        error : "User already exists"
                    }
                }
            }else{
                //create a new user
                const data = {
                    ...userData,
                    email: email.length > 0 && email[0].email,
                    _id : user.id,
                    avatar: user.avatar_url,
                    provider: "github",
                    updatedAt: new Date
                }
                
                const newUser = new userSchema(data);

                //save the new user
                await newUser.save();

                //return data
                const message:MessageType = {
                    status : "success",
                    data : {
                        ...data,
                    }
                }
                return message;
            }
        } catch (error) {
            const message:MessageType = {
                status : "error",
                data : {
                    code : 500,
                    error
                }
            }
            return message;
        }
    }


    /*
        function to save and generate the token that 
        will be used to authenticate all requests send by the user
    */
    private generateToken = async(user_id:string) => {
        try {
            const data = {
                _id : user_id,
                token : uuid.v4(),
                expiration : Date.now() + 1000 * 60 * 60 * 48
            }
    
            //check if the token exists
            const tokenExists = await tokenSchema.findById(user_id);
            if(tokenExists !== null)
            {
                //check if the token is expired
                if(new Date(tokenExists.expiration).getSeconds() > new Date().getSeconds())
                {
                    await tokenSchema.findByIdAndUpdate(user_id, data);
                    return data;
                }else{
                    return tokenExists;
                }
            }
            else
            {
                const token = new tokenSchema(data)
                await token.save();
                return token;            
            }
        } catch (error) {
            throw error;
        }
    }

    login = async(access_token: string) => {
        const {status,data} = await this.getUserProfileData(access_token);

        if(status === "success")
        {
            const userProfileData = data;
            // Set up tokens
            const token = await this.generateToken(userProfileData._id);
            const message:MessageType = {
                status : "success",
                  data : {
                    user : userProfileData,
                }
            }

            return message;

            }else{
                //check if the user is not in the db 
                if(data.error.code === 404)
                {
                    const message:MessageType = {
                        status : "error",
                        data : {
                            code : 404,
                            error : "User not found"
                        }
                    }
                    return message;
                }else{
                    const message:MessageType = {
                        status : "error",
                        data : {
                            code : 500,
                            error : data.error
                        }
                    }
                    return message;
                }
            }            
        }
    
    signup = async(access_token: string) => {
        //create a placeholder data 
        const userData: AccountDataType = {
            _id : "",
            username: "username",
            email: "",
            avatar: "",
            role: 30,
            provider: "github",
            newUser: true,
            isSignedIn: false,
            createdAt: new Date,
            updatedAt: new Date
        }



        const {status,data} = await this.setUserProfileData(access_token, userData);
        
        if(status === "success")
        {
            const userProfileData = data;

            const UDI = new UserDataInitializer(
                userProfileData._id,
                userProfileData.username,
                userProfileData.provider,
                userProfileData.email,
                userProfileData.role,
                userProfileData.createdAt,
                userProfileData.updatedAt,
            );
            await UDI.saveLinkedAccount();

            // Set up tokens
            const token = await this.generateToken(userProfileData._id);
            const message:MessageType = {
                status : "success",
                  data : {
                    user : userProfileData,
                }
            }

            return message;

        }else{
                //check if the user is not in the db 
                if(data.error.code === 302)
                {
                    const message:MessageType = {
                        status : "error",
                        data : {
                            code : 302,
                            error : "User already exists"
                        }
                    }
                    return message;
                }else{
                    const message:MessageType = {
                        status : "error",
                        data : {
                            code : 500,
                            error : data.error
                        }
                    }
                    return message;
                }
            }
    }


    //function to either login or sign up a user
    callback = async(access_token:string):Promise<MessageType> => {
        try {
            const {data:user} = await axios.get(`https://api.github.com/user`, {
                headers: {
                Authorization: `token ${access_token}`
                }
            });

            //check if the user is in the db
            const userProfile = await userSchema.findById(user.id);
            if(userProfile !== null)
            {
                const userData = await this.login(access_token);
                return userData
            }else{  
                const userData = await this.signup(access_token);
                return userData
            }
        } catch (error) {
            return {
                status : "error",
                data : error
            }
        }
    }

     generateTokenSession = async(user_id:number) =>{
        try {
            const token = await tokenSchema.findById(user_id);
            if(token === null)
            {
                console.log("token not found");
                return null;
                
            }

            if(token !== null)
            {
                const sessionData = {
                    token: token.token,
                    expiration : new Date().getTime() + (1000 * 60 * 60 * 24 * 7)
                }

                return encrypt(JSON.stringify(sessionData));
            }

        } catch (error) {
            console.log(error);
            
            return null;
        }
    }

}


export default GithubAuth;