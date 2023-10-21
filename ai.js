// sending image to AI model
const axios = require('axios');

const asticaApi = process.env.asticaApi

async function processImage(file) {

  const requestData = {
    tkn: asticaApi,  // visit https://astica.ai
    modelVersion: '2.1_full', // 1.0_full, 2.0_full, or 2.1_full
    input: file,
    visionParams: 'gpt_detailed, text_read', // comma separated, defaults to all
    gpt_prompt: `As a bookkeeping accountant, retrieve these: 1. Transaction Date 2. Item/Service Description 3. Total Cost paid 4. Vendor Name`,
    prompt_length: 95 // number of words in GPT response
  };

  try {
    console.log("Start")
    let response = await axios.post('https://vision.astica.ai/describe', requestData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log("start 2")

    console.log(response.data)
    let data = response.data.caption_GPTS
    return data

  } catch (error) {

    console.error("error running astica.ai:", error)
    
  }

}

module.exports = { processImage }
