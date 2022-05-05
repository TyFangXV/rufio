import { Button, Container, Input } from '@mantine/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { refreshTokens, SignIn } from '../../utils/Account';
import { encrypt, decrypt } from '../../utils/encryption';


const ControlCenter: React.FC = () => {
    const [tokens, setTokens ] = useState<Object>({});
    const [message, setMessage] = useState<string>("");
    const [account, setAccount] = useState<Object>({});
    const [done, setDone] = useState<boolean>(false);

    const [returnText, setReturnText] = useState("uppdting");

    //refernces
    const tokenInputRef = React.useRef<HTMLInputElement>(null);

    const ecruptInutRef = React.useRef<HTMLInputElement>(null);
    const decryptInputRef = React.useRef<HTMLInputElement>(null);
    useEffect(() => {
        const tokens = window.localStorage.getItem("account");
        if(tokens)
        {
            setTokens(JSON.parse(tokens));
            SignIn()
                .then(account => {
                    if(account)
                    {
                        setAccount(account);
                    }else{
                        setMessage("Something went wrong, please try again later or try to sign in again");
                    }
                }).catch(error => {
                    setMessage(error.message);
                })
        }else{
            setMessage("no tokens found");
        }
        setDone(true);
    }, [done])
  return (
    <Container>
        <h1>{message}</h1>
        <br/>
        <Input type={"text"} ref={tokenInputRef}/>
        <br/>
        <Button>Revoke</Button>
        <br/>
        <Button onClick={async() => {
            const res = await refreshTokens(tokens);
            if(res)
            {
                setTokens(res);
                setMessage("tokens updated");
                window.localStorage.setItem("account", JSON.stringify(res));
            }else{
                setMessage("something went wrong");
            }

        }}>Refresh</Button>
        <div style={{margin: "50px"}}>
            <span>
                <Input placeholder='ecnyrpt' ref={ecruptInutRef}/>  
                <p>{returnText}</p>         
                <Button onClick={ () => setReturnText(encrypt(ecruptInutRef.current?.value as string) )}/>     
            </span>
            <span>
                <Input placeholder='decrypt'  ref={decryptInputRef}/>  
                <p>{returnText}</p>        
                <Button onClick={ () => setReturnText(decrypt(decryptInputRef.current?.value as string) )}/>           
            </span>

        </div>
    </Container>
  );
};

export default ControlCenter;
