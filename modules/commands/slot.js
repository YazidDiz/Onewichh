module.exports.config = {
		name: "casino",
		version: "1.0.0",
		credits: "cliff",
		hasPermission: 0,
		usages: "casino [montant]",
		commandCategory: "🎮 games",
        usePrefix : false,
		cooldowns: 5
};

module.exports.run = async ({ api, event, args, Currencies }) => {
		const { threadID, messageID } = event;
		const betAmount = parseInt(args[0]);

		if (isNaN(betAmount) || betAmount <= 0) {
				return api.sendMessage("Montant Invalide", threadID, messageID);
		}

		const userData = await Currencies.getData(event.senderID);
		const balance = userData.money;

		if (balance < betAmount) {
				return api.sendMessage(`🎰 Vous êtes pauvre ! Vous n'avez que ${balance}€.`, threadID, messageID);
		}

		// Slots emoji set
		const slotsEmoji = ['🍇', '🍉', '🍊', '🍋', '🍌', '🍒', '🍓', '🍍'];
		let slotsResult = [];
		for (let i = 0; i < 3; i++) {
				slotsResult.push(slotsEmoji[Math.floor(Math.random() * slotsEmoji.length)]);
		}

		// Check if user won
		const isWin = slotsResult.every((val, i, arr) => val === arr[0]);

		// Build the result string
		let resultString = slotsResult.join(' | ');
		resultString += '\n\n';

		if (isWin) {
				const winAmount = betAmount * 2;
				await Currencies.increaseMoney(event.senderID, winAmount);
				resultString += `💸 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘂𝗹𝗮𝘁𝗶𝗼𝗻𝘀 ! 𝗩𝗼𝘂𝘀 𝗴𝗮𝗴𝗻𝗲𝘇 ${winAmount}€ ! 💸\n\n◉ 𝗡𝗼𝘂𝘃𝗲𝗮𝘂 𝗦𝗼𝗹𝗱𝗲 : ${balance}€`;
		} else {
				await Currencies.decreaseMoney(event.senderID, betAmount);
				resultString += `✘ 𝙑𝙤𝙪𝙨 𝙖𝙫𝙚𝙯 𝙥𝙚𝙧𝙙𝙪 ${betAmount}€ ! \n\n◉ 𝙉𝙤𝙪𝙫𝙚𝙖𝙪 𝙎𝙤𝙡𝙙𝙚 : ${balance}€\n\n◉ 𝙍𝙚𝙩𝙚𝙣𝙩𝙚𝙯 𝙑𝙤𝙩𝙧𝙚 𝙘𝙝𝙖𝙣𝙘𝙚 ! 🎰`;
		}

		return api.sendMessage(resultString, threadID, messageID);
};
