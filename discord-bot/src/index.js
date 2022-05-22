require('dotenv').config();
const fs = require('fs');
const discord = require('discord.js');
const instantiate = require('./discord/deplay-commands');
const uuid = require('uuid').v4;
const {client_id} = require("../secrets/config")


const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS] });
client.command = new discord.Collection();

const token = process.env.DISCORD_BOT_TOKEN;
const prefix = "^";








client.on('ready', async() => {
  
  client.user.setStatus('online');
  client.user.setActivity('Powered by Swag');
  
  //deploy the commands
  const status = await instantiate(client_id, token, "934393146513702912");
  
  if(!status) throw new Error("Failed to deploy commands");
  
  
  console.log("Bot is online xx");
});






client.on('messageCreate',  (message) => {
       if (message.author.bot) return;


       //check if message started with prefix
       if (!message.content.startsWith(prefix) || message.author.bot) return;
       
        if(message.content.startsWith(prefix))
        {
            const command = message.content.slice(prefix.length).trim(" ").toLowerCase().split(" ")[0];

            if(client.command.has(command))
            {
              message.channel.send("Command is being executed");
            }
        }
});


client.login(token);