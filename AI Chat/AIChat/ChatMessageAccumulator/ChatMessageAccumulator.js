// ChatMessageAccumulator.js
// This React component listens to new messages from an AI service via WebSocket and updates the chat log.
// Belongs to AIChat.js
import React, { useEffect, useState } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import styles from './ChatMessageAccumulator.module.css';

export const ChatMessageAccumulator = ({ updateChatLogFn, lastMessage }) => {
  const [lastAIMessageStr, setLastAIMessageStr] = useState("");

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);

      if (data.statusCode && data.statusCode >= 400) {
        console.error("WebSocket Error with statusCode:", data.statusCode);
        alert(data.statusCode === 429 ? "You have reached your message limit. Please try again later." : "An unexpected error occurred. Please try again.");
      } else if (data.message) {
        const newChunk = data.message;
        if (!newChunk.includes("END_OF_STREAM")) {
          setLastAIMessageStr(prev => prev + newChunk);
        } else {
          updateChatLogFn(lastAIMessageStr);
          setLastAIMessageStr('');
        }
      }
    }
  }, [lastMessage]);

  return (
    <>
      {lastAIMessageStr &&
        <div className={styles.assistantMessage}>
          <strong>Assistant: </strong><Latex>{lastAIMessageStr}</Latex>
        </div>
      }
    </>
  );
};
