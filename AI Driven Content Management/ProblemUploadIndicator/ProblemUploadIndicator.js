import React, { useContext, useEffect, useState } from 'react';
import { fetchSingleTopicInformation } from '../../services/dataTransferServices';
import { AppStateContext } from '../../contextVariables/AppStateContext';
import { LearningContext } from '../../contextVariables/LearningContext';
import { UserContext } from '../../contextVariables/UserContext';
import './ProblemUploadIndicator.css';

export const ProblemUploadIndicator = ({ currentTopicProblemsArrObj }) => {
    const { isProblemsUploadedBool, setIsProblemsUploadedBool } = useContext(AppStateContext);
    const { problemCountSnapshotInt, setProblemCountSnapshotInt, currentTopicStr } = useContext(LearningContext);
    const { currentUsernameStr } = useContext(UserContext);

    const [newProblemsCountInt, setNewProblemsCountInt] = useState(0);
    const [loadingBool, setLoadingBool] = useState(false);

    useEffect(() => {
        if (!isProblemsUploadedBool) {
            let intervalId;
            let fetchCount = 0;
            const newProblemCountInt = currentTopicProblemsArrObj ? currentTopicProblemsArrObj.length : 0;
            setProblemCountSnapshotInt(newProblemCountInt);

            const fetchProblems = async () => {
                setLoadingBool(true);
                try {
                    const fetchedProblemsArrObj = await fetchSingleTopicInformation(currentUsernameStr, currentTopicStr);
                    setNewProblemsCountInt(fetchedProblemsArrObj.length - problemCountSnapshotInt);
                } catch (error) {
                    console.error("Failed to fetch problems:", error);
                } finally {
                    setLoadingBool(false);
                }

                fetchCount++;
                if (fetchCount >= 10) {
                    clearInterval(intervalId);
                    setIsProblemsUploadedBool(true);
                }
            };

            intervalId = setInterval(fetchProblems, 5000);
            return () => clearInterval(intervalId);
        }
    }, [isProblemsUploadedBool, problemCountSnapshotInt, setIsProblemsUploadedBool, currentUsernameStr, currentTopicStr]);

    return (
        <div className="loading-indicator">
            <div className="loading-icon"></div>  {/* Spinner always shown */}
            <p>{newProblemsCountInt} new problems uploaded.</p>
        </div>
    );
};
