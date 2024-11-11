import Chat from '../Chat/Chat';

import ChatbotError from '../ChatbotError/ChatbotError';

import IConfig from '../../interfaces/IConfig';

import {
  getCustomStyles,
  getBotName,
  isConstructor,
} from './utils';

import useChatbot from '../../hooks/useChatbot';
import { IMessage } from '../../interfaces/IMessages';

interface IChatbotProps {
  messageParser: any;
  config: IConfig;
  headerText?: string;
  placeholderText?: string;
  saveMessages?: (ref: any) => any;
  messageHistory?: IMessage[];
  validator?: (input: string) => Boolean;
  disableScrollToBottom?: boolean;
}

const Chatbot = ({
  messageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
  messageHistory,
  disableScrollToBottom,
  validator,
}: IChatbotProps) => {
  const {
    configurationError,
    invalidPropsError,
    MessageParser,
    messageContainerRef,
    messagePars,
    state,
    setState,
  } = useChatbot({
    config,
    messageParser,
    messageHistory,
    saveMessages,
  });

  if (configurationError) {
    return <ChatbotError message={configurationError} />;
  }

  if (invalidPropsError.length) {
    return <ChatbotError message={invalidPropsError} />;
  }

  const customStyles = getCustomStyles(config);
  const botName = getBotName(config);

  if (isConstructor(MessageParser)) {
    return (
      <Chat
        state={state}
        setState={setState}
        messageParser={messagePars}
        botName={botName}
        customStyles={{ ...customStyles }}
        headerText={headerText}
        placeholderText={placeholderText}
        validator={validator}
        disableScrollToBottom={disableScrollToBottom}
        messageContainerRef={messageContainerRef}
      />
    );
  } else {
    return (
      <MessageParser>
        <Chat
          state={state}
          setState={setState}
          messageParser={MessageParser}
          botName={botName}
          customStyles={{ ...customStyles }}
          headerText={headerText}
          placeholderText={placeholderText}
          validator={validator}
          disableScrollToBottom={disableScrollToBottom}
          messageContainerRef={messageContainerRef}
        />
      </MessageParser>
    );
  }
};

export default Chatbot;
