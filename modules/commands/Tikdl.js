const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "tikdl",
  version: "1.0.",
  hasPermission: 0,
  credits: "",
  description: "tiktok video download",
  usePrefix: false,
  commandCategory: "video",
  usages: "tikdl <url> <mp4-basic/mp4-hd/mp3>",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
  let link = args.join(" ");

  if (!link) {
    api.sendMessage("Please put a valid TikTok video link", event.threadID, event.messageID);
    return;
  }

  // Add your new API and choices here
  const apiUrl = `https://tf8k84-3000.csb.app/tikdl?url=${encodeURIComponent(link)}`;

  // Add your choices here
  const choices = ['mp4-basic', 'mp4-hd', 'mp3'];
  const choice = choices[Math.floor(Math.random() * choices.length)];

  api.sendMessage(`Downloading video (${choice}), please wait...`, event.threadID, event.messageID);

  try {
    let path = __dirname + `/cache/`;

    // Replace the old API with the new one
    let res = await axios.get(`${apiUrl}&type=${choice}&api=tikme`);
    await fs.ensureDir(path);

    path += `tiktok_video_${choice}.mp4`;

    const data = res.data.result.data;

    const vid = (await axios.get(data.play, { responseType: "arraybuffer" })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
    api.sendMessage({
      body: `==== downloaded ====\n━━━━━━━━━━━━━━━━━━\n→ Title: ${data.title}.\n→ Play Count: ${data.play_count}.\n→ Digg Count: ${data.digg_count}.\n→ Comment Count: ${data.comment_count}.\n→ Share Count: ${data.share_count}.\n→ Download Count: ${data.download_count}\n\n`,
      attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID);

  } catch (e) {
    api.sendMessage(`${e}`, event.threadID, event.messageID);
  }
};
