import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
    account : {
        id : "",
        name : "",
        email : "",
        avatar : "",
        isSignedIn : false
    }
}


const accountSlice = createSlice({
    name : "account",
    initialState,
    reducers : {
        setAccount : (state, action: PayloadAction<{id : string, name : string, email : string, avatar : string, isSignedIn : boolean}>) => {
            state.account = action.payload;
        }
    }
}
);

export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;

