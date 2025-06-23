# Grimes Bot 🤖🎤

A VK bot that emulates the speaking style of the singer Grimes. It replies to user messages and notifies a chat when a new post appears on a VK wall.

## 🚀 Features

- Replies to messages that start with `граймс` or `граймс,`
- `/test` command — sends a test message
- `/reverse <text>` command — returns the reversed text
- Sends notifications about new wall posts to a specific chat
- Integrates with an AI API (I used OpenRouter)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/grimes-bot.git
cd grimes-bot
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file and add the following variables

```bash
AI_BOT_KEY = your_ai_api_bot_key
API_URL = your_ai_api_url
MODEL_NAME = your_ai_model_name
SYSTEM_PROMPT = some_initial_prompt
VK_TOKEN = vk_api_token
CHAT_ID = vk_chat_id
```

## 💻 Usage

dev

```bash
npm run dev
```

prod

```bash
npm run start
```
