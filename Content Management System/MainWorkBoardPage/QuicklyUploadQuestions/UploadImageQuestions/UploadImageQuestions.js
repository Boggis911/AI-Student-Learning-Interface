import React, { useState, useEffect, useContext } from 'react';
import { uploadFilesConvertAndSyncAsync  } from './utils/uploadFilesConvertAndSyncAsync';
import { deleteImageAndUpdateStateAsync  } from './utils/deleteImageAndUpdateStateAsync';
import { LearningContext } from '../../../../contextVariables/LearningContext';
import { UserContext } from '../../../../contextVariables/UserContext';
import './UploadImageQuestions.css'; // Import the new CSS file

/**
 * Component: UploadImageQuestions
 * Filename: UploadImageQuestions.js
 * Purpose: Allows users to upload and manage images containing questions for specific topics.
 * Uses contexts for the current user and topic to manage operations.
 */
export const UploadImageQuestions = ({ filePreviewsArrObj, setFilePreviewsArrObj }) => {
    const { currentUsernameStr } = useContext(UserContext);
    const { currentTopicStr } = useContext(LearningContext);

    const [filesArr, setFilesArr] = useState([]);

    useEffect(() => {
        return () => {
            filePreviewsArrObj.forEach(urlStr => URL.revokeObjectURL(urlStr));
        };
    }, [filePreviewsArrObj]);

    return (
        <div>
            <h3>Upload and scan images with questions:</h3>
            <form>
                <label htmlFor="file-upload" className="custom-label">
                    <i className="fas fa-cloud-upload-alt"></i> Choose Images
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadFilesConvertAndSyncAsync(e, filesArr, setFilesArr, setFilePreviewsArrObj, currentUsernameStr, currentTopicStr)}
                        multiple
                        className="hidden-input"
                    />
                </label>
            </form>

            {filesArr.length !== 0 && <h3>Image preview</h3>}
            <div className="image-preview-container">
                {filePreviewsArrObj.map((previewObj, index) => (
                    <div key={previewObj.imageIdStr} className="image-preview-wrapper">
                        <img src={previewObj.urlStr} alt={`Preview ${index + 1}`} className="image-preview" />
                        <button
                            className="delete-button"
                            onClick={() => deleteImageAndUpdateStateAsync(previewObj.imageIdStr, previewObj.mimeStr, filesArr, setFilesArr, filePreviewsArrObj, setFilePreviewsArrObj, currentUsernameStr, currentTopicStr)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
