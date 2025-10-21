# reCAPTCHA Setup Guide

## ✅ Site Key Already Configured

Your reCAPTCHA site key has been added to the ContactForm component:

- **Site Key**: `6LcCvu8rAAAAAOsN7xZliVKCR7TH0-GLgW6hFwDC`

## 📝 Next Steps

### 1. Get Your Secret Key

1. Go to the reCAPTCHA admin console where you registered your site
2. Find the **Secret Key** for your site (starts with `6Lc...`)
3. Copy it

### 2. Update Backend Environment Variables

Edit `backend/.env` and replace:

```env
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

With your actual secret key:

```env
RECAPTCHA_SECRET_KEY=6LcCvu8r...your_actual_secret_key
```

### 3. Get SendGrid API Key (for sending emails)

1. Go to <https://sendgrid.com>
2. Sign up for a free account (100 emails/day free forever)
3. Go to **Settings** → **API Keys**
4. Click **Create API Key**
5. Give it a name (e.g., "Lawgate Contact Form")
6. Select **Full Access** or **Restricted Access** with Mail Send permission
7. Copy the API key

### 4. Update Backend Environment Variables

Edit `backend/.env` and replace:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

With your actual SendGrid key:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

### 5. Verify Domain in SendGrid (Optional but Recommended)

To avoid emails going to spam:

1. In SendGrid, go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender** (quick) or **Authenticate Your Domain** (better)
3. Follow the verification steps
4. Update `from_email` in `backend/contact_form/__init__.py` to use your verified domain

### 6. Restart Docker Containers

After updating the `.env` files:

```powershell
docker-compose down
docker-compose up --build
```

## 🧪 Testing

### Test the Contact Form

1. Go to <http://localhost:5173/contact>
2. Fill out the form
3. Complete the reCAPTCHA
4. Submit

You should:

- See "Message sent successfully!" alert
- Receive an email at <shishir@lawgate.in>

### Troubleshooting

**If reCAPTCHA doesn't show:**

- Make sure `localhost` is added as a domain in reCAPTCHA admin console
- Check browser console for errors
- Verify the site key is correct

**If email doesn't send:**

- Check Docker logs: `docker-compose logs backend`
- Verify SendGrid API key is correct
- Check SendGrid dashboard for delivery status
- Verify email address is correct

**If you get CORS errors:**

- Make sure backend is running on port 7071
- Check that `VITE_API_URL` in frontend/.env is correct

## 🔒 Security Notes

- ✅ `.env` files are in `.gitignore` - they won't be committed to Git
- ✅ Never share your secret keys publicly
- ✅ Use different keys for development and production
- ✅ Rotate keys if they're ever exposed

## 📋 Current Configuration

### Frontend (`frontend/.env`)

```env
VITE_RECAPTCHA_SITE_KEY=6LcCvu8rAAAAAOsN7xZliVKCR7TH0-GLgW6hFwDC
VITE_API_URL=http://localhost:7071
```

### Backend (`backend/.env`)

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here  # ← Update this
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here  # ← Update this
LAWGATE_EMAIL=shishir@lawgate.in
```

## 🚀 Ready to Deploy?

When deploying to Azure:

1. Update `VITE_API_URL` to your Azure Functions URL
2. Add all environment variables to Azure App Settings
3. Add your production domain to reCAPTCHA admin console

---

**Need help?** Check the logs or let me know if you encounter any issues!
