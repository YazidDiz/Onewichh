const axios = require('axios');
const request = require('request');
const fs = require('fs');

module.exports.config = {
  name: "lyrics",
  version: "69",
  hasPermission: 0,
  credits: "grey", // fix by kira
  description: "lyrics finder",
  usages: "lyrics <title>",
  usePrefix: false,
  commandCategory: "music",
  cooldowns: 0
};

module.exports.run = async function({ api, event, args }) {
      const song = args.join(' ');

      if (!song) {
        return api.sendMessage('Please enter a song.', event.threadID, event.messageID);
      } else {
        axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(song)}`)
          .then(res => {
            const { title, artist, lyrics, image } = res.data;

            const callback = function() {
              api.sendMessage({
                body: `Title: ${title}\n\nArtist: ${artist}\n\nLyrics: ${lyrics}`,
                attachment: fs.createReadStream(__dirname + '/cache/image.png')
              }, event.threadID, function() {
                fs.unlinkSync(__dirname + '/cache/image.png');
              }, event.messageID);
            };

            request(encodeURI(image))
              .pipe(fs.createWriteStream(__dirname + '/cache/image.png'))
              .on('close', callback);
          })
          .catch(error => {
            console.error('Lyrics API error:', error);
            api.sendMessage('Failed to fetch lyrics.', event.threadID, event.messageID);
          });
      }
    };
