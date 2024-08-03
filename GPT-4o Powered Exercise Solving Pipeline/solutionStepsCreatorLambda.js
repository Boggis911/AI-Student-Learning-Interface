// openaiService.mjs
import { OpenAI } from 'openai';

const openaiAPI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Async function to create an assistant and return its ID
export async function createAssistantStr() {
  const assistantNameStr = "Problem solver";
const systemInstructionsStr = `
You will receive a problem statement with a verified final answer. Your task is to output a JSON object detailing the key mathematical steps needed to solve the problem.

Output Format:
Generate a JSON object with the key "correctSteps". Each string in this list should include a single LaTeX-formatted mathematical expression and a brief explanation of the step's purpose.

Specifications:
1. Carefully consider the problem to ensure the accuracy of the steps.
2. Use inline LaTeX (e.g., '$\\\\frac{a}{b} = c$') for the mathematical expressions.
3. Combine clarity and conciseness in each step's description to explain both the calculation and its reasoning.
4. Write in the same language as the problem question, which was initally provided.

Example JSON Output:

\`\`\`json
{
  "correctSteps": [
    "$\\\\frac{a}{b} = c$: This represents dividing $a$ by $b$, necessary for...",
    "...further steps..."
  ]
}
\`\`\`

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

export async function createThreadAndSendMessageStr(problemDataObj) {
  const threadObj = await openaiAPI.beta.threads.create();
  const questionWithAnswerStr = `QUESTION: ${problemDataObj.problemQuestionStr}; VERIFIED CORRECT ANSWER: ${problemDataObj.problemAnswerStr}`;
  console.log("createThreadAndSendMessageStr, questionWithAnswerStr: ", questionWithAnswerStr);
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

    // Log all messages with indexes
    messagesArrObj.data.forEach((msg, index) => {
      if (msg.content && msg.content.length > 0) {
        const messageText = msg.content.find(content => content.type === 'text')?.text?.value;
        console.log(`Message ${index + 1}: ${messageText} (${msg.role})`);
      }
    });

    // Assuming the first message in the array is the most recent one
    const finalMessage = messagesArrObj.data.length > 0
      ? messagesArrObj.data[0].content.find(content => content.type === 'text')?.text?.value
      : null;

    // Log the final returned message
    console.log(`Final returned message: ${finalMessage}`);

    return finalMessage;
  } catch (error) {
    console.error("Failed to retrieve final message:", error);
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
