## Custom AI Chat

### Technologies used:

Frontend: React.js, CSS.

Backend (AWS): API Gateway (websockets), Lambda, DynamoDB.

LLM Integration: GPT-3.5-turbo streaming responses; later replaced by GPT-4 streaming responses; later replaced by GPT-4o streaming responses.

### Introduction
The Custom AI Chat was implemented to provide students with a convenient way to communicate with AI models and seek academic assistance. The chat leverages the latest LLM capabilities to deliver real-time streaming responses and employs GPT-4 (and later GPT-4o) to proactively identify knowledge gaps in students and initiate relevant STEM topic discussions. This proactive approach was not available in ChatGPT in 2023.

### Context
In 2023, GPT-4 was not yet accessible to free ChatGPT users. By developing a custom chat, we could offer our students access to the most advanced AI models. This tool provided substantial academic support, allowing students to have their questions answered and, in many cases, replaced traditional tutoring sessions, enabling self-directed learning.


## Solution

### Frontend
The frontend, developed using React.js and CSS, handles chat management, displays previous chat logs, and manages GPT responses. It communicates with AWS backend services through custom API Gateway endpoints, primarily using WebSockets, which facilitate real-time LLM streaming responses and significantly enhance the user experience (UX).

### Backend
The backend integrates LLM models within AWS Lambda functions. Key features include:

Proactive Interaction: The model is designed to identify potential knowledge gaps in students and initiate conversations on related STEM topics.

Immediate feedback: Provides clear, easy-to-follow explanations, using analogies and metaphors to aid comprehension.

Interactive Learning: Frequently checks with users to ensure they understand the material.


## Benefits

The AI Chat proven itself to be valued by students, since some of our students after using the chat reported increased grades without any tutor intervention. Some of our students stoped attending our tutoring sessions and continued to use the chat,
which was another proof that the AI chat was invaluable.
