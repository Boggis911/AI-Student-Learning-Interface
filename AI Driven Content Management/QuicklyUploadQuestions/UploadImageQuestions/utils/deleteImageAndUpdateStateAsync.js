import {syncUserUploadedImagesWithS3} from '../../../../../services/dataTransferServices';




export const deleteImageAndUpdateStateAsync  = async (imageIdStr, mimeStr, filesArr, setFilesArr, filePreviewsArrObj, setFilePreviewsArrObj, currentUsernameStr, currentTopicStr) => {
    const deleteOperationStr = "delete";
    const imageObjectArray = [{ imageIdStr: imageIdStr, file: {}, mimeStr: mimeStr }];

    console.log("imageObjectArray", imageObjectArray);
    try {
        const updatedFilesArr = filesArr.filter(item => item.imageIdStr !== imageIdStr);
        setFilesArr(updatedFilesArr);

        const updatedFilePreviewsArr = filePreviewsArrObj.filter(preview => preview.imageIdStr !== imageIdStr);
        setFilePreviewsArrObj(updatedFilePreviewsArr);

        await syncUserUploadedImagesWithS3(imageObjectArray, deleteOperationStr, currentUsernameStr, currentTopicStr);
        console.log('Image sync successful.');
    } catch (error) {
        console.error('Failed to sync the image object:', error);
        alert('There was a problem with image deletion. Please try again later');
    }
};
