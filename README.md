# Flir Chat

A modern, local-only AI chat application powered by [Flower Intelligence](https://flower.ai). Flir Chat provides a clean, intuitive interface for conversing with AI models while keeping all your data private and secure on your local machine.

## Features

- 🤖 **Multiple AI Models**: Choose from various AI models for different conversation styles
- 💬 **Real-time Streaming**: See AI responses as they're generated with smooth streaming
- 💾 **Persistent History**: Your chat history is automatically saved locally in your browser
- 🎨 **Modern UI**: Clean, responsive design with a beautiful sand-themed color palette
- 🔒 **Privacy-First**: All conversations stay on your device - no data sent to external servers
- ⚡ **Fast & Lightweight**: Built with React and optimized for performance

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime (v1.2.14 or later)
- Node.js compatible environment

### Installation

1. Clone the repository:

```bash
git clone git@github.com:noxan/flir-chat.git
cd flir-chat
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Production Build

To build and run for production:

```bash
bun start
```

## How to Use

### Starting a Conversation

1. **Select a Model**: Use the dropdown in the top-right corner to choose your preferred AI model
2. **Type Your Message**: Enter your message in the input field at the bottom of the screen
3. **Send**: Press Enter or click the "Send" button to start the conversation
4. **Watch the Response**: AI responses stream in real-time with a typing indicator

### Managing Your Chat

- **Clear History**: Click the "Clear" button in the header to remove all messages
- **Persistent Storage**: Your conversations are automatically saved and will persist between browser sessions
- **Model Switching**: You can change models mid-conversation - the AI will continue with the new model

### Keyboard Shortcuts

- **Enter**: Send message
- **Shift + Enter**: Add new line in message (when implemented)

## Technical Details

### Built With

- **React 19**: Modern React with hooks for state management
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework with custom sand theme
- **Flower Intelligence**: Local AI inference engine
- **Bun**: Fast JavaScript runtime and package manager

### Architecture

- **Frontend**: React SPA with TypeScript
- **AI Engine**: Flower Intelligence for local model inference
- **Storage**: Browser localStorage for chat persistence
- **Styling**: Tailwind CSS with custom color palette

### Browser Compatibility

Flir Chat works in all modern browsers that support:

- ES2020+ JavaScript features
- Local Storage API
- Fetch API with streaming support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Credits

This project is created using Bun and powered by Flower Intelligence.

---

**Note**: This is a local-only application. No data is transmitted to external servers, ensuring complete privacy for your conversations.
