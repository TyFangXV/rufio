require('dotenv').config();
const discord = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const instantiate = require('./discord/deplay-commands');
const uuid = require('uuid').v4;
const {client_id} = require("../secrets/config")


const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS] });
client.commands = new discord.Collection();

const token = process.env.DISCORD_BOT_TOKEN;
const prefix = "^";


// Load all commands
const commandGenre = fs.readdirSync("./src/discord/command/");

for(let i = 0; i < commandGenre.length; i++) {
    const commandFiles = fs.readdirSync(`./src/discord/command/${commandGenre[i]}`).filter(file => file.endsWith(".js"));
    
    if(commandFiles.length != 0) {
      for(let x = 0; x < commandFiles.length; x++) {
        const command = require(`./discord/command/${commandGenre[i]}/${commandFiles[x]}`);
        client.commands.set(command.data.name, command);
    }
  }
}



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


client.on("interactionCreate",  async interaction => {
  if(!interaction.isCommand()) return null;


  const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})


client.login(token);