exports.run = (client, message, [mention, ...reason]) => {
    const modRole = message.guild.roles.cache.find(role => role.name === "Owner");
    if (!modRole)
      return console.log("Роль Owner не существует");
  
    if (!message.member.roles.cache.has(modRole.id))
      return message.reply("Дурочок,ты не можешь использовать эту команду.");
  
    if (message.mentions.members.size === 0)
      return message.reply("Пожалуйста, укажите пользователя, которого нужно наказать :>");
  
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.reply("");
  
    const kickMember = message.mentions.members.first();
  
    kickMember.kick(reason.join(" ")).then(member => {
      message.reply(`${member.user.username} Дурочок был изгнан.`);
    });
  };