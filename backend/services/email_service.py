import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from core.config import settings

def send_contact_emails(name: str, user_email: str, mobile: str, subject: str, message: str):
    sender_email = settings.EMAIL_ADDRESS
    sender_password = settings.EMAIL_PASSWORD
    
    try:
        # Setup SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        
        # 1. Tumhare paas aane wala Email (Notification)
        pratik_msg = MIMEMultipart()
        pratik_msg['From'] = f"Portfolio Contact <{sender_email}>"
        pratik_msg['To'] = sender_email
        pratik_msg['Subject'] = f"🚀 New Project Inquiry: {subject}"
        
        body = f"""
        New message from your portfolio website!
        
        Name: {name}
        Email: {user_email}
        Mobile: {mobile}
        Subject: {subject}
        
        Message:
        {message}
        """
        pratik_msg.attach(MIMEText(body, 'plain'))
        
        # 2. User ko aane wala Auto-Reply Email
        user_msg = MIMEMultipart()
        user_msg['From'] = f"Pratik Maurya <{sender_email}>"
        user_msg['To'] = user_email
        user_msg['Subject'] = f"Thank you for reaching out, {name}!"
        
        user_body = f"""
        Hi {name},
        
        Thank you for reaching out to me! This is an automated email to confirm that I have received your message regarding "{subject}".
        
        I will review your inquiry and get back to you as soon as possible.
        
        Best regards,
        Pratik Maurya
        AI & Full Stack Engineer
        """
        user_msg.attach(MIMEText(user_body, 'plain'))
        
        # Dono email send karo
        server.send_message(pratik_msg)
        server.send_message(user_msg)
        
        server.quit()
    except Exception as e:
        print(f"🔥 Email Error: {e}")