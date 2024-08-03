import React from 'react';
import { AIChat } from '../AIChat/AIChat';
import './GeneralChatPage.css'; // Import the CSS styles

export const GeneralChatPage = () => {
  const systemInstructionRoutingStr = "haveAGeneralChatWithAI";

 return (
    <div className="chat-container">
      <div className="ai-chat">
        <AIChat 
          systemInstructionRoutingStr={systemInstructionRoutingStr}
        />
      </div>
      <p className="warning-message">
        * General Chat sometimes might generate incorrect problem solutions
      </p>
    </div>
  );
}
