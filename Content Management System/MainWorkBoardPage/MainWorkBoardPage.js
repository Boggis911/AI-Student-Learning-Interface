import React, { useState, useContext } from 'react';
import './MainWorkBoardPage.css';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { QuicklyUploadQuestions } from './QuicklyUploadQuestions/QuicklyUploadQuestions';
import { ExerciseDisplay } from './ExerciseDisplay/ExerciseDisplay';
import { UserSolutionToTheProblem } from './UserSolutionToTheProblem/UserSolutionToTheProblem';
import { AISolutionToTheProblem } from './AISolutionToTheProblem/AISolutionToTheProblem';
import { LearningContext } from '../../contextVariables/LearningContext';

// MainWorkBoardPage component manages the display and interaction logic for the work board of a particular topic.
export const MainWorkBoardPage = ({ currentTopicProblemsArrObj }) => {
  const [isAIToggleEnabledBool, setIsAIToggleEnabledBool] = useState(false); // Boolean state to toggle AI solution view.
  const [isAnswerVisibleBool, setIsAnswerVisibleBool] = useState(false); // Boolean state to toggle the display of the correct answer.
  const { currentExerciseDetailsObj } = useContext(LearningContext);

 return (
  <section className="main-section">
    <QuicklyUploadQuestions />

    <ExerciseDisplay
      currentTopicProblemsArrObj={currentTopicProblemsArrObj}
    />

    {currentExerciseDetailsObj && (
      <>
        {isAIToggleEnabledBool ? (
          <AISolutionToTheProblem />
        ) : (
          <UserSolutionToTheProblem />
        )}
        
      <div className="spacer"></div>

      <div className="buttons-container">
          <button onClick={() => setIsAIToggleEnabledBool(!isAIToggleEnabledBool)}>
            {isAIToggleEnabledBool ? "Type your own answer" : "See step-by-step solution"}
          </button>
          <button onClick={() => setIsAnswerVisibleBool(!isAnswerVisibleBool)}>
            {isAnswerVisibleBool ? "Hide Correct Answer" : "Show Correct Answer"}
          </button>
        </div>
        
        {isAnswerVisibleBool && (
          <div className="correct-answer">
            <p>Correct Answer: <Latex>{currentExerciseDetailsObj.problemAnswerStr}</Latex></p>
          </div>
        )}
      </>
    )}
  </section>
);

};
