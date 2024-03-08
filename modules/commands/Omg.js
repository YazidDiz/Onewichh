const fs = require("fs");
module.exports.config = {
	name: "omg",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Ralph", 
	description: "no prefic",
	commandCategory: "no prefix",
    usePrefix : false,
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("oh my god")==0 || (event.body.indexOf("Omg")==0 || (event.body.indexOf("OMG")==0 || (event.body.indexOf("omg")==0)))) {
		var msg = {
				body: "OOOMMMMGGG 😲",
				attachment: fs.createReadStream(__dirname + `/noprefix/omg.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}