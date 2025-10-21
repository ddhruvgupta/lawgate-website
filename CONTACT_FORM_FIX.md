# Contact Form 404 Fix

## Problem

The contact form was throwing a 404 error when trying to send emails because:

1. The frontend was sending requests to `/api/contact`
2. Vite had no proxy configured to forward these requests to the backend
3. The backend Azure Functions container listens on port 80 internally
4. Port mapping was incorrect (7071:7071 instead of 7071:80)

## Solution

### 1. Fixed Port Mapping in `docker-compose.yml`

Changed from:

```yaml
ports:
  - "7071:7071"
```

To:

```yaml
ports:
  - "7071:80"
```

This correctly maps the host port 7071 to the container's internal port 80 where Azure Functions listens.

### 2. Added Vite Proxy in `vite.config.ts`

Added proxy configuration to forward `/api/*` requests to the backend:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:80',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
})
```

## How It Works Now

1. **Frontend**: Makes POST request to `/api/contact`
2. **Vite Proxy**: Intercepts the request and forwards to `http://backend:80/api/contact`
3. **Docker Network**: Routes to the backend container
4. **Azure Functions**: Receives request on port 80, routes to the `contact` function
5. **Backend**: Processes request, verifies reCAPTCHA, sends email via Azure Communication Services

## Testing the Contact Form

1. **Go to**: <http://localhost:5173/contact>

2. **Fill out the form**:
   - Name
   - Email
   - Subject
   - Message
   - Complete reCAPTCHA

3. **Submit**: Click "Send Message"

4. **Check for success**: You should see "Message sent successfully!" alert

5. **Verify email**: Check <shishir@lawgate.in> inbox for the contact form email

## Troubleshooting

### Still getting 404?

- Make sure both containers are running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`
- Verify the proxy is working by checking Vite output

### Email not sending?

- Check Azure Communication Services connection string in `backend/.env`
- Verify domain is set up and verified in Azure Portal
- Check backend logs for error messages

### reCAPTCHA errors?

- Verify `VITE_RECAPTCHA_SITE_KEY` in `frontend/.env`
- Verify `RECAPTCHA_SECRET_KEY` in `backend/.env`
- Check that keys match those in Google reCAPTCHA console

## Network Architecture

```
Browser (localhost:5173)
    ↓
Vite Dev Server (frontend container)
    ↓ (proxy /api/*)
Backend Container (port 80)
    ↓
Azure Functions Runtime
    ↓
Contact Function (/api/contact)
    ↓
Azure Communication Services Email API
```

## Next Steps

Once you've verified the contact form works locally:

1. Set up your email domain in Azure Communication Services
2. Update the sender email in `backend/.env`
3. Deploy to Azure Static Web Apps
4. Update production environment variables
