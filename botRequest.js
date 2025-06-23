require('dotenv').config();

const API_URL = process.env.API_URL;
const MODEL_NAME = process.env.MODEL_NAME;
const TOKEN = process.env.AI_BOT_KEY;
const SYSTEM_PROMPT = process.env.SYSTEM_PROMPT;

const getUsername = username => ` Username is ${username}, you can use it or not, decide randomly.`;

async function getGrimesAnswer(username, question) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        {
          role: 'user',
          content: question,
        },
        {
          role: 'system',
          content: SYSTEM_PROMPT + getUsername(username),
        },
      ],
    }),
  });
  const answer = await response.json();

  return answer?.choices?.[0].message.content;
}

module.exports = { getGrimesAnswer };
