module.exports.config = {
  name: "prefix",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Unknown",
  description: "See the bot prefix",
  usePrefix:false,
  commandCategory: "Admin",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "Unknown") { return api.sendMessage(`Changed credits!`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh", "duong"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`️️️️️️️️️️️️️️️️️️️️️️️️️𝗛𝗲𝗿𝗲 𝗶𝘀 𝗺𝘆 𝗽𝗿𝗲𝗳𝗶𝘅`)
      }
     else return out(`┏𝙋𝙍𝙀𝙁𝙄𝙓 : ⇛ [ ${global.config.PREFIX} ] ⇚\n☁️ 𝘛𝘢𝘱𝘦 ${global.config.PREFIX}𝘩𝘦𝘭𝘱 𝘱𝘰𝘶𝘳 𝘷𝘰𝘪𝘳 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 𝘥𝘪𝘴𝘱𝘰𝘯𝘪𝘣𝘭𝘦𝘴\n┗━━━━⌾\n                  ━━◊━━     \n 𝗭𝗲𝘁𝘀𝘂 𝗔𝗶 𝗽𝗼𝘂𝗿 𝘃𝗼𝘂𝘀 𝗦𝗲𝗿𝘃𝗶𝗿`)
    }
  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage(`️️️️️️️️️️️️️️️️️️️️️️️️️┏𝙋𝙍𝙀𝙁𝙄𝙓 : ⇛ [ ${global.config.PREFIX} ] ⇚\n☁️ 𝘛𝘢𝘱𝘦 ${global.config.PREFIX}𝘩𝘦𝘭𝘱 𝘱𝘰𝘶𝘳 𝘷𝘰𝘪𝘳 𝘭𝘦𝘴 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 𝘥𝘪𝘴𝘱𝘰𝘯𝘪𝘣𝘭𝘦𝘴\n┗━━━━⌾\n                  ━━◊━━     \n 𝗭𝗲𝘁𝘀𝘂 𝗔𝗶 𝗽𝗼𝘂𝗿 𝘃𝗼𝘂𝘀 𝗦𝗲𝗿𝘃𝗶𝗿`, event.threadID)
}