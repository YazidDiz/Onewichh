let url = "https://sandipapi.onrender.com";
const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/cache/7dr.png';

module.exports = {
  config: {
    name: "imagine",
  	version: "1.0.0",
  	hasPermssion: 0,
    credits: "Zetsu",
	  description: "Generate image",
  	commandCategory: "Image-Generate",
      usePrefix : false,
  	usages: "[prompt]",
  	cooldowns: 0,
  },
  run: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    let g = `Usage : [prompt]`;

    if (!args[0]) return r('Missing prompt \n\n'+g);
    
    const a = args.join(" ");



    
    try {
    const d = (await get(url+'/imagine?prompt='+a, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({body: `☁️ 𝙷𝚎𝚛𝚎 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚂𝚒𝚛 :`, attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}