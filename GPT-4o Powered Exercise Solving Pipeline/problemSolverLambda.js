// openaiService.mjs
import { OpenAI } from 'openai';

const openaiAPI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Async function to create an assistant and return its ID
export async function createAssistantStr() {
  const assistantNameStr = "Problem solver";
const systemInstructionsStr = `
The user will provide you with a problem, and you will have to respond with the following json object output:

\`\`\`json

  {
    "answer": "$problem_answer$"
  }

\`\`\`

For instance, if answer is 40 celcius or contains other units, write: "answer": "$40.0 \degree C$"
- All answers should be formatted in LaTex.
- Use inline LaTeX formatting for example: \`$\\\\frac{a}{b} = c$\`.
- You will have to solve the problem and must ALWAYS use code interpreter to do numeric calculations to find the final answer to the problem. Include the final answer in the JSON body.
- Return "answer": null if the answer contains an imaginary number i^2=-1.
- You should not write the solution or explanation, but just find the final answer. This is your main job to only find the final answer with no explanation or solution steps.
`;

  
  try {
    const myAssistantObj = await openaiAPI.beta.assistants.create({
      model: "gpt-4o",
      instructions: systemInstructionsStr,
      name: assistantNameStr,
      tools: [{ type: "code_interpreter" }],
      
    });

    return myAssistantObj.id;  // Return the ID of the created assistant
  } catch (error) {
    console.error("Failed to create assistant:", error);
    throw error;  // Re-throw the error to be handled by the caller
  }
}

export async function createThreadAndSendMessageStr(questionWithAnswerStr) {
  const threadObj = await openaiAPI.beta.threads.create();
  console.log("create thread, questionWithAnswerStr: ", questionWithAnswerStr);
  await openaiAPI.beta.threads.messages.create(threadObj.id, {
    role: "user",
    content: questionWithAnswerStr,
  });
  return threadObj.id;
}


export async function createAndPollRun(threadIdStr, assistantIdStr) {
  try {
    // Create the run
    let runObj = await openaiAPI.beta.threads.runs.create(threadIdStr, {
      assistant_id: assistantIdStr,
      instructions: ""
    });

    // Poll for the status of the run until it reaches a terminal state
    while (runObj.status === 'in_progress' || runObj.status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
      runObj = await openaiAPI.beta.threads.runs.retrieve(threadIdStr, runObj.id);
    }

    // Once the run is complete, log the usage data
    if (runObj.status === 'completed' && runObj.usage) {
      console.log(`Usage - Prompt Tokens: ${runObj.usage.prompt_tokens}, Completion Tokens: ${runObj.usage.completion_tokens}, Total Tokens: ${runObj.usage.total_tokens}`);
    }

    return runObj;
  } catch (error) {
    console.error("Failed to create and poll run:", error);
    throw error;
  }
}




export async function getFinalAssistantMessageStr(threadIdStr) {
  try {
    const messagesArrObj = await openaiAPI.beta.threads.messages.list(threadIdStr);
    const assistantMessagesArrObj = messagesArrObj.data.filter(msg => msg.role === "assistant");
    console.log("messagesArrObj: ",messagesArrObj);
    console.log("assistantMessagesArrObj", assistantMessagesArrObj);
    
    // Log all messages with indexes
    assistantMessagesArrObj.forEach((msg, index) => {
      if (msg.content && msg.content.length > 0) {
        const messageText = msg.content.find(content => content.type === 'text')?.text?.value;
        console.log(`Message ${index + 1}: ${messageText}`);
      }
    });

    // Return the last message if available
    if (assistantMessagesArrObj.length > 0) {
      const lastMessageObj = assistantMessagesArrObj[assistantMessagesArrObj.length - 1];
      return lastMessageObj.content.find(content => content.type === 'text')?.text?.value;
    }
    return null;
  } catch (error) {
    console.error("Failed to retrieve final assistant message:", error);
    throw error;
  }
}




export async function deleteThreadStr(threadIdStr) {
  try {
    const responseObj = await openaiAPI.beta.threads.del(threadIdStr);
    console.log("Thread deleted:", responseObj);
    return responseObj; // This will contain the deletion confirmation
  } catch (error) {
    console.error("Failed to delete thread:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function deleteAssistantStr(assistantIdStr) {
  try {
    const responseObj = await openaiAPI.beta.assistants.del(assistantIdStr);
    console.log("Assistant deleted:", responseObj);
    return responseObj; // This will contain the deletion confirmation
  } catch (error) {
    console.error("Failed to delete assistant:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
