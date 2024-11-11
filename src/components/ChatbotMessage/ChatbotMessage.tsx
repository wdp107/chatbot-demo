import ChatbotMessageAvatar from './ChatbotMessageAvatar';

import './ChatbotMessage.css';

interface IChatbotMessageProps {
  message: string;
  customStyles: { backgroundColor: string };
}
const ChatbotMessage = ({
  message,
  customStyles,
}: IChatbotMessageProps) => {
  const chatBoxCustomStyles = { backgroundColor: '' };
  const arrowCustomStyles = { borderRightColor: '' };

  if (customStyles) {
    chatBoxCustomStyles.backgroundColor = customStyles.backgroundColor;
    arrowCustomStyles.borderRightColor = customStyles.backgroundColor;
  }

  return (
    <div className="chatbot-chat-bot-message-container">
      <ChatbotMessageAvatar />
      <div
        className="chatbot-chat-bot-message"
        style={chatBoxCustomStyles}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ChatbotMessage;
