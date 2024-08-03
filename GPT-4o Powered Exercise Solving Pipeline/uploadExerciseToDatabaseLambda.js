
// index.mjs
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: process.env.DEFAULT_REGION });
const dynamoDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const handler = async (event) => {
  try {
    // Destructure the required properties from the event
    const {
      usernameStr, 
      problemTopicStr, 
      problemQuestionStr, 
      problemAnswerStr, 
      problemSolutionStepsArrStr
    } = event;

    // Check if any of the values are null or undefined
    const values = [usernameStr, problemTopicStr, problemQuestionStr, problemAnswerStr, problemSolutionStepsArrStr];
    const missingValue = values.some(value => value === null || value === undefined);

    if (missingValue) {
      throw new Error("One or more required input values are missing or undefined");
    }

    const problemIDStr = Date.now().toString();
    const itemCategoryStr = 'exercise';
    const dynamoDbItemObj = {
      problemIDStr,
      usernameStr,
      itemCategoryStr,
      problemTopicStr,
      problemQuestionStr,
      problemAnswerStr,
      problemSolutionStepsArrStr
    };

    const putCommandParams = {
      TableName: process.env.EXERCISES_TABLE,
      Item: dynamoDbItemObj,
    };

    await dynamoDocumentClient.send(new PutCommand(putCommandParams));
    console.log("Data put to DynamoDB successfully with problemID:", problemIDStr);

    return {
      statusCode: 200,
      body: JSON.stringify(dynamoDbItemObj),
    };
  } catch (error) {
    // Instead of returning an error response, throw the error to be handled by AWS Step Functions
    throw new Error(JSON.stringify({
      error: "Error putting data to DynamoDB",
      message: error.message,
      stack: error.stack,
      input: event // Consider security and compliance before logging sensitive input data
    }));
  }
};
