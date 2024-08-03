//ExerciseDisplay.js
//Hierarchy: MainWorkBoardPage > ExerciseDisplay
import React, { useState, useEffect, useContext } from 'react';
import 'katex/dist/katex.min.css'; // Styles for LaTeX rendering
import Latex from 'react-latex-next';
import { LearningContext } from '../../../contextVariables/LearningContext';
import './ExerciseDisplay.css';
// ExerciseDisplay component manages the display of exercises related to a topic.
export const ExerciseDisplay = ({ currentTopicProblemsArrObj }) => {
  const { currentTopicStr } = useContext(LearningContext); // String indicating the current topic.
  const { currentExerciseDetailsObj, setCurrentExerciseDetailsObj } = useContext(LearningContext);

  // Filtering the topic information to get only exercises.
  const exercisesArrObj = currentTopicProblemsArrObj.filter(item => item.itemCategoryStr === "exercise");

  // Mapping exercises to questions for use in AI or other components.
  const allTopicQuestionsArrStr = exercisesArrObj.map(item => item.problemQuestionStr);
  
  const [exerciseNumberInt, setExerciseNumberInt] = useState(null); // Integer state representing the current exercise number.
  const [isProblemLatexVisibleBool, setIsProblemLatexVisibleBool] = useState(false); // Boolean state to toggle LaTeX view.

  // Effect to reset exercise information when topic changes.
  useEffect(() => {
    if (currentTopicProblemsArrObj) {
      setExerciseNumberInt(null);
      setCurrentExerciseDetailsObj(null);
    }
  }, [currentTopicProblemsArrObj]);

  // Effect to update exercise information when the exercise number changes.
  useEffect(() => {
    if (exerciseNumberInt !== null) {
      updateExerciseInformation();
    }
  }, [exerciseNumberInt]);

  const updateExerciseInformation = () => {
    if (exercisesArrObj.length > 0 && exerciseNumberInt !== null) {
      const currentExerciseObj = exercisesArrObj[exerciseNumberInt];
      const newExerciseInformationObj = {
        problemQuestionStr: currentExerciseObj.problemQuestionStr,
        problemAnswerStr: currentExerciseObj.problemAnswerStr,
        problemSolutionStepsArrStr: currentExerciseObj.problemSolutionStepsArrStr,
      };
      setCurrentExerciseDetailsObj(newExerciseInformationObj);
    }
  };


  return (
    <>
      <h1>{currentTopicStr}</h1>
      <h2>Practice Problems</h2>
      {exercisesArrObj.map((exercise, index) => (
        <button className="exercise-button" key={index} onClick={() => setExerciseNumberInt(index)}>
          Question {index + 1}
        </button>
      ))}

      {currentExerciseDetailsObj && currentExerciseDetailsObj.problemQuestionStr && (
        <div className="exercise-details">
          <p className="exercise-question-label">Question {exerciseNumberInt + 1}</p>
          <p className="exercise-question">
            <Latex>{currentExerciseDetailsObj.problemQuestionStr}</Latex>
          </p>
        </div>
      )}
    </>
  );
};
