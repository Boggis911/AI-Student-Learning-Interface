# AI-Student-Learning-Interface

My biggest Full-Stack project so far, where I used AWS and integrated latest OpenAI model (GPT-4o).

To showcase the whole platform effectivelly, I split the whole project into 5 major parts: CMS, AI driven CMS, AI chat, Latex Whiteboar and customised LLM workflow also known as Agentic workflow by utilising AWS Step Functions.
Each part has its own description.

The main benefit of this project was to provide students with an AI learning interaface, which was hoped to be more convenient and user friendly than using chatGPT. The platform was designed for STEM subjects, where students would have to communicate with AI while using complex mathematical notations, such as functions, integrals, visuals, mathematical symbols, etc. In our opinion, chatGPT in 2023 did not offer neccessary user interface that allowed students to communicate with GPT models while learning STEM subjects, which made it very inconvenient for students to communicate with the model. In addition, GPT had significant halucination problems, where the model would give the wrong answer or solution to the problem, thus, misleading the students and making their learning experience anti-productive. 

In order to make the user interface more convenient and easy to use, a custom interface was developed to handle complex mathematical notation communication. Students could easily type mathematical symbols in Latex that were observed by AI chat. The AI chat was configured to accept latex inputs from the customised Latex Whiteboard. As for halucination, a custom agentic workflow was designed and implemented to use the latest GPT tools, like Code Interpreter to cross-verify problem answers and solutions. Such workflow proved itself to be advantageous in comparison with a single model chat. Agentic workflow could reflect on its own work or focus on a specific sub task insted of trying to complete a single complex task, all of which improved enriched GPT-4 capabilities and improved model performance.

**Project Breakdown:**
To showcase the whole platform effectivelly, I split the whole project into 5 major parts, each with its own dedicated description:
1. **CMS**
2. **AI-driven CMS**
3. **AI Chat**
4. **Latex Whiteboard**
5. **Customized LLM Workflow (Agentic Workflow using AWS Step Functions)**


**Main Benefits:**
The project aims to provide students with an AI learning interface that is more convenient and user-friendly than existing solutions like ChatGPT, specifically for STEM subjects. Key features include:
- **Enhanced Interface for STEM Learning:** Custom interface to handle complex mathematical notations.
- **Latex Integration:** Students can type mathematical symbols in Latex, which are observed by AI chat.
- **Reduced Hallucinations:** A custom agentic workflow using tools like Code Interpreter to cross-verify answers, improving the model's accuracy and performance.
