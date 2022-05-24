const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');  

const instantiate = async(clientId, token, guildId) => { 
    try {

        // Load all commands
        const commands = [];
        const commandGenre = fs.readdirSync("./src/discord/command/");

        for(let i = 0; i < commandGenre.length; i++) {
            const commandFiles = fs.readdirSync(`./src/discord/command/${commandGenre[i]}`).filter(file => file.endsWith(".js"));
            
            if(commandFiles.length != 0) {
            for(let x = 0; x < commandFiles.length; x++) {
                const command = require(`../discord/command/${commandGenre[i]}/${commandFiles[x]}`);
                commands.push(command.data.toJSON());
            }
        }
        }

        const rest = new REST({version : "9"}).setToken(token);      
        
        const res = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
        
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


module.exports = instantiate;