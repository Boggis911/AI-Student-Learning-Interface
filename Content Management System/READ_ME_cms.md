
# Learning Content Management System

## Technologies Used
### Frontend
- **React.js**
- **CSS**

### Backend (AWS)
- **API Gateway**
- **Lambda**
- **DynamoDB**
- **S3**
- **CloudFront**
- **CloudWatch**

### LLM Integration
- **GPT-3.5-turbo**
- **GPT-4**


## Introduction
The Learning Content Management System (CMS) was developed to streamline the management of learning materials and enhance the educational experience for both students and tutors. This system provides a simple, intuitive platform for students to create and navigate different topics, access practice problems, and complete assignments. For tutors, it offers tools to track individual student learning histories and assign homework, making the learning process more autonomous.

## Context
Before the implementation of this CMS, managing learning content was a manual and cumbersome process. Tutors had to upload exercises, solutions, and answers manually, which was time-consuming and prone to errors. Additionally, AI systems were not yet configured to double-check exercise answers and solutions. This project aimed to simplify these processes and provide a robust platform to support newer features.

## Solution
### Frontend
- **User Interface:** Provides a straightforward platform for students to navigate topics, access practice problems, and complete assignments. The interface is designed to be user-friendly for students, although initial versions were less so for administrators.

### Backend
- **Exercise Management:** Tutors can upload exercises and solutions to the database, although the process required manual entry.
- **Student Tracking:** Allows tutors to track individual student progress and learning history.

### AI Integration
- **GPT-3.5-turbo and GPT-4:** The chat feature, powered initially by GPT-3.5-turbo and later by GPT-4, uses the Socratic method to aid student learning. This interaction helps to supplement tutoring and provides an additional source of learning.


## Features
### Student Features
- **Topic Navigation:** Students can create and navigate different learning topics.
- **Access to Practice Problems:** Students can access previously assigned practice problems.
- **Assignment Completion:** Provides a platform for students to complete homework assigned by tutors.

### Tutor Features
- **Student Tracking:** Tutors can track individual student learning histories.
- **Homework Assignment:** Tutors can assign problems and exercises to students.


## Benefits
- **Enhanced Learning Experience:** Provides a unified platform for students to access learning materials and complete assignments.
- **Tutor Efficiency:** Simplifies the process for tutors to track progress and assign homework, saving time and reducing manual workload.
- **AI Assistance:** The integration of GPT models helps students learn through interactive dialogue, supplementing traditional tutoring methods.

## Challenges
- **Manual Exercise Upload:** The initial CMS required manual uploading of exercises and solutions, which was not user-friendly for administrators.
- **Lack of AI Verification:** Early versions lacked AI systems to double-check exercise answers and solutions, potentially allowing errors.


## Conclusion
The Learning Content Management System serves as a foundational platform that supports student autonomy and tutor efficiency. Despite initial challenges, it has provided a valuable resource for students to supplement their tutoring and improve their learning outcomes.


