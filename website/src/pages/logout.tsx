import { Container } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const Logout:React.FC = () => {
    const router = useRouter();
    const [status, setStatus] = useState<string>("Signing out...");

    useEffect(() => {
        window.localStorage.removeItem("account");
        setStatus("Signed out");
        router.push("/")
    }, [router])

    return(
        <Container>
            <p>{status}</p>
        </Container>
    )
}

export default Logout;