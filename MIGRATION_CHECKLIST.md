# Migration Checklist - Course Library Project

## Pre-Migration Preparation (Current Machine)

### ✅ Phase 1: Backup Current State
- [ ] **Commit all changes to Git**
  ```bash
  git add .
  git commit -m "Pre-migration backup: Complete project state"
  git push origin main
  ```

- [ ] **Create project archive**
  - [ ] Export complete project folder
  - [ ] Include all hidden files (.env, .gitignore, etc.)
  - [ ] Upload to cloud storage (Google Drive, OneDrive, etc.)

- [ ] **Document environment variables**
  - [ ] List all API keys (without values)
  - [ ] Create `.env.example` template
  - [ ] Store actual values in secure location

- [ ] **Export system information**
  - [ ] Save this migration checklist
  - [ ] Export development setup documentation
  - [ ] Create project context documentation

---

## New Machine Setup (Target Machine)

### ✅ Phase 2: Install Core Software

#### Required Software Installation
- [ ] **Node.js v22.11.0**
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
  - Expected output: `v22.11.0`

- [ ] **Git (Latest Version)**
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`
  - Expected: `git version 2.47.0.2` or newer

- [ ] **VS Code (Optional)**
  - Download from: https://code.visualstudio.com/
  - Install extensions as needed

- [ ] **Cursor Editor (Recommended)**
  - Download from: https://cursor.sh/
  - This is the primary development environment

#### Verify Installation
```bash
# Check Node.js and npm
node --version    # Should output: v22.11.0
npm --version     # Should output: 10.9.0 or newer

# Check Git
git --version     # Should show version 2.47.0.2 or newer

# Check PATH (Windows PowerShell)
echo $env:PATH   # Should include Node.js and Git paths
```

### ✅ Phase 3: Install Global Packages

```bash
# Install required global packages
npm install -g dotenv-cli@8.0.0
npm install -g netlify-cli@19.0.3  
npm install -g svg2png-cli@1.1.1

# Verify installation
npm list -g --depth=0
```

Expected output:
```
├── dotenv-cli@8.0.0
├── netlify-cli@19.0.3
├── svg2png-cli@1.1.1
```

### ✅ Phase 4: Clone and Setup Project

#### Clone Repository
```bash
# Navigate to desired directory
cd C:\Users\[YourUsername]\Desktop\

# Clone the repository
git clone [YOUR_REPO_URL] course-library
cd course-library
```

#### Install Project Dependencies
```bash
# Install all npm dependencies
npm install

# This should install all packages from package.json
```

#### Setup Environment Variables
- [ ] **Create `.env` file in project root**
- [ ] **Add required API keys:**
  ```env
  ANTHROPIC_API_KEY=your_anthropic_key_here
  PERPLEXITY_API_KEY=your_perplexity_key_here
  # Add other keys as needed
  ```

#### Verify Taskmaster Configuration
- [ ] **Check `.taskmasterconfig` exists**
- [ ] **Verify AI model settings**
- [ ] **Test Taskmaster integration**

### ✅ Phase 5: Test Development Environment

#### Start Development Server
```bash
# Start the development server
npm run dev
```

**Expected Results:**
- [ ] Server starts on port 3001 (or 3000 if available)
- [ ] No critical errors in console
- [ ] Application loads in browser
- [ ] Hot reload works

#### Verify Core Functionality
- [ ] **Home page loads** (`http://localhost:3001/`)
- [ ] **Course pages work** (`/course/[id]`)
- [ ] **Navigation components function**
- [ ] **Typography demo accessible** (`/typography-demo`)

#### Test Build Process
```bash
# Test production build
npm run build

# Start production server
npm start
```

### ✅ Phase 6: Development Tools Setup

#### Cursor Editor Configuration
- [ ] **Install Cursor editor**
- [ ] **Configure AI assistant**
- [ ] **Import any custom settings**
- [ ] **Test AI integration**

#### VS Code Setup (if using)
- [ ] **Install recommended extensions**
- [ ] **Import settings**
- [ ] **Configure TypeScript support**

#### Git Configuration
```bash
# Configure Git user (if not already done)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## Troubleshooting Guide

### Common Issues and Solutions

#### Port Conflicts
- **Problem:** Port 3000 already in use
- **Solution:** Next.js automatically uses port 3001
- **Command:** `npm run dev` (will auto-select available port)

#### Permission Errors
- **Problem:** EPERM errors during development
- **Solution:** Run terminal as administrator (Windows)
- **Alternative:** Clear .next cache: `rm -rf .next`

#### Module Installation Issues
- **Problem:** npm install fails
- **Solution:** Clear npm cache: `npm cache clean --force`
- **Alternative:** Delete node_modules and reinstall: `rm -rf node_modules && npm install`

#### Git SSH Issues
- **Problem:** Git push/pull fails
- **Solution:** Setup SSH keys or use HTTPS URLs
- **Guide:** Follow GitHub SSH key setup guide

### Performance Optimization
- **Initial compilation:** ~16.5s (normal for 1428 modules)
- **Hot reload:** 3-6s typical recompilation time
- **Memory usage:** Monitor during development

---

## Post-Migration Verification

### ✅ Final Checklist

#### Development Environment
- [ ] **All software installed correctly**
- [ ] **Global packages available**
- [ ] **Environment variables configured**
- [ ] **Development server runs without errors**

#### Project Functionality
- [ ] **All pages load correctly**
- [ ] **Navigation works properly**
- [ ] **Components render as expected**
- [ ] **TypeScript compilation successful**

#### AI Integration
- [ ] **Taskmaster AI configured**
- [ ] **API keys working**
- [ ] **Cursor editor AI assistant active**
- [ ] **Task management functional**

#### Version Control
- [ ] **Git repository cloned**
- [ ] **All branches available**
- [ ] **Can commit and push changes**
- [ ] **Remote repository connected**

### Success Criteria
✅ **Development server starts without errors**  
✅ **Application loads in browser**  
✅ **Hot reload functionality works**  
✅ **All components render correctly**  
✅ **TypeScript compilation passes**  
✅ **AI tools integrated and functional**  

---

## Additional Resources

### Important Files Location
- **Project root:** `C:\Users\[YourUsername]\Desktop\course-library`
- **Configuration:** `.taskmasterconfig`, `package.json`, `tsconfig.json`
- **Environment:** `.env` (create from `.env.example`)
- **Documentation:** `DEVELOPMENT_SETUP.md`, `PROJECT_CONTEXT.md`

### Support Documentation
- **Development Setup:** `DEVELOPMENT_SETUP.md`
- **Project Context:** `PROJECT_CONTEXT.md`
- **Next.js Documentation:** https://nextjs.org/docs
- **Material-UI Documentation:** https://mui.com/
- **Taskmaster Documentation:** Internal tool documentation

### Emergency Contacts
- **Previous development environment:** Document any team contacts
- **Repository access:** Ensure access to Git repository
- **API key access:** Secure storage of sensitive credentials

---

**Migration Date:** _____________  
**Completed By:** _____________  
**Status:** [ ] In Progress [ ] Complete [ ] Issues Found

**Notes:**
_________________________________
_________________________________
_________________________________ 