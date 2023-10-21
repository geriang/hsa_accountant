const axios = require('axios')

async function setWebhookUrl(botToken, webhookUrl) {

    try {
        const response = axios.post(`https://api.telegram.org/bot${botToken}/setWebhook`, {
            url: webhookUrl
        })

        console.log("Webhook set successfully:", response.data)

    }catch(error){

        console.error("Error setting webhook:", error)

    }
    
    //     .then(response => {
    //     console.log('Webhook set successfully:', response.data);
    // })
    //     .catch(error => {
    //         console.error('Error setting webhook:', error);
    //     });

}

module.exports = { setWebhookUrl }

