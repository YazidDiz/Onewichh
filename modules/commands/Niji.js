let axios = require('axios');
let fs = require('fs');

module.exports = {
  config: {
    name: 'niji',
    version: '1.0',
    credits : 'MarianCross/convert by zetsu',
    cooldowns : 0,
     hasPermission : 0 ,
description : 'A good command',
     usages : 'niji',
usePrefix : false,

    commandCategory: 'Image-Generate',
 
 
  
  },

  run: async function({ api, event, args }) {
    function r(msg) {
      api.sendMessage(msg, event.threadID, event.messageID);
    }

 

    try {
      const info = args.join(' ');
      const [prompt] = info.split('|').map(item => item.trim());
      const text = args.join(" ");
      if (!text) {
        return r("❎ | Please provide a prompt");
      }
      const modelParam = '1'; // Utilisation du premier modèle uniquement
      const apiUrl = `https://turtle-apis.onrender.com/api/sdxl?prompt=${prompt}&model=${modelParam}`;

      const startTime = new Date(); // Heure de début de la génération d'images

      r('Veuillez patienter...⏳');

      const form = {};
      form.attachment = [];

      // Générer quatre images
      for (let i = 0; i < 4; i++) {
        const response = await axios.get(apiUrl, {
          responseType: 'stream'
        });
        form.attachment.push(response.data);
      }

      const endTime = new Date(); // Heure de fin de la génération d'images
      const duration = (endTime - startTime) / 1000; // Durée en secondes

      // Créer le message d'attachement avec le nombre de secondes
      const attachmentMessage = `Voici les images générées 🎨 (${duration} secondes)`;

      // Envoyer les quatre images avec le message d'attachement
      api.sendMessage({
        body: attachmentMessage,
        attachment: form.attachment
      }, event.threadID);

    } catch (error) {
      console.error(error);
      r('❎ | Sorry, API has a skill issue');
    }
  }
};
