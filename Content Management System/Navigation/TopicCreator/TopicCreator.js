// TopicCreator.mjs
// Hierarchy: Navigation.js > TopicCreator.js
// Purpose: Component to allow users to create new topics in the database.
// Interacts with: CurrentUserContext, dataTransferServices
import React, { useState, useContext } from 'react';
import { UserContext } from '../../../contextVariables/UserContext';
import { createDatabaseItem } from '../../../services/dataTransferServices';

export const TopicCreator = ({ handleFetchAllDistinctTopicNames }) => {
  const { currentUsernameStr } = useContext(UserContext); // Using 'Str' suffix to denote string type
  const [newTopicNameStr, setNewTopicName] = useState(''); // Denoting a string state

  const handleInputChange = (event) => {
    setNewTopicName(event.target.value.slice(0, 30)); // Ensuring input does not exceed 30 characters
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoryStr = 'mock'; // Example category, adjust as needed

    try {
      const response = await createDatabaseItem(currentUsernameStr, categoryStr, newTopicNameStr);
      console.log("Success:", response); // Logging success
      alert(`Success! ${newTopicNameStr} was created`); // Alerting user of success
      await handleFetchAllDistinctTopicNames(); // Refreshing topic list after creation
      console.log("handleFetchAllDistinctTopicNames in TopicCreator");
      setNewTopicName(''); // Resetting the input field post submission
    } catch (error) {
      console.error("Failed to create a mock item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTopicNameStr}
        onChange={handleInputChange}
        placeholder="New Topic Name"
        maxLength={30} // Limits the input length to 30 characters
      />
      <button type="submit" disabled={!newTopicNameStr.trim()}>Create New Topic</button>
    </form>
  );
};
