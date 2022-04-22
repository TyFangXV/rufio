import { createSlice } from '@reduxjs/toolkit'
import { AccountType } from '../../../../types';

const initialState: AccountType = {
    id: "",
    username: "",
    email: "",
    profilePic: "",
    isSignIn: false,
}


export const AccountSlice = createSlice({
    name: 'Account',
    initialState,
    reducers: {
        UpdateAccount: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { UpdateAccount } = AccountSlice.actions;


export default AccountSlice.reducer;