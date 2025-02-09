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
