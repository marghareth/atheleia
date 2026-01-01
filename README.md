# Atheleia - Digital Marketing Agency Landing Page

<div align="center">

![Atheleia Banner](https://img.shields.io/badge/Atheleia-Digital%20Marketing-FF6B9D?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](atheleia-landing-page.netlify.app)

**Tryout Task Submission | Tidal Solutions 2026**

[View Live Demo](https://atheleia-landing-page.netlify.app/)

</div>

---

## 📋 Overview

A fully functional digital marketing agency landing page with integrated n8n automation workflows and AI-powered responses. Built as part of the Tidal Solutions internship application process.

**Key Features:**
- Professional landing page with glassmorphism design
- Contact form with n8n automation and AI email responses
- AI-powered chat widget for real-time customer support
- Newsletter subscription with automated confirmation
- Fully responsive and mobile-optimized

---

## ✅ Task Compliance

### Landing Page ✓
- Hero section with company branding and value proposition
- Services overview section
- Results/testimonials showcase
- Contact form with validation

### Form Integration ✓
- Connected to n8n webhook for real-time data processing
- Client-side validation with error handling
- Success/error notifications

### n8n Automation Workflow ✓
- **Contact Form:** Captures submissions, generates AI responses, sends emails
- **Chat Widget:** Real-time AI assistance for website visitors
- **Newsletter:** Automated subscription confirmation emails

### AI Response Generation ✓
- Acknowledges user inquiries
- Professional and friendly tone
- Informs users about follow-up timeline
- Personalized based on user input

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3 (Glassmorphism, Animations)
- Vanilla JavaScript (ES6+)

**Backend & Automation:**
- n8n Cloud Workflows
- Openrouter - Deepseek AI (via n8n HTTP Request)

**Deployment:**
- [Netlify]

---

## 🚀 Quick Start

### View Live Demo
Visit the deployed website: [atheleia-landing-page.netlify.app]

### Run Locally
```bash
# Clone repository
git clone https://github.com/marghareth/atheleia.git
cd atheleia

# Open in browser
open index.html
# or use a local server
python -m http.server 8000
```

### Configure n8n Webhooks
Update webhook URLs in the following files:

**Contact Form** (`index.html` line 221):
```html
action="https://atheleia.app.n8n.cloud/webhook/contact-form"
```

**Chat Widget** (`script.js` line ~580):
```javascript
const CHAT_WEBHOOK_URL = 'https://atheleia.app.n8n.cloud/webhook/chat';
```

---

## 🔄 n8n Workflow Architecture

### 1. Contact Form Workflow
```
User Submission → Webhook → Data Processing → AI → Email (User) → Email (Team) → Google Sheets
```

**Nodes:**
- Webhook (receives form data)
- Set (formats data)
- HTTP Request (Gemini AI response generation)
- Gmail (sends email to user)
- Gmail (notifies internal team)
- Google Sheets (logs submissions)

### 2. Chat Widget Workflow
```
User Message → Webhook → Data Processing → AI → Response
```

**Nodes:**
- Webhook (receives chat messages)
- Set (formats message data)
- HTTP Request (Gemini AI for conversational responses)
- Respond to Webhook (returns AI response)

### 3. Newsletter Workflow
```
Subscription → Webhook → Validation → Email Confirmation → Database Storage
```

**Nodes:**
- Webhook (receives email)
- Set (validates and formats)
- Gmail (sends welcome email)
- Google Sheets (stores subscriber)

---

## 📱 Features

### Interactive Elements
- **Modals:** FAQ, Contact Information, Legal Policies
- **Chat Widget:** Glassmorphic AI-powered assistant
- **Form Validation:** Real-time error checking
- **Animations:** Scroll effects, hover states, smooth transitions

### User Experience
- Mobile-responsive design
- Accessible navigation
- Clear call-to-action buttons
- Loading states and user feedback
- Smooth scrolling between sections

### Design Highlights
- Coral/pink gradient background with glassmorphism
- Floating gradient blobs with subtle animations
- Consistent typography and spacing
- Modern, clean aesthetic



---

## 🎓 Development Approach

**Challenges Overcome:**
- Integrated free AI (Openrouter - Deepseek) via n8n HTTP Request nodes
- Implemented glassmorphism effects with CSS backdrop-filter
- Created demo chat responses for testing without active webhooks
- Ensured mobile responsiveness across all components

---

## 📧 Contact

**Marghareth Bueno**  
Email: buenomarghareth@gmail.com  
GitHub: [@marghareth](https://github.com/marghareth/atheleia.git)

---

<div align="center">

**Submitted to Tidal Solutions**  
Tryout Task | 2026

</div>