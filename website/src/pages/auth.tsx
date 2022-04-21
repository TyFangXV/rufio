import { Button, Container } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Auth:NextPage = () => {
    const router = useRouter();

    return(
        <Container>
            <div>
                <Button onClick={()=> router.push("https://discord.com/api/oauth2/authorize?client_id=884459475602391113&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback&response_type=code&scope=identify%20email")}>Sign in with discord</Button>
            </div>
        </Container>
    )
}

export default Auth;