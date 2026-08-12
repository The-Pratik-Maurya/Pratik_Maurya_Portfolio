from groq import Groq
from core.config import settings
from services.prompt import SYSTEM_INSTRUCTION

# Groq Client Initialize karo
client = Groq(api_key=settings.GROQ_API_KEY)

def get_ai_response(user_message: str) -> str:
    """Sends message to Groq and returns the text response."""
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_INSTRUCTION
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            # 🔥 YAHAN CHANGE KIYA HAI: Naya aur fast model daal diya
            model="llama-3.1-8b-instant", 
            temperature=0.7, 
            max_tokens=500, 
        )
        
        return chat_completion.choices[0].message.content
        
    except Exception as e:
        raise Exception(f"Groq API Error: {str(e)}")