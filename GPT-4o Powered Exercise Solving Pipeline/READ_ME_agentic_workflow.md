# Agentic Workflow

## Technologies Used
- **AWS Lambda:** Serverless functions for executing backend logic.
- **AWS Step Functions:** Orchestrates the workflow, coordinating multiple Lambda functions.
- **DynamoDB:** NoSQL database for storing exercises and solutions.
- **OpenAI GPT-4 and GPT-4o:** AI models for generating, solving, and verifying exercises.
- **OpenAI Code Interpreter:** Tool for solving complex problems accurately.


## Introduction
The Agentic Workflow was designed to provide students with immediate support and feedback on their exercises, reducing the need for tutor intervention and enhancing the learning experience. By automating the upload of exercises with predefined answers and solutions, the platform ensures that students receive accurate and timely feedback, aligned with the latest scientific research on effective learning strategies.

## Context
Students often encounter exercises without attached solutions or answers, prompting them to seek external support. Immediate feedback is crucial for effective learning, but in 2023-2024, GPT-4 and GPT-4o models still faced hallucination issues. Hallucination refers to generating false information with high confidence, which can mislead students, especially in STEM subjects.

## Solution
### Halucination Issue
To mitigate the hallucination problem, the Agentic Workflow leverages AWS Lambda and AWS Step Functions to orchestrate multiple Lambda functions, each integrated with GPT-4 and later GPT-4o models. These models have varying configurations and system instructions, enabling the splitting of complex tasks into smaller, manageable subtasks.

### Workflow Implementation
The Agentic Workflow effectively splits the task of creating, solving, and verifying exercises into smaller segments, resembling an assembly line. Each model builds upon the work of the previous one, ensuring accuracy and consistency.

1. **Exercise Creation:** The first model, interacting directly with users, generates a large set of exercises and initiates the exercise solving pipeline hosted on AWS Step Functions.
2. **Question Formatting:** The second model formats the questions, making them easier to understand and allowing multiple exercises to be processed in parallel.
3. **Problem Solving:** The third model uses the latest OpenAI tools, like Code Interpreter, to solve the problems.
4. **Solution Writing:** The fourth model writes easy-to-follow solutions that lead to the final answers.
5. **Data Upload:** The final Lambda function, without GPT model integration, uploads the questions to the DynamoDB database, making new exercises available on the student learning platform.

Furthermore, 2 additional models were implemented at first to cross-verify problem final answer and solution to prevent any inaccurate information, but it was later removed to save costs.

## Benefits
- **Immediate Feedback:** Provides students with accurate, immediate feedback on their exercises.
- **Reduced Tutor Dependency:** Automates the exercise upload and verification process, reducing the need for tutor intervention.
- **Enhanced Learning:** Ensures students receive correct answers and solutions, preventing the learning of inaccurate information.
- **Scalability:** The agentic workflow allows for parallel processing of multiple exercises, enhancing efficiency.


## Conclusion
The Agentic Workflow significantly enhances the learning platform by providing immediate, accurate feedback and reducing the reliance on tutors. By leveraging advanced AI models and AWS infrastructure, it ensures that students have access to reliable and timely support, improving their overall learning experience.


