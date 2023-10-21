const axios = require('axios')
require('dotenv').config();

const botToken = process.env.telegramBotToken
const webhookUrl = process.env.telegramWebhook

async function setWebhookUrl() {

    try {
        const response = await axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
            url: webhookUrl
        })

        console.log("Webhook set successfully:", response.data)

    }catch(error){

        console.error("Error setting webhook:", error)

    }
}

module.exports = { setWebhookUrl }

