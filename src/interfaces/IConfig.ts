import { IMessage } from './IMessages';

interface IConfig {
  botName?: string;
  initialMessages: IMessage[];
  state?: any;
  customStyles?: ICustomStyles;
}

export interface ICustomStyles {
  botMessageBox?: IBackgroundColor;
  chatButton?: IBackgroundColor;
}

interface IBackgroundColor {
  backgroundColor: string;
}

export default IConfig;
