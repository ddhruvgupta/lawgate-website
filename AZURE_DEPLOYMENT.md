# Azure Deployment Guide for LawGate Website

## Architecture Overview

- **Frontend**: Azure Static Web Apps (React/Vite app)
- **Backend**: Azure Functions (Python 3.11)
- **Email**: Azure Communication Services (already configured)

## Prerequisites

1. Azure account with active subscription
2. Azure CLI installed: `winget install Microsoft.AzureCLI`
3. Azure Functions Core Tools: `npm install -g azure-functions-core-tools@4`
4. Git repository (already have: ddhruvgupta/lawgate-website)

## Option 1: Azure Static Web Apps (Recommended - Easiest)

Azure Static Web Apps automatically builds and deploys both frontend and backend together.

### Step 1: Create Static Web App via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → Search "Static Web Apps"
3. Click "Create"

**Configuration:**

- **Subscription**: Choose your subscription
- **Resource Group**: Create new "rg-lawgate-prod"
- **Name**: "lawgate-website"
- **Plan type**: Free (or Standard for custom domains)
- **Region**: East US 2 (or closest to you)
- **Deployment source**: GitHub
- **GitHub account**: Authorize and select "ddhruvgupta"
- **Organization**: ddhruvgupta
- **Repository**: lawgate-website
- **Branch**: master

**Build Details:**

- **Build Presets**: Custom
- **App location**: `/frontend`
- **Api location**: `/backend`
- **Output location**: `dist`

4. Click "Review + Create" → "Create"

This will:

- Create GitHub Actions workflow automatically
- Build and deploy on every push to master
- Provide a URL like: `https://lawgate-website-xxxxx.azurestaticapps.net`

### Step 2: Configure Environment Variables

After deployment, add environment variables in Azure Portal:

1. Go to your Static Web App resource
2. Click "Configuration" in left menu
3. Add these application settings:

```
AZURE_COMMUNICATION_CONNECTION_STRING=<your-connection-string>
AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net
```

### Step 3: Update Frontend API URL

The Static Web App automatically proxies `/api/*` requests to your backend, so no changes needed!

---

## Option 2: Separate Deployments (More Control)

Deploy frontend and backend separately for more control.

### Part A: Deploy Backend (Azure Functions)

#### Via Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a resource → "Function App"

**Configuration:**

- **Resource Group**: rg-lawgate-prod
- **Function App name**: lawgate-backend (must be globally unique)
- **Runtime stack**: Python
- **Version**: 3.11
- **Region**: East US 2
- **Operating System**: Linux
- **Plan type**: Consumption (Serverless)

3. Click "Review + Create" → "Create"

#### Deploy Backend Code

```powershell
# Navigate to backend directory
cd backend

# Login to Azure
az login

# Deploy to Function App
func azure functionapp publish lawgate-backend
```

#### Configure Backend Environment Variables

```powershell
az functionapp config appsettings set `
  --name lawgate-backend `
  --resource-group rg-lawgate-prod `
  --settings `
  "AZURE_COMMUNICATION_CONNECTION_STRING=<your-connection-string>" `
  "AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net"
```

Your backend will be available at: `https://lawgate-backend.azurewebsites.net`

### Part B: Deploy Frontend (Azure Static Web Apps or Storage)

#### Option B1: Azure Static Web Apps (Frontend Only)

Same as Option 1, but set:

- **Api location**: Leave empty or point to your Function App URL
- Update `vite.config.ts` to proxy to your Function App URL

#### Option B2: Azure Storage Static Website

```powershell
# Create storage account
az storage account create `
  --name lawgatestorage `
  --resource-group rg-lawgate-prod `
  --location eastus2 `
  --sku Standard_LRS

# Enable static website hosting
az storage blob service-properties update `
  --account-name lawgatestorage `
  --static-website `
  --index-document index.html `
  --404-document index.html

# Build frontend
cd frontend
npm run build

# Upload to storage (get connection string first)
$env:AZURE_STORAGE_CONNECTION_STRING = $(az storage account show-connection-string --name lawgatestorage --resource-group rg-lawgate-prod --query connectionString -o tsv)

az storage blob upload-batch `
  --account-name lawgatestorage `
  --source ./dist `
  --destination '$web'
