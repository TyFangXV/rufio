import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    account : {
        id : "",
        name : "",
        email : "",
        avatar : "",
        provider : "",
        newUser : false,
        isSignedIn : false
    }
}


const linkedAccountSlice = createSlice({
    name : "account",
    initialState,
    reducers : {
        setAccount : (state, action: PayloadAction<{id : string, name : string, email : string, avatar : string, isSignedIn : boolean, newUser: boolean, provider : string}>) => {
            state.account = action.payload;
        }
    }
}
);

export const { setAccount } = linkedAccountSlice.actions;

export default linkedAccountSlice.reducer;

