## Custom AI Chat

The custom AI chat was implemented to provide students with a convenient way to communicate with AI models and ask for assistance. The chat provided users with the latest LLM capabilities and reasoning abilities, real-time streaming GPT responses
and a GPT-4 (and later GPT-4o) model designed to proactivelly spot student knowledge gaps and sometimes initiate conversations about various related STEM topics, which was not yet done by chatGPT in 2023.

In 2023 GPT-4 was not yet available to free chatGPT users, so by
creating a custom chat, we could provide our students with the most powerful AI models. It allowed students to receive enourmous academic support and have their questions answered. This chat partially replaced our tutoring sessions, 
since some students were able to learn educational material on their own without any support from the tutor. 

Technically speaking, the frontend was responsible for chat management, previous chat log display and managing GPT responses. it communicated with the AWS backend services via custom AWS Api Gateway API endpoints, mostly a Websocket, 
which allowed for real-time LLM streaming responses, greatly improving the UX.

The LLM model was integrated in AWS lambda functions and was designed to be proactive: spot potential student knowledge gaps, initiate conversation in related STEM subjects with respect to current student learning material,
provide easy-to-follow topic explanations and use of analogies and metaphors that also contribute to material comprehension. Furthermore, the model would often double-check with the user if they had successfully understood the material.

The AI Chat proven itself to be valued by students, since some of our students after using the chat reported increased grades without any tutor intervention. Some of our students stoped attending our tutoring sessions and continued to use the chat,
which was another proof that the AI chat was invaluable.