```

Your frontend will be available at: `https://lawgatestorage.z13.web.core.windows.net`

---

## Option 3: Quick Deployment via VS Code (Easiest for Testing)

### Prerequisites

Install VS Code extensions:

- Azure Functions
- Azure Static Web Apps

### Deploy Backend

1. Open backend folder in VS Code
2. Click Azure icon in sidebar
3. Sign in to Azure
4. Click "Deploy to Function App"
5. Create new Function App or select existing
6. Wait for deployment

### Deploy Frontend

1. Open frontend folder in VS Code
2. Click Azure icon in sidebar
3. Click "Deploy to Static Web App"
4. Create new Static Web App or select existing
5. Set app location: `/`
6. Set output location: `dist`
7. Wait for deployment

---

## Post-Deployment Configuration

### 1. Update CORS (if using separate deployments)

```powershell
# Allow frontend domain to call backend
az functionapp cors add `
  --name lawgate-backend `
  --resource-group rg-lawgate-prod `
  --allowed-origins "https://your-static-web-app.azurestaticapps.net"
```

### 2. Configure Custom Domain (Optional)

#### For Static Web Apps

1. Go to Static Web App in Azure Portal
2. Click "Custom domains" in left menu
3. Click "Add"
4. Follow DNS configuration steps

#### Add DNS Records

```
Type: CNAME
Name: www
Value: your-static-web-app.azurestaticapps.net

Type: TXT (for verification)
Name: _dnsauth.www
Value: <provided-by-azure>
```

### 3. Enable Application Insights (Recommended)

Already configured in `backend/host.json`. To view logs:

1. Go to Function App in Azure Portal
2. Click "Application Insights" in left menu
3. View logs, requests, failures

---

## Environment Variables Summary

### Backend (.env variables to set in Azure)

```
AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://...
AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net
```

### Frontend (if needed)

Static Web Apps automatically proxies `/api/*` to backend, so no configuration needed.

If using separate deployments, update `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://lawgate-backend.azurewebsites.net',
        changeOrigin: true,
      },
    },
  },
})
```

---

## Monitoring & Troubleshooting

### View Backend Logs

```powershell
# Stream logs
func azure functionapp logstream lawgate-backend
```

Or in Azure Portal:

1. Go to Function App
2. Click "Log stream" in left menu

### View Frontend Logs

1. Go to Static Web App in Azure Portal
2. Click "Functions" → View logs for API calls
3. Click "Environments" → View deployment logs

### Common Issues

**Issue**: CORS errors
**Solution**: Add frontend domain to CORS allowed origins (see above)

**Issue**: API calls return 404
**Solution**: Ensure API location is set correctly in Static Web App configuration

**Issue**: Environment variables not working
**Solution**: Restart Function App after adding settings

---

## Cost Estimation

### Free Tier (Good for testing/small sites)

- **Static Web Apps Free**: Free (100 GB bandwidth/month)
- **Azure Functions Consumption**: First 1M requests free
- **Azure Communication Services**: Pay-per-use (email sending)

**Estimated Monthly Cost**: ~$0-5 for low traffic

### Production (Standard tier)

- **Static Web Apps Standard**: $9/month (custom domain, auth)
- **Azure Functions Consumption**: ~$0.20 per 1M executions
- **Azure Communication Services**: ~$0.25 per 1000 emails

**Estimated Monthly Cost**: ~$10-20 for moderate traffic

---

## Recommended Approach

**For production, I recommend Option 1 (Azure Static Web Apps):**

✅ Simplest setup
✅ Automatic CI/CD with GitHub Actions
✅ Free SSL certificate
✅ Global CDN included
✅ Automatic API proxy
✅ Easy custom domain setup
✅ Built-in staging environments

Just follow "Option 1" steps above and you'll be live in ~10 minutes!
