from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import chat,contact
from core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# CORS Middleware (Frontend communication allow karne ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # "*" ka matlab hai ki kisi bhi website (localhost ya vercel) se connect ho jayega
    allow_credentials=False, # Agar allow_origins=["*"] hai, toh ye hamesha False rahega
    allow_methods=["*"],  # GET, POST aadi sab allow karega
    allow_headers=["*"],  # Sabhi headers allow karega
)
# Register API Routers
app.include_router(chat.router, prefix="/api", tags=["Chatbot"])
app.include_router(contact.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "online", "message": "Pratik.AI Backend is running."}