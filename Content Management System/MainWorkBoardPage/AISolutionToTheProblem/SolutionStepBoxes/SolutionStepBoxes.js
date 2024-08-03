import React, { useState, useContext } from 'react';
import './SolutionStepBoxes.css'; // Ensure this path is correct
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { LearningContext } from '../../../../contextVariables/LearningContext';

export const SolutionStepBoxes = () => {
  const { currentExerciseDetailsObj } = useContext(LearningContext);
  const [numberOfDisplaySteps, setNumberOfDisplaySteps] = useState(1);

  const totalSteps = currentExerciseDetailsObj.problemSolutionStepsArrStr.length;

  // Function to handle incrementing the display steps
  const handleAddStep = () => {
    if (numberOfDisplaySteps < totalSteps) {
      setNumberOfDisplaySteps(numberOfDisplaySteps + 1);
    }
  };

  // Function to handle decrementing the display steps
  const handleRemoveStep = () => {
    if (numberOfDisplaySteps > 1) {
      setNumberOfDisplaySteps(numberOfDisplaySteps - 1);
    }
  };

  return (
    <>
      <div className="step-modification-container">
        <div 
          className="step-modification-button" 
          onClick={handleAddStep}
        >
          Add 1 step
        </div>
        <div 
          className="step-modification-button" 
          onClick={handleRemoveStep}
        >
          Remove 1 step
        </div>
        <div 
          className="step-modification-button" 
          onClick={() => setNumberOfDisplaySteps(totalSteps)}
        >
          Show All Steps
        </div>
      </div>
      {currentExerciseDetailsObj.problemSolutionStepsArrStr.slice(0, numberOfDisplaySteps).map((item, index) => (
        <div 
          key={index} 
          className="solution-step-button"
        >
          {typeof item === 'string' && <Latex>{item}</Latex>}
        </div>
      ))}
    </>
  );
};
