const axios = require("axios");
const fs = require("fs");
const path = require("path");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "nijix",
    
    version: "1.0",
    credits: "SiAM | Turtle APIs",
    cooldowns: 5,
    hasPermission: 0,
    usePrefix: false,
    commandCategory: "Zetsu-Vip",
    Description: 
       "Text to Image"
    ,
    usages: 
       "{prefix}prompt --ar [ratio] or reply an image\n\n Example: {prefix} 1girl, cute face, masterpiece, best quality --ar 16:9\n[ default 1:1 ]"
    
  },
  run: async function ({ api, args, message, event }) {
    try {
      let prompt = "";
      let imageUrl = "";
      let aspectRatio = "";

      const aspectIndex = args.indexOf("-r");
      if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
        aspectRatio = args[aspectIndex + 1];
        args.splice(aspectIndex, 2);
      }

      if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
        imageUrl = encodeURIComponent(event.messageReply.attachments[0].url);
      } else if (args.length === 0) {
        api.sendMessage("Please provide a prompt or reply to an image.", event.threadID, event.messageID);
        return;
      }

      if (args.length > 0) {
        prompt = args.join(" ");
      }

      if (imageUrl) {
        imageUrl = await tinyurl.shorten(imageUrl);
      }

      let apiUrl = `https://project-niji.onrender.com/api/generate?prompt=${encodeURIComponent(prompt)}.&aspectRatio=${aspectRatio}&apikey=rehat&key=siam`;
      if (imageUrl) {
        apiUrl += `&imageUrl=${imageUrl}`;
      }

      const processingMessage = await api.sendMessage("Initiating Request 🎨", event.threadID);
      api.setMessageReaction("🖌️", event.messageID, (err) => {}, true);

      const response = await axios.post(apiUrl);
      const img = response.data.url;

      const downloadLink = `Your Imagination Is Created 🌟\nDownload: ${img}`;

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${img.split("/").pop()}`);
      const writer = fs.createWriteStream(imagePath);
      const imageResponse = await axios({
        url: img,
        method: 'GET',
        responseType: 'stream'
      });

      imageResponse.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      const stream = fs.createReadStream(imagePath);
      await api.sendMessage({
        body: downloadLink,
        attachment: stream
      }, event.threadID);

      await api.unsendMessage(processingMessage.messageID);
      await api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred.", event.threadID, event.messageID);
      api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    }
  }
};
