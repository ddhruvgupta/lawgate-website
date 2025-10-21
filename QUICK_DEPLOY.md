# 🚀 Quick Deploy to Azure - 5 Minute Guide

## Fastest Path: Azure Static Web Apps

### 1. Create Static Web App (2 minutes)

1. Go to <https://portal.azure.com>
2. Click **"+ Create a resource"**
3. Search **"Static Web Apps"** → Click **Create**
4. Fill in:
   - Resource Group: `rg-lawgate-prod` (create new)
   - Name: `lawgate-website`
   - Plan: **Free**
   - Region: **East US 2**
   - Source: **GitHub**
   - Authorize GitHub and select:
     - Repo: `ddhruvgupta/lawgate-website`
     - Branch: `master`
   - Build Presets: **Custom**
   - App location: `/frontend`
   - Api location: `/backend`
   - Output location: `dist`

5. Click **Review + Create** → **Create**

### 2. Add Environment Variables (1 minute)

After deployment completes:

1. Go to your Static Web App resource
2. Click **"Configuration"** in left menu
3. Click **"+ Add"** and add:

   ```
   Name: AZURE_COMMUNICATION_CONNECTION_STRING
   Value: endpoint=https://...your-connection-string...
   
   Name: AZURE_SENDER_EMAIL
   Value: DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net
   ```

4. Click **Save**

### 3. Done! 🎉

Your site is live at: `https://lawgate-website-xxxxx.azurestaticapps.net`

Find the URL in the **Overview** page of your Static Web App.

---

## That's it

GitHub Actions will automatically:

- Build your frontend
- Deploy your backend
- Deploy on every push to master
- Create preview environments for pull requests

---

## Optional: Add Custom Domain

1. In Static Web App, click **"Custom domains"**
2. Click **"+ Add"**
3. Add these DNS records at your domain registrar:

   ```
   Type: CNAME
   Name: www
   Value: lawgate-website-xxxxx.azurestaticapps.net
   
   Type: TXT
   Name: _dnsauth.www
   Value: <code-shown-in-portal>
   ```

4. Wait 15 minutes for verification
5. SSL certificate auto-provisions

---

## Cost

**Free Tier includes:**

- 100 GB bandwidth/month
- 2 custom domains
- SSL certificates
- GitHub integration
- Staging environments

**Perfect for this site!** Estimated cost: **$0-5/month**

---

## Need Help?

See full documentation:

- `AZURE_DEPLOYMENT.md` - Comprehensive guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `deploy-backend.ps1` - PowerShell deployment script

---

**Pro Tip:** After first deployment, every `git push` to master automatically deploys to production. That's it!
