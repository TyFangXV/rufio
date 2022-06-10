import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"





export default NextAuth({

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code",
                  redirect_uri : process.env.GOOGLE_REDIRECT_URI as string
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ account, profile }:any) {
          if (account.provider === "google") {  
            return profile.email_verified && profile.email.endsWith("@google.com");
          }
          return true // Do different verification for other providers that don't have `email_verified`
        },
        
      },
      

    secret: process.env.GOOGLE_CLIENT_SECRET as string,
})