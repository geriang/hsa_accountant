const express = require('express')
const router = express.Router();
const axios = require('axios');
const { updateGoogleSheet } = require("./../sheet")
const { processImage } = require("./../ai")

// Telegram setup
const botToken = process.env.telegramBotToken
const telegramApiUrl = `https://api.telegram.org/bot${botToken}`;


router.post('/', async (req, res) => {
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


      let aiResponse = await processImage(fileUrl)

      // send response data to telegram
      const sendMessageApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
      const sendMessageResponse = await axios.post(sendMessageApiUrl, {
        chat_id: chatId,
        text: aiResponse
      })

      console.log(sendMessageResponse.data)

      await updateGoogleSheet()

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

module.exports = router