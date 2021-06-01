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
            "keyboard": [["Ethereum", "Bitcoin"], ["Link", "Sushi"]]
        }
    });
});

// Devuelte mensaje en respuesta de determinado texto ingresado al chat

bot.on('message', (msg) => {

    const chatId = msg.chat.id;
    console.log("Entraste a msg");
    console.log(msg);

    let cripto = msg.text;
    let criptoArray = ["Ethereum", "Bitcoin", "Link", "Sushi"]
    // let mensajeEntrante = cripto.toString().indexOf('Ethereum' || 'Bitcoin' || "Link" || "Matic" || "Sushi" || "Snx") === 0;
    if (criptoArray.includes(cripto)) {
        // console.log("entraste al if mensaje entrante");
        // console.log(mensajeEntrante);
        console.log("valor de cripto");
        console.log(cripto);
        bot.sendMessage(chatId, `elegiste ${cripto}`);

        coinGecko.criptoPrice(cripto).then(promise =>{

            console.log(promise);
            for(let prop in promise){
                switch(prop) {
                    case 'ethereum':
                        console.log('llegaste a ethereum');
                        console.log(`${promise.ethereum.usd}`);
                        bot.sendMessage(chatId, `el precio de ${cripto} es ${promise.ethereum.usd} USD`);
                        break;
                    case 'bitcoin':
                        console.log('llegaste a bitcoin');
                        console.log(`${promise.bitcoin.usd}`);
                        bot.sendMessage(chatId, `el precio de ${cripto} es ${promise.bitcoin.usd}USD`);
                        break;
                    case 'link':
                        console.log('llegaste a link');
                        console.log(`${promise.link.usd}`);
                        bot.sendMessage(chatId, `el precio de ${cripto} es ${promise.link.usd}USD`);
                        break;
                    case 'sushi':
                        console.log('llegaste a sushi');
                        console.log(`${promise.sushi.usd}`);
                        bot.sendMessage(chatId, `el precio de ${cripto} es ${promise.sushi.usd}USD`);
                        break;
                }
            }
        });
        
    }

});

