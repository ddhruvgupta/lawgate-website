# Azure Communication Services Setup Guide

## Overview

Your contact form now uses **Azure Communication Services Email** instead of SendGrid. This is:

- ✅ **Free for 100 emails/month** (perfect for your needs)
- ✅ Native Azure integration
- ✅ No third-party dependencies
- ✅ Very cheap after free tier ($0.0012 per email)

## Step-by-Step Setup

### Step 1: Create Azure Communication Services Resource

1. **Sign in to Azure Portal**
   - Go to <https://portal.azure.com>
   - Sign in with your Azure account

2. **Create Communication Services Resource**
   - Click "Create a resource"
   - Search for "Communication Services"
   - Click "Create"

3. **Configure the Resource**
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Select existing or create new (e.g., "lawgate-rg")
   - **Resource Name**: Choose a name (e.g., "lawgate-communication")
   - **Data Location**: Choose your region (India/Asia Pacific recommended)
   - Click "Review + Create"
   - Click "Create"

### Step 2: Get Connection String

1. **Navigate to your Communication Services resource**
   - In Azure Portal, go to your Communication Services resource
   - Click on "Settings" → "Keys" in the left menu

2. **Copy the Connection String**
   - You'll see "Primary connection string" and "Secondary connection string"
   - Copy the **Primary connection string**
   - It looks like: `endpoint=https://...;accesskey=...`

3. **Add to Backend .env**

   ```env
   AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://lawgate-communication.communication.azure.com/;accesskey=your_key_here
   ```

### Step 3: Set Up Email Domain

You have two options for the sender email:

#### Option A: Use Azure Managed Domain (Quick Setup)

1. **Enable Email Domain**
   - In your Communication Services resource
   - Go to "Email" → "Domains"
   - Click "Add domain"
   - Select "Azure Managed Domain"
   - Choose a subdomain (e.g., "lawgate")
   - Full address: `DoNotReply@{subdomain}.azurecomm.net`

2. **Update .env**

   ```env
   AZURE_SENDER_EMAIL=DoNotReply@lawgate.azurecomm.net
   ```

✅ **Pros**: Quick, no DNS setup needed, ready in minutes
❌ **Cons**: Email address looks less professional

#### Option B: Use Custom Domain (Recommended for Production)

1. **Add Custom Domain**
   - In Communication Services, go to "Email" → "Domains"
   - Click "Add domain"
   - Select "Custom Managed Domain"
   - Enter your domain: `lawgate.in`

2. **Verify Domain Ownership**
   - Azure will provide TXT, SPF, and DKIM DNS records
   - Add these records to your domain's DNS settings (where you manage lawgate.in)
   - Wait for verification (can take up to 24 hours)

3. **Configure Sender Email**
   - Once verified, you can use: `noreply@lawgate.in` or `contact@lawgate.in`

4. **Update .env**

   ```env
   AZURE_SENDER_EMAIL=DoNotReply@lawgate.in
   ```

✅ **Pros**: Professional, branded email address
❌ **Cons**: Requires DNS configuration, takes longer

### Step 4: Link Email Domain to Communication Resource

1. **Connect Domain**
   - In Communication Services, go to "Email" → "Domains"
   - Select your domain (Azure Managed or Custom)
   - Click "Connect" to link it to your resource

2. **Verify Connection**
   - Make sure the status shows "Connected"

### Step 5: Test the Configuration

1. **Rebuild Docker Containers**

   ```powershell
   docker-compose down
   docker-compose up --build
   ```

2. **Test the Contact Form**
   - Go to <http://localhost:5173/contact>
   - Fill out the form
   - Complete reCAPTCHA
   - Submit

3. **Check Email Delivery**
   - Email should arrive at <shishir@lawgate.in>
   - Check Azure Portal → Communication Services → "Email" → "Delivery Reports" for status

## DNS Records for Custom Domain (if using Option B)

When you choose custom domain, you'll need to add these DNS records to lawgate.in:

### TXT Record (Domain Verification)

```
Type: TXT
Name: @
Value: (provided by Azure)
TTL: 3600
```

### SPF Record

```
Type: TXT
Name: @
Value: v=spf1 include:spf.protection.outlook.com -all
TTL: 3600
```

### DKIM Records (2 records)

```
Type: CNAME
Name: selector1._domainkey
Value: selector1-<resourcename>._domainkey.<region>.azurecomm.net
TTL: 3600

Type: CNAME
Name: selector2._domainkey
Value: selector2-<resourcename>._domainkey.<region>.azurecomm.net
TTL: 3600
```

## Environment Variables Summary

### Backend `.env` file

```env
# Azure Communication Services
AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://lawgate-communication.communication.azure.com/;accesskey=your_key_here
AZURE_SENDER_EMAIL=DoNotReply@lawgate.azurecomm.net  # or DoNotReply@lawgate.in

# reCAPTCHA
RECAPTCHA_SECRET_KEY=6LcCvu8rAAAAAMu3z9D5fPwK2_jMIZTEbvnElCVG

# Recipients (comma-separated list for multiple recipients)
LAWGATE_EMAIL=shishir@lawgate.in,ddhuvgupta@gmail.com
```

## Pricing

### Free Tier

- **100 emails/month FREE**
- Perfect for contact form usage

### After Free Tier

- **$0.0012 per email**
- For 100 emails/month = **$0.12/month**
- For 1,000 emails/month = **$1.20/month**

Very affordable for your use case!

## Troubleshooting

### Email not sending?

1. **Check Connection String**
   - Make sure it's copied correctly from Azure Portal
   - Should start with `endpoint=https://...`

2. **Verify Domain Status**
   - Go to Azure Portal → Communication Services → Email → Domains
   - Check that domain status is "Verified" and "Connected"

3. **Check Sender Email**
   - Must match the domain you verified
   - For Azure Managed: use `@{subdomain}.azurecomm.net`
   - For Custom Domain: use your verified domain

4. **Check Logs**

   ```powershell
   docker-compose logs backend
   ```

5. **Check Azure Delivery Reports**
   - Azure Portal → Communication Services → Email → Delivery Reports
   - See delivery status and any errors

### Domain verification taking too long?

- DNS changes can take up to 48 hours
- Use Azure Managed Domain for immediate testing
- Switch to custom domain later

## Next Steps

1. ✅ Create Azure Communication Services resource
2. ✅ Get connection string
3. ✅ Set up email domain (Azure Managed for quick start)
4. ✅ Update `backend/.env`
5. ✅ Rebuild Docker containers
6. ✅ Test contact form

---

**Need Help?**

- Azure Communication Services Docs: <https://learn.microsoft.com/azure/communication-services/>
- Contact form backend code: `backend/contact_form/__init__.py`
