import React from "react";
import { CSSProperties } from "react";

interface Props {
    width : number | string;
    strokeStren : number | string;
}

const Hr: React.FC<Props> = ({width, strokeStren}) => {

    const styles:CSSProperties = {
        width: width,
        height: strokeStren,
        backgroundColor: '#e6e6e6',
        margin: '0',
        padding: '0',
        border: '0',
        borderRadius : '10px'
    }

    return <hr style={styles} className="hr" />;
}


export default Hr;