const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');


const instantiate = async(clientId, token, guildId) => { 
    try {
        const commands = [
            new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
            new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
            new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        ]
            .map(command => command.toJSON());


        const rest = new REST({version : "9"}).setToken(token);      
        
        const res = await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


module.exports = instantiate;