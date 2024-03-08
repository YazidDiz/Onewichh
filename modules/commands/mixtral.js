const axios = require('axios');

module.exports.config = {
  name: "mixtral",
  version: "1.0",
  hasPermssion: 2,
  credits: "james",
  description: "Mixtral AI",
  usePrefix: true,
  commandCategory: "AI",
  usages: `${global.config.PREFIX}mixtral [prompt]`,
  cooldowns: 0,
  dependencies: {

  }
};

module.exports.run = async function ({ api, event, args }) {
  let {threadID, messageID} = event;
  let prompt = args.join(" ");

  if (!prompt) {
    api.sendMessage(`please provide a prompt.`, threadID, messageID)
  };

  if (prompt === "reset") {
    api.sendMessage(`resetting...`, threadID, messageID);
    let reset = `https://mixtral.aliestercrowley.com/reset?username=${event.senderID}`;
    try {
      await axios.get(reset);
      api.sendMessage('reset success', threadID, messageID);
    } catch (error) {
      api.sendMessage(`an error occurred while ressetting conversation.`, threadID, messageID);
    };
    return;
  };
  
  try {
    let url = `https://mixtral.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}&username=${event.senderID}`;
    let response = await axios.get(url);
    let result = response.data.response;

    api.sendMessage(result, threadID, messageID);
    
  } catch (error) {
    api.sendMessage(`an error occurred`)
  }
};