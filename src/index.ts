import 'dotenv/config'
import TelegramBot from "node-telegram-bot-api"

const token = process.env.TOKEN;
const receiverId = process.env.RECEIVERID;
const channelUrl = process.env.CHANNELURL;

const bot = new TelegramBot(token, { polling: true });

bot.on('text', async (message) => {
    const chatId = message.chat.id;
    const username = message.from.username;
    const text = message.text;

    try {
        if (text === '/start') {
            bot.sendMessage(chatId, '👋 Для відправки повідомлення, відправте його сюди')
            return;
        }

        bot.sendMessage(chatId, '✅ Повідомлення успішно відправлено!', { reply_markup: { inline_keyboard: [[{ text: "Заправки ⛽️", url: channelUrl }]] } });
        bot.sendMessage(receiverId, `<b>❗ Нове повідомлення від: <a href="https://t.me/${username}">${username}</a></b><i>\n\n${text}</i>`, { parse_mode: "HTML", disable_web_page_preview: true, reply_markup: { inline_keyboard: [[{ text: "⛽️", url: channelUrl }]] } });
        return;
    } catch (error) {
        await bot.sendMessage(chatId, '❌ Сталась непередбачена помилка!')
        console.log(error);
    }
});

console.log('Bot has been started...');