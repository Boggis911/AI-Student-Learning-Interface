// ChefMessageAccumulator.js
// This component is responsible for handling incoming AI response messages from the WebSocket.

import React, { useEffect, useState, useContext } from 'react';
import { AppStateContext } from '../../../contextVariables/AppStateContext';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import styles from './ChefMessageAccumulator.module.css';

export const ChefMessageAccumulator = ({ lastMessage, updateChatLogFn }) => {
  const [lastAIMessageStr, setLastAIMessageStr] = useState("");
  const { setIsProblemsUploadedBool } = useContext(AppStateContext);
  console.log("MessageAccumulator was rendered");
  
  useEffect(() => {
    if (!lastMessage) return;

    console.log("MessageAccumulator useEffect was initiated");
    const dataObj = JSON.parse(lastMessage.data);
    const newChunkStr = dataObj.message; // Assuming 'message' is the key in the Lambda response

    // Handle potential error responses first
    if (dataObj.statusCode && dataObj.statusCode >= 400) {
      console.error("WebSocket error with statusCode:", dataObj.statusCode);
      alert(dataObj.statusCode === 429 
        ? "You have reached your message limit. Please try again later." 
        : "An unexpected error occurred. Please try again.");
      return; // Exit early if there's an error
    }

    // Check for the end-of-stream message to reset and update chat log
    if (newChunkStr.includes("END_OF_STREAM")) {
      updateChatLogFn(lastAIMessageStr);
      setLastAIMessageStr('');
      return; // Exit after handling the end-of-stream
    }
    
    if (newChunkStr.includes("PROBLEMS_SUBMITTED_FOR_UPLOAD")) {
      setIsProblemsUploadedBool(false);
      return; // Exit after handling the end-of-stream
    }
  
    // Append new message chunk to the accumulated messages
    if (newChunkStr) {
      setLastAIMessageStr(prevResponseStr => prevResponseStr + newChunkStr);
    }
  }, [lastMessage]);

  return (
    <>
      {lastAIMessageStr &&
        <div className={styles.assistantMessageChef}>
          <strong>Assistant: </strong><Latex>{lastAIMessageStr}</Latex>
        </div>
      }
    </>
  );
};
