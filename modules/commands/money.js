module.exports.config = {
	name: "money",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Check the amount of yourself or the person tagged",
	usePrefix: false,
  commandCategory: "utility",
	usages: "[Tag]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sotienbanthan": "Số tiền bạn đang có: %1$",
		"sotiennguoikhac": "Số tiền của %1 hiện đang có là: %2$"
	},
	"en": {
		"sotienbanthan": "𝗟𝗲 𝘀𝗼𝗹𝗱𝗲 𝗱𝗲 𝘃𝗼𝘁𝗿𝗲 𝗰𝗼𝗺𝗽𝘁𝗲 𝗯𝗮𝗻𝗰𝗮𝗶𝗿𝗲 𝗲𝘀𝘁 𝗱𝗲 : %1$",
		"sotiennguoikhac": "%1$, 𝗟𝗲 𝘀𝗼𝗹𝗱𝗲 𝗱𝗲 𝘃𝗼𝘁𝗿𝗲 𝗰𝗼𝗺𝗽𝘁𝗲 𝗯𝗮𝗻𝗰𝗮𝗶𝗿𝗲 𝗲𝘀𝘁 𝗱𝗲: %2$."
	}
}

module.exports.run = async function({ api, event, args, Currencies, getText }) {
	const { threadID, messageID, senderID, mentions } = event;

	if (!args[0]) {
		const money = (await Currencies.getData(senderID)).money;
		return api.sendMessage(getText("sotienbanthan", money), threadID);
	}

	else if (Object.keys(event.mentions).length == 1) {
		var mention = Object.keys(mentions)[0];
		var money = (await Currencies.getData(mention)).money;
		if (!money) money = 0;
		return api.sendMessage({
			body: getText("sotiennguoikhac", mentions[mention].replace(/\@/g, ""), money),
			mentions: [{
				tag: mentions[mention].replace(/\@/g, ""),
				id: mention
			}]
		}, threadID, messageID);
	}

	else return global.utils.throwError(this.config.name, threadID, messageID);
  }