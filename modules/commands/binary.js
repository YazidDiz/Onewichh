 const axios = require('axios');
 
module.exports.config = {
   name: "binary",
   version: "69",
   hasPermission: 0,
   credits: "ntkhang", // converted by kira
   description: "text to binary",
   usages: "binary encode <text>/binary decode <binary>",
   usePrefix: false,
   commandCategory: "utility",
   cooldowns: 0
 };
 
 module.exports.run = async function({ api, event, args }) {
   function encode(text) {
     return (
       Array
       .from(text)
       .reduce((acc, char) => acc.concat(char.charCodeAt().toString(2)), [])
       .map(bin => '0'.repeat(8 - bin.length) + bin)
       .join(" ")
     );
   };

   function decode(binary) {
     const arrayOfBytes = binary.split(" ");
     let Output = "";
     for (let i = 0; i < arrayOfBytes.length; i++) Output += String.fromCharCode(parseInt(arrayOfBytes[i], 2));
     return Output;
   };
   var { threadID, messageID, senderID } = event;
   if (args.length <= 1) return api.sendMessage("Incorrect syntax!", threadID, messageID);
   var type = args[0].toLowerCase();
   const allType = ["encode", "en", "decode", "de"];
   if (!allType.includes(type)) return api.sendMessage("Incorrect syntax!", threadID, messageID);
   var input = event.body.slice(event.body.indexOf(args[1]));
   if (type == "encode" || type == "en") return api.sendMessage(` ${encode(input)}`, threadID, messageID);
   if (type == "decode" || type == "de") return api.sendMessage(` ${decode(input)}`, threadID, messageID);
 }