import axios from 'axios';
import Settings from '../utils/constant/index';

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
    console.log(error);
    
    return null;
  }
};

// main functions
export const fetchAccountFromServer = async (
  accountDetailsFromLocalStorage: any
) => {
  if (accountDetailsFromLocalStorage.expires_in < Date.now()) {
    const account = await getAccountInfo(
      accountDetailsFromLocalStorage.access_token
    );
    if (account) {
      return account;
    } else {
      return false;
    }
  } else {
    return accountDetailsFromLocalStorage.expires_in < Date.now();
  }
};

const initializeAccount = async (code: string) => {
  try {
    const accountDetails = await getAccountDetail(code);
    return accountDetails;
  } catch (error) {
    console.error(error);
  }
};


    

export const SignIn = async () => {
  const accountDetailsFromLocalStorage = window.localStorage.getItem('account');
  //if there isnt any code then signin using the account details from the local storage
  if (accountDetailsFromLocalStorage) {
     const account = await fetchAccountFromServer(
        JSON.parse(accountDetailsFromLocalStorage as string)
      );

    return JSON.parse(JSON.stringify(account));
  }

  return null;
};

export default initializeAccount;
