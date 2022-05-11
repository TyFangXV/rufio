import axios from 'axios';
import { sign } from 'crypto';
import { Dispatch } from 'react';
import Settings from '../utils/constant/index';
import { encrypt } from './encryption';

type TokenType = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string | string[];
};

const getAccountDetail = async (code: string) => {
  try {
    const res = await axios.get(
      `${Settings.ApiDevUrl}/auth/discord/callback?code=${code}`
    );
    if (res.status === 200) {
      return res.data;
    } else if (res.status === 400) {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getAccountInfo = async (token: string) => {
  try {
    const { data } = await axios.get('https://discord.com/api/v9/users/@me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
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
      return data;
  }
  catch (error) {
      console.error(error);
      return null;
  }
};

/*
check if the token has expired, if yes then refresh the token 
and run the funtion again but if not then return the account details
*/
export const fetchAccountFromServer = async (accountDetailsFromLocalStorage: any) => {
  if (accountDetailsFromLocalStorage.expires_in < Date.now()) 
  {
    try {

        const {data: {AccountData, Guilds}} = await axios.get(`${Settings.ApiDevUrl}/auth/discord/getUserData`, {
            headers: {
              access_token : encrypt(accountDetailsFromLocalStorage.access_token)
            }
        })

        if (AccountData && Guilds) {
          return {account : AccountData, guilds : Guilds};
        } else {
          return false;
        }      
    } catch (error) {
      return false
    }

  } else {
    return 2002;
  }
};


export const refreshTokens = async (
  accountDetailsFromLocalStorage: any
) => {
  const res = await axios.get(
    `${Settings.ApiDevUrl}/auth/discord/refresh?refresh_token=${accountDetailsFromLocalStorage.refresh_token}`,
  )
  if (res.status === 200) {
    window.localStorage.setItem("account", JSON.stringify(res.data));
    return res.data;
  } else {
    return false;
  }
};

    
/*
 Get the tokens from the local storage annd authorize with the access token 
 but if the token has expired it would refresh the token and you are required to run the function again
*/
export const SignIn = async () => {
  const accountDetailsFromLocalStorage = window.localStorage.getItem('account');
  if (accountDetailsFromLocalStorage) 
  {
    try {
      const account  = await fetchAccountFromServer(JSON.parse(accountDetailsFromLocalStorage as string));
      if(account === 2002)
      {
        console.log("error")
        return null;
      }else
      {
        return JSON.parse(JSON.stringify(account));
      }      
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  return null;
};



/* */
export const setUp = async(code:string) => {
  try {
    const tokens = await getAccountDetail(code);
    return tokens;
  } catch (error) {
    return null;
  }
}