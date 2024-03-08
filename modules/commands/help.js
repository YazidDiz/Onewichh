const moment = require('moment');
const axios = require('axios');

module.exports.config = {
  name: "help",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Blue",
  description: "Get help about available commands.",
  usePrefix: false,
  commandCategory: "info",
  usages: "[command]",
  cooldowns: 5,
};

const mathSansBold = {
  A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
  J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
  S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚", h: "𝗛", i: "𝗜",
  j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡", o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥",
  s: "𝗦", t: "𝗧", u: "𝗨", v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭"
};


module.exports.run = async function ({ api, event, args }) {
  const { commands } = global.client;
  const { threadID, messageID, senderID } = event; // Add senderID to get the user's ID
  const prefix = global.config.PREFIX;
  const owner = config.DESIGN.Admin;
  const botname = global.config.BOTNAME;
    

  let msg = `\n   ༺ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐒 ༻\n             ━━━⌾━━━\n`;

  if (!args[0]) {
    for (const [category, commandList] of groupByCategory(commands)) { const categorySansBold = category.split("").map(c => mathSansBold[c] || c).join("");
      msg += `╭ ❍『 ${categorySansBold} 』\n${commandList.map(cmd => `│ ⦿ ${cmd.name}\n`).join('')}╰───────────⎔\n\n`;
    };

    // Fetch random quote
    
const randomQuotes = [
  "Mieux vaut prévenir que guérir.",
"La vie est un long périple rempli d'opportunités.", 
"Le bonheur se trouve dans les petites choses de la vie.",
"L'espoir fait vivre.",
"La persévérance mène à la réussite.",
"La véritable beauté est celle qui rayonne de l'intérieur.", 
"Un sourire est la plus belle invitation à la joie.",
"Il vaut mieux être seul que mal accompagné.", 
"Apprends de tes erreurs pour avancer plus fort.", 
"Rien n'est impossible si tu y crois vraiment."];

  const randomQuote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

  msg += `\n             ━━━⌾━━━\n✘ 𝙉𝙤𝙢𝙗𝙧𝙚𝙨 𝙙𝙚 𝘾𝙢𝙙𝙨:「${commands.size}」\n\n☁️ 𝘛𝘢𝘱𝘦 𝙃𝙚𝙡𝙥 [𝙽𝚘𝚖 𝚍𝚎 𝚕𝚊 𝚌𝚖𝚍] 𝘱𝘰𝘶𝘳 𝘷𝘰𝘪𝘳 𝘤𝘰𝘮𝘮𝘦𝘯𝘵 𝘶𝘵𝘪𝘭𝘪𝘴𝘦𝘳 𝘶𝘯𝘦 𝘤𝘰𝘮𝘮𝘢𝘯𝘥𝘦.\n\n✘ 𝗣𝗿𝗲𝗳𝗶𝘅  ⇛.⇚\n\n☁️ 𝗖𝗶𝘁𝗮𝘁𝗶𝗼𝗻𝘀 : ${randomQuote}
             ━━━⌾━━━\n\n        ☁️〘𝗭𝗲𝘁 𝗕◵𝘁〙☁️`;
  

    // DYK API




    

    const fullMsg = msg ;

    // Send the help list as a private message
    api.sendMessage(fullMsg, threadID, messageID); 

    // Notify the user that the help list has been sent
   
  } else {
    // Handle specific command details if args[0] is provided
    const commandName = args[0].toLowerCase();
    if (commands.has(commandName)) {
      const cmd = commands.get(commandName).config;
  msg = `\n✘           ━━━⌾━━━          ✘\n                  〘${cmd.name}〙\n              ━━━⌾━━━\n» 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡: \n${cmd.description}\n\n» 𝗨𝘀𝗮𝗴𝗲𝘀: ${cmd.usages}\n\n» 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${cmd.version}\n\n» 𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: ${cmd.hasPermission} (All users)\n\n» 𝗧𝗲𝗺𝗽𝘀 𝗱𝗲 𝗟𝗼𝗮𝗱𝗶𝗻𝗴: ${cmd.cooldowns} secs\n\n» 𝗔𝘂𝘁𝗲𝘂𝗿𝘀: ${cmd.credits}\n\n              ━━━ ❖ ━━━\n J'espère que t'a saisie comment ça fonctionne maintenant. (Zetsu)\n              ━━━ ❖ ━━━`;
      api.sendMessage(msg, threadID, messageID);
    } else {
      api.sendMessage(`◖𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝗲 𝗶𝗻𝗲𝘅𝗶𝘀𝘁𝗮𝗻𝘁𝗲. 𝗧𝗮𝗽𝗲𝗿 "𝗛𝗲𝗹𝗽" 𝗽𝗼𝘂𝗿 𝘃𝗼𝗶𝗿 𝗹𝗲𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝗲𝘀 𝗱𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗹𝗲𝘀.◗`, threadID, messageID);
    }
  }
};

function groupByCategory(commands) {
  const groupedCommands = new Map();
  for (const cmd of commands.values()) {
    if (!groupedCommands.has(cmd.config.commandCategory)) {
      groupedCommands.set(cmd.config.commandCategory, []);
    }
    groupedCommands.get(cmd.config.commandCategory).push(cmd.config);
  }
  return groupedCommands;
}
