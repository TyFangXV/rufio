import { configureStore } from "@reduxjs/toolkit";
import accountReducer from './reducers/user'

const store = configureStore({
    reducer : {
        account: accountReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;                      