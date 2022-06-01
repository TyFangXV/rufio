import React from "react";
import styles from '../styles/topbar.module.css'
import {BiSearch} from 'react-icons/bi'

interface Props {
    onChange: (value: string | undefined) => void;
}

const Input:React.FC<Props> = ({onChange}) => {
    return (
        <div className={styles.inputContainer}>
            <BiSearch className={styles.searchIcon}/>
            <input type="text" placeholder="Search..." className={styles.input} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}


export default Input