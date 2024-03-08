const fs = require("fs");
const path = require("path");
const axios = require("axios");
const tinyurl = require('tinyurl');

module.exports = {
  config: {
    name: "animagine",
    version: "1.0",
    credits: "Kshitiz",
    cooldowns : 10,
    hasPermission : 0,
    usePrefix : false,

    commandCategory: "ai",
   


  },
  run: async function ({ api, event, args }) {
    api.setMessageReaction("🕐", event.messageID, (err) => {}, true);
    try {
      let imageUrl = null;
      let prompt = '';

      if (event.type === "message_reply") {
        const attachment = event.messageReply.attachments[0];
        if (!attachment || !["photo", "sticker"].includes(attachment.type)) {
          return api.sendMessage("ayo reply to an image", event.threadID, event.messageID);
        }
        imageUrl = attachment.url;
      } else if (args.length > 0 && args[0].startsWith("http")) {
        imageUrl = args[0];
      } else if (args.length > 0) {
        prompt = args.join(" ").trim();
      } else {
        return api.sendMessage("Please reply to an image or provide a valid prompt.", event.threadID, event.messageID);
      }

      if (imageUrl) {
        const shortUrl = await tinyurl.shorten(imageUrl);
        const promptResponse = await axios.get(`https://www.api.vyturex.com/describe?url=${encodeURIComponent(shortUrl)}`);
        prompt = promptResponse.data;
      }

      const promptApiUrl = `https://text2image-wine.vercel.app/kshitiz?prompt=${encodeURIComponent(prompt)}&model=1`;
      const response = await axios.get(promptApiUrl);
      const { task_id } = response.data;

      const progressApiUrl = `https://progress-black.vercel.app/progress?imageid=${task_id}`;

      let imgDownloadLink = null;

      while (!imgDownloadLink) {
        const progressResponse = await axios.get(progressApiUrl);
        const { status, imgs } = progressResponse.data.data;

        if (status === 2 && imgs && imgs.length > 0) {
          imgDownloadLink = imgs[0];
        }

        await new Promise(resolve => setTimeout(resolve, 5000));
      }

      const cacheFolderPath = path.join(__dirname, "/cache");
      if (!fs.existsSync(cacheFolderPath)) {
        fs.mkdirSync(cacheFolderPath);
      }
      const imagePath = path.join(cacheFolderPath, `${task_id}.png`);
      const writer = fs.createWriteStream(imagePath);
      const imageResponse = await axios({
        url: imgDownloadLink,
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
        body: "",
        attachment: stream
      }, event.threadID);

    } catch (error) {
      console.error("Error:", error.message);
      api.sendMessage("❌ | An error occurred. Please try again later.", event.threadID, event.messageID);
    }
  }
};
