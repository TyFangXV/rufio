import { useState, createContext } from "react";
import { AccountType, GuildType } from "../../../types";

type AccountInfoAtomProps = {
    account: AccountType;
    guilds : GuildType[];
}

const defaultData:AccountInfoAtomProps = {
    account : {
        id: "",
        username: "",
        profilePic: "",
        email: "",
        isSignIn: false,
    },
    guilds : []
}

const AccountContext = createContext({});

interface Props {
    children: React.ReactNode
}

const AccountProvider:React.FC<Props> = ({ children }) => {
    const [account, setAccount] = useState(defaultData)

    return (
        <AccountContext.Provider value={[account, setAccount]}>
            {children}
        </AccountContext.Provider>
    )
}

export { AccountContext, AccountProvider }