import {
  IMessage
} from '../../interfaces/IMessages';

export const uniqueId = () => {
  return Math.round(Date.now() * Math.random());
};

export const botMessage = (message: IMessage) => {
  if (message.type === 'bot') {
    return true;
  }
  return false;
};

export const userMessage = (message: IMessage) => {
  if (message.type === 'user') {
    return true;
  }
  return false;
};

export const createChatMessage = (message: string, type: string) => {
  return {
    message: message,
    type: type,
    id: uniqueId(),
  };
};

export const createChatBotMessage = (
  message: string
) => {
  return createChatMessage(message, 'bot');
};

export const createClientMessage = (
  message: string
) => {
  return createChatMessage(message, 'user');
};

export const callIfExists = (func: any, ...args: any) => {
  if (func) {
    return func(...args);
  }
};
