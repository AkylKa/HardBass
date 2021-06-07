exports.run = async (client, message, args, level) => { 
    if (!args || args.length < 1) return message.reply("Необходимо предоставить команду на перезагрузку. Дерп.");
    const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`Ошибка выгрузки: ${response}`);
  
    response = client.loadCommand(command.help.name);
    if (response) return message.reply(`Ошибка загрузки: ${response}`);
  
    message.reply(`Это команда \`${command.help.name}\` была перезагружена`);
  };

  exports.help = {
    name: "reload",
    category: "System",
    description: "Повторно загружает команду, которая была изменена.",
    usage: "!reload [command]"
  };