from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)
model = genai.GenerativeModel("models/gemini-2.5-flash")

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class ChatRequest(BaseModel):
    message: str

# Home route
@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }

# Chat route
@app.post("/chat")
def chat(req: ChatRequest):

    # Validation
    if not req.message.strip():
        return {
            "error": "Message is required"
        }

    try:

        # Generate AI response
        response = model.generate_content(req.message)

        return {
            "reply": response.text
        }

    except Exception as e:

        return {
            "error": str(e)
        }