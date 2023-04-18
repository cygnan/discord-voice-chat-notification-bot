# discord-voice-chat-notification-bot

A Discord bot to notify users voice chat
 status changes

### Getting started

```bash
# Set up nvm if it's not installed
export nvm_v_latest="$(curl -sL https://api.github.com/repos/nvm-sh/nvm/releases/latest | jq -r '.tag_name')"
nvm -v || curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${nvm_v_latest}/install.sh" | bash
exec bash
nvm -v

# Clone repository
git clone https://github.com/cygnan/discord-voice-chat-notification-bot.git
cd discord-voice-chat-notification-bot

# Install Node.js and its libraries
nvm install
nvm use
node -v
npm ci

# Fill in Discord channelId and token
cp .env.sample .env
vi .env

# Build and run
npm run build
npm run start
```
