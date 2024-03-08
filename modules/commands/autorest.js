module.exports.config = {
 name: "autorestart",
 version: "1.0.0",
 hasPermission: 0,
 credits: "Eugene Aguilar",
 description: "Autorestart/Plus/autobiostatus",
 usePrefix: true,
 commandCategory: "No Prefix",
cooldowns: 0,
};

	  const cron = require("node-cron");
	  const moment = require("moment");


module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
		 var { threadID, messageID } = event;

		 cron.schedule('*/80 * * * *', () => {
			var currentHour = moment().format('HH');
			var bioMessage;

			if(currentHour >= 8 && currentHour <= 11){
			  bioMessage = `𝘗𝘳𝘦𝘧𝘪𝘹 ⇛.⇚\n𝘼𝙙𝙢𝙞𝙣 : https://www.facebook.com/zetsu.sama.355\n\n🟢 𝗔𝗰𝘁𝗶𝗳 : ${moment.tz("Asia/Manila").format("MM/DD/YYYY h:mm A")}`;
			}else if(currentHour >= 12 && currentHour <= 18){
			  bioMessage = `𝘗𝘳𝘦𝘧𝘪𝘹 ⇛.⇚\n𝘼𝙙𝙢𝙞𝙣 : https://www.facebook.com/zetsu.sama.355\n\n🟢 𝗔𝗰𝘁𝗶𝗳 : ${moment.tz("Asia/Manila").format("MM/DD/YYYY h:mm A")}`;
			}else{
			  bioMessage = `𝘗𝘳𝘦𝘧𝘪𝘹 ⇛.⇚\n𝘼𝙙𝙢𝙞𝙣 : https://www.facebook.com/zetsu.sama.355\n\n🟢 𝗔𝗰𝘁𝗶𝗳 : ${moment.tz("Asia/Manila").format("MM/DD/YYYY h:mm A")}`;
			}

			api.changeBio(bioMessage, (err) => {
		process.exit(1);
			  if (err) return console.log("ERR: "+err);
			});
		 }, {
			scheduled: true,
			timezone: "Asia/Manila"
		 });
	  }

module.exports.run = async ({ api, event, global, permssion, utils, client, Users }) => {
			api.changeBio(`𝘗𝘳𝘦𝘧𝘪𝘹 ⇛.⇚\n𝘼𝙙𝙢𝙞𝙣 : https://www.facebook.com/zetsu.sama.355\n\n🟢 𝗔𝗰𝘁𝗶𝗳 : ${moment.tz("Asia/Manila").format("MM/DD/YYYY h:mm A")}`,(e) => {
			  if(e) api.sendMessage("An error occurred" + e, event.threadID); return api.sendMessage("Changed bot's profile to", event.threadID, event.messgaeID)
			}
			)
		}