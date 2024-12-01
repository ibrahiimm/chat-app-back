const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 3002;
export { express, app, PORT };

app.use(cors());
app.use(express.json());

// Dummy data for chats and chat history
let chats = [
  { id: '1', name: 'General Chat', messages: [{ sender: 'user', text: 'Hello' }, { sender: 'ai', text: 'Hi there!' }] }
];

let chatHistory = [
  { userId: 1, chatId: '1', A_U: 'user', content: 'Hello' },
  { userId: 1, chatId: '1', A_U: 'assistant', content: 'Hi there!' }
];

app.get('/', (req: any, res: any) => {
  res.send('Welcome to the Chat API!');
});

// Route to send prompt to LLM (simulating OpenAI API)
app.post('/api/send_prompt', (req: any, res: any) => {
  const { query, newChat, newChatName, chatID } = req.body;

  let aiResponse = 'Simulated AI Response: ' + query; // Simulated AI response

  if (newChat === 1) {
    const newChatId = String(chats.length + 1);
    chats.push({ id: newChatId, name: newChatName || 'New Chat', messages: [{ sender: 'user', text: query }, { sender: 'ai', text: aiResponse }] });
    chatHistory.push({ userId: 1, chatId: newChatId, A_U: 'user', content: query });
    chatHistory.push({ userId: 1, chatId: newChatId, A_U: 'assistant', content: aiResponse });
    return res.status(200).json({ message: aiResponse, chatId: newChatId });
  } else {
    const chat = chats.find((chat: any) => chat.id === chatID);
    if (chat) {
      chat.messages.push({ sender: 'user', text: query });
      chat.messages.push({ sender: 'ai', text: aiResponse });
      chatHistory.push({ userId: 1, chatId: chatID, A_U: 'user', content: query });
      chatHistory.push({ userId: 1, chatId: chatID, A_U: 'assistant', content: aiResponse });
      return res.status(200).json({ message: aiResponse });
    }
    return res.status(404).json({ message: 'Chat not found' });
  }
});

// Route to get all chats
app.get('/api/chats', (req: any, res: any) => {
  return res.status(200).json(chats);
});

// Route to get chat history
app.get('/api/chathistory', (req: any, res: any) => {
  const { chatID } = req.query;
  const history = chatHistory.filter((item: any) => item.chatId === chatID);
  return res.status(200).json(history);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});