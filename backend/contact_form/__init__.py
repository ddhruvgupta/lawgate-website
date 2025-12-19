import logging
import json
import os
import requests
import azure.functions as func
from azure.communication.email import EmailClient
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def verify_recaptcha(token, secret_key):
    """Verify reCAPTCHA token with Google"""
    try:
        response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret': secret_key,
                'response': token
            },
            timeout=5
        )
        result = response.json()
        return result.get('success', False)
    except Exception as e:
        logging.error(f'reCAPTCHA verification error: {str(e)}')
        return False

def main(req: func.HttpRequest) -> func.HttpResponse:
    logger.info('=' * 80)
    logger.info('🔔 Contact form function triggered')
    logger.info(f'Method: {req.method}')
    logger.info(f'URL: {req.url}')
    logger.info(f'Headers: {dict(req.headers)}')
    logger.info('=' * 80)

    # Handle CORS preflight
    if req.method == 'OPTIONS':
        logging.info('Handling CORS preflight request')
        return func.HttpResponse(
            status_code=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        )

    try:
        # Parse request body
        logging.info('Parsing request body...')
        # Support both JSON payloads and raw text that contains JSON
        try:
            req_body = req.get_json()
        except ValueError:
            # get_body returns bytes; try decoding and loading JSON
            raw = req.get_body()
            logging.info(f'Raw body bytes length: {len(raw) if raw is not None else 0}')
            req_body = json.loads(raw.decode('utf-8') if raw else '{}')

        logging.info(f'Request body keys: {list(req_body.keys())}')

        # Accept multiple common recaptcha field names used by different clients
        name = req_body.get('name')
        email = req_body.get('email')
        phone = req_body.get('phone') or ''
        company = req_body.get('company', '')
        subject = req_body.get('subject') or 'Contact Form'
        message = req_body.get('message')
        # clients may send 'captcha', 'recaptchaToken', or 'g-recaptcha-response'
        recaptcha_token = req_body.get('captcha') or req_body.get('recaptchaToken') or req_body.get('g-recaptcha-response')

        # Validate required fields (only name, email, message required)
        logging.info(f'Validating fields - name: {bool(name)}, email: {bool(email)}, message: {bool(message)}')
        if not all([name, email, message]):
            logging.warning('❌ Missing required fields')
            return func.HttpResponse(
                json.dumps({
                    'success': False,
                    'message': 'Missing required fields: name, email and message are required.'
                }),
                status_code=400,
                headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            )

        # Verify reCAPTCHA
        recaptcha_secret = os.environ.get('RECAPTCHA_SECRET_KEY')
        skip_recaptcha = os.environ.get('SKIP_RECAPTCHA', 'false').lower() in ['1', 'true', 'yes']
        logging.info(f'reCAPTCHA secret configured: {bool(recaptcha_secret)}, SKIP_RECAPTCHA: {skip_recaptcha}')
        logging.info(f'reCAPTCHA token received: {bool(recaptcha_token)}')

        if not skip_recaptcha:
            if recaptcha_secret and recaptcha_token:
                logging.info('Verifying reCAPTCHA...')
                is_valid = verify_recaptcha(recaptcha_token, recaptcha_secret)
                logging.info(f'reCAPTCHA verification result: {is_valid}')
                if not is_valid:
                    logging.warning('❌ reCAPTCHA verification failed')
                    return func.HttpResponse(
                        json.dumps({
                            'success': False,
                            'message': 'reCAPTCHA verification failed. Please try again.'
                        }),
                        status_code=400,
                        headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                    )
            else:
                logging.warning('❌ No reCAPTCHA token provided or secret not configured')
                return func.HttpResponse(
                    json.dumps({
                        'success': False,
                        'message': 'Please complete the reCAPTCHA or set SKIP_RECAPTCHA=true for local testing.'
                    }),
                    status_code=400,
                    headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                )

        # Prepare email
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
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Company:</strong> {company if company else 'Not provided'}</p>
                    <p><strong>Subject:</strong> {subject}</p>
                </div>
                
                <div style="margin: 20px 0;">
                    <h3 style="color: #1a365d;">Message:</h3>
                    <p style="background-color: #fff; padding: 15px; border-left: 4px solid #d4af37; border-radius: 3px;">
                        {message}
                    </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
                    <p>Submitted via Lawgate Website Contact Form</p>
                </div>
            </div>
        </body>
        </html>
        """

        # Send email using Azure Communication Services
        logging.info('📧 Preparing to send email...')
        connection_string = os.environ.get('AZURE_COMMUNICATION_CONNECTION_STRING')
        # Support comma-separated list of recipient emails, including ddhuvgupta@gmail.com
        recipient_emails_str = os.environ.get('LAWGATE_EMAIL', 'shishir@lawgate.in,ddhuvgupta@gmail.com')
        recipient_emails = [email.strip() for email in recipient_emails_str.split(',') if email.strip()]
        sender_email = os.environ.get('AZURE_SENDER_EMAIL', 'DoNotReply@lawgate.in')
        
        logging.info(f'Connection string configured: {bool(connection_string)}')
        logging.info(f'Recipient emails: {recipient_emails}')
        logging.info(f'Sender email: {sender_email}')
        
        if not connection_string:
            logging.error('❌ Azure Communication Services connection string not configured')
            return func.HttpResponse(
                json.dumps({
                    'success': False,
                    'message': 'Email service not configured'
                }),
                status_code=500,
                headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            )

        try:
            # Create email client
            logging.info('Creating Azure Email Client...')
            email_client = EmailClient.from_connection_string(connection_string)
            logging.info('✅ Email client created successfully')
            
            # Prepare email message
            logging.info('Preparing email message...')
            email_message = {
                "senderAddress": sender_email,
                "recipients": {
                    "to": [{"address": email_addr} for email_addr in recipient_emails]
                },
                "content": {
                    "subject": f"New Contact: {subject}",
                    "html": email_content
                },
                "replyTo": [{"address": email}]
            }
            logging.info('✅ Email message prepared')
            
            # Send email
            logging.info('Sending email...')
            poller = email_client.begin_send(email_message)
            logging.info('Waiting for send operation to complete...')
            result = poller.result()
            
            logging.info(f'✅ Email sent successfully. Message ID: {result["id"]}')

            return func.HttpResponse(
                json.dumps({
                    'success': True,
                    'message': 'Your message has been sent successfully!'
                }),
                status_code=200,
                headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            )

        except Exception as email_error:
            logging.error(f'❌ Error sending email via Azure Communication Services: {str(email_error)}')
            logging.error(f'Error type: {type(email_error).__name__}')
            logging.exception('Full traceback:')
            return func.HttpResponse(
                json.dumps({
                    'success': False,
                    'message': 'Failed to send email. Please try again later.',
                    'error': str(email_error)
                }),
                status_code=500,
                headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            )

    except ValueError as e:
        logging.error(f'❌ Invalid JSON: {str(e)}')
        logging.exception('Full traceback:')
        return func.HttpResponse(
            json.dumps({
                'success': False,
                'message': 'Invalid request format'
            }),
            status_code=400,
            headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        )
    
    except Exception as e:
        logging.error(f'❌ Error processing contact form: {str(e)}')
        logging.error(f'Error type: {type(e).__name__}')
        logging.exception('Full traceback:')
        return func.HttpResponse(
            json.dumps({
                'success': False,
                'message': 'An error occurred. Please try again later.',
                'error': str(e)
            }),
            status_code=500,
            headers={'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        )
