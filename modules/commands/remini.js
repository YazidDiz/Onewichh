const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "4k",
  version: "1.0.",
  hasPermssion: 0,
  credits: "shiki",
  description: "enhance your photo ",
  usePrefix: false,
  commandCategory: "Image-Edit",
  usages: "< reply image >",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  let pathie = __dirname + `/cache/zombie.jpg`;
  const { threadID, messageID } = event;

  var mark = event.messageReply.attachments[0].url || args.join(" ");

  try {
    api.sendMessage("𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙞𝙣𝙜 𝙮𝙤𝙪𝙧 𝙞𝙢𝙖𝙜𝙚 𝙞𝙣 𝟰𝙠 𝙦𝙪𝙖𝙡𝙞𝙩𝙮...", threadID, messageID);
    const response = await axios.get(`https://allinoneapis.onrender.com/api/try/remini?url=${encodeURIComponent(mark)}`);
    const processedImageURL = response.data.image_data;

    const img = (await axios.get(processedImageURL, { responseType: "arraybuffer"})).data;

    fs.writeFileSync(pathie, Buffer.from(img, 'utf-8'));

    api.sendMessage({
      body: "𝟰𝙠 𝙀𝙣𝙝𝙖𝙣𝙘𝙚 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 ! 💎",
      attachment: fs.createReadStream(pathie)
    }, threadID, () => fs.unlinkSync(pathie), messageID);
  } catch (error) {
    api.sendMessage(`Error processing image: ${error}`, threadID, messageID);
  };
};