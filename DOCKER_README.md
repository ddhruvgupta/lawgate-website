# Lawgate Website - Docker Development

## Prerequisites

- Docker Desktop installed
- Docker Compose installed

## Quick Start

### Start the development environment

```bash
docker-compose up
```

This will start:

- **Frontend** on <http://localhost:5173> (React + Vite + Tailwind)
- **Backend** on <http://localhost:7071> (Azure Functions - Python)

### Stop the environment

```bash
docker-compose down
```

### Rebuild containers (after dependency changes)

```bash
docker-compose up --build
```

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

## Project Structure

```
lawgate-website/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/       # Base Tailwind components
│   │   │   ├── organisms/# Complex components
│   │   │   ├── pages/    # Page components
│   │   │   └── templates/# Layout templates
│   │   ├── utils/        # Utility functions
│   │   └── types/        # TypeScript types
│   └── Dockerfile
│
├── backend/              # Python Azure Functions
│   ├── contact_form/    # Contact form handler
│   └── Dockerfile
│
└── docker-compose.yml
```

## Development Workflow

1. **Make changes** to files in `frontend/` or `backend/`
2. **Hot reload** is enabled - changes reflect automatically
3. **View logs**: `docker-compose logs -f frontend` or `docker-compose logs -f backend`

## Deployment

The application is designed for Azure Static Web Apps:

- Frontend: Deployed as static files
- Backend: Deployed as Azure Functions

See `.github/workflows/` for CI/CD configuration (to be created).
