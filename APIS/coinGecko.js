const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const coinGecko = {

    criptoPrice: async(cripto) => {
        console.log("Entraste a cripto en criptoPrice");
        console.log(cripto);
        let criptoToLowerCase = cripto.toString().toLowerCase();

        console.log("Entraste a criptoPrice");
        console.log(criptoToLowerCase);

        let geckoData = await CoinGeckoClient.simple.price({
            ids: criptoToLowerCase,
            vs_currencies: 'usd',
        });
        console.log(geckoData);
        return geckoData.data;
    }
}

module.exports = coinGecko;