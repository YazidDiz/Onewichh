module.exports.config = {
  name: "sing",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "Clark",
  description: "Play a song",
  usePrefix: false,
  commandCategory: "music",
  usages: "[title]",
  cooldowns: 10,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};
 
module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");
 
  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");
 
  if (data.length < 2) {
    return api.sendMessage("ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗎𝗍 𝗌𝗈𝗆𝖾 𝗌𝗈𝗇𝗀 𝗍𝗂𝗍𝗅𝖾.", event.threadID);
  }
 
  data.shift();
  const song = data.join(" ");
 
  try {
    api.sendMessage(`🎶 | 𝐑𝐞𝐜𝐡𝐞𝐫𝐜𝐡𝐞 𝐝𝐞 "${song}" 𝐞𝐧 𝐜𝐨𝐮𝐫𝐬. 𝐕𝐞𝐮𝐢𝐥𝐥𝐞𝐳 𝐩𝐚𝐭𝐢𝐞𝐧𝐭𝐞𝐫...`, event.threadID);
 
    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("❎ | 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗁𝖺𝗌 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽.\n\n𝗘𝗿𝗿𝗼𝗿: 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗋𝖾𝗊𝗎𝖾𝗌𝗍.", event.threadID, event.messageID);
    }
 
    const video = searchResults.videos[0];
    const videoUrl = video.url;
 
    const stream = ytdl(videoUrl, { filter: "audioonly" });
 
    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;
 
    stream.pipe(fs.createWriteStream(filePath));
 
    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });
 
    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });
 
    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');
 
      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('❎ | 𝖳𝗁𝖾 𝖿𝗂𝗅𝖾 𝖼𝗈𝗎𝗅𝖽 𝗇𝗈𝗍 𝖻𝖾 𝗌𝖾𝗇𝗍 𝖻𝖾𝖼𝖺𝗎𝗌𝖾 𝗂𝗍 𝗂𝗌 𝗅𝖺𝗋𝗀𝖾𝗋 𝗍𝗁𝖺𝗇 𝟤𝟧𝖬𝖡.', event.threadID);
      }
 
      const message = {
        body: `✅ | 𝐕𝐨𝐢𝐜𝐢 𝐯𝐨𝐭𝐫𝐞 𝐂𝐡𝐚𝐧𝐬𝐨𝐧 !\n━━━━━━━━━━━━━━━━━━━\n💠 𝐓𝐢𝐭𝐫𝐞 : ${video.title}\n💠 𝐀𝐫𝐭𝐢𝐬𝐭𝐞 : ${video.author.name}\n━━━━━━━━━━━━━━━━━━━`,
        attachment: fs.createReadStream(filePath)
      };
 
      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('❎ | 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽.', event.threadID);
  }
};