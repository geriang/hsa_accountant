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
    const highest_res = image_files[image_files.length]
    const image_fileId = highest_res.file_id
    console.log(`Message from chat ${chatId}: ${image_fileId}`)
    
    try {
      // Get file path from Telegram
      const filePathResponse = await axios.post(`${telegramApiUrl}/getFile`, { file_id: image_fileId });
      const filePath = filePathResponse.data.result.file_path;

      // Download the file
      const fileUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;
      console.log(`image file url: ${fileUrl}`)
      // const fileResponse = await axios.get(fileUrl, { responseType: 'stream' });
      // const writer = fs.createWriteStream('<path-to-save-file>');
      // fileResponse.data.pipe(writer);

      // writer.on('finish', () => {
      //     console.log('File downloaded successfully');
      // });
      // writer.on('error', (error) => {
      //     console.error('Error downloading file:', error);
      // });
  } catch (error) {
      console.error('Error retrieving or downloading file:', error);
  }

    
  }
  if (update.message.document) {
    const chatId = update.message.chat.id;
    const doc_fileId = update.message.document.file_id;
    console.log(`Message from chat ${chatId}: ${doc_fileId}`);
  }


  res.sendStatus(200);  // respond to Telegram to acknowledge receipt
});

