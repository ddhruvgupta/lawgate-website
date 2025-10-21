import logging
import json
import os
from datetime import datetime, timedelta
import azure.functions as func
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Simple in-memory rate limiting (use Redis/Cosmos DB for production)
submission_tracker = {}

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Contact form submission received')

    # CORS handling
    if req.method == 'OPTIONS':
        return func.HttpResponse(
            status_code=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        )

    try:
        # Get client IP
        client_ip = req.headers.get('X-Forwarded-For', 'unknown').split(',')[0].strip()
        
        # Rate limiting - max 3 submissions per IP per hour
        current_time = datetime.now()
        if client_ip in submission_tracker:
            last_submission, count = submission_tracker[client_ip]
            if current_time - last_submission < timedelta(hours=1):
                if count >= 3:
                    logging.warning(f'Rate limit exceeded for IP: {client_ip}')
                    return func.HttpResponse(
                        json.dumps({'error': 'Too many submissions. Please try again later.'}),
                        status_code=429,
                        mimetype='application/json',
                        headers={'Access-Control-Allow-Origin': '*'}
                    )
                submission_tracker[client_ip] = (current_time, count + 1)
            else:
                submission_tracker[client_ip] = (current_time, 1)
        else:
            submission_tracker[client_ip] = (current_time, 1)

        # Parse request body
        req_body = req.get_json()
        
        # Honeypot field check (add a hidden field in your form)
        if req_body.get('website'):  # Bots often fill this
            logging.warning(f'Honeypot triggered for IP: {client_ip}')
            # Return success to not alert the bot
            return func.HttpResponse(
                json.dumps({'message': 'Message sent successfully'}),
                status_code=200,
                mimetype='application/json',
                headers={'Access-Control-Allow-Origin': '*'}
            )

        # Validate required fields
        name = req_body.get('name', '').strip()
        email = req_body.get('email', '').strip()
        phone = req_body.get('phone', '').strip()
        company = req_body.get('company', '').strip()
        subject = req_body.get('subject', '').strip()
        message = req_body.get('message', '').strip()

        if not all([name, email, message]):
            return func.HttpResponse(
                json.dumps({'error': 'Name, email, and message are required'}),
                status_code=400,
                mimetype='application/json',
                headers={'Access-Control-Allow-Origin': '*'}
            )

        # Basic email validation
        if '@' not in email or '.' not in email:
            return func.HttpResponse(
                json.dumps({'error': 'Invalid email address'}),
                status_code=400,
                mimetype='application/json',
                headers={'Access-Control-Allow-Origin': '*'}
            )

        # Time-based validation - submission should take at least 3 seconds
        submission_time = req_body.get('submissionTime', 0)
        if submission_time > 0 and submission_time < 3000:  # milliseconds
            logging.warning(f'Suspicious fast submission from IP: {client_ip}')
            return func.HttpResponse(
                json.dumps({'message': 'Message sent successfully'}),
                status_code=200,
                mimetype='application/json',
                headers={'Access-Control-Allow-Origin': '*'}
            )

        # Send email using SendGrid
        sendgrid_key = os.environ.get('SENDGRID_API_KEY')
        recipient_email = os.environ.get('LAWGATE_EMAIL', 'shishir@lawgate.in')

        if not sendgrid_key:
            logging.error('SendGrid API key not configured')
            return func.HttpResponse(
                json.dumps({'error': 'Email service not configured'}),
                status_code=500,
                mimetype='application/json',
                headers={'Access-Control-Allow-Origin': '*'}
            )

        # Create email content
        email_content = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a365d; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                    <p><strong>Phone:</strong> {phone if phone else 'Not provided'}</p>
                    <p><strong>Company:</strong> {company if company else 'Not provided'}</p>
                    <p><strong>Subject:</strong> {subject if subject else 'No subject'}</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #1a365d;">Message:</h3>
                    <p style="background-color: #fff; padding: 15px; border-left: 4px solid #d4af37; border-radius: 3px;">
                        {message}
                    </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                    <p>Submitted on: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                    <p>IP Address: {client_ip}</p>
                </div>
            </div>
        </body>
        </html>
        """

        # Create SendGrid message
        message_obj = Mail(
            from_email='noreply@lawgate.in',
            to_emails=recipient_email,
            subject=f'Contact Form: {subject if subject else "New Inquiry from " + name}',
            html_content=email_content
        )

        # Set reply-to as the sender's email
        message_obj.reply_to = email

        # Send email
        sg = SendGridAPIClient(sendgrid_key)
        response = sg.send(message_obj)

        logging.info(f'Email sent successfully. Status code: {response.status_code}')

        return func.HttpResponse(
            json.dumps({'message': 'Message sent successfully'}),
            status_code=200,
            mimetype='application/json',
            headers={'Access-Control-Allow-Origin': '*'}
        )

    except ValueError as e:
        logging.error(f'Invalid JSON in request: {str(e)}')
        return func.HttpResponse(
            json.dumps({'error': 'Invalid request format'}),
            status_code=400,
            mimetype='application/json',
            headers={'Access-Control-Allow-Origin': '*'}
        )
    except Exception as e:
        logging.error(f'Error processing contact form: {str(e)}')
        return func.HttpResponse(
            json.dumps({'error': 'An error occurred processing your request'}),
            status_code=500,
            mimetype='application/json',
            headers={'Access-Control-Allow-Origin': '*'}
        )
