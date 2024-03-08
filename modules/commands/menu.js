module.exports.config = {
  name: "menu",
  version: "1.0.0",
  hasPermission: 0,
  credits: "august", //  PUTANG INA MO WAG MONG PAPALITAN TONG CREDITS WAG KANG KUPAL GAGO..
  description: "Guide for new users",
  commandCategory: "system",
  usages: "/help",
  usePrefix: true,
  cooldowns: 5,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 60
  }
};

  const mathSansBold = {
  A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
  J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
  S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚", h: "𝗛", i: "𝗜",
  j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡", o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥",
  s: "𝗦", t: "𝗧", u: "𝗨", v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭"
};

module.exports.handleEvent = function ({ api, event, getText }) {
  const { commands } = global.client;
  const { threadID, messageID, body } = event;

  if (!body || typeof body == "undefined" || body.indexOf("commands") != 0) return;
  const splitBody = body.slice(body.indexOf("commands")).trim().split(/\s+/);
  if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const command = commands.get(splitBody[1].toLowerCase());
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermission == 0) ? getText("user") : (command.config.hasPermission == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};

module.exports.run = async function ({ api, event, args }) {
  const uid = event.senderID;
  const userName = (await api.getUserInfo(uid))[uid].name;

  const { commands } = global.client;
  const { threadID, messageID } = event;
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

  const categories = new Set();
  const categorizedCommands = new Map();

  for (const [name, value] of commands) {
    const categoryName = value.config.commandCategory;
    if (!categories.has(categoryName)) {
      categories.add(categoryName);
      categorizedCommands.set(categoryName, []);
    }
    categorizedCommands.get(categoryName).push(`│ ✧ ${value.config.name}`);
  }

  let msg = `Hey ${userName}, these are commands that may help you:\n`;

  for (const categoryName of categories) {
    const categoryNameSansBold = categoryName.split("").map(c => mathSansBold[c] || c).join("");
    msg += `╭─❍「 ${categoryNameSansBold} 」\n`;
    msg += categorizedCommands.get(categoryName).join("\n");
    msg += "\n╰───────────⟡\n";
  }

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

  msg += `├─────☾⋆\n│ » Total commands: [ ${commands.size} ]\n│「 ☾⋆ PREFIX: . 」\n╰──────────⧕\n\n𝗥𝗔𝗡𝗗𝗢𝗠 𝗙𝗔𝗖𝗧: ${randomQuote}`;
  

  return api.sendMessage(msg, threadID, async (error, info) => {
    if (autoUnsend) {
      await new Promise(resolve => setTimeout(resolve, delayUnsend * 60000));
      return api.unsendMessage(info.messageID);
    } else return;
  });
};
  