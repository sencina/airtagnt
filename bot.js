const { Telegraf } = require('telegraf');
const axios = require("axios");
require('dotenv').config();

const url = 'http://192.168.138.154'  //'http://172.20.10.4';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send /location to locate your AirTagn\'t'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears('/location', (ctx) => {

    axios.get(url + '/location').then(r => {
        ctx.reply(r.data);
    })

});

bot.hears('/scream', (ctx) => {
    // send request to esp32 server to start sound
    ctx.reply("Now screaming!")
});

bot.hears('/shutup', (ctx) => {
    // send request to esp32 server to stop sound
    ctx.reply("Shutting up")
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));