
let url = "https://sandipapi.onrender.com";
const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/cache/5dr.png';

module.exports = {
  config: {
    name: "generate",
  	version: "1.0.0",
  	hasPermssion: 0,
    credits: "Zetsu",
	  description: "Generate image in 23 models",
  	commandCategory: "Image-Generate",
      usePrefix : false,
  	usages: "[prompt | style]",
  	cooldowns: 0,
  },
  run: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    let g = `Usage : [prompt | style (1-23)]`;

    if (!args[0]) return r('Missing prompt and style\n\n'+g);
    
    const a = args.join(" ").split("|").map((item) => (item = item.trim()));

    let b = a[0], c = a[1];
    if (!b) return r('Missing prompt!');
    if (!c) return r('Missing style!\n\n'+g);
    try {
    const d = (await get(url+'/gen?prompt='+b+'&model='+c, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({body: `☁️ 𝙷𝚎𝚛𝚎 𝚒𝚜 𝚢𝚘𝚞𝚛 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚂𝚒𝚛 :`, attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}