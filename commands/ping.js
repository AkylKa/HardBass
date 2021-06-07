const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (client,message,args,prefix) => {
	const ping = new Date(message.createdTimestamp);
  const timeTaken = Date.now() - message.createdTimestamp;
  
	message.channel.send(`Пинг: ${timeTaken}ms`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "User",
  description: "Показ задержки",
  usage: "!ping"
};