import React, { useState} from 'react';
import './UserSolutionToTheProblem.css';  // Import the CSS file
import {MathQuill} from '../../MathQuill/MathQuill';
import {AIChat} from '../../AIChat/AIChat';
import{ LatexNotationLegend } from '../LatexNotationLegend/LatexNotationLegend';

export const UserSolutionToTheProblem = () => {
  // State to store latex values from MathQuill
  const [mathquillLatexValuesArrStr, setMathquillLatexValuesArrStr] = useState([]);

  // Constant for AI-based solution checking
  const systemInstructionRoutingStr = "checkUserSolutionWithAI";
  const textareaPlaceholderStr = "I can check your whiteboard and answer your questions";


  return (
    <div className="split-screen-layout">
      <div className="child-div">
          <div className="header-with-help">
            <h2>Your Whiteboard</h2>
            <LatexNotationLegend /> 
          </div>
        <MathQuill
          setMathquillLatexValuesArrStr={setMathquillLatexValuesArrStr}
        />
      </div>
      <div className="child-div">
        <h2>Assistant</h2>
        <AIChat
          systemInstructionRoutingStr={systemInstructionRoutingStr}
          textAreaStyleClass="solution-checker-textarea"  // Changed to class name
          mathquillLatexValuesArrStr={mathquillLatexValuesArrStr}
          textareaPlaceholderStr={textareaPlaceholderStr}
        />
      </div>
    </div>
  );
};
