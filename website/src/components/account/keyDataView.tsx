import { Badge } from "@mantine/core";
import React from "react";

type Props = {
    id:string,
    keyname:string,
    data:string,
}

const KeyDataViewer:React.FC<Props> = ({id, keyname, data}) => {
    return (
        <Badge style={{background : "white", border : "none", color : "black", margin : 10}} size={"lg"}>
            {keyname} : {data}
        </Badge>
    );
}


export default KeyDataViewer;