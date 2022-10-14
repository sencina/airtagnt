const { Telegraf } = require('telegraf');
const axios = require("axios");
require('dotenv').config();

const url = 'http://192.168.59.49:3000';

const bot = new Telegraf(process.env.BOT_TOKEN);
let authorized = false;

bot.start((ctx) => ctx.reply('Welcome. Authenticate using /login password to use AirTagn\'t!'));
bot.help((ctx) => ctx.reply('Send /location to locate your AirTagn\'t'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears('/login pepesand', (ctx) => {

    authorized = true;
    ctx.reply("Welcome, use /location to get AirTagn't location.")

})

bot.hears('/logout', (ctx) => {

    authorized = false;
    ctx.reply('See you next time!');

})

bot.hears('/location', (ctx) => {

    if (authorized) {

        axios.get(url + '/location').then(r => {
            ctx.reply('Location: ' + r.data);
        })

    }
    else {
        ctx.reply("Unauthorized, use /login password to use the bot.")
    }

});

// bot.hears('/scream', (ctx) => {
//     // send request to esp32 server to start sound
//     ctx.reply("Now screaming!")
// });

// bot.hears('/shutup', (ctx) => {
//     // send request to esp32 server to stop sound
//     ctx.reply("Shutting up")
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));