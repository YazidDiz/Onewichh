const axios = require('axios');

module.exports.config = {
  name: "Llama",
  version: "1.0",
  hasPermssion: 2,
  credits: "james",
  description: "Llama ai",
  usePrefix: true,
  commandCategory: "AI",
  usages: `${global.config.PREFIX}Llama [prompt]`,
  cooldowns: 0,
  dependencies: {

  }
};
module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
  let prompt = args.join(" ");
  if (!prompt) {
    api.sendMessage('please provide a prompt', threadID, messageID);
  };

  if (prompt === "reset") {
    api.sendMessage('ressseting conversation...', threadID, messageID);
    let reset = `https://llama.aliestercrowley.com/reset?username=${event.senderID}`;
    try {
      await axios.get(reset);
      api.sendMessage('reset success', threadID, messageID);
      
    } catch (error) {
      api.sendMessage('an error occurred while ressetting conversation.');
    }
    return;
  };

  
  try {
    let url = `https://llama.aliestercrowley.com/api?prompt=${prompt}&username=${event.senderID}`
    const response = await axios.get(url);
    let result = response.data.response;
    api.sendMessage(result, threadID, messageID);
  } catch (error) {
    api.sendMessage('an error occurred', threadID, messageID);
  };
};