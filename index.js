require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const coinGecko = require('./APIS/coinGecko');


const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

console.log("Bot corriendo");

// Devuelve un mensaje tras ingresar /start 

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name;
    bot.sendMessage(chatId, "Hola " + username + " soy el bot de prueba.");
});

// Devuelve keyboard con criptos al ingresar /cripto

bot.onText(/\/cripto/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Que cripto deseas consultar?", {
        "reply_markup": {
            "keyboard": [["Ethereum", "Bitcoin"], ["Chainlink", "Sushi"]]
        }
    });
});

// Devuelte mensaje en respuesta de determinado texto ingresado al chat

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    console.log("Entraste a msg");
    console.log(msg);

    let cripto = msg.text;
    let criptoArray = ["Ethereum", "Bitcoin", "Chainlink", "Sushi"]

    if (criptoArray.includes(cripto)) {

        console.log("valor de cripto");
        console.log(cripto);
        bot.sendMessage(chatId, `elegiste ${cripto}`);

        coinGecko.criptoPrice(cripto).then(promise =>{

            console.log(promise);
            bot.sendMessage(chatId, `el precio de ${cripto} es ${promise} USD`);
        });
        
    }

});

