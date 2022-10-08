const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send /location to locate your AirTagn\'t'));
bot.on('sticker', (ctx) => ctx.reply('👍'));

bot.hears('/location', (ctx) => {
    // send request to esp32 server
    // save coordinates and generate google maps link
    let lat = 2
    let long = 2
    let link = "www.google.com/maps/place/"+lat+","+long
    ctx.reply(link)

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