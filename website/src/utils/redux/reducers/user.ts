import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
 data : { 
    _id : "",
    username : "",
    email : "",
    avatar : "",
    accountLevel: 0,
    provider : "",
    newUser : false,
    isSignedIn : false
 }
}


const accountData = createSlice({
    name : "user",
    initialState,
    reducers : {
        setAccount : (state, action: PayloadAction<{
            _id : string, 
            username : string, 
            email : string, 
            avatar : string, 
            isSignedIn : 
            boolean, 
            newUser: boolean, 
            accountLevel: number,
            provider : string
        }>) => {
            state.data =  action.payload;
        }
    }
}
);

export const { setAccount } = accountData.actions;

export default accountData.reducer;