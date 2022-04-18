import passport from "passport";
import * as dotenv from "dotenv";
import DS from "passport-discord";

dotenv.config()
const DiscordStrategy = DS.Strategy;

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID as string,
    clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    callbackURL: process.env.DISCORD_REDIRECT_URL,
    scope: ['identify', 'email'],
},
 async(accessToken, refreshToken, profile, done) => {
  console.log(profile)  
  done(null, profile);
 }
))

