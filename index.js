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
const telegramApiUrl = `https://api.telegram.org/bot${botToken}`;


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

App.post('/telegram-webhook', async (req, res) => {
  const update = req.body;
  // check if the update contains a message
  if (update.message.text) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    console.log(`Message from chat ${chatId}: ${text}`);
  }
  if (update.message.photo) {
    const chatId = update.message.chat.id;
    const image_files = update.message.photo
    const highest_res = image_files[image_files.length - 1]
    const image_fileId = highest_res.file_id
    console.log(`Message from chat ${chatId}: ${image_fileId}`)

    try {
      // Get file path from Telegram
      const filePathResponse = await axios.post(`${telegramApiUrl}/getFile`, { file_id: image_fileId });
      const filePath = filePathResponse.data.result.file_path;

      // Retrieve the file url
      const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
      console.log(`image file url: ${fileUrl}`)

      // sending image to AI model
      const requestData = {
        tkn: process.env.asticaApi,  // visit https://astica.ai
        modelVersion: '2.1_full', // 1.0_full, 2.0_full, or 2.1_full
        input: fileUrl,
        visionParams: 'gpt_detailed, text_read', // comma separated, defaults to all
        gpt_prompt: 'You are a book keeping accountant. Retrieve any date, time, vendor or shop name, purchased items and the cost depicted', // only used if visionParams includes "gpt" or "gpt_detailed"
        prompt_length: 95 // number of words in GPT response
      };

      try {
        const response = await axios.post('https://vision.astica.ai/describe', requestData, {
          headers: {
            'Content-Type': 'application/json',
          }
        })

        console.log(response.data)
        const GPTresponse = response.data.caption_GPTS 

        // send response data to telegram
        const sendMessageApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
        const sendMessageResponse = await axios.post(sendMessageApiUrl, {
          chat_id: chatId,
          text: GPTresponse
        })

        console.log(sendMessageResponse.data)

      } catch (error) {
        console.error("error running astica.ai")
      }


    } catch (error) {
      console.error('Error retrieving or downloading file:', error);
    }

  }



  // if (update.message.document) {
  //   const chatId = update.message.chat.id;
  //   const doc_fileId = update.message.document.file_id;
  //   console.log(`Message from chat ${chatId}: ${doc_fileId}`);
  // }


  res.sendStatus(200);  // respond to Telegram to acknowledge receipt
});

