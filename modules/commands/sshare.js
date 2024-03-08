const axios = require('axios');

module.exports.config = {
    name: "sshare",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "Shares a Facebook post",
    usePrefix: true,
    commandCategory: "utility",
    usages: "[facebook url] [number of share]",
    cooldowns: 60
};

module.exports.run = async function ({ api, event, args }) {
    const accessToken = 'EAAD6V7osOgcB05IZCic2peXpt8l7YY8Kjj pzk4YBQITrZBKgJKBVB3iKRZC1aT5Xfci1Y K9JFrZAq4R6aEc3QBLjnLNr8xPFydmbOz SpZBpTWaC0KguGaAJjoylE61Xh7ZAoWGt f3jCT4w3BW5We6EC6901VnfFtaJEs35 SvMPpzZBAOZAEeTSKQgmO13wZDZD';
    const shareUrl = args[0];
    const shareCount = Math.min(parseInt(args[1]), 100); // Limit to 100 shares
    const timeInterval = 1600;
    const deleteAfter = 60 * 60;

    if (!shareUrl || isNaN(shareCount)) {
        return api.sendMessage("Please provide the URL post of Facebook and the number of shares.", event.threadID, event.messageID);
    }

    let sharedCount = 0;
    let timer = null;

    api.sendMessage("🚀 | Launching the Spam Share. Checking your post if it works...", event.threadID, event.messageID);

    async function sharePost() {
        try {
            const response = await axios.post(
                `https://graph.facebook.com/me/feed?access_token=${accessToken}&fields=id&limit=1&published=0`,
                {
                    link: shareUrl,
                    privacy: { value: 'SELF' },
                    no_story: true,
                },
                {
                    muteHttpExceptions: true,
                    headers: {
                        authority: 'graph.facebook.com',
                        'cache-control': 'max-age=0',
                        'sec-ch-ua-mobile': '?0',
                        'user-agent':
                            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36',
                    },
                    method: 'post',
                }
            );

            sharedCount++;
            const postId = response?.data?.id;

            console.log(`Post shared: ${sharedCount}`);
            console.log(`Post ID: ${postId || 'Unknown'}`);

            if (sharedCount === shareCount) {
                clearInterval(timer);
                console.log('Finished sharing posts.');

                if (postId) {
                    setTimeout(() => {
                        deletePost(postId);
                    }, deleteAfter * 1000);
                }
            }
        } catch (error) {
            console.error('Failed to share post:', error.response.data);
            if (error.response.data.error.code === 368) {
                return api.sendMessage("🚧 | Token has been temporarily banned. Please check and try again later.", event.threadID, event.messageID);
            }
        }
    }

    async function deletePost(postId) {
        try {
            await axios.delete(`https://graph.facebook.com/${postId}?access_token=${accessToken}`);
            console.log(`Post deleted: ${postId}`);
        } catch (error) {
            console.error('Failed to delete post:', error.response.data);
        }
    }

    timer = setInterval(sharePost, timeInterval);

    setTimeout(() => {
        clearInterval(timer);
        console.log('Loop stopped.');
        api.sendMessage("✅ | Spam share is completed. Check your post and avoid spamming to prevent temporary bans.", event.threadID, event.messageID);
    }, shareCount * timeInterval);
};