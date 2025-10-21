# Azure Functions Backend Dockerfile
FROM mcr.microsoft.com/azure-functions/python:4-python3.11

WORKDIR /home/site/wwwroot

# Copy requirements and install
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy function app
COPY . .

# Expose port
EXPOSE 7071
