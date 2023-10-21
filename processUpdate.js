const axios = require('axios');

const botToken = process.env.botToken;
const telegramApiUrl = `https://api.telegram.org/bot${botToken}`;
let offset = 0;

async function getUpdates() {
    try {
        const response = await axios.get(`${telegramApiUrl}/getUpdates`, {
            params: {
                offset: offset,
                timeout: 100  // Timeout in seconds; adjust as needed
            }
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching updates:', error);
        return [];
    }
}

async function processUpdate(update) {
    // Add your logic to process the update here
    console.log(`Processed update ${update.update_id}`);
}

async function main() {
    while (true) {
        const updates = await getUpdates();
        for (const update of updates) {
            await processUpdate(update);
            offset = update.update_id + 1;
        }
        // Sleep for a short duration before fetching updates again
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

module.exports = {main}
