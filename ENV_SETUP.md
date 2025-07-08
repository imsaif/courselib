# Environment Variables Setup Guide

## Overview
This guide helps you set up environment variables for the Course Library project on your new machine.

## Required Environment Variables

### For CLI Usage (`.env` file in project root)
Create a `.env` file in your project root directory with the following structure:

```env
# Anthropic API (Claude AI) - Required for Taskmaster AI
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Perplexity API (Research AI) - Required for Taskmaster research features
PERPLEXITY_API_KEY=your_perplexity_api_key_here

# OpenAI API (Optional) - If using OpenAI models
OPENAI_API_KEY=your_openai_api_key_here

# Google AI API (Optional) - If using Google models
GOOGLE_API_KEY=your_google_api_key_here

# Mistral API (Optional) - If using Mistral models
MISTRAL_API_KEY=your_mistral_api_key_here

# OpenRouter API (Optional) - If using OpenRouter models
OPENROUTER_API_KEY=your_openrouter_api_key_here

# xAI API (Optional) - If using xAI models
XAI_API_KEY=your_xai_api_key_here

# Azure OpenAI (Optional) - If using Azure OpenAI
AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/

# Ollama (Optional) - If using local Ollama models
OLLAMA_API_KEY=your_ollama_api_key_here
OLLAMA_BASE_URL=http://localhost:11434/api
```

### For MCP/Cursor Usage (`.cursor/mcp.json` file)
If using Cursor editor with MCP integration, add the API keys to the `env` section of your `.cursor/mcp.json` file:

```json
{
  "env": {
    "ANTHROPIC_API_KEY": "your_anthropic_api_key_here",
    "PERPLEXITY_API_KEY": "your_perplexity_api_key_here"
  }
}
```

## Current Configuration
Based on your `.taskmasterconfig` file, you're currently using:

- **Primary Model:** Claude 3.5 Sonnet (Anthropic) - **Requires ANTHROPIC_API_KEY**
- **Research Model:** Sonar Pro (Perplexity) - **Requires PERPLEXITY_API_KEY**
- **Fallback Model:** Claude 3.5 Sonnet (Anthropic) - **Uses ANTHROPIC_API_KEY**

## Setup Steps

### Step 1: Create .env file
1. Navigate to your project root directory
2. Create a new file named `.env` (no extension)
3. Add the required API keys as shown above

### Step 2: Secure API Keys
1. **Never commit .env files to version control**
2. Store API keys in a secure password manager
3. Use different keys for development and production if possible

### Step 3: Verify Setup
Test your environment variables:

```bash
# Test if variables are loaded (Windows PowerShell)
echo $env:ANTHROPIC_API_KEY

# Or use dotenv-cli to test
npx dotenv-cli node -e "console.log(process.env.ANTHROPIC_API_KEY)"
```

## Getting API Keys

### Anthropic (Claude AI)
1. Visit: https://console.anthropic.com/
2. Create an account or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### Perplexity (Research AI)
1. Visit: https://www.perplexity.ai/
2. Sign up for Pro account
3. Access API settings
4. Generate API key
5. Copy the key to your `.env` file

### Other Providers (Optional)
Follow similar processes for other AI providers if needed.

## Security Best Practices

### Do NOT:
- Commit `.env` files to Git
- Share API keys in chat or email
- Use production keys in development
- Store keys in plain text files

### DO:
- Use environment variables for all secrets
- Rotate API keys regularly
- Use different keys for different environments
- Store keys in secure password managers

## Troubleshooting

### Common Issues

#### API Key Not Found
- **Problem:** Environment variable not loading
- **Solution:** Check file name is exactly `.env` (no extension)
- **Verify:** File is in project root directory

#### Permission Denied
- **Problem:** API key rejected by service
- **Solution:** Verify key is correct and account has credits
- **Check:** API key hasn't expired

#### Module Loading Issues
- **Problem:** dotenv not loading variables
- **Solution:** Ensure dotenv-cli is installed globally
- **Command:** `npm install -g dotenv-cli@8.0.0`

## Migration Checklist

### Before Migration (Current Machine)
- [ ] **Document which API keys are currently in use**
- [ ] **Note which services you have accounts with**
- [ ] **Export API keys to secure storage**
- [ ] **Document any custom endpoints or configurations**

### After Migration (New Machine)
- [ ] **Create `.env` file in project root**
- [ ] **Add required API keys from secure storage**
- [ ] **Test environment variable loading**
- [ ] **Verify Taskmaster AI functionality**
- [ ] **Test all AI integrations**

## Template Files

### .env Template
```env
# Copy this template and fill in your actual API keys
ANTHROPIC_API_KEY=sk-ant-api03-...
PERPLEXITY_API_KEY=pplx-...
```

### .gitignore Verification
Make sure your `.gitignore` file includes:
```gitignore
.env
.env.local
.env.production
.env.test
```

---

**Important:** Always keep your API keys secure and never share them publicly. If you accidentally commit API keys to version control, revoke them immediately and generate new ones.

**Last Updated:** December 2024 