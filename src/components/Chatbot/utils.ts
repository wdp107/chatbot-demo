import IConfig from '../../interfaces/IConfig';

export const getCustomStyles = (config: IConfig) => {
  if (config.customStyles) {
    return config.customStyles;
  }
  return {};
};

export const getInitialState = (config: IConfig) => {
  if (config.state) {
    return config.state;
  }
  return {};
};

export const getBotName = (config: IConfig) => {
  if (config.botName) {
    return config.botName;
  }
  return 'Chatbot';
};

export const getObject = (object: Object) => {
  if (typeof object === 'object') return object;
  return {};
};

export const validateProps = (config: IConfig, MessageParser: any) => {
  const errors = [];
  if (!config.initialMessages) {
    errors.push(
      "Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."
    );
  }
  return errors;
};

export const isConstructor = (func: any) => {
  try {
    new func();
  } catch (err) {
    return false;
  }
  return true;
};
