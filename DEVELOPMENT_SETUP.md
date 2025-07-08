# Development Setup Documentation

## Course Library Project - Development Environment

**Created:** December 2024  
**OS:** Microsoft Windows 10 Pro (Build 19045)  
**Project Location:** `C:\Users\Imran Mohammed\Desktop\course-library`

---

## System Requirements

### Operating System
- **OS Name:** Microsoft Windows 10 Pro
- **OS Version:** 10.0.19045 N/A Build 19045
- **Architecture:** 64-bit (assumed)
- **User Profile:** `C:\Users\Imran Mohammed`

### Development Tools

#### Node.js Environment
- **Node.js Version:** v22.11.0
- **npm Version:** 10.9.0
- **npm Global Path:** `C:\Users\Imran Mohammed\AppData\Roaming\npm`

#### Code Editors
- **VS Code:** Installed at `C:\Users\Imran Mohammed\AppData\Local\Programs\Microsoft VS Code\bin`
- **Cursor Editor:** Installed at `C:\Users\Imran Mohammed\AppData\Local\Programs\cursor\resources\app\bin`

#### Version Control
- **Git:** Version 2.47.0.2
- **Location:** `C:\Program Files\Git\cmd\git.exe`

### System PATH
```
C:\Windows\system32
C:\Windows
C:\Windows\System32\Wbem
C:\Windows\System32\WindowsPowerShell\v1.0\
C:\Windows\System32\OpenSSH\
C:\Program Files\Git\cmd
C:\Program Files\nodejs\
C:\Users\Imran Mohammed\AppData\Local\Microsoft\WindowsApps
C:\Users\Imran Mohammed\AppData\Roaming\npm
C:\Users\Imran Mohammed\AppData\Local\Programs\Microsoft VS Code\bin
C:\Users\Imran Mohammed\AppData\Local\Programs\cursor\resources\app\bin
```

---

## Global npm Packages

The following packages are installed globally:

```json
{
  "dotenv-cli": "8.0.0",
  "netlify-cli": "19.0.3", 
  "svg2png-cli": "1.1.1"
}
```

### Package Descriptions
- **dotenv-cli:** Command line tool for loading .env files
- **netlify-cli:** Netlify's official CLI tool for deployment
- **svg2png-cli:** Command line tool for converting SVG to PNG

---

## Project Configuration

### Next.js Application
- **Framework:** Next.js 14.2.30
- **Development Server:** Runs on port 3001 (3000 was occupied)
- **TypeScript:** v5.3.3
- **React:** v18.2.0

### AI Task Management
- **Tool:** Taskmaster AI
- **Configuration File:** `.taskmasterconfig`
- **Primary AI Model:** Claude 3.5 Sonnet (Anthropic)
- **Research Model:** Sonar Pro (Perplexity)
- **Fallback Model:** Claude 3.5 Sonnet (Anthropic)

---

## Development Server Notes

### Known Issues
- **Cache Warnings:** Webpack caching issues observed during development
- **Port Conflicts:** Default port 3000 was occupied, using 3001
- **File System Permissions:** Some EPERM errors with .next directory

### Performance Observations
- **Initial Compilation:** ~16.5s for 1428 modules
- **Hot Reloads:** 3-6s typical recompilation time
- **Build Output:** 1596-1599 modules in production builds

---

## Migration Prerequisites

### Required Software
1. **Node.js v22.11.0** (or compatible LTS version)
2. **npm v10.9.0** (or latest)
3. **Git 2.47.0.2** (or latest)
4. **VS Code** (recommended)
5. **Cursor Editor** (AI-powered development)

### Global Package Installation
```bash
npm install -g dotenv-cli@8.0.0
npm install -g netlify-cli@19.0.3
npm install -g svg2png-cli@1.1.1
```

### Environment Variables Setup
- Create `.env` file in project root
- Configure API keys for:
  - Anthropic (Claude AI)
  - Perplexity (Research AI)
  - Any other services used

---

## Setup Instructions for New Machine

1. **Install Node.js v22.11.0**
2. **Install Git**
3. **Install VS Code and/or Cursor**
4. **Clone the repository**
5. **Install global packages** (see above)
6. **Navigate to project directory**
7. **Run `npm install`**
8. **Copy environment variables**
9. **Start development server with `npm run dev`**

---

## Additional Notes

- **Development primarily done in Cursor editor** with AI assistance
- **Taskmaster AI integration** for project management
- **Material-UI (MUI)** for component library
- **TypeScript** for type safety
- **ESLint** for code quality

**Last Updated:** December 2024 