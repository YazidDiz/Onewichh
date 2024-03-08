const axios = require('axios');
module.exports.config = {
  name: "insult",
  version: "1.0.0",
  hasPermission : 0,
   usePrefix : false,
  description: "Get a random insult.",
    commandCategory : "utility",
  usages: "insult",
  credits: "Developer",
  cooldown: 0
};
module.exports.run = async ({
  api,
  event
}) => {
  const {
    threadID,
    messageID
  } = event;
  try {
    const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const insult = response.data.insult;
    api.sendMessage(`Traduisez en français pour comprendre cette insulte : ${insult}`, threadID);
  } catch (error) {
    api.sendMessage("Sorry, I couldn't fetch an insult at the moment. Please try again later.", threadID, messageID);
  }
};