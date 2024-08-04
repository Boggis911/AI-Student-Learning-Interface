
# AI-Driven Content Management System

## Introduction
The AI-Driven Content Management System (CMS) leverages cutting-edge Large Language Model (LLM) technology to revolutionize how students manage their learning content. By integrating a secure AI chatbot capable of uploading learning materials, the system provides students with greater autonomy, effectively replacing traditional tutors in this regard. This feature automates the workflow, allowing students to seamlessly interact with the AI-powered learning platform.

## Context
Traditionally, tutors or teachers were responsible for manually uploading learning content for students, which was time-consuming and inflexible. Research indicates that students learn more effectively when the content is personalized to their needs. The AI-driven CMS addresses this by enabling personalization and enhancing student autonomy.

## Solution
### Frontend
- **Image Uploader AI Chat:** Students can upload additional learning material by interacting with the AI via chat, including the option to upload images for inspection by the GPT-4o model.
- **User Interface:** The interface allows students to send images and queries to the backend, where the AI processes the information and interacts with the student to confirm the upload.

### Backend
- **LLM Integration:** The GPT-4o model communicates with students, confirms upload queries, and invokes other Lambda functions to process and upload questions to the learning platform.
- **Security Measures:** A series of GPT models are connected to filter out suspicious material and cancel the workflow if necessary. Token limits and restricted permissions ensure the models operate safely within the backend infrastructure.
- **Workflow Management:** The entire workflow, including input sanitization, STEM problem-solving, and content uploading, is managed by AWS Step Functions.

## Architecture
### Technologies Used
- **Frontend:** React.js, CSS
- **Backend (AWS):** API Gateway, Lambda, DynamoDB, S3, CloudFront, CloudWatch, Step Functions.
- **LLM Integration:** GPT-4o and other GPT models for processing and verifying content, GPT-vision for scanning user uploaded images.


## Benefits
- **Student Autonomy:** Empowers students to manage their own learning content, reducing reliance on tutors.
- **Personalization:** Tailors learning materials to individual student needs, improving academic performance.
- **Efficiency:** Automates the content management process, saving time and enhancing flexibility.

## Security Considerations
- **Jailbreak Prevention:** A multi-tiered approach using interconnected GPT models filters out suspicious content and cancels workflows if necessary.
- **Token Limits:** Enforces token limits to prevent abusive use of the system.
- **Restricted Permissions:** Limits model permissions to ensure they only perform specific tasks, minimizing potential damage during a breach.

## Future Enhancements
- **Advanced Personalization:** Further refine the AI's ability to personalize learning content based on individual student progress and feedback.
- **Enhanced Security:** Continuously improve security measures to stay ahead of potential threats.
- **User Experience:** Optimize the user interface for better engagement and ease of use.

## Related Projects
- **GPT-4o Powered Exercise Solving Pipeline:** Detailed description of the Agentic workflow responsible for solving student exercises and uploading them to the database can be found in this project folder.

