const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
require('dotenv').config();

// express setup
const App = express();
App.use(bodyParser.json());  // to support JSON-encoded bodies
App.use(express.json()); // Middleware for parsing JSON bodies of incoming requests
App.use(express.urlencoded({
  extended: false
}))
App.use(cors({
  origin: true
}))

const telegramEndpoint = require("./api/telegram")
// const {main} = require("./processUpdate")
const {setWebhookUrl} = require("./telegramWebhook")

main()

// Telegram setup
setWebhookUrl()

App.use('/telegram-webhook', telegramEndpoint);


App.listen(process.env.PORT || 5000, () => {  // changed port to 5000
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});



