import React, { useState, useContext, useEffect } from 'react';
import { TopicCreator } from './TopicCreator/TopicCreator';
import './Navigation.css';
import { fetchSingleTopicInformation, fetchAllDistinctTopicNames } from '../../services/dataTransferServices';
import { AppStateContext } from '../../contextVariables/AppStateContext';
import { UserContext } from '../../contextVariables/UserContext';
import { LearningContext } from '../../contextVariables/LearningContext';

export const Navigation = ({ currentTopicProblemsArrObj, setCurrentTopicProblemsArrObj }) => {
  const { currentUsernameStr } = useContext(UserContext);
  const { setCurrentPageStr, isProblemsUploadedBool } = useContext(AppStateContext);
  const { setCurrentTopicStr, setCurrentProblemCountSnapshotInt } = useContext(LearningContext);

  const [topicListArr, setTopicList] = useState([]);

  useEffect(() => {
    handleFetchAllDistinctTopicNames();
  }, []);

  const handleFetchAllDistinctTopicNames = async () => {
    setCurrentPageStr('');
    setCurrentTopicStr('');
    try {
      const fetchedTopicsArr = await fetchAllDistinctTopicNames(currentUsernameStr);
      setTopicList(fetchedTopicsArr);
      console.log("topicListArr: ",topicListArr );
    } catch (error) {
      console.error("Failed to fetch topic list:", error.message);
      setTopicList([]);
    }
  };

  const handleSelectTopic = async (topicValueStr) => {
    try {
      setCurrentTopicStr(topicValueStr);
      setCurrentPageStr("learn");
      const dataObj = await fetchSingleTopicInformation(currentUsernameStr, topicValueStr);
      setCurrentTopicProblemsArrObj(dataObj);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  return (
    <nav className="navigation">
      <div className="navigation-content">
        <h2>General Chat</h2>
        <button onClick={() => setCurrentPageStr("generalChat")}>General chat</button>
        <h2>Create new topic</h2>
        <TopicCreator handleFetchAllDistinctTopicNames={handleFetchAllDistinctTopicNames} />
        <h2>Your topics</h2>
        <ul>
          {topicListArr.map((topic, index) => (
            <li key={index}>
              <button onClick={() => handleSelectTopic(topic)}>{topic}</button>
            </li>
          ))}
        </ul>
        <h2>Refresh content</h2>
        <button onClick={handleFetchAllDistinctTopicNames}>Refresh all content</button>
      </div>
    </nav>
  );
};
