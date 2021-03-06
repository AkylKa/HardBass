
if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

try {
  require("./config.js");
} catch {
  console.log("Creating a config.js file for the bot");
  require("./setup.js");
}


const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const config = require("./config.js");

const client = new Discord.Client({
  ws: {
    intents: config.intents
  }
});


client.config = config;


client.logger = require("./modules/Logger");


require("./modules/functions.js")(client);


client.owners = [];


client.commands = new Enmap();
client.aliases = new Enmap();


client.settings = new Enmap({name: "settings"});



const init = async () => {

  
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    
    client.on(eventName, event.bind(null, client));
  });

  
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  
  client.login(client.config.token);


};

init();