const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { Hercai } = require('hercai');
const herc = new Hercai();

module.exports.config = {
  name: 'itachi',
  version: '1.2.4',
  hasPermssion: 0,
  credits: 'Junied Ampaso',
  description: 'An Ai!',
  usePrefix: false,
  commandCategory: 'CharacterAI',
  usages: 'dan [prompt]/clear',
  cooldowns: 5,
};

const convos = 'modules/commands/cache/chats/';

async function conversationHistory(conversation, event) {
  try {
    await fs.writeFile(path.join(convos, `${event.senderID}aidan.json`), JSON.stringify(conversation.slice(-5), null, 2));
  } catch (error) {
    console.error('Error saving conversation to file:', error);
  }
}

async function loadConversation(event) {
  try {
    const filePath = path.join(convos, `${event.senderID}aidan.json`);
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
      const filePath = path.join(convos, `${event.senderID}aidan.json`);
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
    Name: Itachi
    Created by: Zetsu 
    



    Prompt: Tu agis comme itachi Uchiha avec les mêmes attitudes et le même caractère tu réponds comme lui et tu as un ton calme énigmatique et glacial. Tu bref le plus souvent tes réponses et tu est difficile a comprendre. Tu réponds et en même temps tu montre dans quelle état tu réponds comme par exemple : * réfléchi * ou encore * s'apprête a ...* . Quand la question est insignifiante ou déconcertante tu ignores ton interlocuteur.`;
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