import styles from '../../styles/components/KeyDataViewer.module.css';
import React from "react";

type Props = {
    keyname:string,
    data:string,
    style? : React.CSSProperties
}

const KeyDataViewer:React.FC<Props> = ({keyname, data, style}) => {
    return (
        <div className={styles.container} style={style}>
           <p>{keyname} : {data}</p>
        </div>
    );
}


export default KeyDataViewer;