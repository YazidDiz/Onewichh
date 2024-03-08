const { Hercai } = require('hercai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { DateTime } = require('luxon');

const herc = new Hercai();

module.exports.config = {
    name: "mia",
    version: "1.0.1-beta",
    usePrefix : false,
    hasPermission : 0,
    credits: "Kenneth Panio",
    description : "Réponses Ai + Vocale et Génération d'images en modèle différents",
    commandCategory : "Zetsu-Vip",
    usages: "[prompt]",
    cooldowns: 2,
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ").toLowerCase();

    if (!prompt) {
        return api.sendMessage("𝘝𝘦𝘶𝘪𝘭𝘭𝘦𝘻 𝘦𝘯𝘵𝘳𝘦𝘳 𝘶𝘯𝘦 𝘳𝘦𝘲𝘶𝘦𝘵𝘦. ✧\n\n\n      ⇛ 𝗚𝗨𝗜𝗗𝗘 𝗱𝗲 𝗠𝗶𝗮 ⇚\n\n✘𝗥𝗘𝗣𝗢𝗡𝗦𝗘𝗦 𝗔𝗨𝗫 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡𝗦 (+𝘃𝗼𝗰𝗮𝗹𝗲)✘ \n\n◉ 𝙀𝙘𝙧𝙞𝙫𝙚𝙯 𝙟𝙪𝙨𝙩𝙚 ➟ 𝘔𝘪𝘢 + [𝘝𝘰𝘵𝘳𝘦 𝘲𝘶𝘦𝘴𝘵𝘪𝘰𝘯].\n\n\n✘𝗚𝗘𝗡𝗘𝗥𝗔𝗧𝗜𝗢𝗡 𝗗'𝗜𝗠𝗔𝗚𝗘✘ \n\n◉ 𝙀𝙘𝙧𝙞𝙫𝙚𝙯 𝙟𝙪𝙨𝙩𝙚 ➟ 𝘔𝘪𝘢 + [𝘥𝘳𝘢𝘸/𝘨𝘦𝘯𝘪𝘮𝘢𝘨𝘦/𝘪𝘮𝘢𝘨𝘪𝘯𝘦/𝘥𝘦𝘴𝘴𝘪𝘯𝘦/𝘱𝘪𝘤𝘵𝘶𝘳𝘦 𝘰𝘧/] + [𝘊𝘦 𝘲𝘶𝘦 𝘷𝘰𝘶𝘴 𝘥𝘦𝘴𝘪𝘳𝘦𝘻 𝘨𝘦𝘯𝘦𝘳𝘦𝘳] + [𝘭𝘦 𝘯𝘰𝘮 𝘥𝘶 𝘮𝘰𝘥𝘦𝘭].\n\n𝙈𝙤𝙙𝙚𝙡𝙨 𝙙𝙞𝙨𝙥𝙤𝙣𝙞𝙗𝙡𝙚 : \n 𝙰𝚗𝚒𝚖𝚎, 𝚕𝚎𝚡𝚒𝚌𝚊, 𝚛𝚊𝚊𝚟𝚊, 𝚜𝚒𝚖𝚞𝚛𝚐, 𝚜𝚑𝚘𝚗𝚒𝚗. ", event.threadID, event.messageID);
    }

    api.sendMessage("🧸 | 𝐸𝑛 𝑐𝑜𝑢𝑟𝑠...", event.threadID, event.messageID);

    try {
        const modelNameMap = {
            "anime": "animefy",
            "lexica": "lexica",
            "prodia": "prodia",
            "simurg": "simurg",
            "raava": "raava",
            "shonin": "shonin",
        };

        let modelName = "DALL-E"; // Default to DALL-E
        for (const key in modelNameMap) {
            if (prompt.includes(key)) {
                modelName = modelNameMap[key];
                break;
            }
        }

        const imageResponse = await herc.drawImage({ model: modelName, prompt });

        const imageUrl = imageResponse?.url;

        if (imageUrl && ["send pic", "send a pic", "draw a", "genimage", "drawing", "picture of", "image of", "send me pic", "send me image", "send me an image", "make a drawing", "illustrate", "sketch", "painting", "wallpaper", "photo of", "generate", "drawing of", "artwork", "artwork of", "visual image", "visual photo", "send me a pic","imagine","dessine"].some(phrase => prompt.includes(phrase))) {
            const imageStream = await axios.get(imageUrl, { responseType: 'stream' });
            api.sendMessage({
                body: `🖼️ 𝑉𝑜𝑖𝑐𝑖 𝑣𝑜𝑡𝑟𝑒 𝑖𝑚𝑎𝑔𝑒 𝑒𝑛 𝑚𝑜𝑑𝑒𝑙 ${modelName || 'Simple'} `,
                attachment: imageStream.data,
            }, event.threadID);
        } else {
            const questionResponse = await herc.question({ model: "v3", content: prompt });
            api.sendMessage(questionResponse.reply, event.threadID);

            const beastUrl = `https://www.api.vyturex.com/beast`;

            try {
                const beastResponse = await axios.get(`${beastUrl}?query=${encodeURIComponent(questionResponse.reply)}`);
                const audioURL = beastResponse?.data?.audio;

                if (audioURL) {
                    const fileName = "mrbeast_voice.mp3";
                    const filePath = path.resolve(__dirname, 'cache', fileName);

                    const { data: audioData } = await axios.get(audioURL, { responseType: 'arraybuffer' });
                    fs.writeFileSync(filePath, audioData);

                    api.sendMessage({
                        body: "💽 𝗩𝗼𝗶𝗰𝗲",
                        attachment: fs.createReadStream(filePath)
                    }, event.threadID, (voiceError) => {
                        if (voiceError) console.error('Error sending voice response:', voiceError);
                        fs.unlinkSync(filePath);
                    });
                } else {
                    console.error("Failed to fetch Beast API response.");
                }
            } catch (beastError) {
                console.error('Error during Beast API request:', beastError);
            }
        }
    } catch (error) {
        console.error('Error during prodia request:', error);
        api.sendMessage("Error generating image or drawing with prodia.", event.threadID);
    }
};
