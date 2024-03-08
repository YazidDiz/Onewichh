const fs = require("fs");
module.exports.config = {
	name: "wtf",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Ralph", 
	description: "no prefix",
	commandCategory: "no prefix",
    usePrefix : false,
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("What the fuck")==0 || (event.body.indexOf("wtf")==0 || (event.body.indexOf("WTF")==0 || (event.body.indexOf("Wtf")==0)))) {
		var msg = {
				body: "NIGGA WHAT THE FUCK",
				attachment: fs.createReadStream(__dirname + `/noprefix/nigga.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}