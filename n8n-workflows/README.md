# Atheleia: AI Automation System (n8n)

This repository contains the backend automation workflows for **Atheleia**, a digital marketing agency website. 

The system utilizes **n8n** to orchestrate interactions between the website frontend, **DeepSeek AI** (via OpenRouter), **Google Sheets**, and **Gmail**.

> **⚠️ IMPORTANT NOTICE: Free Trial Limitation** > This project is currently hosted on a **14-day free trial** of n8n Cloud.  
> **After the trial expires**, the Production URLs listed below will stop working, and the Contact Form, Chat Widget, and Newsletter features on the website will cease to function unless the n8n instance is upgraded or migrated to a self-hosted server.

---

## 📂 Included Workflows

| File Name | Description |
| :--- | :--- |
| **`contact-form.json`** | Handles "Contact Us" submissions, AI email replies, and lead logging. |
| **`chat-widget.json`** | Backend for the website's AI chatbot (Context-aware Q&A). |
| **`newsletter-subscriber.json`** | Manages newsletter signups and "Welcome" emails. |

---

## 🛠️ Installation & Setup Guide

### Step 1: Import Workflows into n8n
1.  Download the `.json` files from this repository.
2.  Open your **n8n** dashboard.
3.  Click **Workflows** (top right) > **Import from File**.
4.  Select the JSON files to load the nodes.

### Step 2: Connect the Nodes (Wiring)
If the nodes are not automatically connected after importing, follow these wiring diagrams:

#### 1. Contact Form Workflow
* **Webhook** (Output) → Connect to → **Edit Fields** (Input)
* **Edit Fields** (Output) → Connect to → **HTTP Request** (Input)
* **HTTP Request** (Output) → Connect to → **Code** (Input)
* **Code** (Output) → Connect to → **Gmail** (Input)
* **Gmail** (Output) → Connect to → **Google Sheets** (Input)

#### 2. Chat Widget Workflow
* **Webhook** (Output) → Connect to → **Edit Fields** (Input)
* **Edit Fields** (Output) → Connect to → **HTTP Request** (Input)
* **HTTP Request** (Output) → Connect to → **Respond to Webhook** (Input)

#### 3. Newsletter Workflow
* **Webhook** (Output) → Connect to → **Google Sheets** (Input)
* **Google Sheets** (Output) → Connect to → **Gmail** (Input)
* **Gmail** (Output) → Connect to → **Respond to Webhook** (Input)

### Step 3: Configure Credentials
You must set up the following credentials in n8n for the nodes to function:

1.  **OpenRouter API (DeepSeek):**
    * In the **HTTP Request** node, select Authentication: **Header Auth**.
    * **Name:** `Header Auth account`
    * **Key:** `Authorization`
    * **Value:** `Bearer YOUR_OPENROUTER_API_KEY`

2.  **Google Services (OAuth2):**
    * In **Gmail** and **Google Sheets** nodes, select **Google OAuth2**.
    * Follow the prompt to sign in with your Google Account to authorize email sending and spreadsheet editing.

### Step 4: Database Setup (Google Sheets)
Create two spreadsheets in your Google Drive and map them in the Google Sheets nodes:

* **Sheet 1:** `Atheleia - Inquiry Sheet`
    * **Columns:** `Name` | `Email` | `Date` | `Message / Summary` | `Status`
* **Sheet 2:** `Newsletter Subscribers`
    * **Columns:** `Email` | `Date`

---

## ⚙️ How It Works

### 1. Contact Form Automation
* **Trigger:** The website sends a `POST` request with the user's `name`, `email`, and `message`.
* **AI Processing:** DeepSeek-V3 receives the message with a "Customer Service" system prompt and generates a professional HTML response.
* **Action:** 1.  A "Code" node merges the AI text with the user's name.
    2.  Gmail sends the reply to the user.
    3.  Google Sheets logs the inquiry as "New".

### 2. AI Chat Widget
* **Trigger:** The chat bubble sends a `POST` request with the user's `message`.
* **AI Processing:** DeepSeek-V3 analyzes the question against the "Company Knowledge" system prompt (Services, Pricing, Results). It is instructed to reply in plain text without Markdown.
* **Action:** The `Respond to Webhook` node sends the text answer back to the website immediately.

### 3. Newsletter Signup
* **Trigger:** User enters email in the footer.
* **Action:** 1.  Google Sheets saves the email.
    2.  Gmail sends a pre-written "Welcome to the Insider List" HTML email.
    3.  The frontend receives a success signal to show an alert.

---

## 💻 Frontend Integration Code

Add these snippets to your website's `script.js`. Replace `YOUR_N8N_URL` with the **Production URL** found in the Webhook node of each workflow.

```javascript
// --- 1. CONTACT FORM ---
async function submitContactForm() {
    const webhookUrl = "https://YOUR_N8N_INSTANCE/webhook/contact-form"; 

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    
    alert("Message sent! Check your inbox for a confirmation.");
}

// --- 2. CHAT WIDGET ---
async function sendChatMessage(userMessage) {
    const webhookUrl = "https://YOUR_N8N_INSTANCE/webhook/chat";

    const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    const result = await response.json();
    return result.response; // Displays AI answer
}

// --- 3. NEWSLETTER ---
async function joinNewsletter(email) {
    const webhookUrl = "https://YOUR_N8N_INSTANCE/webhook/newsletter";

    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email })
    });

    alert("Thanks for subscribing!");
}