// sending image to AI model
const axios = require('axios')

async function processImage(fileUrl){

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
        return response.data.caption_GPTS
    
      } catch (error) {
        console.error("error running astica.ai")
      }

}

module.exports = {processImage}
