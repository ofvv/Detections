const discord = require('discord.js');
const config = require('./config.json');
require('discord-reply')
require('dotenv').config()
const client = new discord.Client({disableMentions: 'everyone'});
client.config = config;
client.inf = new discord.Collection();
client.discord = discord;
client.filter = require('bad-words')
client.sleep = async function(ms) {
  if (!ms) ms = 1;
  return new Promise(async resolve => setTimeout(resolve, ms));
};

['handleDetection', 'handleAlt'].forEach(async handle => {
  require(`./handle/${handle}`)(client)
})

client.on('ready', async () => {console.log(client.user.username)})

client.on('message', async message => {
  client.handleDetection(message)
})

client.on('messageUpdate', async (oldm, newm) => {
  client.handleDetection(newm)
})

client.on('guildMemberAdd', async member => {
  client.handleAlt(member)
})

client.login(config.bot.token)
