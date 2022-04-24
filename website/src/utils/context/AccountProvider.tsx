import { useState, createContext } from "react";
import { AccountType } from "../../../types";

const defaultData:AccountType = {
    id: "",
    username: "",
    email: "",
    profilePic: "",
    isSignIn: false,
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