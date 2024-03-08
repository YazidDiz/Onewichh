
let url = "https://sandipapi.onrender.com";
const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/cache/restd.png';

module.exports = {
  config: {
    name: "rest",
  	version: "1.0.0",
  	hasPermssion: 0,
    credits: "Deku",
	  description: "Generate image on Render 3D",
  	commandCategory: "AI",
usePrefix : false,
  	usages: "[prompt]",
  	cooldowns: 5,
  },
  run: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    
    if (!args[0]) return r('Missing prompt!');
    
    const a = args.join(" ")
    if (!a) return r('Missing prompt!');
    const puti = model || "19";
    try {
    const d = (await get(url+'/gen?prompt='+a+'&model=${puti}', {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}