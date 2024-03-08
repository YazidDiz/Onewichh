module.exports.config = {
	name: "coinflip",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Cliff",
	description: "Simulation de pile ou face",
	commandCategory: "🎮 games",
    usePrefix : false,
	usages: "[face/pile] [amount]",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies }) {
	const { threadID, messageID } = event;
	const betChoice = args[0]?.toLowerCase();
	const betAmount = parseInt(args[1]);

	if (!betChoice || !['face', 'pile'].includes(betChoice))
		return api.sendMessage("Option Invalide. Utilise : Coinflip [face/pile] [Montant]", threadID, messageID);

	if (isNaN(betAmount) || betAmount <= 0)
		return api.sendMessage("Veuillez entrer un montant valide", threadID, messageID);

	if (betAmount > 10000)
		return api.sendMessage("Le montant maximum est de 10 000 coins", threadID, messageID);

	const currentMoney = await Currencies.getData(event.senderID).then(data => data.money);
	if (betAmount > currentMoney)
		return api.sendMessage(`Vous êtes pauvre ! Vous n'avez que ${currentMoney} coins.`, threadID, messageID);

	const result = Math.random() < 0.5 ? 'face' : 'pile';
	const win = betChoice === result;

	if (win) {
		const reward = betAmount * 1.7;
		await Currencies.increaseMoney(event.senderID, reward);
		return api.sendMessage(`𝗩𝗶𝗰𝘁𝗼𝗶𝗿𝗲 ! 𝘓𝘦 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘵 𝘦𝘴𝘵〘${result}〙\n\n 💸 𝘛𝘶 𝘳𝘦𝘮𝘱𝘰𝘳𝘵𝘦 ${reward}€ ! 💸`, threadID, messageID);
	} else {
		await Currencies.decreaseMoney(event.senderID, betAmount);
		return api.sendMessage(`𝗣𝗲𝗿𝗱𝘂 ! 𝘓𝘦 𝘳𝘦𝘴𝘶𝘭𝘵𝘢𝘵 𝘦𝘴𝘵〘${result}〙\n\n ♨️ 𝘛𝘶 𝘱𝘦𝘳𝘥𝘴 ${betAmount}€ ! ♨️`, threadID, messageID);
	}
};
