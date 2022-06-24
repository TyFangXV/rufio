import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
        username: "",
        linkedAccountID: "",
        provider: "",
}


const userData = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<{ username: string, linkedAccountID: string, provider: string }>) => {
            state = action.payload;
        }
    }
}
);

export const { setUserData } = userData.actions;

export default userData.reducer;

