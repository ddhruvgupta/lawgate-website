"""
Test script for Azure Communication Services email sending
Run this inside the backend directory to test email functionality
"""

import os
from dotenv import load_dotenv
from azure.communication.email import EmailClient

# Load environment variables
load_dotenv()

def test_email():
    # Get configuration from .env
    connection_string = os.environ.get('AZURE_COMMUNICATION_CONNECTION_STRING')
    sender_email = os.environ.get('AZURE_SENDER_EMAIL')
    # Support comma-separated list of recipient emails
    recipient_emails_str = os.environ.get('LAWGATE_EMAIL', 'shishir@lawgate.in,ddhuvgupta@gmail.com')
    recipient_emails = [email.strip() for email in recipient_emails_str.split(',') if email.strip()]
    
    print("=== Azure Communication Services Email Test ===\n")
    print(f"✓ Connection string configured: {bool(connection_string)}")
    print(f"✓ Sender email: {sender_email}")
    print(f"✓ Recipient emails: {recipient_emails}")
    print()
    
    if not connection_string:
        print("❌ ERROR: AZURE_COMMUNICATION_CONNECTION_STRING not found in .env")
        return
    
    if not sender_email:
        print("❌ ERROR: AZURE_SENDER_EMAIL not found in .env")
        return
    
    try:
        # Create email client
        print("Creating Azure Email Client...")
        email_client = EmailClient.from_connection_string(connection_string)
        print("✅ Email client created successfully\n")
        
        # Prepare test email
        print("Preparing test email...")
        email_message = {
            "senderAddress": sender_email,
            "recipients": {
                "to": [{"address": email_addr} for email_addr in recipient_emails]
            },
            "content": {
                "subject": "Test Email from Lawgate Contact Form",
                "html": """
                <html>
                <body>
                    <h2>Test Email</h2>
                    <p>This is a test email from the Lawgate contact form backend.</p>
                    <p><strong>If you received this, the email configuration is working correctly!</strong></p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        Sent via Azure Communication Services<br>
                        From: {sender}<br>
                        To: {recipients}
                    </p>
                </body>
                </html>
                """.format(sender=sender_email, recipients=", ".join(recipient_emails))
            },
            "replyTo": [{"address": "test@example.com"}]
        }
        print("✅ Email message prepared\n")
        
        # Send email
        print("Sending email...")
        print("(This may take a few seconds...)\n")
        poller = email_client.begin_send(email_message)
        result = poller.result()
        
        print("=" * 50)
        print("✅ SUCCESS! Email sent successfully!")
        print("=" * 50)
        print(f"\nMessage ID: {result['id']}")
        print(f"Status: {result['status']}")
        print(f"\n✉️  Check the following email addresses for the test email:")
        for recipient in recipient_emails:
            print(f"   - {recipient}")
        print()
        
    except Exception as e:
        print("=" * 50)
        print("❌ ERROR sending email")
        print("=" * 50)
        print(f"\nError type: {type(e).__name__}")
        print(f"Error message: {str(e)}\n")
        
        # Provide troubleshooting hints
        if "DomainNotLinked" in str(e):
            print("💡 TROUBLESHOOTING:")
            print("   The domain is not linked to Communication Services.")
            print("   In Azure Portal:")
            print("   1. Go to Communication Services → Email → Domains")
            print("   2. Click 'Connect domain'")
            print("   3. Select your email domain from the dropdown")
            print("   4. Click 'Connect'\n")
        elif "Unauthorized" in str(e):
            print("💡 TROUBLESHOOTING:")
            print("   Check your AZURE_COMMUNICATION_CONNECTION_STRING")
            print("   Make sure it's the correct connection string from Azure Portal\n")
        elif "InvalidSenderAddress" in str(e):
            print("💡 TROUBLESHOOTING:")
            print("   The sender email address doesn't match your domain.")
            print(f"   Current sender: {sender_email}")
            print("   Make sure this exactly matches your Azure domain.\n")

if __name__ == "__main__":
    test_email()
