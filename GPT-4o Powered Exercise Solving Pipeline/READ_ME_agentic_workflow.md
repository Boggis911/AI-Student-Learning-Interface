# Agentic workflow

In order to provide students with more autonomy which would save time for tutors, exercises had to be automatically uploaded to the platform. However, students usually solve exercises that do not have a solution or an answer attached to them,
which prompts students to seek external support, usually from their peers, teachers or tutors. The ability to provide immediate support and feedback is crucial for effective learning, since it aligns with the latest scientific research 
results on effective learning strategies. Such immediate feedback could be provided by the platform only if exercises had a predefined answer and solution that could be accessed by students after their attempt to solve a given exercise.
One possible solution was to implement a GPT-4o powered chat that could answer such student questions, but in 2023-2024 GPT-4 and GPT-4o still had halucination problem, where they would

### halucination issue

One possible way to provide automated immediate feedback to students was to implement a GPT-4o powered chat that could answer such student questions, but in 2023-2024 GPT-4 and GPT-4o still had halucination problem. Halucination refers to 
generating false information (that is not accurate) as if the information was correct. Moreover, GPT models would present this false information with high degree of confidence, making it difficult for users to distinguish fabricated
and accurate content. This problem is fatal for students in the context of STEM and other subject learning - if students are provided with a wrong answer or an incorrect solution to a problem, they might learn inaccurate information,
making their learning counter-productive.

### agentic workflow implementation

In order to solve the halucination issue, I decided to create a custom agentic workflow, facilitated by AWS Lambda and AWS Step Functions. Step functions would orchestrate multiple lambda functions, where each lambda was integrated with
a GPT-4 and later with GPT-4o models. These models had varying configurations and different system instructions, making it possible to split the whole complex task (formating exercise, solving the exercise, writing exercise solution, 
cross-verifying solution based on methods different than those used to solve the problem in the first place) into smaller subtasks. This agentic workflow effectively split the task into smaller segments, where models were working
as if they were in an assembly line, building upon previous model work. The 1st model, directly interacting with users, would create a big chunk of exercises and initiate the exercise solving pipeline hosted on AWS Step Functions,
the 2nd model would format the question, making it easier for other models to understand the task and allowing multiple exercises to be completed in parallel, the 3rd model would use the latest OpenAI tools like Code Interpreter to solve
the problem, the 4th model would write an easy-to-follow solution that leads to the final answer and the final lambda function (no GPT models integrated here) would upload the question to DynamoDB database, after which new exercises
would appear in the student learning platform.
