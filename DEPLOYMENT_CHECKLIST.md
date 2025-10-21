# Azure Deployment Checklist

## Pre-Deployment Checklist

### Prerequisites

- [ ] Azure account created
- [ ] Azure CLI installed: `winget install Microsoft.AzureCLI`
- [ ] Azure Functions Core Tools installed: `npm install -g azure-functions-core-tools@4`
- [ ] Logged in to Azure CLI: `az login`
- [ ] Git repository ready (code committed and pushed)

### Azure Resources Needed

- [ ] Azure Communication Services (already configured ✓)
- [ ] Resource Group
- [ ] Azure Static Web App (for frontend + backend together) OR
- [ ] Azure Function App (for backend) + Azure Static Web App/Storage (for frontend)

---

## Quick Start: Azure Static Web Apps (Recommended)

This is the easiest method - Azure automatically builds and deploys everything.

### Step 1: Create Static Web App

1. [ ] Go to [Azure Portal](https://portal.azure.com)
2. [ ] Click "Create a resource"
3. [ ] Search for "Static Web Apps"
4. [ ] Click "Create"

### Step 2: Configure Static Web App

- [ ] **Subscription**: Select your subscription
- [ ] **Resource Group**: Create new "rg-lawgate-prod"
- [ ] **Name**: "lawgate-website"
- [ ] **Plan type**: Free (upgrade to Standard for custom domain)
- [ ] **Region**: East US 2 (or closest)
- [ ] **Source**: GitHub
- [ ] **GitHub account**: Authorize
- [ ] **Repository**: lawgate-website
- [ ] **Branch**: master

### Step 3: Build Configuration

- [ ] **Build Presets**: Custom
- [ ] **App location**: `/frontend`
- [ ] **Api location**: `/backend`
- [ ] **Output location**: `dist`

### Step 4: Create Resource

- [ ] Click "Review + Create"
- [ ] Click "Create"
- [ ] Wait for deployment (~2 minutes)

### Step 5: Configure Environment Variables

1. [ ] Go to Static Web App in Azure Portal
2. [ ] Click "Configuration"
3. [ ] Add application settings:

   ```
   AZURE_COMMUNICATION_CONNECTION_STRING=<your-value>
   AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net
   ```

4. [ ] Click "Save"

### Step 6: Test Deployment

- [ ] Get URL from Azure Portal (Overview page)
- [ ] Visit URL: `https://lawgate-website-xxxxx.azurestaticapps.net`
- [ ] Test contact form
- [ ] Check email delivery

### Step 7: Configure Custom Domain (Optional)

1. [ ] Go to "Custom domains" in portal
2. [ ] Click "Add"
3. [ ] Add DNS records:

   ```
   CNAME: www → your-app.azurestaticapps.net
   TXT: _dnsauth.www → verification-code
   ```

4. [ ] Wait for verification (~15 minutes)
5. [ ] SSL certificate auto-provisions

---

## Alternative: Separate Deployments

Use this if you need more control over backend and frontend separately.

### Backend Deployment

#### Option A: Using PowerShell Script (Easiest)

- [ ] Open PowerShell in project root
- [ ] Run: `.\deploy-backend.ps1`
- [ ] Follow prompts
- [ ] Note the Function App URL

#### Option B: Manual Deployment

1. [ ] Create Resource Group:

   ```powershell
   az group create --name rg-lawgate-prod --location eastus2
   ```

2. [ ] Create Storage Account:

   ```powershell
   az storage account create `
     --name lawgatestorageXXX `
     --resource-group rg-lawgate-prod `
     --location eastus2 `
     --sku Standard_LRS
   ```

3. [ ] Create Function App:

   ```powershell
   az functionapp create `
     --name lawgate-backend-XXX `
     --resource-group rg-lawgate-prod `
     --storage-account lawgatestorageXXX `
     --runtime python `
     --runtime-version 3.11 `
     --functions-version 4 `
     --os-type Linux `
     --consumption-plan-location eastus2
   ```

4. [ ] Configure environment variables:

   ```powershell
   az functionapp config appsettings set `
     --name lawgate-backend-XXX `
     --resource-group rg-lawgate-prod `
     --settings `
     "AZURE_COMMUNICATION_CONNECTION_STRING=<your-value>" `
     "AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net"
   ```

5. [ ] Deploy code:

   ```powershell
   cd backend
   func azure functionapp publish lawgate-backend-XXX
   ```

6. [ ] Test backend:

   ```powershell
   # Test endpoint
   curl https://lawgate-backend-XXX.azurewebsites.net/api/contact_form
   ```

### Frontend Deployment

#### Option A: Static Web App (Frontend only)

- [ ] Follow "Quick Start" above but leave API location empty
- [ ] Update `vite.config.ts` to point to Function App URL in production

#### Option B: Azure Storage Static Website

1. [ ] Create storage account:

   ```powershell
   az storage account create `
     --name lawgatefrontendXXX `
     --resource-group rg-lawgate-prod `
     --location eastus2 `
     --sku Standard_LRS
   ```

2. [ ] Enable static website:

   ```powershell
   az storage blob service-properties update `
     --account-name lawgatefrontendXXX `
     --static-website `
     --index-document index.html `
     --404-document index.html
   ```

3. [ ] Build frontend:

   ```powershell
   cd frontend
   npm install
   npm run build
   ```

4. [ ] Upload to storage:

   ```powershell
   az storage blob upload-batch `
     --account-name lawgatefrontendXXX `
     --source ./dist `
     --destination '$web'
   ```

5. [ ] Get URL:

   ```powershell
   az storage account show `
     --name lawgatefrontendXXX `
     --resource-group rg-lawgate-prod `
     --query "primaryEndpoints.web" -o tsv
   ```

#### Configure CORS

- [ ] Add frontend URL to backend CORS:

   ```powershell
   az functionapp cors add `
     --name lawgate-backend-XXX `
     --resource-group rg-lawgate-prod `
     --allowed-origins "https://your-frontend-url"
   ```

---

## Post-Deployment Testing

### Test Checklist

- [ ] Homepage loads
- [ ] Navigation works
- [ ] Video carousel works
- [ ] Articles load
- [ ] Article pages display correctly
- [ ] Contact form opens
- [ ] Contact form validation works
- [ ] reCAPTCHA works
- [ ] Email sends successfully
- [ ] Toast notifications appear
- [ ] Mobile responsive design works
- [ ] All images load
- [ ] YouTube thumbnails load
- [ ] Logo displays correctly

### Performance Checks

- [ ] Lighthouse score > 90
- [ ] Page load time < 3s
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s

---

## Monitoring Setup

### Enable Application Insights

- [ ] Go to Function App in Azure Portal
- [ ] Click "Application Insights"
- [ ] Enable if not already enabled
- [ ] Note instrumentation key

### View Logs

- [ ] Backend logs: Function App → "Log stream"
- [ ] Frontend logs: Static Web App → "Functions" → Logs
- [ ] Deployment logs: Static Web App → "Environments"

### Set Up Alerts (Optional)

- [ ] Create alert for Function failures
- [ ] Create alert for high response times
- [ ] Create alert for email send failures

---

## Security Checklist

- [ ] Environment variables in Azure (not in code)
- [ ] `.env` file in `.gitignore`
- [ ] CORS configured correctly
- [ ] HTTPS enabled (automatic with Azure)
- [ ] reCAPTCHA configured
- [ ] Security headers configured (in staticwebapp.config.json)
- [ ] API authentication (if needed)

---

## Cost Management

### Current Setup Estimate

- Static Web Apps Free: $0/month
- Azure Functions Consumption: ~$0-5/month (low traffic)
- Azure Communication Services: Pay per email (~$0.25/1000)

**Total: ~$0-10/month for low to moderate traffic**

### Monitor Costs

- [ ] Set up budget alert in Azure Portal
- [ ] Monitor "Cost Management + Billing"
- [ ] Review monthly usage

---

## Rollback Plan

### If Deployment Fails

1. [ ] Check deployment logs in GitHub Actions
2. [ ] Check Azure Portal deployment history
3. [ ] Verify environment variables are set
4. [ ] Check build configuration

### Quick Rollback

- [ ] Go to Static Web App → "Environments"
- [ ] Click on previous successful deployment
- [ ] Click "Revert"

Or via Git:

```powershell
git revert HEAD
git push
```

---

## Domain Configuration (Optional)

### Add Custom Domain

1. [ ] Go to Static Web App → "Custom domains"
2. [ ] Click "Add"
3. [ ] Enter domain: `www.lawgate.com`
4. [ ] Add DNS records at domain registrar:

   ```
   Type: CNAME
   Name: www
   Value: your-app.azurestaticapps.net
   
   Type: TXT
   Name: _dnsauth.www
   Value: <verification-code>
   ```

5. [ ] Wait for verification (~15 min)
6. [ ] SSL certificate auto-provisions (~30 min)

### Root Domain (apex domain)

For root domain (lawgate.com without www):

- [ ] Upgrade to Standard plan ($9/month)
- [ ] Add ALIAS or ANAME record (depends on DNS provider)
- [ ] Or use Azure DNS Zone

---

## Production Readiness

### Final Checks

- [ ] All tests passing
- [ ] Production environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Monitoring enabled
- [ ] Backups configured (automatic with Azure)
- [ ] Team has access to Azure Portal
- [ ] Documentation updated

### Go Live

- [ ] Update DNS to point to Azure
- [ ] Announce launch
- [ ] Monitor for first 24 hours
- [ ] Celebrate! 🎉

---

## Useful Commands

### View Backend Logs

```powershell
func azure functionapp logstream lawgate-backend-XXX
```

### Redeploy Backend

```powershell
cd backend
func azure functionapp publish lawgate-backend-XXX
```

### View Static Web App Details

```powershell
az staticwebapp show --name lawgate-website --resource-group rg-lawgate-prod
```

### Update Environment Variables

```powershell
az functionapp config appsettings set `
  --name lawgate-backend-XXX `
  --resource-group rg-lawgate-prod `
  --settings "KEY=value"
```

---

## Support Resources

- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Functions Docs](https://docs.microsoft.com/azure/azure-functions/)
- [Azure Communication Services Docs](https://docs.microsoft.com/azure/communication-services/)
- [Azure Support](https://azure.microsoft.com/support/options/)

---

**Recommended Path**: Use the "Quick Start: Azure Static Web Apps" section above - it's the easiest and most cost-effective solution!
