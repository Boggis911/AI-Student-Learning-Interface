# AI-Student-Learning-Interface

My biggest Full-Stack project so far, where I used AWS and integrated latest OpenAI models: GPT-3.5-turbo, which was later replaced by GPT-4 and GPT-4o.

## Architecture
- **Microservices Architecture:** Ensures scalability and maintainability by dividing the application into smaller, independent services.
- **Event-Driven Architecture:**  AWS EventBridge and Lambda functions are used to create a responsive and event-driven system where services react to events asynchronously


## Technologies used
### Frontend
- **React.js:** Used for building user interfaces.
- **CSS:** Styling the application.

### Backend (AWS)
- **WAF (Web Application Firewall):** Protects the application from common web exploits.
- **IAM (Identity and Access Management):** Manages user access and permissions.
- **API Gateway:** Handles REST API, HTTP API, and WebSocket requests.
- **Lambda (Node.js Runtime):** Serverless functions for backend logic.
- **DynamoDB:** NoSQL database service.
- **S3 (Simple Storage Service):** Object storage for data and assets like images.
- **CloudFront:** Content delivery network (CDN) for fast content delivery.
- **CloudWatch:** Monitoring and logging service.
- **Step Functions:** Orchestrates complex workflows.
- **Route 53:** Domain name system (DNS) web service.
- **EventBridge:** Event bus service for initiating custom events and triggering other AWS components.

### Development Technologies
- **CodeCommit:** Source control service for hosting Git repositories.
- **CodeDeploy:** Automated deployment service.
- **CodePipeline:** Continuous integration and continuous delivery (CI/CD) service.
- **Cloud9:** Integrated development environment (IDE) in the cloud with real-time testing capabilities.
- **EC2 (Elastic Compute Cloud):** Virtual servers in the cloud.

### LLM Integration (OpenAI API)
- **GPT-3.5, GPT-3.5-turbo, GPT-4, GPT-4o:** Successive upgrades to leverage the latest advancements in language models and use the most powerful OpenAI models.
- **GPT-vision:** Integrates vision capabilities with language models.
- **OpenAI Assistants with Custom Tools:** Enhances AI capabilities with specific tools.
- **OpenAI Threads:** Automatically manages chat logs and allows to use assistants with custom tools.





### Project Breakdown:
To showcase the whole platform effectivelly, I split the whole project into 5 major parts, each with its own dedicated description:
1. **CMS**
2. **AI-driven CMS**
3. **AI Chat**
4. **Latex Whiteboard**
5. **Customized LLM Workflow (Agentic Workflow using AWS Step Functions)**


## Introduction
The main benefit of this project was to provide students with an AI learning interface, which was hoped to be more convenient and user-friendly than using ChatGPT. The platform was designed for STEM subjects, where students would have to communicate with AI while using complex mathematical notations, such as functions, integrals, visuals, mathematical symbols, etc. In addition to a user-friendly interface designed for STEM subjects, in 2023-2024 GPT models had significant hallucination problems, where the model would give the wrong answer or solution to the problem, thus misleading the students and making their learning experience counterproductive. In order to solve this problem, a custom agentic workflow was developed, which leveraged AWS Step Function orchestration capabilities.



### Main Benefits:
The project aims to provide students with an AI learning interface designed for STEM subjects that is more convenient and user-friendly than existing solutions like ChatGPT. Key features include:
- **Enhanced AI Interface for STEM Learning:** Custom interface to handle complex mathematical notations and enchance student-AI communication.
- **Reduced Hallucinations:** A custom agentic workflow using tools like Code Interpreter to cross-verify answers, improving the model's accuracy and performance.
- **AI driven content management system:** A backend system integrated with GPT-4 and later GPT-4o models, having limited access to backend systems and capable of managing content in the platform.
