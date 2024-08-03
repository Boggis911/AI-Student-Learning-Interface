// paramsConstructor.js

export const constructParams = ({
  systemInstructionRoutingStr,
  chatLogArrObj,
  userCurrentChatInputStr,
  currentUsernameStr,
  currentExerciseDetailsObj,
  mathquillLatexValuesArrStr,
  filePreviewsArrObj,
  currentTopicStr,
}) => {
  let params = {};
  const lastChatLogsArrObj = chatLogArrObj.slice(systemInstructionRoutingStr === "generateMoreProblemsChef" ? -10 : -5);

  switch (systemInstructionRoutingStr) {
    case "checkUserSolutionWithAI":
      const mathquillLatexStr = mathquillLatexValuesArrStr.join("; ");
      const messageContentStr = `USER PROBLEM SOLUTION: "${mathquillLatexStr}" USER ADDITIONAL MESSAGE: "${userCurrentChatInputStr}"`;
      params = {
        action: 'chatWithBot',
        frontendMessagesArrObj: [...lastChatLogsArrObj, { role: "user", content: messageContentStr }],
        currentUsernameStr,
        systemInstructionRoutingStr,
        currentExerciseDetailsObj
      };
      break;
    case "checkAISolution":
      params = {
        action: 'chatWithBot',
        frontendMessagesArrObj: [...lastChatLogsArrObj, { role: "user", content: userCurrentChatInputStr }],
        currentUsernameStr,
        systemInstructionRoutingStr,
        currentExerciseDetailsObj
      };
      break;
    case "haveAGeneralChatWithAI":
      params = {
        action: 'chatWithBot',
        frontendMessagesArrObj: [...lastChatLogsArrObj, { role: "user", content: userCurrentChatInputStr }],
        currentUsernameStr,
        systemInstructionRoutingStr
      };
      break;
      
      
    case "generateMoreProblemsChef":
      const frontendMessagesArrObj = [...lastChatLogsArrObj, { role: "user", content: userCurrentChatInputStr }];
      const imageArrObj = filePreviewsArrObj.map(({ imageIdStr, mimeStr, urlStr }) => ({
        imageIdStr,
        mimeStr
      }));
 
      params = {
        action: 'chatWithChef',
        frontendMessagesArrObj,
        currentUsernameStr,
        currentTopicStr,
        imageArrObj,
        systemInstructionRoutingStr,
      };
      
      break;
      
    default:
      console.log("systemInstructionRoutingStr:", systemInstructionRoutingStr);
      console.error("Incorrect systemInstructionRouting provided:", systemInstructionRoutingStr);
      break;
  }

  return params;
};
