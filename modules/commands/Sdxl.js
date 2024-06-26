
let url = "https://ai-tools.replit.app";
const { get } = require('axios'), fs = require('fs');
let f = __dirname+'/cache/sdxl.png';

module.exports = {
  config: {
    name: "sdxl",
  	version: "1.0.0",
  	hasPermssion: 0,
    credits: "Deku",
	  description: "Generate image in sdxl",
  	commandCategory: "Image-Generate",
      usePrefix : false,
  	usages: "[prompt | style]",
  	cooldowns: 0,
  },
  run: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }
    let g = `•——[Style list]——•\n\n1. Cinematic
2. Photographic
3. Anime
4. Manga
5. Digital Art
6. Pixel art
7. Fantasy art
8. Neonpunk
9. 3D Model`;

    if (!args[0]) return r('Missing prompt and style\n\n'+g);
    
    const a = args.join(" ").split("|").map((item) => (item = item.trim()));

    let b = a[0], c = a[1];
    if (!b) return r('Missing prompt!');
    if (!c) return r('Missing style!\n\n'+g);
    try {
    const d = (await get(url+'/sdxl?prompt='+b+'&styles='+c, {
      responseType: 'arraybuffer'
    })).data;
    fs.writeFileSync(f, Buffer.from(d, "utf8"));
    return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message)
    }
  }
}