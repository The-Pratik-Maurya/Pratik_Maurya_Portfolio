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
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(chat.router, prefix="/api", tags=["Chatbot"])
app.include_router(contact.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "online", "message": "Pratik.AI Backend is running."}