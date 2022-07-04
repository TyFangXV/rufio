import axios from 'axios';
import * as uuid from 'uuid';
import tokenSchema from '../schema/token';
import userSchema, { AccountDataType } from '../schema/user';
import linkedAccounts, { LinkedAccountsType } from '../schema/linkedAccounts';
import { UserDataInitializer } from './user';

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
                  error : "bad_verification_code"
              }
            }

            return message;
          }else{
            const message:MessageType = {
              status : "error",
              data : {
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
    
        //A placeholder data for the user
        let purifiedData: AccountDataType = {
            _id: user.id,
            username: "username",
            email: email.length > 0 && email[0].email,
            avatar: user.avatar_url,
            role: 30,
            provider: "github",
            newUser: true,
            isSignedIn: false,
            createdAt: new Date,
            updatedAt: new Date
        }

        //Create a new user
        const userDataInitializer = new UserDataInitializer(
            purifiedData._id,
            purifiedData.username,
            "github",
            purifiedData.email,
            30,
            new Date,
            new Date
        );


        //Save the user data
        const userData = await userDataInitializer.initialize(purifiedData);
            

        //replace the placeholder data
        purifiedData = {
            newUser : userData.data._doc.username === "username" ? true : false,
            isSignedIn : userData.data._doc.username === "username" ? false : true,
            avatar : purifiedData.avatar,
            ...userData.data._doc
        } 

            //return data
            const message:MessageType = {
                status : "success",
                data : {
                    ...purifiedData,
                }
            }
    
            return message;
        } catch (error) {
            const message:MessageType = {
                status : "error",
                data : {
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
    generateToken = async(user_id:string) => {
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
                if(tokenExists.expiration > new Date().getSeconds())
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
        const {data} = await this.getUserProfileData(access_token);
        const userProfileData = data;
        //check if its a error 
        if(userProfileData.status !== "error")
        {   // Set up tokens
            const token = await this.generateToken(userProfileData._id);
            const message:MessageType = {
                status : "success",
                data : {
                    user : userProfileData,
                }
            }

            return message;
        }else{
            const message:MessageType = {
                status : "error", 
                data : {
                    error : userProfileData.data.error
                }
            }

            return message;
        }

    }
}

export default GithubAuth;