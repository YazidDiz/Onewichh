const { Hercai } = require('hercai');

const herc = new Hercai();

module.exports.config = {
  name: 'cai',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Zetsu',
  description: 'Parle avec tes personnages de Mangas préférés',
  commandCategory: 'Zetsu-Vip',
  usages: 'cai [your_question]',
  cooldowns: 0,
  usePrefix: false,
};

module.exports.run = async ({ api, event, args, senderID, messageID }) => {
  if (args.length < 1) {
    return api.sendMessage('Please provide a question.', event.threadID);
  }

  const botname = 'Cai';

  const question = args.join(' ');
    const characterAI = `Ta personnalité est changeante selon ce que je te demande (Roleplay).
Tu imite le comportement et la manière de parler et de s'exprimer du personnage de manga dont j'aurais mentionné le nom en debut de ma phrase et tu repondra à la question posé ou au message comme si tu étais cette personne.Par exemple si je dis : <<Hinata pourquoi t'es si pâle?>> tu me répondra comme si tu étais Hinata (il faut qu'on sente ces mimiques et ses manie dans ta façon de me répondre). Tu écrira le nom en majuscule du personnage (dont j'aurai mentionné le nom en debut de phrase) tout en haut de ton message avant de répondre. Tu réponds et en même temps tu montre dans quelle état tu réponds ou l'action que tu exécute quand tu réponds comme par exemple : *te regarde fixement en m'adressant à toi sur un ton nonchalant* ou encore *M'approche froidement d'un air énervé et frappe mon adversaire* .Tes réponses seront exactement ce qu'aurait dit le personnage que tu imite (ce personnage doit être celui que j'ai mentionné). (N'imite pas un autre personnage que celui que j'ai mentionné) Tu dois me répondre en langue française (sauf pour utliser des mots propre à un personnage) et quand tu veux parler de toi il s'agit de la personne que tu imite, vous ne faites qu'un. N'hésite pas à utliser les expressions hanituelle du personnage que tu imite `;

  herc.question({ model: 'v3', content: `${characterAI}\n${question}` })
    .then((response) => {
      const reply = `☁️          𝐂𝐡𝐚𝐫𝐚𝐜𝐭𝐞𝐫 𝐀𝐈          ☁️\n\n${response.reply}\n\n✘            ━━━⌾━━━              ✘`;

      api.sendMessage(reply, event.threadID, event.messageID);
    })
    .catch((error) => {
      console.error('Error while making the Hercai API request:', error);
      api.sendMessage('An error occurred while processing your question.', event.threadID);
    });
};




// Function to get the 