const axios = require('axios')
const botToken = process.env.telegramBotToken
const webhookUrl = process.env.telegramWebhook

async function setWebhookUrl() {

    try {
        const response = axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
            url: webhookUrl
        })

        console.log("Webhook set successfully:", response.data)

    }catch(error){

        console.error("Error setting webhook:", error)

    }
}

module.exports = { setWebhookUrl }

