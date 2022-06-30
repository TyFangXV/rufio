import React from "react";
import style from './style/account-action.module.css';

const AccountAction:React.FC =  () => {
    return(
        <div className={style.container}>
            <h1>Advanced options</h1>
            <div>
                <button className={style.btn}>Sign out</button>
                <button className={style.btn}>Terminate account data</button>
                <button className={style.btn}>Terminate account</button>                
            </div>
        </div>
    )
}

export default AccountAction;