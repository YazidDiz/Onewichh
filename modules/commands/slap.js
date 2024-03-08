
const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "gifle",
  version: "3.0.0",
  hasPermssion: 0,
  credits: `mysterious`,
  description: "it's just imitated because the old slap doesn't work",
  commandCategory: "fun",
    usePrefix : false,
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [ "https://i.postimg.cc/1tByLBHM/anime-slap.gif", ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Mention 1 person that you want to slap", threadID, messageID);
   var callback = () => api.sendMessage({body:`J'ai giflé ${tag} ! \n\n*Désolé, j'avais cru voir un moustique sur ton vilain visage 🧟‍♂️*`,
mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/slap.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/slap.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/slap.gif")).on("close",() => callback());
}