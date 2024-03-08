const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const KievRPSSecAuth = "FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACKqv5KW9JpUVIASmoG6dOQXJp8b4CWV35YlUvJPrYjvKor4jT94NauW8A6WRGm6HbOIIsIcNKOKMizjfA0BPDbclyPsRraowjSXee6JV83gltOE/tHb+ADj98F49U+ri8QgPaATedNDMNiDIfwxdfPPjEfyKNCXlRMZxf3z9aTtDWcAdSpNae7h82fat47b3hHxAwcTvTXAwFIyJAbe1vLWPFdhruCanG6n4RXmW30pVAZbbH7fUkGY0DfL4gWCkj5n/DFjVbikWN5E01n58bC+4c0iDMUFuob05ilQX+sS00zK2Cg2du7mF4RYw4TRuwMBmYeyQhYSmd0KPtbqYvseLLpvkDukaUDGFlhJT5ewW05foF1a/pOO1p41AYc90gATM9AhFzS6K7ORIHYzkx5ldr2IBp01fgv3QcbmaA0WsVdMAhIKT9qt4ldD0WTTiCln+NMHfwfcboCAweaYhx606NVUC6DJ9RxymS97WzHHCdoaj0NPH0nLwhSCtxqdS8ZHo+ulLxm2HuzRJn8d7HSnDasopaLIllBM49ISvZ2W5YMG7QM6dSVLs5lkrm0Fg8LZC6godYByUsK/lFny0fudlgHLnRXeNYS0E3hOAolsE70Wjey02+kmzmlXnBxeWrG6rv0MwSldmHJB8BfpoZRptssl9WFPwtHLLWV/7vIVIIwSrWNj4UZYZmQcoXC2ehVmYRoDiucgXv6Pva1bU0E9IzQ0HmwCeo8bWAAsopMF+5lKwCj86lwWjExkln3zNnVAXcgccS7SLFuef1GOHOga00193iuYPXdnqN/U2XRW4S1ELInNnhSatY4Ti2A1e1reKjr/tVLCuCjegf1V5nlwAUSo+la1H1Z7ysPYkn2P2/G3sI+R1kh+eyZQNcAIKtHbyQ1/LdK8R6e81/6y8JSju/HZS3ho/+qES7Nf2dcLxA4PHSzPXdMkLS0609MAPnYTnrLgzbT24JzCSQc8vjbH4CMctrA4hfsB0VoGKxI8iSKpNwNNU3+/PHVmUA4pZUBDh/mZyhZQSfOrXeINuBNuuhOljTcmQuqStxvcvbh8HP4IWZ5ys4p78lEQKm6C8O4qgJIuNgEl7mRakK6ARlrHBTUlDBHeYedWSmKwcLDtcA5KXIO4WioLJMnoDBBF5Icdsfz6ggY2JPq/OjR/x87IhVvzecDWiqodsEsyUbY6o8xubJnUYBlzsj88EvchqmLQtfOt8qsK6AH45xsZJjQaS8UHRfDmtkaqkvDoJzxtiBfw/KIgZvTmAsyO6f+MQ37cXhLJRG4up6Tl001tSyJY/xwYcPMFqx3R5doNEbS5tzNvr2q2LrQfG4dmW3wag0coI0W5PHUNs3cMbFJplmL2Sl1E81Ps22o8BJ4RgGRmCPs74WIxtWwYhiWGY36Xm9ABwVZ0HZC2yzXsUAJ8pi1iKFCUupWeY5COJHsWU3FJL";
const _U = "1Jc1Ky9Q7uOrSD8heF5Ls8DKeTlPY5bp3lzTGrue4K8AYRjx8HrXMs7JtINoDA4K_60R6-j462Hul_bt0fxgFMZ3-OAC_ug6AExeWxb4U133pBYKBJ2bf5VObiUr3yMgQd63gZ0UKIlx9rNRhgLcSvrEYJ75nL548i0iwUykdBECFl5uawfLbvVHsH3Bj3oRiUs8es8F6we0sJYm9O5Visg";

module.exports.config = {
	name: "dalle",
	version: "1.0",
	 hasPermission :0,
	credits: "cliff",//api Samir
	 usePrefix : false,
    commandCategory :"Image-Generate",
	description: "dalle",
	usages: "{prefix}dalle <search query> -<number of images>",
	cooldown: 0,
	aliases: ["dalle"],
};

module.exports.run = async function ({ api, event, args }) {
	const keySearch = args.join(" ");
	const indexOfHyphen = keySearch.indexOf('-');
	const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
	const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

	try {
		const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
		const data = res.data.results.images;

		if (!data || data.length === 0) {
			api.sendMessage("No images found for the provided query.", event.threadID, event.messageID);
			return;
		}

		const imgData = [];
		for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
			const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
			const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
			await fs.outputFile(imgPath, imgResponse.data);
			imgData.push(fs.createReadStream(imgPath));
		}

		await api.sendMessage({
			attachment: imgData,
			body: `𝐕𝐨𝐭𝐫𝐞 𝐈𝐦𝐚𝐠𝐞 𝐞𝐬𝐭 𝐩𝐫𝐞𝐭𝐞 !`
		}, event.threadID, event.messageID);

	} catch (error) {
		console.error(error);
		api.sendMessage("𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒓𝒆𝒆𝒔𝒔𝒂𝒚𝒆𝒓 𝒑𝒍𝒖𝒔 𝒕𝒂𝒓𝒅 ☁️", event.threadID, event.messageID);
	} finally {
		await fs.remove(path.join(__dirname, 'cache'));
	}
};