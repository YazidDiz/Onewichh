/* 
If you encounter any errors, please give me feedback. Contact me on facebook https://facebook.com/joshg101
*/

const { get } = require('axios');
let url = "https://ai-tools.replit.app";

module.exports.config = {
		name: "ai3",
		version: "1.0.0",
		 hasPermission : 0,
		  usePrefix : false,
     commandCategory : "ai",
		credits: "Deku",
		description: "Talk to AI with continuous conversation.",
		
		usages: "[prompt]",
		cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
		function sendMessage(msg) {
				api.sendMessage(msg, event.threadID, event.messageID);
		}
		if (!args[0]) return sendMessage('Please provide a question first.');
		const prompt = args.join(" ");
		try {
				const response = await get(`${url}/gpt?prompt=${encodeURIComponent(prompt)}&uid=${event.senderID}`);
				const data = response.data;
				return sendMessage(data.gpt4);
		} catch (error) {
				return sendMessage(error.message);
		}
}