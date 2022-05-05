import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import Nav from "../../components/account/Nav";
import { SignIn } from "../../utils/Account";
import { AccountContext } from "../../utils/context/AccountProvider";

const Challenges:React.FC = () => {
    const router = useRouter();
    const [Account, setAccount]:any = useContext(AccountContext);
  
    const fetchAccount = async () => {
      if(!Account.account.isSignIn && Account.guilds.length === 0) {
      {
        const {account, guilds} = await SignIn();   
        if(account)
        {
          const organizedAccountData = {id: account.id, username: account.username, email: account.email, profilePic: account.avatar, isSignIn: true};
          const organizedGuildsData = guilds.filter((guild:any) => guild.owner === true);
  
          setAccount({account: organizedAccountData, guilds: organizedGuildsData});    
        }else{
          router.push("/auth")
        }
      }
    };
  }
  
    
    useEffect(() => {
      fetchAccount();
    }, [])
  
  
    return (
        <div>
            <Nav Account={Account}/>
            
        </div>
    )
}

export default Challenges;