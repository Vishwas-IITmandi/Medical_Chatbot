## 🩺 MediBot: Your AI-Powered Medical Assistant


Welcome to MediBot! This is a sophisticated, AI-driven medical chatbot designed to provide information about medical conditions and symptoms. Built with a modern tech stack, this project leverages the power of Google's Gemini 1.5 Flash, the flexibility of LangChain, and the speed of Pinecone to deliver accurate, context-aware responses.

✨ Key Features
🧠 State-of-the-Art AI: Powered by Google's Gemini 1.5 Flash, one of the most advanced large language models available, for nuanced and intelligent responses.

🔗 Advanced RAG Architecture: Utilizes a Retrieval-Augmented Generation (RAG) pipeline built with LangChain. This allows the chatbot to "read" from a custom knowledge base (like a medical textbook) for factual, grounded answers.

⚡ High-Speed Vector Search: Integrated with Pinecone, a leading vector database, for ultra-fast and highly accurate semantic search over your medical data.

💻 Sleek, Modern UI: A beautiful and responsive chat interface built with React and Vite, offering a seamless user experience.

🔧 Modular & Scalable Backend: A clean and well-structured Flask API that is easy to understand, maintain, and extend.

🛠️ Tech Stack
Backend: Python, Flask, LangChain

AI Model: Google Gemini 1.5 Flash

Vector Database: Pinecone

Embeddings: Hugging Face Sentence Transformers

Frontend: React (Vite), JavaScript, CSS

🚀 Getting Started
Follow these steps to get MediBot up and running on your local machine.

Prerequisites
Python 3.8+

Node.js and npm (or yarn)

A Pinecone account and API key

A Google AI Studio API key

1. Clone the Repository
git clone [https://github.com/your-username/medibot.git](https://github.com/your-username/medibot.git)
cd medibot

2. Setup the Backend 🐍
First, set up the Python environment and install the required packages.

# Create and activate a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

Next, create a .env file in the root directory to store your secret keys.

# .env
GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY_HERE"
PINECONE_API_KEY="YOUR_PINECONE_API_KEY_HERE"

3. Setup the Frontend ⚛️
Navigate to the frontend directory and install the necessary npm packages.

cd frontend
npm install

4. Run the Application 🏃‍♂️
You need to run two separate processes in two different terminals.

Terminal 1: Start the Flask Backend

Make sure you are in the root directory of the project.

python app.py

You should see the server running on http://127.0.0.1:8000.

Terminal 2: Start the React Frontend

Make sure you are in the frontend directory.

npm run dev

Your browser should automatically open to the React application, which is now connected to your backend!

🩺 Medical Disclaimer
Important: MediBot is an informational tool and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
