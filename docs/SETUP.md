# Setup Guide

This guide provides instructions for setting up and running the Atheleia landing page locally for testing and evaluation purposes.

---

## Prerequisites

Before beginning, ensure you have the following:

**Required:**
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Code editor (VS Code, Sublime Text, or similar)
- Git for version control
- n8n account (cloud or self-hosted instance)

**Optional:**
- Node.js (for running local development server)
- Python (alternative for local server)

---

## Installation

### Option 1: View Live Website (Fastest)

Simply visit the deployed website:

**Live URL:** [Insert your deployed website URL here]

This is the quickest way to test the functionality without any setup.

### Option 2: Download and Run Locally

1. **Download the repository:**
   - Click the green "Code" button on GitHub
   - Select "Download ZIP"
   - Extract the ZIP file to your desired location

2. **Open the website:**
   - Navigate to the extracted folder
   - Double-click `index.html`
   - The website will open in your default browser

**Alternative - Clone with Git:**
```bash
git clone https://github.com/yourusername/atheleia.git
cd atheleia
```
Then double-click `index.html` to open.

### Project Structure

```
atheleia/
├── index.html              # Main HTML file (open this)
├── style.css               # Stylesheet
├── script.js               # JavaScript functionality
├── README.md               # Project documentation
├── assets/                 # Image assets
├── n8n-workflows/          # n8n workflow JSON files
└── docs/                   # Documentation
    ├── SETUP.md
    ├── N8N_INTEGRATION.md
    └── PROJECT_APPROACH.md
```

**Note:** All functionality (contact form, chat widget, newsletter) works immediately after opening `index.html` as the n8n webhooks are already configured and active.

> ⚠️ **Important:** The n8n instance used for this project is on a 14-day free trial. After the trial period expires, the backend automation features (contact form submissions, AI chat responses, and newsletter subscriptions) will no longer be functional. This setup was created specifically for the tryout task evaluation period. For production use, a permanent n8n instance would be required.

---

## n8n Configuration

### Step 1: Set Up n8n Instance

**Cloud Option (Recommended for Testing):**
1. Create an account at [n8n.cloud](https://n8n.cloud)
2. Create a new workspace
3. Proceed to Step 2

**Self-Hosted Option:**
```bash
# Using Docker
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```
Access at: `http://localhost:5678`

### Step 2: Import Workflows

1. Navigate to your n8n instance
2. Import the following workflow files from `/n8n-workflows/`:
   - `contact-form.json`
   - `chat-widget.json`
   - `newsletter-subscriber.json`
3. Activate each workflow (toggle to "Active" status)

### Step 3: Configure Credentials

Set up the following credentials in n8n:

**OpenRouter (DeepSeek AI):**
- Type: Header Auth
- Name: Authorization
- Value: `Bearer [your-api-key]`

**Google (Gmail & Sheets):**
- Type: OAuth2
- Follow n8n's Google OAuth setup instructions

### Step 4: Update Webhook URLs

After activating workflows, copy the **Production URLs** (not Test URLs).

**Update in `script.js`:**
```javascript
// Line 352 (approximate)
const CONTACT_WEBHOOK_URL = 'https://[YOUR-N8N-DOMAIN]/webhook/contact-form';
const CHAT_WEBHOOK_URL = 'https://[YOUR-N8N-DOMAIN]/webhook/chat';
const NEWSLETTER_WEBHOOK_URL = 'https://[YOUR-N8N-DOMAIN]/webhook/newsletter';
```

**Important:** Ensure CORS is configured in n8n webhook nodes:
- Open each Webhook node
- Navigate to Options → Allowed Origins
- Set to `*` or your specific domain

Detailed configuration instructions are available in [N8N_INTEGRATION.md](N8N_INTEGRATION.md).

---

## Testing the Integration

### 1. Contact Form Test

1. Navigate to the Contact Us section
2. Fill in all required fields (Name, Email, Message)
3. Click "Send Message"
4. Verify:
   - Success message appears
   - Email is received at the provided address
   - Data is logged in Google Sheets (if configured)

### 2. Chat Widget Test

1. Click the chat widget button (bottom right)
2. Type a sample message
3. Verify:
   - AI response is received
   - Response appears in chat bubble
   - Response time is under 5 seconds

### 3. Newsletter Test

1. Scroll to the footer
2. Enter an email address in the newsletter form
3. Click subscribe
4. Verify:
   - Success message appears
   - Welcome email is received
   - Email is added to Google Sheets

### 4. Browser Compatibility

Test the site on the following browsers:
- Chrome/Chromium (latest version)
- Firefox (latest version)
- Safari (latest version)
- Edge (latest version)

### 5. Responsive Design

Test on various screen sizes:
- Mobile: 375px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px and above

---

## Troubleshooting

### Common Issues and Solutions

**CORS Error in Console:**
- **Cause:** Webhook node not configured for cross-origin requests
- **Solution:** Add `*` to Allowed Origins in n8n Webhook node options

**404 Not Found on Form Submission:**
- **Cause:** Incorrect webhook URL or inactive workflow
- **Solution:** Verify Production URL is used and workflow is Active (green toggle)

**Chat Widget Shows "Typing..." Indefinitely:**
- **Cause:** Workflow does not include Respond to Webhook node
- **Solution:** Ensure chat-widget workflow ends with Respond to Webhook node

**Images Not Loading:**
- **Cause:** Incorrect file paths or missing assets
- **Solution:** Verify all files are in `/assets/` directory and paths are correct

**Form Validation Not Working:**
- **Cause:** JavaScript errors in browser console
- **Solution:** Check browser console (F12) for errors and verify `script.js` is loaded

---

## Verification Checklist

Before considering setup complete, verify the following:

- [ ] Local development server is running successfully
- [ ] All three n8n workflows are imported and activated
- [ ] Webhook URLs are updated in `script.js`
- [ ] CORS is configured in all webhook nodes
- [ ] Contact form successfully sends test submission
- [ ] Chat widget returns AI-generated responses
- [ ] Newsletter subscription works and sends welcome email
- [ ] All images load correctly
- [ ] Site is responsive on mobile, tablet, and desktop
- [ ] No JavaScript errors in browser console

---

## Next Steps

After successful setup and testing:

1. Review [N8N_INTEGRATION.md](N8N_INTEGRATION.md) for detailed workflow documentation
2. Read [PROJECT_APPROACH.md](PROJECT_APPROACH.md) for development methodology and learnings
3. Customize content and branding as needed
4. Deploy to production environment (if applicable)

---

## Additional Resources

- **n8n Documentation:** [docs.n8n.io](https://docs.n8n.io)
- **n8n Community:** [community.n8n.io](https://community.n8n.io)
- **DeepSeek API:** [platform.deepseek.com](https://platform.deepseek.com)

---

## Support

For issues specific to this project:
- Check the browser console for JavaScript errors
- Review n8n execution logs for workflow failures
- Verify all webhook URLs are production URLs (not test URLs)
- Ensure all credentials are properly configured in n8n

**Contact:** buenomarghareth@gmail.com