var plaid = require("plaid");
var moment = require("moment");

var PLAID_CLIENT_ID = "your client ID here";
var PLAID_SECRET = "your secret key here";
var PLAID_PUBLIC_KEY = "your public key here";
var PLAID_ENV = "development";

var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;

// Initialize the Plaid client
var client = new plaid.Client(
    // "5e4331492dd19f001380626b",
    // "46f7b9098cf7c0ace6dd82e5a209a7",
    // "d393e49d5cd80df0a7d0ac6562875a",
    "5e4331492dd19f001380626b",
    "f2708e7b9ee104f0d78f5c9827a553",
    "d393e49d5cd80df0a7d0ac6562875a",
    plaid.environments[PLAID_ENV],
    { version: "2019-05-29", clientApp: "Plaid Quickstart" }
);

const receivePublicToken = (req, res) => {
    // First, receive the public token and set it to a variable
    let PUBLIC_TOKEN = req.body.public_token;
    // Second, exchange the public token for an access token
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
        ACCESS_TOKEN = tokenResponse.access_token;
        ITEM_ID = tokenResponse.item_id;
        res.json({
            access_token: ACCESS_TOKEN,
            item_id: ITEM_ID
        });
        console.log("access token below");
        console.log(ACCESS_TOKEN);

    });
};

const getTransactions = (req, res) => {
    // Pull transactions for the last 30 days
    let startDate = moment()
        .subtract(req.body.days, "days")
        .format("YYYY-MM-DD");
    let endDate = moment().format("YYYY-MM-DD");
    console.log(req.body.accessToken);
    client.getTransactions(
        req.body.accessToken,
        startDate,
        endDate,
        {
            count: 250,
            offset: 0
        },
        function (error, transactionsResponse) {
            res.json({ transactions: transactionsResponse.transactions });
            // TRANSACTIONS LOGGED BELOW! 
            // They will show up in the terminal that you are running nodemon in.
            console.log("backend plaid transactions");
            console.log(transactionsResponse.transactions);
        }
    );
};

module.exports = {
    receivePublicToken,
    getTransactions
};