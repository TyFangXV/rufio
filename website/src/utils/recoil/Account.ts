import { atom } from "recoil";
import { AccountType, GuildType } from "../../../types";


type AccountInfoAtomProps = {
    account: AccountType;
    guilds : GuildType[];
}
export const AccountInfoAtom = atom<AccountInfoAtomProps>({
    key: "AccountData",
    default: {
        account : {
            id: "",
            username: "",
            profilePic: "",
            email: "",
            isSignIn: false,
        },
        guilds : []
    }
})

