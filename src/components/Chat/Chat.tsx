import React, { useState, useEffect, SetStateAction } from 'react';

import UserChatMessage from '../UserChatMessage/UserChatMessage';
import ChatbotMessage from '../ChatbotMessage/ChatbotMessage';

import {
  botMessage,
  userMessage,
  createChatMessage,
} from './chatUtils';

import chatIcon from '../../assets/icons/plane.svg';

import './Chat.css';
import {
  ICustomStyles,
} from '../../interfaces/IConfig';


import { IMessage } from '../../interfaces/IMessages';

interface IChatProps {
  setState: React.Dispatch<SetStateAction<any>>;
  messageParser: any;
  botName: string;
  customStyles: ICustomStyles;
  headerText: string;
  placeholderText: string;
  validator: (input: string) => Boolean;
  state: any;
  disableScrollToBottom: boolean;
  messageContainerRef: React.MutableRefObject<HTMLDivElement>;
}

const Chat = ({
  state,
  setState,
  messageParser,
  botName,
  customStyles,
  headerText,
  placeholderText,
  validator,
  disableScrollToBottom,
  messageContainerRef,
}: IChatProps) => {
  const { messages } = state;

  const [input, setInputValue] = useState('');

  const scrollIntoView = () => {
    setTimeout(() => {
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef?.current?.scrollHeight;
      }
    }, 50);
  };

  useEffect(() => {
    if (disableScrollToBottom) return;
    scrollIntoView();
  });

  const renderMessages = () => {
    return messages.map((messageObject: IMessage, index: number) => {
      if (botMessage(messageObject)) {
        return (
          <React.Fragment key={messageObject.id}>
            {renderChatbotMessage(messageObject, index)}
          </React.Fragment>
        );
      }

      if (userMessage(messageObject)) {
        return (
          <React.Fragment key={messageObject.id}>
            {renderUserMessage(messageObject)}
          </React.Fragment>
        );
      }

    });
  };

  const renderUserMessage = (messageObject: IMessage) => {
    return (
      <>
        <UserChatMessage
          message={messageObject.message}
          key={messageObject.id}
        />
      </>
    );
  };

  const renderChatbotMessage = (messageObject: IMessage, index: number) => {

    const chatbotMessageProps = {
      ...messageObject,
      setState,
      state,
      messages,
    };

    return (
      <ChatbotMessage
        message={messageObject.message}
        customStyles={customStyles.botMessageBox}
        key={messageObject.id}
        {...chatbotMessageProps}
      />
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator && typeof validator === 'function') {
      if (validator(input)) {
        handleValidMessage();
        messageParser.parse(input);
      }
    } else {
      handleValidMessage();
      messageParser.parse(input);
    }
  };

  const handleValidMessage = () => {
    setState((state: any) => ({
      ...state,
      messages: [...state.messages, createChatMessage(input, 'user')],
    }));

    scrollIntoView();
    setInputValue('');
  };

  const customButtonStyle = { backgroundColor: '' };
  if (customStyles && customStyles.chatButton) {
    customButtonStyle.backgroundColor = customStyles.chatButton.backgroundColor;
  }

  let header = `Conversation with ${botName}`;
  if (headerText) {
    header = headerText;
  }

  let placeholder = 'Type a message...';
  if (placeholderText) {
    placeholder = placeholderText;
  }

  return (
    <div className="chatbot-chat-container">
      <div className="chatbot-chat-inner-container">
        <div className="chatbot-chat-header">{header}</div>

        <div
          className="chatbot-chat-message-container"
          ref={messageContainerRef}
        >
          {renderMessages()}
          <div style={{ paddingBottom: '15px' }} />
        </div>

        <div className="chatbot-chat-input-container">
          <form
            className="chatbot-chat-input-form"
            onSubmit={handleSubmit}
          >
            <input
              className="chatbot-chat-input"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="chatbot-chat-btn-send"
              style={customButtonStyle}
            >
              <img className="chatbot-chat-btn-send-icon" src={chatIcon} />

            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
