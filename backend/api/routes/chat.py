from fastapi import APIRouter, HTTPException
from schemas.chat_schema import ChatRequest, ChatResponse
from services.llm_service import get_ai_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_pratik_ai(request: ChatRequest):
    try:
        reply_text = get_ai_response(request.message)
        return ChatResponse(status="success", reply=reply_text)
    except Exception as e:
        # 🔴 Ye line error ko tumhare FastAPI terminal me print karegi
        print(f"🔥 BACKEND CRASHED. REASON: {str(e)}") 
        raise HTTPException(status_code=500, detail=str(e))