const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: 'anime',
    version: '1.0',
    credits: 'OpenAI',
    hasPermission: 0,
    description: 'Fetches an anime image',
    commandCategory: '🖼️ Image',
    usePrefix: false,
    cooldowns: 2
  },

  run: async function({ api, event }) {
    try {
      const apiUrl = 'https://sandipapi.onrender.com/anime';
      const response = await axios.get(apiUrl);

      if (response && response.data && response.data.url) {
        const imageUrl = response.data.url;

        const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imagePath = __dirname + '/cache/anime_image.png';

        fs.writeFileSync(imagePath, Buffer.from(imageBuffer.data, 'binary'));

        api.sendMessage({
          body: 'Voici votre image d\'anime:',
          attachment: fs.createReadStream(imagePath)
        }, event.threadID, event.messageID);
      } else {
        api.sendMessage('❌ | Désolé, aucune image trouvée.', event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('❌ | Désolé, une erreur est survenue lors de la récupération de l\'image.', event.threadID, event.messageID);
    }
  }
};
