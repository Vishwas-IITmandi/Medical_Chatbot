from flask import Flask, jsonify, request
from flask_cors import CORS
from src.helper import download_hugging_face_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
import os
from src.prompt import *

app = Flask(__name__)

# Enable CORS for all domains on all routes.
# For production, you might want to restrict this to your frontend's domain.
CORS(app)

# --- Load Environment Variables and Initialize Services ---
load_dotenv()
PINECONE_API_KEY = os.environ.get('PINECONE_API_KEY')
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

embeddings = download_hugging_face_embeddings()
index_name = "medical-chatbot"

# --- Initialize Pinecone and LangChain Components ---
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 5})
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash-latest", temperature=0.3)
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)


# --- API Endpoint for the Chatbot ---
@app.route("/get", methods=["POST"])
def chat():
    try:
        # Get message from the POST request's JSON body
        data = request.get_json()
        user_message = data.get("msg")

        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        print(f"Received message: {user_message}")

        # Get response from the RAG chain
        response = rag_chain.invoke({"input": user_message})
        bot_response = response.get("answer", "Sorry, I couldn't process that.")
        
        print(f"Sending response: {bot_response}")

        # Return the response as JSON
        return jsonify({"answer": bot_response})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred."}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=False)
