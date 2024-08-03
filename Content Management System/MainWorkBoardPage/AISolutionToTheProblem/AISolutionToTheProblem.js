import React, { useState } from 'react';
import './AISolutionToTheProblem.css';  // Make sure to import the CSS file
import {SolutionStepBoxes} from './SolutionStepBoxes/SolutionStepBoxes';
import {AIChat} from '../../AIChat/AIChat';

export const AISolutionToTheProblem = () => {
    // State to store the currently selected solution step number

    // Constant for routing AI solution checks
    const systemInstructionRoutingStr = 'checkAISolution';
    
    return (
        <div className="split-screen-layout">
            <div className="child-div">
                <SolutionStepBoxes
                />
            </div>
            <div className="child-div">
                <h2>Assistant</h2>

                <AIChat
                    systemInstructionRoutingStr={systemInstructionRoutingStr}
                />
            </div>
        </div>
    );
};
