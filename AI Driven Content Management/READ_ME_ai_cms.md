## AI Driven content management system

We decided to implement some of the cutting edge LLM technology, where the AI chatbot was securely implemented in the whole system and was enabled to upload learning material for students. This feature enabled students to have autonomy in the 
platform, enabling them to manage their learning content, where a dedicated AI system would supervise the content, effectivelly replacing tutors in this regard. The feature further automated the workflow, allowing students to seamlessly 
interact with the AI-powered learning platform.

Traditionally, tutors or teachers were responsible for manually uploading the learning content for students, which was time consuming and inflexible. Accoring to the latest research in effective education, students learn better when
the learning content is adjusted for every single student. Such personalisation would enable students to learn more effectivelly and improve their academic performance. AI driven CMS was designed to enable personalisation and student autonomy.

Students could upload additional learning material by simply contacting image uploader AI via a chat and optionally uploading additional images that could be inspected by the GPT-4o model. The user interface would send user image and 
query to the backend, the model would communicate with the student and after the desired questions for upload had been confirmed by the student, the model would invoke other lambda functions connected with other GPT models to further process
the questions and upload them to the learning platform.

Generally, allowing a front-facing GPT model to invoke backend services is unsafe due to potential jailbreak security threat. Nevertheless, a series of GPT models were connected together to filter out suspicious material and cancel
the workflow if needed. Additionally, the model configuration imposed certain token limits to prevent abusive use and the models were granted limited permissions within the backend infrastructure - they were only responsible for 
sanitising the user input, solving STEM problems and creating an appropriate problem solution, where the
whole workflow was encapsulated and managed by AWS Step Functions. Therefore, even during a jailbreak breach, the damage to the backend infrastructure would be minimal.

The Agentic workflow responsible for solving student exercises and uploading them to the database is described in detail in another project folder: "GPT-4o Powered Exercise Solving Pipeline".
