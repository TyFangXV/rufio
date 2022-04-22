import { combineReducers } from "redux";
import AccountReducer from "./Account";


const combinedReducer = combineReducers({
    Account: AccountReducer
});

export type RootState = ReturnType<typeof combinedReducer>;


export default combinedReducer;