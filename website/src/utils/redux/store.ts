import { configureStore } from "@reduxjs/toolkit";
import accountReducer  from "./reducers/linkedAccount";
import userDataReducer from './reducers/user'

const store = configureStore({
    reducer : {
        account : accountReducer,
        userData: userDataReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;