//fileUploadHelpers.js
//MainWorkBoardPage/QuicklyUploadQuestions/UploadImageQuestions/utils/fileUploadHelpers.js

export const areFilesValid = (filesArr) => {
    const validImageTypesArr = ['image/jpeg', 'image/png'];
    const maxFileSize = 13_631_488; // 13MB

    const allFilesAreValid = filesArr.every(file => 
        validImageTypesArr.includes(file.type) && file.size <= maxFileSize
    );

    if (!allFilesAreValid) {
        alert("Only JPEG and PNG images up to 13MB are allowed.");
        return false;
    }
    return true;
};

export const isFileCountWithinLimit = (existingFilesArr, newFilesArr, maxCount = 5) => {
    if (existingFilesArr.length + newFilesArr.length > maxCount) {
        alert(`Maximum number of images (${maxCount}) exceeded.`);
        return false;
    }
    return true;
};

export const convertFilesToBase64Async = async (filesArr) => {
    return Promise.all(filesArr.map(file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);  // Returns only the base64 string
            reader.onerror = reject;
            reader.readAsDataURL(file);
        })
    ));
};

