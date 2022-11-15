require("dotenv").config();
const axios = require("axios").default;

async function sendNotify(message) {
  if (process.env.ENABLE_TELEBOT === "false") return console.log("Telegram bot: Disabled");
  return axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    chat_id: process.env.CHAT_ID,
    text: message || "Some errors happened!",
  });
}

module.exports = { sendNotify };
