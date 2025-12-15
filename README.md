# LawGate Website - Project Overview

> **Professional legal services website for LawGate - Construction Law & Arbitration Specialists**

## 🎯 Project Summary

A modern, professional website for LawGate, featuring construction law articles, LinkedIn insights, and a contact form powered by Azure Communication Services. Built with React, TypeScript, and Azure Static Web Apps for seamless deployment and scalability.

**Live Site**: Deployed on Azure Static Web Apps  
**Repository**: `ddhruvgupta/lawgate-website`  
**Author**: Shishir Gupta - Principal, LawGate

---

## 📁 Project Structure

```
lawgate-website/
├── frontend/                  # React TypeScript application
│   ├── src/
│   │   ├── components/
│   │   │   ├── organisms/    # Complex components (Header, Footer, Carousels)
│   │   │   ├── pages/        # Page components (HomePage, InsightsPage, etc.)
│   │   │   ├── templates/    # Layout templates
│   │   │   └── ui/           # Reusable UI components (Button, Card, Input)
│   │   ├── data/
│   │   │   ├── articles/     # Modular article system (5 articles)
│   │   │   └── linkedin-posts/ # LinkedIn posts (URL-only system)
│   │   ├── utils/            # Utility functions (YouTube helpers, etc.)
│   │   └── styles/           # Global styles
│   └── public/
│       └── assets/           # Static assets (images, logos)
│
├── backend/                   # Azure Functions (Python 3.11)
│   ├── contact_form/         # Email sending function
│   └── contact_form_azure_native/ # Alternative implementation
│
├── .github/workflows/        # CI/CD pipelines
│   └── azure-static-web-apps-*.yml
│
├── docker-compose.yml        # Local development setup
├── staticwebapp.config.json  # Azure Static Web Apps config
└── *.md                      # Documentation files
```

---

## 🚀 Tech Stack

### Frontend

- **React 19.1.1** - UI framework
- **TypeScript 5.7** - Type safety
- **Vite 7.1.10** - Build tool & dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **React Router 7** - Client-side routing
- **Swiper 11** - Carousel/slider
- **Sonner** - Toast notifications
- **React Google reCAPTCHA** - Form protection

### Backend

- **Azure Functions v4** - Serverless compute
- **Python 3.11** - Runtime
- **Azure Communication Services** - Email delivery

### DevOps

- **Azure Static Web Apps** - Hosting & deployment
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Local development containers

---

## 🏗️ Key Features

### 1. **Dynamic Content Management**

#### Articles System (`frontend/src/data/articles/`)

- **5 construction law articles** by Shishir Gupta
- Modular structure: Each article in its own file
- Shared constants (author info, thumbnail)
- Helper functions: `getArticleById()`, `getPopularArticles()`
- **To add new article**: See `frontend/src/data/articles/README.md`

#### LinkedIn Posts (`frontend/src/data/linkedin-posts/`)

- **URL-only system** - Just paste LinkedIn URLs!
- Edit: `frontend/src/data/linkedin-posts/urls.ts`
- Displays on `/insights` page
- **30 seconds to add a post** - Super simple
- **To add new post**: See `frontend/src/data/linkedin-posts/README.md`

### 2. **Video Integration**

- YouTube video carousel on homepage
- Privacy-enhanced embeds (`youtube-nocookie.com`)
- Modal video player with autoplay
- Automatic thumbnail fetching (hqdefault guaranteed quality)

### 3. **Contact Form**

- Azure Communication Services integration
- reCAPTCHA v2 protection
- Toast notifications (success/error)
- Sends to: `shishir@lawgate.in`
- Backend: `backend/contact_form/__init__.py`

### 4. **Responsive Design**

- Mobile-first approach
- Tailwind CSS utilities
- Touch-friendly navigation
- Optimized images

---

## 🛠️ Development Setup

### Prerequisites

- **Node.js 22+** (for frontend)
- **Python 3.11** (for backend)
- **Docker** (for containerized development)
- **Azure CLI** (for deployment)
- **Git** (version control)

### Local Development

#### Option 1: Docker (Recommended)

```powershell
# Start both frontend and backend
docker-compose up --build

# Frontend: http://localhost:5173
# Backend: http://localhost:7071
```

#### Option 2: Manual Setup

**Frontend:**

