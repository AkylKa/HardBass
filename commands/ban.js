exports.run = (client, message, [mention, ...reason]) => {
const Discord = require ("discord.js")

    const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if  (member) {
                member
                .ban({
                    reason: 'Они были плохими!',
                })
                .then (() => {
                    message.reply(`Бонк был сделан ${user.tag}`);
                })
                .catch(err => {
                    message.reply('Я не могу забанить дурочку :<');
                    console.log(err);
                });
            } else {
                message.reply("Этого пользователя нет в этой гильдии!");
            }
        } else {
            message.reply("Где дурочок?")
        }
    };
