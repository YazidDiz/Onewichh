const axios = require('axios');

module.exports["config"] = {
  name: "ai",
  aliases:"ai",
  version: "1.0.0",
  credits: "Openai",
  hasPermission: 0,
  commandCategory: "ai",
  usage: "[ prefix ]Herc.ai [prompt]",
  usePrefix: false,
  cooldown: 0
};

const mathsans = {

				a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",

				j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",

				s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",

				A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨",

				J: "𝖩", K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱",

				S: "𝖲", T: "𝖳", U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",

				" ": " "

		};


module.exports["run"] = async ({ api, event, args }) => {
  try {
    const prompt = args.join(" ") || "hello";

    if (prompt) {
      api.setMessageReaction("💬", event.messageID, (err) => console.log(err), true);
      const processingMessage = await api.sendMessage(
        `☁️ | 𝖤𝗇 𝗍𝗋𝖺𝗂𝗇 𝖽𝖾 𝗋é𝗉𝗈𝗇𝖽𝗋𝖾...`,
        event.threadID
      );

      const apiUrl = `https://jonellccapisproject-e1a0d0d91186.herokuapp.com/api/chatgpt?input=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
      const trimmedsans = trimmedMessage.split("").map(c => mathsans[c] || c).join("");
        api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
        await api.sendMessage({ body: trimmedsans+ `\n\n ✘ 𝙲𝚛𝚎𝚍𝚒𝚝𝚜 : 𝗭𝗲𝘁𝘀𝘂 ( 𝙼𝚘𝚜𝚑𝚒 𝙰𝚒 )`}, event.threadID, event.messageID);

        console.log(`Sent ChatGPT's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from ChatGPT API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get ChatGPT's response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    api.sendMessage(errorMessage, event.threadID);
  }
};