```powershell
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

**Backend:**

```powershell
cd backend
pip install -r requirements.txt
func start
# Runs on http://localhost:7071
```

### Environment Variables

**Backend (`.env` in `backend/` directory):**

```env
AZURE_COMMUNICATION_CONNECTION_STRING=endpoint=https://...
AZURE_SENDER_EMAIL=DoNotReply@2f39662f-7048-44df-a3f6-7389b7a30a23.azurecomm.net
RECAPTCHA_SECRET_KEY=6LcCvu8rAAAAAMu3z9D5fPwK2_jMIZTEbvnElCVG
LAWGATE_EMAIL=shishir@lawgate.in
```

**GitHub Secrets (for CI/CD):**

- `AZURE_STATIC_WEB_APPS_API_TOKEN_*` (auto-created)
- `AZURE_COMMUNICATION_CONNECTION_STRING`
- `AZURE_SENDER_EMAIL`
- `RECAPTCHA_SECRET_KEY`
- `LAWGATE_EMAIL`

**Azure Static Web App (Environment Variables):**

- Same as GitHub secrets above
- Set in: Azure Portal → Static Web App → Settings → Environment Variables

---

## 🚢 Deployment

### Automatic Deployment (Recommended)

**Every push to `master` automatically deploys via GitHub Actions.**

1. Push code:

   ```powershell
   git add .
   git commit -m "Your changes"
   git push origin master
   ```

2. GitHub Actions builds and deploys automatically
3. View deployment: <https://github.com/ddhruvgupta/lawgate-website/actions>
4. Site live in ~3-5 minutes

### Manual Deployment (Backend only)

If you need to deploy just the backend:

```powershell
.\deploy-backend.ps1
# Follow prompts
```

### Deployment Guides

- **Quick Start**: `QUICK_DEPLOY.md` (5-minute guide)
- **Comprehensive**: `AZURE_DEPLOYMENT.md` (all options)
- **Checklist**: `DEPLOYMENT_CHECKLIST.md` (step-by-step)

---

## 📄 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Hero carousel, specialties, video carousel |
| `/latest-in-construction` | `LatestInConstruction` | Videos + articles with filtering |
| `/latest-in-construction/article/:id` | `ArticlePage` | Individual article view |
| `/insights` | `InsightsPage` | LinkedIn posts gallery |
| `/contact` | `ContactPage` | Contact form with reCAPTCHA |

---

## 📝 Content Management

### Adding a New Article

1. Create new file: `frontend/src/data/articles/your-article.ts`
2. Copy structure from existing article
3. Add to `index.ts` imports and `articles` array
4. See: `frontend/src/data/articles/README.md`

**Time: ~5 minutes**

### Adding LinkedIn Posts

1. Open: `frontend/src/data/linkedin-posts/urls.ts`
2. Copy LinkedIn post URL (three dots → Copy link)
3. Paste at top of array
4. Save and commit

**Time: ~30 seconds per post**

### Updating Images

**Articles Thumbnail:**

- Location: `frontend/public/assets/articles_thumbnail.png`
- Used for all articles

**LinkedIn Post Images:**

- Location: `frontend/public/assets/linkedin-posts/`
- Optional: Posts link to LinkedIn anyway

**Logo:**

- Location: `frontend/public/assets/lawgate-logo.png`
- Height: 48px (h-12)

---

## 🎨 Design System

### Colors (Tailwind Config)

- **Primary**: `#1a4d2e` (deep green)
- **Primary Dark**: `#0f2919`
- **Primary Light**: `#4caf50`

### Components

All UI components in: `frontend/src/components/ui/`

- Button
- Card
- Input
- Textarea

### Styling Patterns

- **Modular CSS**: Tailwind utilities
- **Responsive**: Mobile-first breakpoints
- **Consistent spacing**: Tailwind spacing scale
- **Typography**: Inter font family

---

## 🔧 Key Technical Decisions

### 1. YouTube Privacy-Enhanced Embeds

**Why**: `youtube-nocookie.com` avoids embedding restrictions
**File**: `frontend/src/utils/youtube.ts`
**Function**: `getYouTubeEmbedUrl()`

### 2. Thumbnail Fallback Strategy

**Issue**: `maxresdefault` returns blank image instead of 404
**Solution**: Use `hqdefault` as primary (exists for ALL videos)
**File**: `frontend/src/utils/youtube.ts`

### 3. Modular Article System

**Why**: Better maintainability than monolithic file
**Structure**: One file per article
**Location**: `frontend/src/data/articles/`

### 4. URL-Only LinkedIn Posts

**Why**: Simplest approach, append-only
**Benefit**: 30 seconds to add a post vs 5 minutes
**File**: `frontend/src/data/linkedin-posts/urls.ts`

### 5. Toast Notifications

**Why**: Better UX than `alert()`
**Library**: Sonner
**Usage**: Contact form success/error feedback

### 6. ESLint Flat Config

**Migration**: From legacy to flat config format
**File**: `frontend/eslint.config.js`
**Format**: Direct config spreading, no `extends` property

---

## 📊 Performance Considerations

- **Code Splitting**: React lazy loading
- **Image Optimization**: WebP format recommended
- **CDN**: Azure Static Web Apps includes global CDN
- **Caching**: Static assets cached automatically
- **Bundle Size**: Vite tree-shaking reduces bundle size

---

## 🐛 Common Issues & Solutions

