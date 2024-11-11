import React, { useRef, useState, useEffect } from 'react';
import { getInitialState, isConstructor, validateProps } from '../components/Chatbot/utils';
import IConfig from '../interfaces/IConfig';
import { IMessage } from '../interfaces/IMessages';

interface IUseChatbotParams {
  config: IConfig | null;
  messageParser: any;
  messageHistory: IMessage[] | string;
  saveMessages?: (messages: IMessage[], html: string) => void;
}

const useChatbot = ({
  config,
  messageParser,
  messageHistory,
  saveMessages,
}: IUseChatbotParams) => {
  const [errors, setErrors] = useState({
    configurationError: '',
    invalidPropsError: '',
  });

  const initialState = config ? getInitialState(config) : {};
  const [state, setState] = useState({
    messages: config?.initialMessages || [],
    ...initialState,
  });

  const messagesRef = useRef(state.messages);
  const stateRef = useRef(state);
  const messageContainerRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  const [messageContainerHTML, setMessageContainerHTML] = useState('');

  useEffect(() => {
    if (!config || !messageParser) {
      setErrors({ configurationError: 'Config Error: please pass a config and a messageParser.', invalidPropsError: '' });
      return;
    }

    const propsErrors = validateProps(config, messageParser);
    if (propsErrors.length) {
      setErrors({
        configurationError: '',
        invalidPropsError: propsErrors.join(' '),
      });
    } else {
      setErrors({ configurationError: '', invalidPropsError: '' });
    }
  }, [config, messageParser]);

  useEffect(() => {
    if (messageHistory && Array.isArray(messageHistory)) {
      setState((prevState) => ({ ...prevState, messages: messageHistory }));
    }
  }, [messageHistory]);

  useEffect(() => {
    messagesRef.current = state.messages;
  }, [state.messages]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (messageContainerRef.current) {
      setMessageContainerHTML(messageContainerRef.current.innerHTML);
    }
  }, [state.messages]);

  useEffect(() => {
    return () => {
      if (saveMessages && typeof saveMessages === 'function') {
        saveMessages(messagesRef.current, messageContainerHTML);
      }
    };
  }, [saveMessages, messageContainerHTML]);

  let messagePars;
  const MessageParser = messageParser;

  if (isConstructor(MessageParser)) {
    messagePars = new MessageParser(setState, stateRef.current);
  } else {
    messagePars = messageParser;
  }

  return {
    messagePars,
    configurationError: errors.configurationError,
    invalidPropsError: errors.invalidPropsError,
    state,
    setState,
    messageContainerRef,
    MessageParser,
  };
};

export default useChatbot;