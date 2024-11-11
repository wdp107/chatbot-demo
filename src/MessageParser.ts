import {createChatBotMessage} from './ChatbotIndex'
import React, {  SetStateAction, MutableRefObject } from 'react';


class MessageParser {

  setState: React.Dispatch<SetStateAction<any>>;;
  stateRef: MutableRefObject<any>;
  constructor(
    setStateFunc,
    stateRef) {
    this.setState = setStateFunc;
    this.stateRef = stateRef;
  }

  parse(message) {
    this.addMessageToState(createChatBotMessage(this.mockChat(message)))
  }

  mockChat(message) {
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes('hello')) return 'Hello! How can I help you today?';
    if (lowerMsg.includes('product')) return 'We have a wide range of products. Check out our catalog!';
    if (lowerMsg.includes('service')) return 'We offer various services to your needs.';
    if (lowerMsg.includes('bye')) return 'Goodbye! Have a great day!';

    return "I'm not sure I understand. Could you clarify?";
  }

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
}

export default MessageParser;