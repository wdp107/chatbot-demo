import userIcon from '../../assets/icons/user.svg';

import './UserChatMessage.css';

interface IUserChatMessageProps {
  message: string;
}

const UserChatMessage = ({
  message
}: IUserChatMessageProps) => {
  return (
    <div className="chatbot-user-chat-message-container">
      <div className="chatbot-user-chat-message">
        {message}
      </div>
      <div className="chatbot-user-avatar">
        <div className="chatbot-user-avatar-container">
          <img className="chatbot-user-avatar-icon" src={userIcon} />
        </div>
      </div>
    </div>
  );
};

export default UserChatMessage;
