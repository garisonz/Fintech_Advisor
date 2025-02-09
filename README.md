Banking Virtual Assistant

Team Members
- Garison Zagorski
- Erich Hutchison
- Gilbert Baraka

Project Overview
An AI-powered chatbot designed to provide hyper-personalized banking assistance. It helps users:
- Check account balance & transaction history (simulated)
- Find the nearest Truist branches & ATMs using Google Maps API
- Set up bill payment reminders & budgeting insights
- Get AI-powered financial advice & support

Tools & Technologies Used
Frontend:
- Next.js: Fast, SEO-friendly frontend framework
- Tailwind CSS: For styling
- Schadcn UI: For UI components
- Axios: API request handling

Backend:
- Django (Python): Backend API and authentication
- Postgresql: For storing user data

APIs & AI Tools:
- Gemini API - LLM integration for chatbot responses

Challenges & Solutions:
AI Accuracy & Relevance
- The AI chatbot sometimes returned generic or irrelevant responses.
- We Fine-tuned prompts and used context-aware AI responses.

Credits & Acknowledgments:
We used the following public frameworks & APIs:
Django
Next.js
MongoDB
OpenAI API
Google Maps API

How to Run the Project:

1. Clone the repo:
2. Backend (Django setup):
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
3. Frontend (Next.js Setup):
cd frontend
npm install
npm run dev
4. Visit
Visit: http://localhost:3000

Future Improvements:

- Integrate real-time fraud detection alerts.
- Expand AI financial insights with custom-trained models.

UGAHacks Project Log
Project Information
Project Title: TruBot
Team Members: Garison Zagorski, Erich Hutchison, Gilbert Baraka
Tier Level: [Intermediate]
Project Description: 
TruBot is a hyper-personalized AI-powered virtual banking assistant designed to help users manage their financial transactions and banking queries efficiently. Built using Next.js for the frontend, Django for the backend, and integrated with the Gemini API, TruBot provides real-time financial insights, transaction tracking, budgeting recommendations, and AI-powered banking assistance





Friday 
Welcome to UGAHacks __ ! We’re excited that you’re participating and revving up for an amazing weekend! Today will be short, but we advise you to settle on a project and create a plan to guide you! Already have something in mind? Now’s a great time to get started!

Goals:
Goal 1  Finalize the project idea, scope, and tech stack.
Goal 2  Set up the Next.js frontend
Goal 3 Set up the Django backend.

Progress:
(Describe what was accomplished)
Set up the project repository and initialized Next.js & Django.
Defined key user interactions and API endpoints for AI responses.
Successfully authenticated with the Gemini API and tested sample queries.


Challenges:
1. Challenge 1: Setting up seamless Next.js-Django communication.
   - Solution: Chose JWT authentication for secure user sessions.
2. Challenge 2: Deciding on a robust authentication method for secure banking data.
  


Learning:
REST API design for AI-driven applications.
Handling API responses securely.








Saturday 
Saturday is the longest day of the Hackathon! The bulk of your project will get done within today, so set your goals wisely!

Goals:
Goal 1 Integrate the Gemini API for AI-powered interactions.
Goal 2 Improve chatbot responsiveness using Gemini API.
Goal 3 Design and refine the frontend UI for a seamless user experience.

Progress:
(Describe was accomplished)
Optimized AI query processing for better financial insights.
Built a chat-based UI in Next.js with a smooth user experience.



Challenges:
1. Challenge 1: Slow API response times due to multiple requests.
   - Solution (if found):
2. Challenge 2: Django context to gemini api
   - Solution (if found):


Learning:
(List key concepts or skills learned)
Improving AI-generated responses for structured financial data.
Frontend UX best practices for chat-based interfaces.


AI Usage (if any):

Tool used: Gemini API
Purpose: Generating financial insights & conversation flow.
How it contributed to learning: Helped refine structured AI outputs for banking assistance.







Sunday
Submissions are due at 8AM today!! Fit in your final touches for the project and make sure to check the submission checklist below to ensure you’re ready for judging!

Goals:
Goal 1 Final debugging and performance testing.
Goal 2 Improve UI responsiveness for a better user experience.
Goal 3 Prepare project documentation and submission materials.


Progress:
(Describe was accomplished)
Refactored API calls for better efficiency.
Improved error handling for user input validation.
Finalized GitHub repo, README, and project submission files.


Challenges:
1. Challenge 1: Handling user input errors in a banking chatbot
   - Solution (if found):  Implemented error handling and validation checks on both frontend and backend.
2. Challenge 2: Ensuring API rate limits are not exceeded


Learning:
(List key concepts or skills learned)

Error handling in AI-based chat applications.
Writing clean documentation for hackathon submissions.



AI Usage (if any):

Tool used: Gemini API
Purpose: Final chatbot improvements and error-handling prompts.
How it contributed to learning:  Allowed for more structured, clear, and accurate financial responses.






Submission Checklist
Make sure to submit on the UGAHacks __ Devpost at 8AM on Sunday!

Project Github Repo 
Readme file (summary of project log)
Completed Project Log as PDF
Live Project Site (optional)

