const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
require('dotenv').config();

// express setup
const App = express();
App.use(bodyParser.json());  // to support JSON-encoded bodies

// Telegram setup
const botToken = process.env.telegramBotToken
const webhookUrl = process.env.telegramWebhook

axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
  url: webhookUrl
})
  .then(response => {
    console.log('Webhook set successfully:', response.data);
  })
  .catch(error => {
    console.error('Error setting webhook:', error);
  });

App.listen(process.env.PORT || 5000, () => {  // changed port to 5000
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});

App.post('/telegram-webhook', (req, res) => {
  const update = req.body;
  // check if the update contains a message
  if (update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    console.log(`Message from chat ${chatId}: ${text}`);
  }
  if (update.message.photo) {
    const chatId = update.message.chat.id;
    const image = update.message.photo;
    for (i of image){
      console.log(`Image from chat ${chatId}: ${image[i]}`);
    }
    
  }
  if (update.message.document) {
    const chatId = update.message.chat.id;
    const doc = update.message.document.file_id;
    console.log(`Message from chat ${chatId}: ${doc}`);
  }


  res.sendStatus(200);  // respond to Telegram to acknowledge receipt
});

