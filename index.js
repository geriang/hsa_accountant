const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
// const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// express setup
const App = express();
App.use(bodyParser.json());  // to support JSON-encoded bodies

// Telegram Bot setup
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
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    console.log(`Message from chat ${chatId}: ${text}`);
  }
  res.sendStatus(200);  // respond to Telegram to acknowledge receipt
});


// bot.setWebHook('https://hsa-accountant.onrender.com/telegram-webhook')
//   .then((result) => {
//     console.log('Webhook set successfully:', result);
//   })
//   .catch((error) => {
//     console.error('Error setting webhook:', error);
//   });


// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;
//   console.log(msg);  // This will log every message sent in the group
//   // if (msg.photo) {
//   //     const fileId = msg.photo[msg.photo.length-1].file_id;  // Get largest size
//   //     bot.getFileLink(fileId).then((link) => {
//   //         console.log(`Photo URL: ${link}`);
//   //     });
//   // }
// });


// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Hello! i am geri.');
// });

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });

// bot.setWebHook('public-url.com', {
//     certificate: 'path/to/crt.pem', // Path to your crt.pem
//   });