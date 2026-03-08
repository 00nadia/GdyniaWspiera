# 🤝 Gdynia Wspiera - Social Support Platform

> **Your trusted guide to verified, free social support in Gdańsk**

A comprehensive platform connecting people in need with free, verified social, psychological, and legal support services in Gdańsk. Gdynia Wspiera makes it simple to find help when life gets difficult.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Contributing](#contributing)

---

## 📖 About the Project

**Gdynia Wspiera** is a social support discovery platform designed for residents of Gdańsk and visitors who need psychological, legal, and social assistance. The platform aggregates verified, up-to-date offers from support organizations and makes them easily accessible to those seeking help.

### Mission

To ensure that access to essential support services is never complicated or costly. We believe everyone deserves access to reliable help when they need it most.

### Why Trust Us?

- ✅ **Verified Offers** - All support services are carefully verified and current
- 🆓 **Completely Free** - No hidden fees, no charges
- 🌍 **Multi-language** - Available in Polish and Ukrainian
- 🔒 **Privacy First** - All user information remains confidential
- 🤝 **Community-driven** - Built collaboratively with local organizations

---

## ✨ Key Features

### For People Seeking Help

- **📍 Smart Search** - Find support by problem type, service category, or organization name
- **🗺️ Map View** - Visualize support services locations across Gdańsk
- **📂 Organized Categories** - Browse services by support type (psychological, legal, social, etc.)
- **🏷️ Filtering** - Narrow down results using multiple filters
- **💬 Problem Submission** - Describe your situation to receive personalized recommendations
- **ℹ️ Detailed Offers** - Comprehensive information about each support service

### For People Wanting to Help

- **🙋 Volunteer Opportunities** - Explore ways to contribute to the community
- **📚 Internship Programs** - Professional development while helping others
- **🤝 Collaboration Options** - Partner with local organizations

### Platform Features

- **🌐 Multilingual Interface** - Full support for Polish and Ukrainian
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **♿ Accessibility** - Built with WCAG accessibility standards
- **⚡ Fast Performance** - Quick loading times and smooth navigation
- **🔐 Secure Backend** - PostgreSQL database with secure API

---

## 🛠️ Tech Stack

### Frontend
- **[SvelteKit](https://kit.svelte.dev/)** - Modern, fast web framework
- **[Svelte](https://svelte.dev/)** - Reactive component framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Next-generation build tool

### Backend
- **[Go](https://golang.org/)** - Fast, efficient server runtime
- **[PostgreSQL](https://www.postgresql.org/)** - Reliable relational database
- **Standard Library** - HTTP and database handling

---

## 📂 Project Structure

```
GdyniaWspiera/
├── client/                 # Legacy client application
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── frontend/              # Main frontend application (SvelteKit)
│   ├── src/
│   │   ├── routes/       # Page routes
│   │   │   ├── +page.svelte       # Home page
│   │   │   ├── offers/             # Offers browsing
│   │   │   ├── help-others/        # Ways to contribute
│   │   │   ├── submit-problem/     # Problem submission
│   │   │   ├── about/              # About page
│   │   │   ├── contact/            # Contact page
│   │   │   └── how-to-use/         # User guide
│   │   ├── lib/          # Shared utilities and components
│   │   │   ├── i18n/     # Internationalization (Polish, Ukrainian)
│   │   │   ├── components/
│   │   │   └── stores/
│   │   └── app.html
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── package.json
├── server/               # Backend API (Go)
│   ├── main.go          # Server entry point
│   ├── Dockerfile
│   └── go.mod
├── postgres/            # PostgreSQL database data
├── docker-compose.yml   # Multi-container setup
└── README.md           # This file
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Go](https://golang.org/) (v1.19+ recommended)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GdyniaWspiera
   ```

2. **Start all services**
   ```bash
   docker-compose up
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:4000

### Running Locally (Development)

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Opens at http://localhost:5173

#### Backend
```bash
cd server
go run main.go
```
Runs on http://localhost:4000

#### Database

PostgreSQL runs on localhost:5432

### Environment Variables

Create a `.env` file or update `docker-compose.yml`:

```env
# Server
HTTP_PORT=4000
LOG_LEVEL=debug

# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=pass
POSTGRES_DB=testdb
DB_HOST=localhost
DB_PORT=5432
```

---

## 💻 Development

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Linting
npm run lint
```

### Backend Development

```bash
cd server

# Run server with hot reload (requires air: https://github.com/cosmtrek/air)
air

# Or run directly
go run main.go

# Build executable
go build -o gdynia-wspiera
```

### Database

Connect to PostgreSQL:
```bash
psql -h localhost -U postgres -d testdb
```

---

## 📸 Features Showcase

### Home Page
- Hero section explaining the mission
- Support categories overview
- Quick search bar
- Information sections about the platform
- Call-to-action buttons

### Offers Directory
- Browse all verified support services
- Filter by category, organization, or type
- View detailed information for each offer
- Map visualization of service locations
- Contact information and hours

### Problem Submission
- User-friendly form to describe situations
- Confidential problem submission
- Personalized recommendations based on input

### Volunteer Opportunities
- Discover ways to contribute
- View internship positions
- Learn about partnerships

---

## 🌍 Supported Languages

- 🇵🇱 **Polish** (Język polski)
- 🇺🇦 **Ukrainian** (Українська мова)
- 🇬🇧 **English**

---

## 📝 License

This project is part of a hackathon initiative focused on community support and social welfare.

---

## 🤝 Contributing

We welcome contributions from developers, designers, and community members!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write clear commit messages
- Test your changes locally
- Update documentation as needed

---

## 📞 Contact & Support

- **Email**: [contact information]
- **Website**: [website URL]
- **GitHub Issues**: Report bugs and request features
- **Discord/Slack**: [community channel if available]

---

## 🙏 Acknowledgments

- Built with ❤️ for the community of Gdynia
- Thanks to all support organizations providing services
- Dedicated to everyone seeking help and those willing to help

---

**Gdynia Wspiera** - Because everyone deserves access to help when they need it. 🤝


