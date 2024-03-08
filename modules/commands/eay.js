const axios = require('axios');

module.exports.config = {
  name: "token",
  version: "1.8.7",
  hasPermssion: 0,
  credits: "𝙰𝚒𝚗𝚣",
  usePrefix: false,
  description: "( 𝙶𝚎𝚝 𝚃𝚘𝚔𝚎𝚗 𝙴𝚊𝚊𝚊𝚊𝚊𝚢 )",
  commandCategory: "no prefix",
  usages: "( 𝚃𝚘𝚔𝚎𝚗 𝙶𝚎𝚝𝚝𝚎𝚛)",
  cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {
    const username = args[0];
    const password = args[1];
  if(!username || !password) {
api.sendMessage(`🔴 | 𝚄𝚜𝚊𝚐𝚎: 𝚎𝚊𝚢 [ 𝚞𝚜𝚎𝚛𝚗𝚊𝚖𝚎/𝚖𝚘𝚋𝚒𝚕𝚎𝚗𝚞𝚖𝚋𝚎𝚛/𝚎𝚖𝚊𝚒𝚕/𝚞𝚜𝚎𝚛𝙸𝙳 ] [ 𝚙𝚊𝚜𝚜𝚠𝚘𝚛𝚍 ]`, event.threadID, event.messageID);
return;
  }
api.sendMessage(`🕒 | 𝙶𝚎𝚝𝚝𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗 𝚏𝚘𝚛 ${username}, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝 𝚞𝚜𝚎𝚛.`, event.threadID, event.messageID);

      try {
        const response = await axios.get('https://syntic.onrender.com/ainz/api', {
          params: {
            username: username,
            password: password,
          },
        });
        
        if (response.data.access_token) {
          const token = response.data.access_token;
          api.sendMessage(`🟢 | 𝐓𝐨𝐤𝐞𝐧 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞𝐝 | 🟢\n\n${token}`, event.threadID);
        } else {
          api.sendMessage(`🔴 𝚂𝚘𝚛𝚛𝚢 𝚒 𝚌𝚊𝚗'𝚝 𝚐𝚎𝚝 𝚢𝚘𝚞𝚛 𝚝𝚘𝚔𝚎𝚗 𝚋𝚎𝚌𝚊𝚞𝚜𝚎 𝚒𝚝𝚜 ${response.data.message}`, event.threadID);
        }
      } catch (error) {
        console.error("🔴 | 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗", error);
        api.sendMessage("🔴 | 𝙴𝚛𝚛𝚘𝚛 𝚏𝚎𝚝𝚌𝚑𝚒𝚗𝚐 𝚝𝚘𝚔𝚎𝚗, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚝𝚛𝚢 𝚊𝚐𝚊𝚒𝚗 𝚕𝚊𝚝𝚎𝚛.", event.threadID);
  } 
};