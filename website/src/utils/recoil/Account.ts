import { atom } from "recoil";
import { AccountType } from "../../../types";

export const AccountInfoAtom = atom<AccountType>({
    key: "AccountData",
    default: {
        id: "",
        username: "",
        email : "",
        profilePic : "",
        isSignIn : false
    }
})

