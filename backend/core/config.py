import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

class Settings:
    PROJECT_NAME: str = "Pratik.AI Backend"
    VERSION: str = "1.0.0"
    
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY")
    if not GROQ_API_KEY:
        print("❌ ERROR: GROQ_API_KEY nahi mili!")
        
    # Naye Email Variables
    EMAIL_ADDRESS: str = os.getenv("EMAIL_ADDRESS")
    EMAIL_PASSWORD: str = os.getenv("EMAIL_PASSWORD")

settings = Settings()