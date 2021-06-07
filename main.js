const Discord = require("discord.js");
const fs = require("fs");
const moment = require ("moment");
const ytdl = require ("ytdl-core");
const fetch = require ('node-fetch');
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Попытка загрузить команду ${commandName}`);
    client.commands.set(commandName, props);
  });
});

fs.readdir("./Music/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./Music/${file}`);
    let otherCommand = file.split(".")[0];
    console.log(`Диджей ебан в сети ${otherCommand}`);
    client.commands.set(otherCommand, props);
  });
});

client.login(config.token);