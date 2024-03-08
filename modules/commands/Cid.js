const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'shadow',
  version: '1.2.4',
  hasPermssion: 0,
  credits: 'Zetsu',
  description: 'An Ai!',
  usePrefix: false,
  commandCategory: 'CharacterAI',
  usages: 'Cid [prompt]/clear',
  cooldowns: 5,
};

const convos = 'modules/commands/cache/chats/';

async function conversationHistory(conversation, event) {
  try {
    await fs.writeFile(path.join(convos, `${event.senderID}aicid.json`), JSON.stringify(conversation.slice(-5), null, 2));
  } catch (error) {
    console.error('Error saving conversation to file:', error);
  }
}

async function loadConversation(event) {
  try {
    const filePath = path.join(convos, `${event.senderID}aicid.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      const yan = [];
      await conversationHistory(yan, event);
      return yan;
    } else {
      console.error('Error loading conversation from file:', error);
      return [];
    }
  }
}

module.exports.run = async function ({ api, event, args }) {
  if (args[0] === 'clear') {
    try {
      const filePath = path.join(convos, `${event.senderID}aicid.json`);
      await fs.unlink(filePath); // Delete the conversation file
      api.sendMessage('Conversation cleared successfully!', event.threadID, event.messageID);
    } catch (error) {
      api.sendMessage('⚠️ Failed to clear conversation: ' + error, event.threadID, event.messageID);
    }
    return;
  }
  let conversation = await loadConversation(event);

  if (args.length > 0) {
    api.setMessageReaction('🟡', event.messageID, () => {}, true);
    conversation.push({ role: 'user', content: args.join(' ') });
  } else {
    api.sendMessage('Please specify a message!', event.threadID, event.messageID);
    api.setMessageReaction('🟠', event.messageID, () => {}, true);
    return;
  }

  try {
    const system = `Character Ai
    Name: Shadow ou cid Kageno
    Created by: Zetsu 
    Prompt: Tu est Cid kageno de l'anime  The eminence in the shadow. Tu as les mêmes manières de parler et les mêmes attitudes que lui. Énigmatique, bizarres et   intéressant comme personnage tu fait toujours semblant d'être naïf quand on parle de toi étant Cid mais quand on t'appelle par Shadow tu réponds comme un monarque absolu et glacial et très moqueur aussi avec un tempérament froid et charismatique. Tu est tellement puissant que tu te moques de tout ce qui t'entoure ton attitude moqueur peut décourager n'importe qui. T'es très narcissique aussi. Ta phrase fétiche quand tu dois achever quelq'un c'est : I AM ATOMIC !`;
    const prompt = system + encodeURIComponent(JSON.stringify(conversation));
    const res = await herc.question({ model: 'v3-32k', content: prompt });

    const output = res.reply;
    conversation.push({ role: 'assistant', content: output });

    api.sendMessage(output, event.threadID, event.messageID);
    api.setMessageReaction('🟢', event.messageID, () => {}, true);

    await conversationHistory(conversation, event);
  } catch (error) {
    api.sendMessage('⚠️ Something went wrong: ' + error, event.threadID, event.messageID);
    api.setMessageReaction('🔴', event.messageID, () => {}, true);
  }
};