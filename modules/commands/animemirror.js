const axios = require("axios");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const models = {
  "1": "Anime Premium",
  "2": "Cartoon Premium",
  "3": "Anime Style: Maid Outfit",
  "4": "Anime Style: Beach Babe",
  "5": "Anime Style: Sweet Fantasy",
  "6": "Anime Style: Love Story Comic",
  "7": "Anime Style: High School Memories",
  "8": "Anime Style: Festive Christmas",
  "9": "Anime Art: Pirate Adventure ( One Piece )",
  "10": "Anime Art: Pop Star Sensation ( Oshi no Ko )",
  "11": "Anime Art: Ninja Legacy ( Naruto )",
  "12": "Anime Art: Super Warriors ( DBZ )",
  "13": "Anime Art: Dark Notebook ( Death Note )",
  "14": "Anime Art: Eternal Battle ( Bleach )",
  "15": "Anime Art: Wings of Destiny ( AOT )",
  "16": "Anime Art: Mystic Magic (Jujutsu Kaisen)",
  "17": "Anime Art: Tennis Prodigy (ThePrince of Tennis)",
  "18": "Anime Art: Demon Slayer Chronicles (Demon Slayer)",
  "19": "Anime Art: Alchemical Adventures (Fullmetal Alchemist)",
  "20": "Anime Art: Heroic Future (My Hero Academia)",
  "21": "Anime Art: Prehistoric Quest (Dr Stone)",
  "22": "Anime Art: Court Clash (Haikyuu)"
};

module.exports.config = {
    name: "animirror",
    version: "1.0",
    hasPermission: 0,
    credits: "SiAM",
    description: "Turn yourself into an anime character!",
    commandCategory: "Image-Edit",
    usePrefix:false,
    usages: "{prefix}animirror [modelNumber]\nexample: {prefix}animirror 2\n\nHere are the available models:\n" + Object.entries(models).map(([number, name]) => `❏ ${number} : ${name}`).join("\n"),
    cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
    try {

if (args[0] === "list") {
            const modelList = Object.entries(models).map(([number, name]) => `❏ ${number} : ${name}`).join("\n");
            return api.sendMessage({ body: "Here are the available models:\n" + modelList }, event.threadID);
        }
        const [modelNumber] = args;

        if (!modelNumber || isNaN(modelNumber) || !models[modelNumber]) {
            return api.sendMessage({
                body: "Invalid model number. Please provide a valid model number from the list.\n type animirror list\nto view all list ",
            }, event.threadID);
        }

        if (!(event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments.length > 0 && ["photo", "sticker"].includes(event.messageReply.attachments[0].type))) {
            return api.sendMessage({
                body: "Please reply to an image to apply the anime filter.⚠",
            }, event.threadID);
        }

        const imageUrl = event.messageReply.attachments[0].url;
        const encodedImageUrl = encodeURIComponent(imageUrl);

        const processingMessage = await api.sendMessage({
            body: `Applying the Filter, please wait...\nModel using: ${modelNumber} (${models[modelNumber]}) ⌛`,
        }, event.threadID);

        const response = await axios.get(`https://simoapi-aimirror.onrender.com/generate?imageUrl=${encodedImageUrl}&modelNumber=${modelNumber}`);

        const generatedImageUrl = response.data.imageUrl;

        const { data: imageBuffer } = await axios.get(generatedImageUrl, { responseType: "arraybuffer" });

        const temporaryImagePath = `temp_${Date.now()}.jpg`;
        fs.writeFileSync(temporaryImagePath, Buffer.from(imageBuffer, 'binary'));

        const attachmentData = fs.createReadStream(temporaryImagePath);

        await api.sendMessage({
            body: `Anime Art applied ✨\nModel used: ${modelNumber} (${models[modelNumber]})`,
            attachment: attachmentData,
        }, event.threadID);

        

        await unlinkAsync(temporaryImagePath);
        api.unsendMessage(processingMessage.messageID);

    } catch (error) {
        console.error(error);
        api.sendMessage({
            body: "Failed to apply the Anime filter.⚠",
        }, event.threadID);
    }
};
