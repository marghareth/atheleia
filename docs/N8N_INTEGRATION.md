# n8n Integration Guide for Atheleia

This guide details how to connect the Atheleia frontend website to the n8n backend automation workflows.

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Active n8n Instance:** Cloud or self-hosted
- **Workflow Files:** Import `contact-form.json`, `chat-widget.json`, and `newsletter-subscriber.json` into your workspace
- **Credentials Configured:**
  - **OpenRouter (DeepSeek):** Header Auth (`Authorization: Bearer sk-...`)
  - **Google:** OAuth2 connection for Gmail and Google Sheets

---

## ⚠️ Critical: Test vs. Production URLs

n8n provides two types of Webhook URLs. Knowing the difference is vital for a working integration.

| URL Type | Format | When to Use |
|----------|--------|-------------|
| **Test URL** | `.../webhook-test/...` | Only works when you click **"Execute Workflow"** inside n8n. Used for debugging. |
| **Production URL** | `.../webhook/...` | Works 24/7 as long as the workflow is **Active**. **Use this for the live website.** |

> **Action:** For all steps below, ensure you copy the **Production URL** from the Webhook node, not the Test URL.

---

## 1. Contact Form Integration

This workflow handles lead generation, AI email drafting, and Google Sheet logging.

### n8n Configuration

1. **Open Workflow:** `contact-form`
2. **Webhook Node Settings:**
   - **Method:** `POST`
   - **Path:** `contact-form`
   - **Respond:** Using 'Respond to Webhook' Node (Recommended) or 'Immediately' (if no response body is needed)

### Frontend Code (`script.js`)

Add this function to handle form submissions:

```javascript
// Replace with your Production URL
const CONTACT_WEBHOOK_URL = 'https://[YOUR-N8N-DOMAIN]/webhook/contact-form';

async function submitContactForm() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch(CONTACT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Message sent! Check your inbox.");
            document.getElementById('contact-form').reset();
        } else {
            alert("Error sending message.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 2. Chat Widget Integration

This workflow sends user questions to the AI and returns a text response immediately.

### n8n Configuration

1. **Open Workflow:** `chat-widget`
2. **Webhook Node Settings:**
   - **Method:** `POST`
   - **Path:** `chat`
   - **Respond:** Using 'Respond to Webhook' Node (Crucial)
3. **Ensure Completion:** The workflow must end with a Respond to Webhook node outputting JSON

### Frontend Code (`script.js`)

```javascript
// Replace with your Production URL
const CHAT_WEBHOOK_URL = 'https://[YOUR-N8N-DOMAIN]/webhook/chat';

async function sendChatMessage(userMessage) {
    try {
        const response = await fetch(CHAT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: userMessage,
                timestamp: new Date().toISOString() 
            })
        });

        const data = await response.json();
        return data.response; // Displays this text in the chat bubble
    } catch (error) {
        console.error('Chat Error:', error);
        return "Sorry, I'm having trouble connecting right now.";
    }
}
```

---

## 3. Newsletter Integration

This workflow saves the subscriber to Google Sheets and sends a welcome email.

### n8n Configuration

1. **Open Workflow:** `newsletter-subscriber`
2. **Webhook Node Settings:**
   - **Method:** `POST`
   - **Path:** `newsletter`
   - **Response:** Ensure the workflow ends with a Respond to Webhook node returning `{ "status": "success" }`

### Frontend Code (`script.js`)

```javascript
// Replace with your Production URL
const NEWSLETTER_WEBHOOK_URL = 'https://[YOUR-N8N-DOMAIN]/webhook/newsletter';

async function joinNewsletter(email) {
    try {
        const response = await fetch(NEWSLETTER_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            alert("Thanks for subscribing!");
        }
    } catch (error) {
        console.error('Newsletter Error:', error);
    }
}
```

---

## 🛡️ CORS Configuration (Crucial)

If your website is hosted on a different domain (e.g., Vercel, Netlify) than your n8n instance, the browser will block requests by default.

**To fix CORS in n8n:**

1. Open the Webhook Node in each workflow
2. Scroll to **Options**
3. Add **Allowed Origins (CORS)**
4. Set Value to:
   - `*` (Allows all domains) OR
   - `https://your-website.com`
5. Save the workflow

---

## 🧪 Testing & Verification

Before launching, verify connections using cURL or Postman.

**Test Contact Form:**
```bash
curl -X POST https://[YOUR-N8N-DOMAIN]/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@test.com", "message": "Hello"}'
```

**Test Chat:**
```bash
curl -X POST https://[YOUR-N8N-DOMAIN]/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'
```

---

## 🔧 Troubleshooting

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| CORS Error (Red text in console) | Browser security blocking connection | Add Allowed Origins: `*` in Webhook Node Options |
| 404 Not Found | Wrong URL or Workflow inactive | Use Production URL and toggle workflow to Active (Green) |
| Chat stuck "Typing..." | No response received | Ensure chat-widget workflow ends with a Respond to Webhook node |
| 502 Bad Gateway | n8n server issue | Check if your n8n cloud instance is running/awake |

---

## 🚀 Deployment Checklist

- [ ] **Activate:** All 3 workflows are toggled to "Active" (Green switch)
- [ ] **URLs:** `script.js` is updated with Production URLs (no `webhook-test`)
- [ ] **CORS:** All Webhook nodes have Allowed Origins set to `*`
- [ ] **Database:** Google Sheets (`Atheleia - Inquiry Sheet` and `Newsletter Subscribers`) are created and headers match the nodes

---

## 📊 Workflow Architecture

### Contact Form Workflow
```
Webhook → Data Normalization → DeepSeek AI → Gmail → Google Sheets → Response
```

### Chat Widget Workflow
```
Webhook → DeepSeek AI → Respond to Webhook
```

### Newsletter Workflow
```
Webhook → Google Sheets → Gmail → Response
```

---

## 🔑 API Reference

### Contact Form Endpoint

**URL:** `https://[YOUR-N8N-DOMAIN]/webhook/contact-form`

**Method:** `POST`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

**Response:** `200 OK`
```json
{
  "status": "success",
  "message": "Email sent successfully"
}
```

### Chat Widget Endpoint

**URL:** `https://[YOUR-N8N-DOMAIN]/webhook/chat`

**Method:** `POST`

**Request Body:**
```json
{
  "message": "string",
  "timestamp": "ISO 8601 string"
}
```

**Response:** `200 OK`
```json
{
  "response": "AI-generated reply text"
}
```

### Newsletter Endpoint

**URL:** `https://[YOUR-N8N-DOMAIN]/webhook/newsletter`

**Method:** `POST`

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:** `200 OK`
```json
{
  "status": "success"
}
```