const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();

// express setup
const App = express();
App.use(bodyParser.json());  // to support JSON-encoded bodies
App.use(express.json()); // Middleware for parsing JSON bodies of incoming requests
App.use(express.urlencoded({
  extended: false
}))

const telegramEndpoint = require("./api/telegram")
const {setWebhookUrl} = require("./telegramWebhook")

// Telegram setup
setWebhookUrl()

App.use('/telegram-webhook', telegramEndpoint);


App.listen(process.env.PORT || 5000, () => {  // changed port to 5000
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});



