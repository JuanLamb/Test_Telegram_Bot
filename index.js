require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');


const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

console.log("Bot corriendo");

// Devuelte mensaje en respuesta de determinado texto ingresado al chat

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    let hola = "hola";
    let mensajeEntrante = msg.text.toString().toLowerCase().indexOf(hola) === 0;
    console.log(mensajeEntrante);

    if (mensajeEntrante) {

        bot.sendMessage(chatId, 'Hola ' + msg.from.first_name);

    };

    let robot = "I'm robot";

    if (msg.text.indexOf(robot) === 0) {

        bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");

    };

});

// Devuelve un mensaje y keyboard tras ingresar /start 

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bienvenido", {
        "reply_markup": {
            "keyboard": [["Hola"]]
            }
        });
});