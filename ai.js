// sending image to AI model
const axios = require('axios');

const asticaApi = process.env.asticaApi

async function processImage(file) {

  const requestData = {
    tkn: asticaApi,  // visit https://astica.ai
    modelVersion: '2.1_full', // 1.0_full, 2.0_full, or 2.1_full
    input: file,
    visionParams: 'gpt_detailed, text_read', // comma separated, defaults to all
    gpt_prompt: `You are a bookkeeping accountant. Extract: 1. Date: <in DDMMYY> 2. Expenses Category: <in 2 words> 3. Total Cost: <number> 4. Vendor: <words>`,
    prompt_length: 20 // number of words in GPT response
  };

  try {
    let response = await axios.post('https://vision.astica.ai/describe', requestData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    console.log(response.data)
    let data = response.data.caption_GPTS
    return data

  } catch (error) {

    console.error("error running astica.ai:", error)
    
  }

}

module.exports = { processImage }
