const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');
const { getGrimesAnswer } = require('./botRequest.js');
require('dotenv').config();

const TOKEN = process.env.VK_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const vk = new VK({
  token: TOKEN,
});

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);

vk.updates.on('wall_post', async context => {
  const postId = context.wall.toString();
  vk.api.messages.send({
    peer_id: CHAT_ID,
    message: `Новый пост в группе`,
    random_id: Math.round(Math.random() * 1000),
    attachment: postId,
  });
});

hearManager.hear(/^граймс[\s,]/, async context => {
  const [sender] = await vk.api.users.get({ user_ids: [context.senderId] });
  const { first_name, last_name } = sender;
  const name_str = `${first_name} ${last_name}`;

  const question = context.text.split(' ').slice(1).join(' ');
  const answer = await getGrimesAnswer(name_str, question);

  await context.reply(answer, {
    forward: JSON.stringify({
      peer_id: context.peerId,
      conversation_message_ids: [context.conversationMessageId],
      is_reply: 1,
    }),
  });
});

hearManager.hear('/test', async context => {
  await context.send('тестовое сообщение');
});

hearManager.hear(/^\/reverse (.+)/i, async context => {
  await context.send(context.$match[1].split('').reverse().join(''));
});

vk.updates.start().catch(console.error);
