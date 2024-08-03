// openaiService.mjs
// Centralized service module for interacting with OpenAI, including parameter construction and chat completion handling.

import { OpenAI } from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export function constructParams(chefUserProblemQuestionsStr) {
    const systemInstruction = `
You must respond only in the specified JSON formats. Each response must adhere strictly to the following JSON structure:
{
  "problemsArray": [
    "Problem description: LaTeX formatted problem here, in user native language, with double backslashes for LaTeX commands, enclosed in dollar signs: $\\\\frac{2a}{4b}=5c$."
  ]
}

Details:
- Key: 'problemsArray' where each item is a single string that includes a short problem description, enclosed in dollar signs $.
- problemsArray should be written in the same language as the user is engaging with you, which sometimes will not be English.
- Example: {"problemsArray": ["Solve the following equation x: $\\\\frac{x}{5}=10$", "Find the probability of choosing an Ace from a full deck of cards."]}.
- each problem should act as an exercise for students, which does not include any  tips, hints, or support.
- Requirements:
  1. Each LaTeX command must use double backslashes.
  2. Each element in 'problemsArray' must be a self-contained string that starts with a brief, clear description of what needs to be done (e.g., "Solve for x", "Simplify").
  3. Each problem must have only a single clear objective which would act as an exercise for students.

    `;


    return {
        model: "gpt-4o",
        messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: chefUserProblemQuestionsStr }
        ],
        max_tokens: 800,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: { type: "json_object" },
        stream: false
    };
}

export async function sendChatCompletion(modelParamsObj) {
    try {
        console.log("sendChatCompletion, modelParamsObj: ", modelParamsObj);
        const chatCompletion = await openai.chat.completions.create(modelParamsObj);
        const openaiResponse = chatCompletion.choices[0].message.content;
        console.log("Final Assistant Message content: ", openaiResponse);

        const jsonResponse = JSON.parse(openaiResponse);
        if (jsonResponse && jsonResponse.problemsArray === null) {
            throw new Error(`Error processing input, received null for problemsArray. Input was: ${JSON.stringify(modelParamsObj.messages)}`);
        }

        console.log('openaiResponse.problemsArray', jsonResponse.problemsArray);
        return jsonResponse.problemsArray;  // Return the parsed JSON object containing the problems array
    } catch (error) {
        console.error('Error sending chat completion to OpenAI:', error);
        throw new Error(`Failed to get response from OpenAI: ${error.message}. Input was: ${JSON.stringify(modelParamsObj.messages)}`);
    }
}
