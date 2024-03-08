module.exports.config = {
	name: "birthday",
	version: "1.0.0",
	credits: "cliff",
	hasPermission: 0,
	usages: "birthday [set dd/mm <UserID>] | [remove <UserID>]",
	commandCategory: "utility",
    usePrefix : false,
	cooldowns: 5
};

let birthdayDb = {}; // This should be replaced by a persistent database

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;

	if (args[0] === 'set' && args.length === 3) {
		const date = args[1].split('/');
		const userId = args[2];
		const userTag = `<@${userId}>`;

		if (date.length !== 2 || isNaN(date[0]) || isNaN(date[1])) {
			return api.sendMessage("Invalid date format. Please use dd/mm format.", threadID, messageID);
		}

		birthdayDb[userId] = args[1];
		return api.sendMessage(`Birthday date for ${userTag} is set to ${args[1]}.`, threadID, messageID);

	} else if (args[0] === 'remove' && args.length === 2) {
		const userId = args[1];
		const userTag = `<@${userId}>`;

		if (!birthdayDb[userId]) {
			return api.sendMessage(`${userTag} has no birthday reminder set.`, threadID, messageID);
		}

		delete birthdayDb[userId];
		return api.sendMessage(`Removed birthday reminder for ${userTag}.`, threadID, messageID);

	} else {
		return api.sendMessage("Invalid command usage. " + 
				"To set a birthday, use 'birthday set dd/mm UserID'. " + 
				"To remove a birthday, use 'birthday remove UserID'.", threadID, messageID);
	}
};

// This should be triggered daily to check for birthdays and send reminders
const checkAndNotifyBirthdays = async (api) => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	const todayStr = `${dd}/${mm}`;

	Object.keys(birthdayDb).forEach(userId => {
		if (birthdayDb[userId] === todayStr) {
			api.sendMessage(`🎉 Happy Birthday <@${userId}>! 🎂`, threadID);
		}
	});
};
