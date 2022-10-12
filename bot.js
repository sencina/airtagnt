const { Telegraf } = require('telegraf');
const useService = require("./Service");
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const service = useService();

bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send /location to locate your AirTagn\'t'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears('/location', (ctx) => {

    service.location().then((location) => {
        const link = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
        ctx.reply(`Your AirTag is located at ${link}`);
    })
    .catch((err) => {
        ctx.reply(`Error: ${err}`);
    });

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