### Issue: Videos not playing in Azure

**Solution**: Use `youtube-nocookie.com` embeds + CSP headers
**Files**: `frontend/src/utils/youtube.ts`, `staticwebapp.config.json`

### Issue: Contact form not sending emails

**Solution**: Check environment variables in Azure
**Check**: Azure Portal → Static Web App → Settings → Environment Variables

### Issue: ESLint errors after deployment

**Solution**: Use flat config format (already implemented)
**File**: `frontend/eslint.config.js`

### Issue: CORS errors on API calls

**Solution**: Azure Static Web Apps auto-proxies `/api/*` to backend
**Config**: `staticwebapp.config.json`

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `PROJECT_STATUS.md` | Overall project status |
| `QUICK_DEPLOY.md` | 5-minute deployment guide |
| `AZURE_DEPLOYMENT.md` | Comprehensive deployment docs |
| `DEPLOYMENT_CHECKLIST.md` | Step-by-step deployment |
| `COMPONENT_STATUS.md` | Component documentation |
| `CONTACT_FORM_STATUS.md` | Contact form setup |
| `RECAPTCHA_SETUP.md` | reCAPTCHA configuration |
| `DOCKER_README.md` | Docker setup guide |
| `frontend/src/data/articles/README.md` | Article management |
| `frontend/src/data/linkedin-posts/README.md` | LinkedIn posts guide |

---

## 🔐 Security

- **reCAPTCHA v2** on contact form
- **Environment variables** stored securely (Azure + GitHub Secrets)
- **HTTPS** enforced (Azure Static Web Apps)
- **CSP headers** for iframe security
- **Input validation** on backend

---

## 📈 Analytics & Monitoring

### Application Insights

- **Enabled** in `backend/host.json`
- View: Azure Portal → Function App → Application Insights
- Tracks: API calls, errors, performance

### Deployment Logs

- **GitHub Actions**: <https://github.com/ddhruvgupta/lawgate-website/actions>
- **Azure Portal**: Static Web App → Environments → Deployment history

---

## 🤝 Contributing

### Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally: `docker-compose up --build`
4. Commit: `git commit -m "Description"`
5. Push: `git push origin feature/your-feature`
6. Create PR to `master`
7. After merge, auto-deploys to production

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Flat config format
- **Formatting**: VS Code auto-format on save
- **Naming**: camelCase for variables, PascalCase for components

---

## 📞 Support & Contact

**Principal**: Shishir Gupta  
**LinkedIn**: <https://www.linkedin.com/in/shishir-anand-gupta-29468824/>  
**Email**: <shishir@lawgate.in>  
**Website**: Deployed on Azure Static Web Apps  

---

## 🎓 Learning Resources

### For Future Development

**React & TypeScript:**

- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**Tailwind CSS:**

- [Tailwind Docs](https://tailwindcss.com/docs)

**Azure:**

- [Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Functions Docs](https://docs.microsoft.com/azure/azure-functions/)

**Vite:**

- [Vite Guide](https://vitejs.dev/guide/)

---

## 📋 Quick Reference Commands

```powershell
# Development
docker-compose up --build          # Start dev environment
npm run dev                        # Frontend only
func start                         # Backend only

# Deployment
git push origin master             # Auto-deploy via GitHub Actions
.\deploy-backend.ps1              # Manual backend deployment

# Testing
npm run build                      # Build frontend
npm run preview                    # Preview production build

# Maintenance
npm install                        # Install/update dependencies
pip install -r requirements.txt   # Install backend dependencies
```

---

## 🗓️ Version History

- **v1.0** (Oct 2025) - Initial launch
  - Homepage with video carousel
  - 5 construction law articles
  - Contact form with Azure Communication Services
  - Azure Static Web Apps deployment
  
- **v1.1** (Oct 2025) - Insights page added
  - LinkedIn posts integration
  - URL-only posting system
  - Header navigation updated

---

## 📝 TODO / Future Enhancements

- [ ] Add blog/news section
- [ ] Implement search functionality
- [ ] Add testimonials section
- [ ] Create case studies page
- [ ] Add team/about page
- [ ] Implement analytics dashboard
- [ ] Add multilingual support
- [ ] Create admin panel for content management

---

## 🏆 Best Practices Implemented

✅ **TypeScript** for type safety  
✅ **Modular architecture** for maintainability  
✅ **Docker** for consistent dev environments  
✅ **CI/CD** with GitHub Actions  
✅ **Environment variables** for secrets  
✅ **Responsive design** mobile-first  
✅ **SEO-friendly** routing and meta tags  
✅ **Performance optimized** with Vite  
✅ **Security** with reCAPTCHA and CSP headers  
✅ **Documentation** comprehensive guides  

---

**Last Updated**: October 20, 2025  
**Maintained By**: GitHub Copilot & Development Team
