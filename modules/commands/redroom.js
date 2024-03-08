const axios = require('axios');
const fs = require('fs');
const path = require('path');

const cooldowns = {};

module.exports.config = {
  name: "redroomv2",
  version: "1.5.8",
  hasPermssion: 0,
  credits: "Hazeyy",
  usePrefix: false,
  description: "( 𝚁𝚎𝚍𝚛𝚘𝚘𝚖 2 )",
  commandCategory: "nsfw",
  usages: "( 𝚁𝚎𝚍𝚛𝚘𝚘𝚖 𝚏𝚘𝚛 𝚖𝚊𝚗𝚢𝚊𝚔 𝚘𝚗𝚕𝚢 )",
  cooldowns: 10,
};

module.exports.handleEvent = async function ({ api, event }) {
if (!(event.body.indexOf("redroomv2") === 0 || event.body.indexOf("Redroomv2") === 0)) return;
  
     const args = event.body.split(/\s+/);;
    args.shift();

  const userId = event.senderID;
  const cooldownTime = module.exports.config.cooldowns * 10000;

  if (cooldowns[userId] && Date.now() - cooldowns[userId] < cooldownTime) {
    const remainingTime = Math.ceil((cooldowns[userId] + cooldownTime - Date.now()) / 10000);
    api.sendMessage(`🕦 𝙷𝚎𝚢 𝚊𝚛𝚎 𝚢𝚘𝚞 𝚜𝚝𝚞𝚙𝚒𝚍? 𝙲𝚊𝚗't 𝚢𝚘𝚞 𝚜𝚎𝚎? 𝙸'𝚖 𝚜𝚝𝚒𝚕𝚕 𝚌𝚘𝚘𝚕𝚍𝚘𝚠𝚗 𝚒𝚗 » ${remainingTime} 𝚜𝚎𝚌𝚘𝚗𝚍𝚜 « `, event.threadID, event.messageID);
    return;
  }

  try {
    api.sendMessage("📀 | 𝚂𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID, event.messageID);

    const { data } = await axios.get("https://hazeyybold.replit.app/hazeyy", { responseType: "arraybuffer" });
    console.log('🔴 𝚁𝚎𝚍𝚛𝚘𝚘𝚖 𝚛𝚎𝚜𝚙𝚘𝚗𝚜𝚎:', data);

    api.sendMessage("🐱 | 𝚁𝚎𝚖𝚒𝚗𝚍𝚎𝚛:\n\n𝚃𝚑𝚎 𝚟𝚒𝚍𝚎𝚘 𝚠𝚒𝚕𝚕 𝚋𝚎 𝚜𝚎𝚗𝚝 𝚒𝚗 𝚊 𝚏𝚎𝚠 𝚖𝚒𝚗𝚞𝚝𝚎𝚜/𝚜𝚎𝚌.", event.threadID, event.messageID);

    const randomFileName = `${Math.floor(Math.random() * 99999999)}.mp4`;
    const filePath = path.join(__dirname, "cache", randomFileName);

    fs.writeFileSync(filePath, Buffer.from(data, 'binary'));

    const message = {
      body: "🎥 𝙷𝚎𝚛𝚎\'𝚜 𝚢𝚘𝚞𝚛 𝚟𝚒𝚍𝚎𝚘 𝚠𝚊𝚝𝚌𝚑 𝚠𝚎𝚕𝚕.",
      attachment: fs.createReadStream(filePath),
    };

    api.sendMessage(message, event.threadID, (err, msgInfo) => {
      if (!err) {
      } else {
        console.error('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘...', err);
        api.sendMessage('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘.', event.threadID, event.messageID);
      }
    });

    cooldowns[userId] = Date.now();
  } catch (error) {
    console.error('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘...', error);
    api.sendMessage('🐱 𝙴𝚛𝚛𝚘𝚛 𝚜𝚎𝚗𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘.', event.threadID, event.messageID);
  }
};

module.exports.run = async function({api, event}) {};




