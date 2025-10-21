# Proxy Architecture Explanation

## How the Vite Proxy Works

### Network Setup

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│  (lawgate-website_default)                              │
│                                                          │
│  ┌──────────────────────┐    ┌──────────────────────┐  │
│  │  Frontend Container  │    │  Backend Container   │  │
│  │                      │    │                      │  │
│  │  Vite Dev Server     │───▶│  Azure Functions    │  │
│  │  Port: 5173          │    │  Port: 80           │  │
│  │                      │    │                      │  │
│  │  Service: frontend   │    │  Service: backend   │  │
│  └──────────────────────┘    └──────────────────────┘  │
│           │                            │                 │
└───────────┼────────────────────────────┼─────────────────┘
            │                            │
            │ Port mapping               │ Port mapping
            │ 5173:5173                  │ 7071:80
            │                            │
┌───────────┼────────────────────────────┼─────────────────┐
│           ▼                            ▼                 │
│    localhost:5173              localhost:7071            │
│         (Host Machine - Windows)                         │
└──────────────────────────────────────────────────────────┘
```

### Request Flow

#### Without Proxy (Fails)

1. Browser → `http://localhost:5173/api/contact`
2. Vite server tries to serve `/api/contact` as a file
3. ❌ **404 Not Found** - file doesn't exist

#### With Proxy (Works)

1. **Browser** → `http://localhost:5173/api/contact`
2. **Vite Dev Server** (inside frontend container):
   - Sees request to `/api/*`
   - Matches proxy config: `/api` → `http://backend:80`
   - Forwards to `http://backend:80/api/contact`
3. **Docker Network DNS**:
   - Resolves `backend` to backend container's IP
   - Routes request to backend container port 80
4. **Azure Functions** (inside backend container):
   - Receives request on port 80
   - Routes `/api/contact` to the contact_form function
   - Executes the function
5. **Response flows back**:
   - Backend → Vite proxy → Browser

### Why `backend:80` Not `localhost:7071`?

**Inside Docker Network:**

- `backend` = service name, resolves to backend container IP
- Port `80` = the port Azure Functions listens on INSIDE the container

**From Host Machine:**

- `localhost:7071` = the port mapped TO the host
- Port mapping `7071:80` means: "Host port 7071 → Container port 80"

The frontend container is INSIDE the Docker network, so it uses:

- Service name: `backend` (not `localhost`)
- Container port: `80` (not `7071`)

## Vite Config Explained

```typescript
export default defineConfig({
  server: {
    host: '0.0.0.0',        // Listen on all interfaces (required for Docker)
    port: 5173,              // Port inside container
    proxy: {
      '/api': {              // Match requests starting with /api
        target: 'http://backend:80',  // Forward to backend container
        changeOrigin: true,            // Update Host header
        secure: false,                 // Allow self-signed certs
      },
    },
  },
})
```

### Key Configuration Options

- **`host: '0.0.0.0'`**: Allows connections from outside the container (your browser)
- **`target: 'http://backend:80'`**:
  - `backend` = Docker service name
  - `80` = container port (NOT host port)
- **`changeOrigin: true`**: Changes the `Host` header to match the target
- **`secure: false`**: Allows connections without SSL verification

## Troubleshooting

### Proxy Not Working?

1. **Check Vite is running:**

   ```powershell
   docker-compose logs frontend
   ```

   Should see: "VITE v7.1.10 ready in XXX ms"

2. **Check backend is running:**

   ```powershell
   docker-compose logs backend
   ```

   Should see: "Now listening on: http://[::]:80"

3. **Restart containers:**

   ```powershell
   docker-compose down
   docker-compose up
   ```

4. **Check browser console:**
   - Open DevTools (F12) → Network tab
   - Submit form
   - Look for request to `/api/contact`
   - Check if it returns 200, 404, or 500

5. **Check proxy logs:**
   - Frontend container logs should show "🔄 Proxying request: /api/contact"
   - Backend logs should show "🔔 Contact form function triggered"

### Common Issues

#### Issue: "Fetch failed"

- **Cause**: Vite proxy not configured or not started
- **Fix**: Restart containers with `docker-compose down; docker-compose up`

#### Issue: 404 Not Found

- **Cause**: Backend not receiving request
- **Fix**: Check proxy target is `http://backend:80` not `localhost`

#### Issue: 500 Internal Server Error

- **Cause**: Backend receiving request but function erroring
- **Fix**: Check backend logs for detailed error message

#### Issue: CORS Error

- **Cause**: Backend not setting CORS headers
- **Fix**: Already handled in backend code with `Access-Control-Allow-Origin: *`

## Testing the Proxy

### Direct Backend Test (from host)

```powershell
curl http://localhost:7071/api/contact -X POST -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","phone":"1234567890","subject":"Test","message":"Test","captcha":"test"}'
```

### Through Proxy (from browser console)

```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@test.com',
    phone: '1234567890',
    subject: 'Test',
    message: 'Test',
    captcha: 'test'
  })
}).then(r => r.json()).then(console.log)
```

## Current Configuration Status

✅ Docker network configured
✅ Port mappings correct (5173:5173 and 7071:80)
✅ Proxy configured in vite.config.ts
✅ Backend listening on port 80
✅ Frontend accessible at <http://localhost:5173>
✅ Backend accessible at <http://localhost:7071>

**Next Step**: Restart containers to ensure proxy is loaded, then test the contact form.
