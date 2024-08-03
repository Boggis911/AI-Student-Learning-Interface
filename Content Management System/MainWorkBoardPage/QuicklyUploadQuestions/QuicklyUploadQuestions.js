//QuicklyUploadQuestions.js
import React, { useState, useContext } from 'react';
import { AIChat } from '../../AIChat/AIChat';
import { UploadImageQuestions } from './UploadImageQuestions/UploadImageQuestions';
import { AppStateContext } from '../../../contextVariables/AppStateContext';
import './QuicklyUploadQuestions.css'; // Import the new CSS file

export const QuicklyUploadQuestions = () => {
    const [isPopupOpenBool, setIsPopupOpenBool] = useState(false);
    const {isProblemsUploadedBool } = useContext(AppStateContext);
    const [filePreviewsArrObj, setFilePreviewsArrObj] = useState([]);

    const togglePopup = () => {
        if (isPopupOpenBool) {
            setFilePreviewsArrObj([]); // Clear the file previews upon closing
        }
        setIsPopupOpenBool(!isPopupOpenBool);
    };

    return (
        <div>
            <button onClick={togglePopup}>Add more questions</button>
            {isPopupOpenBool && (
                <div className="overlay">
                    <div className="modal-content">
                    {isProblemsUploadedBool}
                        <span
                            className={`close-button ${!isProblemsUploadedBool ? 'glow' : ''}`}
                            onClick={togglePopup}
                        >
                            &times;
                        </span>
                        <UploadImageQuestions
                            filePreviewsArrObj={filePreviewsArrObj}
                            setFilePreviewsArrObj={setFilePreviewsArrObj}
                        />
                        <AIChat
                            systemInstructionRoutingStr="generateMoreProblemsChef"
                            filePreviewsArrObj={filePreviewsArrObj}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
