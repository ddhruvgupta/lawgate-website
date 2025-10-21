# Azure Functions Deployment Script
# Run this from the root directory of the project

Write-Host "Azure Functions Deployment Script" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if Azure CLI is installed
$azCliInstalled = Get-Command az -ErrorAction SilentlyContinue
if (-not $azCliInstalled) {
    Write-Host "ERROR: Azure CLI is not installed!" -ForegroundColor Red
    Write-Host "Install it with: winget install Microsoft.AzureCLI" -ForegroundColor Yellow
    exit 1
}

# Check if logged in to Azure
Write-Host "Checking Azure login status..." -ForegroundColor Yellow
$account = az account show 2>$null
if (-not $account) {
    Write-Host "Not logged in to Azure. Logging in..." -ForegroundColor Yellow
    az login
}

Write-Host "✓ Logged in to Azure" -ForegroundColor Green
Write-Host ""

# Get subscription
$subscription = az account show --query name -o tsv
Write-Host "Using subscription: $subscription" -ForegroundColor Cyan
Write-Host ""

# Prompt for configuration
Write-Host "Enter deployment configuration:" -ForegroundColor Cyan
$resourceGroup = Read-Host "Resource Group name (e.g., rg-lawgate-prod)"
$functionAppName = Read-Host "Function App name (must be globally unique, e.g., lawgate-backend-xyz)"
$location = Read-Host "Azure region (e.g., eastus2, westus2)"

Write-Host ""
Write-Host "Creating resources..." -ForegroundColor Yellow

# Create resource group
Write-Host "Creating resource group..." -ForegroundColor Yellow
az group create --name $resourceGroup --location $location
Write-Host "✓ Resource group created" -ForegroundColor Green

# Create storage account (required for Functions)
$storageAccountName = $functionAppName.Replace("-", "").ToLower() + "storage"
if ($storageAccountName.Length -gt 24) {
    $storageAccountName = $storageAccountName.Substring(0, 24)
}

Write-Host "Creating storage account: $storageAccountName..." -ForegroundColor Yellow
az storage account create `
    --name $storageAccountName `
    --resource-group $resourceGroup `
    --location $location `
    --sku Standard_LRS

Write-Host "✓ Storage account created" -ForegroundColor Green

# Create Function App
Write-Host "Creating Function App: $functionAppName..." -ForegroundColor Yellow
az functionapp create `
    --name $functionAppName `
    --resource-group $resourceGroup `
    --storage-account $storageAccountName `
    --runtime python `
    --runtime-version 3.11 `
    --functions-version 4 `
    --os-type Linux `
    --consumption-plan-location $location

Write-Host "✓ Function App created" -ForegroundColor Green
Write-Host ""

# Configure environment variables
Write-Host "Configuring environment variables..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Enter your Azure Communication Services connection string:" -ForegroundColor Cyan
$connString = Read-Host "Connection string"

az functionapp config appsettings set `
    --name $functionAppName `
    --resource-group $resourceGroup `
    --settings `
    "AZURE_COMMUNICATION_CONNECTION_STRING=$connString" `
    "AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net"

Write-Host "✓ Environment variables configured" -ForegroundColor Green
Write-Host ""

# Deploy backend code
Write-Host "Deploying backend code..." -ForegroundColor Yellow
Push-Location backend

# Check if func is installed
$funcInstalled = Get-Command func -ErrorAction SilentlyContinue
if (-not $funcInstalled) {
    Write-Host "ERROR: Azure Functions Core Tools not installed!" -ForegroundColor Red
    Write-Host "Install it with: npm install -g azure-functions-core-tools@4" -ForegroundColor Yellow
    Pop-Location
    exit 1
}

func azure functionapp publish $functionAppName

Pop-Location
Write-Host "✓ Backend deployed" -ForegroundColor Green
Write-Host ""

# Get Function App URL
$functionUrl = az functionapp show --name $functionAppName --resource-group $resourceGroup --query defaultHostName -o tsv

Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend URL: https://$functionUrl" -ForegroundColor Cyan
Write-Host "API Endpoint: https://$functionUrl/api/contact_form" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test your API endpoint" -ForegroundColor White
Write-Host "2. Deploy your frontend (see AZURE_DEPLOYMENT.md)" -ForegroundColor White
Write-Host "3. Configure CORS if needed:" -ForegroundColor White
Write-Host "   az functionapp cors add --name $functionAppName --resource-group $resourceGroup --allowed-origins 'https://your-frontend-url'" -ForegroundColor Gray
Write-Host ""
