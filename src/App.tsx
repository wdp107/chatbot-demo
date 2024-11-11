import './App.css';
import { Chatbot } from './ChatbotIndex'
import messageParser from "./MessageParser";
import { createChatBotMessage } from "./ChatbotIndex";
import { useState } from 'react';


const config = {
  initialMessages: [createChatBotMessage(`Can I assist you with any questions or concerns you might have?`)],
  customStyles: {
    // botMessageBox: {
    //   backgroundColor: "#376B7E",
    // },
    // chatButton: {
    //   backgroundColor: "#5ccc9d",
    // },
  }
}

function App() {
  const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  const validator = (message) => {
    if (!message.trim()) {
      alert('Message cannot be empty.')
      return false;
    }
    return true;
  }

  return (
    <div className='App'>
      <button className='Btn' onClick={() => toggleBot((prev) => !prev)}>ChatBot</button>
      {showBot && (
        <Chatbot
          config={config}
          // messageHistory={loadMessages()}
          // saveMessages={saveMessages}
          headerText='How can I help you with queries?'
          disableScrollToBottom={true}
          // validator={validator}
          messageParser={messageParser} />
      )}
    </div>

  );

}

export default App;
