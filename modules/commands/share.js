const axios = require('axios');

module.exports.config = {
  name: "share",
  version: "1.0",
  hasPermssion: 0,
  credits: "Tite",
  usePrefix: true,
  description: "Share a post on Facebook",
  commandCategory: "Social",
  cooldowns: 0
};

// Start Execution
module.exports.run = async ({ api, event, args }) => {
try {
    const token = args[0];
    const url = args[1];
    const amount = args[2]
  if(!token || !url || !amount) {
api.sendMessage(`🔴 | {pref}[nameofcmd] [token] [url] [amount]`, event.threadID, event.messageID);
return;
  }
const res = await axios.get(`https://share-api.onrender.com/share?accessToken=${token}&shareUrl=${url}&shareAmount=${amount}`);
api.sendMessage(`Waiting for response!`, event.threadID, event.messageID);
    api.sendMessage(`${res.data.message}`, event.threadID);
  } catch (error) {
    api.sendMessage("Unable to boost because ${res.data.error}", event.threadID);
  }
};