const os = require('os');
const pidusage = require('pidusage');
const { performance } = require('perf_hooks');

module.exports.config = {
    name: "uptime",
    version: "1.0.2",
    hasPermision: 0,
    credits: "cliff",
    description: "uptime",
    commandCategory: "system",
    usePrefix: false,
    cooldowns: 5
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const cores = `Cores: ${os.cpus().length}`;

    return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
}

module.exports.run = async ({ api, event }) => {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    const usage = await pidusage(process.pid);

   const t = global.data.allUserID.length;
  const e = global.data.allThreadID.length;

    const osInfo = {
        platform: os.platform(),
        architecture: os.arch()
    };

    const timeStart = Date.now();
    const returnResult = `𝐋𝐞 𝐁𝐨𝐭 𝐞𝐬𝐭 𝐞𝐧 𝐦𝐚𝐫𝐜𝐡𝐞 𝐝𝐞𝐩𝐮𝐢𝐬 ${hours} 𝐡𝐞𝐮𝐫𝐞(𝐬) ${minutes} 𝐦𝐢𝐧𝐮𝐭𝐞(𝐬) ${seconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐞(𝐬).\n\n❖ 𝐓𝐎𝐓𝐀𝐋 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐞𝐮𝐫𝐬 : ${t}\n\n❖ 𝐓𝐎𝐓𝐀𝐋 𝐆𝐫𝐨𝐮𝐩𝐞𝐬 : ${e}\n\n❖ 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧 𝐝𝐮 𝐂𝐏𝐔 : ${usage.cpu.toFixed(1)}%\n\n❖ 𝐔𝐭𝐢𝐥𝐢𝐬𝐚𝐭𝐢𝐨𝐧 𝐝𝐞 𝐥𝐚 𝐑𝐀𝐌 : ${byte2mb(usage.memory)}\n\n❖ 𝐂𝐎𝐑𝐄𝐒 : ${os.cpus().length}\n\n❖ 𝐏𝐈𝐍𝐆 : ${Date.now() - timeStart}ms\n\n❖ 𝐒𝐘𝐒𝐓𝐄𝐌𝐄 𝐝'𝐄𝐱𝐩𝐥𝐨𝐢𝐭𝐚𝐭𝐢𝐨𝐧 : ${osInfo.platform}\n\n❖ 𝐀𝐫𝐜𝐡𝐢𝐭𝐞𝐜𝐭𝐮𝐫𝐞 𝐒𝐘𝐒𝐓𝐄𝐌𝐄 𝐂𝐏𝐔 : ${osInfo.architecture}`;

    return api.sendMessage(returnResult, event.threadID, event.messageID);
};
