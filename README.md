# React Chatbot Integration

A step-by-step guide on setting up and integrating a chatbot within your React application.

## Introduction
This chatbot implementation uses a custom `Chatbot` component to interact with users, parse their input, and generate appropriate responses. It supports features like message persistence, validation, and customizable styles.


## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Initialize the chatbot

In the component you want to display the Chatbot, initalize the Chatbot in the following way:

```tsx
const config = {
  initialMessages: [createChatBotMessage(`Can I assist you with any questions or concerns you might have?`)]
}

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
  }
}

<Chatbot
  config={config}
  messageParser={messageParser} />

```

### Available Props
| Prop                                          | Type | Description |
| ----------------------------------------------- | :--: | :-------: |
| messageParser          |  MessageParser       |   Handles incoming user messages.                      |
| config                 |  IConfig             |   Configuration for chatbot appearance and behavior.   |
| headerText             |  string              |   Text displayed in the chatbot header.               |
| placeholderText        |  string              |   Placeholder for the input field.                    |
| saveMessages           |  (messages) => void  |   Function to save messages (e.g., to local storage). |
| messageHistory         |  IMessage[]          |   Preloaded message history.                           |
| validator              |  (input) => Boolean |   Validates user input before sending a message.       |
| disableScrollToBottom  |  boolean              |  Disables auto-scrolling to the bottom of the chat. |
