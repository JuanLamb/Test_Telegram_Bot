const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const coinGecko = {
    // Consulta el precio de una cripto en la API de coingecko
    criptoPrice: async(cripto) => {

        let criptoToLowerCase = cripto.toString().toLowerCase();

    // realiza la consulta a la API
        let geckoJson = await CoinGeckoClient.simple.price({
            ids: criptoToLowerCase,
            vs_currencies: 'usd',
        });
    // Almacena el dato del objeto recibido por la API, USD, en priceUsd
        const priceValue = Object.values(geckoJson.data)[0];
        const priceUsd = priceValue.usd;

        return priceUsd;
    }
}

module.exports = coinGecko;