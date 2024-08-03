import React, { useState, useEffect, useContext, useCallback } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { useAIWebsocket } from '../../services/communicationWithAIServices';
import { constructParams } from './utils/paramsConstructor';
import { designTextArea } from './utils/textAreaDesigner';
import { ChatMessageAccumulator } from './ChatMessageAccumulator/ChatMessageAccumulator';
import { ChefMessageAccumulator } from './ChefMessageAccumulator/ChefMessageAccumulator';

import styles from './AIChat.module.css'; 

import { UserContext } from '../../contextVariables/UserContext';
import { LearningContext } from '../../contextVariables/LearningContext';

export const AIChat = ({
  systemInstructionRoutingStr = '',
  mathquillLatexValuesArrStr = [],
  filePreviewsArrObj = [], 

}) => {
  const [userCurrentChatInputStr, setUserCurrentChatInputStr] = useState("");
  const [chatLogArrObj, setChatLogArrObj] = useState([]);
  const { currentUsernameStr } = useContext(UserContext);
  const { currentExerciseDetailsObj, currentTopicStr} = useContext(LearningContext);
  const { sendMessage, readyState, lastMessage } = useAIWebsocket();

  const { style: textAreaStyle, placeholder: textAreaPlaceholder } = designTextArea(systemInstructionRoutingStr);


  const handleSendMessage = () => {
    if (userCurrentChatInputStr.trim()) {
      const params = constructParams({
        systemInstructionRoutingStr,
        chatLogArrObj, 
        userCurrentChatInputStr,
        currentUsernameStr,
        currentExerciseDetailsObj,
        mathquillLatexValuesArrStr,
        filePreviewsArrObj,
        currentTopicStr
      });
      
      sendMessage(JSON.stringify(params));
      setUserCurrentChatInputStr('');
      setChatLogArrObj(prev => [...prev, { role: "user", content: userCurrentChatInputStr }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default Enter behavior
      handleSendMessage();
    }
  };

  const handleChange = (e) => {
    setUserCurrentChatInputStr(e.target.value);
  };

  const updateChatLogFn = useCallback((lastAIMessageStr) => {
    setChatLogArrObj(prev => [...prev, { role: "assistant", content: lastAIMessageStr }]);
  }, []);

return (
    <section className={styles.chatInterfaceContainer}>
      {readyState === 3 && <h3 className={styles.connectionIssueNotice}>Connection is closed. Wait for a few seconds</h3>}
      <div className={styles.messageHistoryScrollArea}>
        {chatLogArrObj.map((entry, index) => (
          <p key={index} className={styles.messageEntry}>
            <strong>{entry.role === 'user' ? 'You' : 'Assistant'}:</strong> <Latex>{entry.content || ""}</Latex>
          </p>
        ))}
      
      {systemInstructionRoutingStr=="generateMoreProblemsChef" ? (
      <ChefMessageAccumulator
        updateChatLogFn={updateChatLogFn}
        lastMessage={lastMessage}
      />
      ): (
      <ChatMessageAccumulator
        updateChatLogFn={updateChatLogFn}
        lastMessage={lastMessage}
      />
      )
      }
      </div>
      {readyState === 1 && (
        <div className={styles.textInputArea}>
          <textarea
            className={styles.textInput}
            style={textAreaStyle}  // Ensure any inline styles are still applied if needed
            placeholder={textAreaPlaceholder}
            maxLength="1000"
            value={userCurrentChatInputStr}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Attach the handleKeyDown function
          />
          <div className={styles.controlButtonGroup}>
            <button className={styles.sendTextButton} onClick={handleSendMessage} disabled={!userCurrentChatInputStr.trim()}>
              Send
            </button>
            <button className={styles.clearChatButton} onClick={() => {
              setChatLogArrObj([]);
              setUserCurrentChatInputStr('');
            }}>
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
