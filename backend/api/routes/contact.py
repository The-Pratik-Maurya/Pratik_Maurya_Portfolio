from fastapi import APIRouter, BackgroundTasks, HTTPException
from schemas.contact_schema import ContactRequest
from services.email_service import send_contact_emails

router = APIRouter()

@router.post("/contact")
async def submit_contact_form(request: ContactRequest, background_tasks: BackgroundTasks):
    try:
        # BackgroundTask se API turant success de degi, aur email background me chala jayega
        background_tasks.add_task(
            send_contact_emails,
            request.name,
            request.email,
            request.mobile,
            request.subject,
            request.message
        )
        return {"status": "success", "message": "Message sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))