import ChatbotMessage from '../ChatbotMessage/ChatbotMessage';

import './ChatbotError.css';

interface IChatbotErrorProps {
  message: string;
}

const ChatbotError = ({ message }: IChatbotErrorProps) => {
  return (
    <div className="chatbot-error">
      <h1 className="chatbot-error-header">
        Ooops. Something is missing.
      </h1>
      <div className="chatbot-error-container">
        <ChatbotMessage
          message={message}
          customStyles={{ backgroundColor: '' }}
        />
      </div>

    </div>
  );
};

export default ChatbotError;
