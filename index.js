const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

// replace the value below with the Telegram token you receive from @BotFather
const token = "5813939145:AAFVaZCZTUVk2YEaEwwWeaBZai7amUnCUIY";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Hi Welcome to St. Xaviers Helpline Bot , Please select an option",
    {
      reply_markup: {
        keyboard: [["Bus Location", "Contact Details"]],
      },
    }
  );
});
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const userinput = msg.text;
  if (userinput.toString().toLowerCase().includes("bus")) {
    try {
      const response = await axios.get(
        "https://stxaviers-services.onrender.com/location"
      );
      const data = response.data;
      bot.sendMessage(chatId, data.link);
    } catch {
      bot.sendMessage(chatId, "somethng went wrong try again later");
    }
  }
  if (userinput.toString().toLowerCase().includes("contact")) {
    bot.sendMessage(
      chatId,
      `
    Phone No: 08822805190,
    Location Link : https://goo.gl/maps/PdcftXEHPmibbsTGA
    Address: 7H8P+QH5, Chalantapara Pt II, Assam 783389`
    );
  }
});
