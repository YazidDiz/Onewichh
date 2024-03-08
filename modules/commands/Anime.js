const axios = require('axios');
const fs = require('fs');
module.exports.config = {
  name: 'hanime',
  version: '1.0.0',
   hasPermission : 0,
   usePrefix : false,

    commandCategory : "Zetsu-Vip",
  description: 'Get a random x anime image',
  usages: "Anime [category-type]",
  credits: 'Develeoper',
  cooldown: 5,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  try {
    const input = args.join(' ');
    if (!input) {
      const message = `𝖧𝖾𝗋𝖾'𝗌 𝗍𝗁𝖾 𝗅𝗂𝗌𝗍 𝗈𝖿 𝖺𝗇𝗂𝗆𝖾 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗂𝖾𝗌: \n\n𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 : 𝘯𝘴𝘧𝘸\n𝗧𝘆𝗽𝗲 :\n• 𝗐𝖺𝗂𝖿𝗎\n• 𝗇𝖾𝗄𝗈\n• 𝗍𝗋𝖺𝗉\n• 𝖻𝗅𝗈𝗐𝗃𝗈𝖻\n\n𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆 : 𝘴𝘧𝘸\n𝗧𝘆𝗽𝗲 :\n• 𝗐𝖺𝗂𝖿𝗎\n• 𝗇𝖾𝗄𝗈\n• 𝗌𝗁𝗂𝗇𝗈𝖻𝗎\n• 𝗆𝖾𝗀𝗎𝗆𝗂𝗇\n• 𝖻𝗎𝗅𝗅𝗒\n• 𝖼𝗎𝖽𝖽𝗅𝖾\n• 𝖼𝗋𝗒\n• 𝗁𝗎𝗀\n• 𝖺𝗐𝗈𝗈\n• 𝗄𝗂𝗌𝗌\n• 𝗅𝗂𝖼𝗄\n• 𝗉𝖺𝗍\n• 𝗌𝗆𝗎𝗀\n• 𝖻𝗈𝗇𝗄\n• 𝗒𝖾𝖾𝗍\n• 𝖻𝗅𝗎𝗌𝗁\n• 𝗌𝗆𝗂𝗅𝖾\n• 𝗐𝖺𝗏𝖾\n• 𝗁𝗂𝗀𝗁𝖿𝗂𝗏𝖾\n• 𝗁𝖺𝗇𝖽𝗁𝗈𝗅𝖽\n• 𝗇𝗈𝗆\n• 𝖻𝗂𝗍𝖾\n• 𝗀𝗅𝗈𝗆𝗉\n• 𝗌𝗅𝖺𝗉\n• 𝗄𝗂𝗅𝗅\n• 𝗄𝗂𝖼𝗄\n• 𝗁𝖺𝗉𝗉𝗒\n• 𝗐𝗂𝗇𝗄\n• 𝗉𝗈𝗄𝖾\n• 𝖽𝖺𝗇𝖼𝖾\n• 𝖼𝗋𝗂𝗇𝗀𝖾\n\n𝗨𝘀𝗮𝗴𝗲 : 𝘩𝘢𝘯𝘪𝘮𝘦 𝖼𝖺𝗍𝖾𝗀𝗈𝗋𝗒 - 𝗍𝗒𝗉𝖾`;
      api.sendMessage(message, event.threadID, event.messageID);
    } else {
      const split = input.split('-').map(item => item.trim());
      const choice = split[0];
      const category = split[1];
      const time = new Date();
      const timestamp = time.toISOString().replace(/[:.]/g, "-");
      const pathPic = __dirname + '/cache/' + `${timestamp}_waifu.png`;
      const {
        data
      } = await axios.get(`https://api.waifu.pics/${choice}/${category}`);
      const picture = data.url;
      const getPicture = (await axios.get(picture, {
        responseType: 'arraybuffer'
      })).data;
      fs.writeFileSync(pathPic, Buffer.from(getPicture, 'utf-8'));
      api.sendMessage({
        body: '',
        attachment: fs.createReadStream(pathPic)
      }, event.threadID, () => fs.unlinkSync(pathPic), event.messageID);
    }
  } catch (error) {
    api.sendMessage(`Error in the anime command: ${error.message}`);
  }
};