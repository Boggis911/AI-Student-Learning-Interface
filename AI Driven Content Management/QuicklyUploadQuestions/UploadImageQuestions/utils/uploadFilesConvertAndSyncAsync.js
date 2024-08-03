//uploadFilesConvertAndSyncAsync.js
//hierarchy: //MainWorkBoardPage/QuicklyUploadQuestions/UploadImageQuestions/utils/uploadFilesConvertAndSyncAsync.js


import { syncUserUploadedImagesWithS3 } from '../../../../../services/dataTransferServices';
import { areFilesValid, isFileCountWithinLimit, convertFilesToBase64Async } from './fileUploadHelpers';

export const uploadFilesConvertAndSyncAsync = async (e, filesArr, setFilesArr, setFilePreviewsArrObj, currentUsernameStr, currentTopicStr) => {
    console.time('fileChange');
    const newFilesArr = Array.from(e.target.files);

    if (!areFilesValid(newFilesArr) || !isFileCountWithinLimit(filesArr, newFilesArr)) {
        console.timeEnd('fileChange');
        return;
    }

    const newFilesObjectArray = newFilesArr.map(file => ({
        file,
        mimeStr: file.type,
        imageIdStr: Math.floor(100000000 + Math.random() * 900000000).toString(),
    }));

    try {
        const base64Strings = await convertFilesToBase64Async(newFilesObjectArray.map(descriptor => descriptor.file));
        const imagesAsBase64ArrObj = base64Strings.map((base64, index) => ({
            base64ImageStr: base64,
            mimeStr: newFilesObjectArray[index].mimeStr,
            imageIdStr: newFilesObjectArray[index].imageIdStr
        }));        
        
        await syncUserUploadedImagesWithS3(imagesAsBase64ArrObj, "put", currentUsernameStr, currentTopicStr);
        
        const updatedFilesArr = [...filesArr, ...newFilesObjectArray];
        setFilesArr(updatedFilesArr);
        
        const updatedFilePreviewsArr = updatedFilesArr.map(file => ({
            imageIdStr: file.imageIdStr,
            mimeStr: file.mimeStr,
            urlStr: URL.createObjectURL(file.file)
        }));
        
        setFilePreviewsArrObj(updatedFilePreviewsArr);
    } catch (error) {
        console.error('Error processing files:', error);
        alert('Failed to upload images.');
    }

    console.timeEnd('fileChange');
};

