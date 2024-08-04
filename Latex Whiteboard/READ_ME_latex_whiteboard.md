# Latex Whiteboard

## Technologies Used
- **MathQuill:** Library for rendering and editing mathematical notation.
- **React.js:** Frontend framework for building the user interface.
- **CSS:** Styling the user interface.
- **OpenAI GPT-4 and GPT-4o:** AI models for processing and responding to student queries.
- **AWS Lambda:** Backend logic execution.
- **API Gateway:** Handling API requests.


## Introduction
STEM students often struggle to communicate complex mathematical notation to GPT models using default chat interfaces, which are designed for ordinary tasks. In subjects like mathematics and physics, students need to use various symbols and scientific notations that are challenging to input through a standard keyboard. To address this issue, we developed a Latex Whiteboard powered by the MathQuill library.

## Benefits of MathQuill
MathQuill offers an intuitive way for users to write mathematical symbols. When students write on the whiteboard, complex notations like \( \frac{d}{dx}(2x^2) \) are automatically converted into Latex expressions, which students are familiar with and commonly use in academic settings. This whiteboard enhances the user experience by making it easier for students to interact with AI models, seek clarification, receive explanations, and get their questions answered.

## Whiteboard Connected with GPT Models
The Latex Whiteboard is integrated with GPT models to facilitate natural communication between students and AI. When students write on the whiteboard, the content is sent to the GPT model along with the custom student message on the AI Chat. Using various prompt engineering techniques, the model is instructed to analyze the whiteboard's Latex notation and provide constructive feedback.


## Workflow
1. **Writing on the Whiteboard:** Students input their mathematical expressions using the MathQuill-powered Latex Whiteboard.
2. **Sending to GPT Model:** The Latex content and any accompanying message are sent to the GPT model via the AI chat interface.
3. **AI Processing:** The GPT model analyzes the Latex notation and message using prompt engineering techniques.
4. **Constructive Feedback:** The model provides feedback, clarifications, and answers based on the student's input.


## Benefits

- **User-Friendly Interface:** MathQuill makes it easy for students to write and understand mathematical notation.
- **Seamless AI Interaction:** Provide students with a tool that simplifies the communication with AI of complex mathematical concepts.
- **Enhanced Learning Experience:** The whiteboard allows for a more natural and effective way for students to interact with AI, improving their understanding of complex concepts.
- **Automated Immediate Feedback:** Leverage AI to give students immediate and accurate feedback on their work.


## Conclusion
The Latex Whiteboard significantly enhances the learning experience for STEM students by providing an intuitive and efficient way to communicate complex mathematical notations with AI models. By integrating MathQuill with GPT-4 and GPT-4o, we have created a tool that bridges the gap between traditional learning methods and modern AI technology.


