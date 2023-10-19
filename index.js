const express = require('express');
const axios = require('axios');
require('dotenv').config();

// express setup
const App = express();

// Telegram Bot setup
const botToken = process.env.telegramBotToken
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(botToken, { polling: true }, {webHook: {port: process.env.PORT}});

// App.use(bot.webHookCallback('/telegram-webhook'));

App.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

bot.setWebHook('https://your-app.onrender.com/telegram-webhook');

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);  // This will log every message sent in the group
    // if (msg.photo) {
    //     const fileId = msg.photo[msg.photo.length-1].file_id;  // Get largest size
    //     bot.getFileLink(fileId).then((link) => {
    //         console.log(`Photo URL: ${link}`);
    //     });
    // }
  });
  
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