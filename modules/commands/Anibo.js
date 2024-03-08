module.exports.config = {
  name: "aniboobs",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sake / Christian",///sige change
  description: "aniboobs Pictures.",
  commandCategory: "nsfw",
  usePrefix : false,
  cooldowns: 1,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.imgur.com/xCIVmCS.jpeg",
"https://i.imgur.com/Gk6SlAm.jpeg",
"https://i.imgur.com/vWzJLMs.jpeg",
"https://i.imgur.com/yJ8keQm.jpeg",
"https://i.imgur.com/Y44VtdT.jpeg",
"https://i.imgur.com/99vkPZw.jpeg",
"https://i.imgur.com/vXYkTg2.jpeg",
"https://i.imgur.com/4NBVhqV.jpeg",
"https://i.imgur.com/ejnltbC.jpeg",
"https://i.imgur.com/SMHpdk3.jpeg",
"https://i.imgur.com/NRsI0Pg.jpeg",
"https://i.imgur.com/umT8owc.jpeg",
"https://i.imgur.com/HKryIdg.jpeg",
"https://i.imgur.com/RvTpYPT.jpeg",
"https://i.imgur.com/stLCvzs.jpeg",
"https://i.imgur.com/mk2NVtB.jpeg",
"https://i.imgur.com/f1p6m5V.jpeg",
"https://i.imgur.com/5VdBoAj.jpeg",
"https://i.imgur.com/pgRSbjl.jpeg",
"https://i.imgur.com/EqBYArM.jpeg",
"https://i.imgur.com/RaemYJ1.jpeg",
"https://i.imgur.com/eb32rS5.jpeg",
"https://i.imgur.com/uklZHYQ.jpeg",
"https://i.imgur.com/O6MPGfB.jpeg",
"https://i.imgur.com/oUdfKTN.jpeg",
"https://i.imgur.com/R0OPgO9.jpeg",
"https://i.imgur.com/eczjPV0.jpeg",
"https://i.imgur.com/9Dzo83O.jpeg",
"https://i.imgur.com/0yHCBKr.jpeg",
"https://i.imgur.com/gz5dH2h.jpeg",
  ];
   var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };