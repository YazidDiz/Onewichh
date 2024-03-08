module.exports.config = {

  name: "cdp",

  version: "1.0.0",

  hasPermssion: 0,

  credits: "John Arida/Change Api by Siegfried Sama",

  description: "couple dp",

  commandCategory: "🖼️ image",
    usePrefix : false,

    cooldowns: 2,

};

module.exports.run = async function({ api, event, args }) {

    const axios = require("axios")

    const request = require("request")

    const fs = require("fs-extra")

    const res = await axios.get(`https://tanjiro-api.onrender.com/cdp?api_key=tanjiro`);

    var msg2 = res.data.result;

    var msg = [];

    let img1 = `${res.data.male}`;

    let img2 = `${res.data.female}`;

    let imgs1 = (await axios.get(`${img1}`, {

        responseType: 'arraybuffer'

    })).data;

    fs.writeFileSync(__dirname + "/cache/img1.png", Buffer.from(imgs1, "utf-8"));

    let imgs2 = (await axios.get(`${img2}`, {

        responseType: 'arraybuffer'

    })).data;

    fs.writeFileSync(__dirname + "/cache/img2.png", Buffer.from(imgs2, "utf-8"));

    var allimage = [];

    allimage.push(fs.createReadStream(__dirname + "/cache/img1.png"));

    allimage.push(fs.createReadStream(__dirname + "/cache/img2.png"));

	    {

        msg += `${msg2}`

    }

    

    return api.sendMessage({

        body: msg,

        attachment: allimage

    }, event.threadID, event.messageID);

}