const express = require('express');
// const axios = require('axios');
const bodyParser = require('body-parser')
require('dotenv').config();

// express setup
const App = express();
App.use(bodyParser.json());  // to support JSON-encoded bodies

const telegramEndpoint = require("./api/telegram")
const {setWebhookUrl} = require("./telegramWebhook")

// Telegram setup
const botToken = process.env.telegramBotToken
const webhookUrl = process.env.telegramWebhook
// const telegramApiUrl = `https://api.telegram.org/bot${botToken}`;

setWebhookUrl(botToken, webhookUrl)

App.use('/telegram-webhook', telegramEndpoint);


App.listen(process.env.PORT || 5000, () => {  // changed port to 5000
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});



