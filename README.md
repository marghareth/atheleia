# Atheleia - Digital Marketing Agency Landing Page

<div align="center">

![Atheleia Banner](https://img.shields.io/badge/Atheleia-Digital%20Marketing-FF6B9D?style=for-the-badge)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)](https://github.com/yourusername/atheleia)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)

**Internship Tryout Task Submission for Tidal Solutions**

[Live Demo](#) • [Video Walkthrough](#) • [Documentation](docs/)

</div>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Task Requirements](#task-requirements)
- [Implementation](#implementation)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [n8n Workflow](#n8n-workflow)
- [Documentation](#documentation)
- [Contact](#contact)

---

## 🎯 Project Overview

This project was developed as part of the internship tryout task for Tidal Solutions (2026). The objective was to create a marketing landing page integrated with an n8n automation workflow that processes form submissions and generates AI-powered automated responses.

**Project Concept:** Digital Marketing Agency Landing Page

**Key Features:**
- Professional landing page with glassmorphism design
- Functional contact form with validation
- n8n workflow automation for form processing
- AI-generated email responses to user inquiries
- Fully responsive and mobile-optimized

**Live Demo:** [Insert your landing page URL]

**Video Presentation:** [Insert your Loom video link]

---

## ✅ Task Requirements

### Step 1: Landing Page Creation ✓

Created a professional landing page with the following sections:

- **Hero Section:** Company name (Atheleia) with value proposition
- **Services Section:** Four core digital marketing services
- **Contact Us Section:** Functional form with Name, Email, and Message fields

### Step 2: Form Integration ✓

The contact form is connected to an n8n webhook that captures and processes all form submissions in real-time.

### Step 3: n8n Automation Workflow ✓

Built an n8n workflow that:
- Receives form submission data via webhook
- Processes and formats user information
- Triggers an AI agent to generate personalized responses
- Sends automated email replies to users

### Step 4: Automated Response Requirements ✓

AI-generated responses include:
- Acknowledgment of inquiry receipt
- Gratitude for reaching out
- Information about team follow-up
- Professional, friendly, and human-like tone

---

## 🛠️ Implementation

### Landing Page Architecture

The landing page is built with vanilla HTML, CSS, and JavaScript to ensure:
- Fast load times and optimal performance
- Easy deployment and maintenance
- Clean, readable code structure
- No framework dependencies

**Key Sections:**
1. Hero section with clear call-to-action
2. Trusted companies showcase
3. Services overview (SEO, Social Media, PPC, Content Marketing)
4. Client testimonials with carousel
5. Detailed services section
6. Contact form with real-time validation
7. Footer with additional contact options

### Form Validation

Implemented client-side validation for:
- Required fields (Name, Email, Message)
- Email format verification
- Input sanitization
- Error message display
- Success feedback

### n8n Integration

**Webhook Endpoint:**
```
https://atheleia.app.n8n.cloud/webhook/contact-form
```

**Data Flow:**
1. User submits contact form
2. JavaScript validates and sends data to n8n webhook
3. n8n workflow receives and processes submission
4. AI generates personalized response
5. Automated email sent to user
6. Success confirmation displayed on landing page

---

## 💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure and markup |
| CSS3 | Styling with custom properties and animations |
| JavaScript (ES6+) | Form validation and webhook integration |
| n8n | Workflow automation and backend processing |
| AI Integration | Automated response generation |

---

## 🚀 Setup Instructions

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- n8n instance (cloud or self-hosted)
- Code editor (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/atheleia.git
   cd atheleia
   ```

2. Configure n8n webhook:
   - Import workflow from `/n8n-workflows/contact-form-workflow.json`
   - Activate the workflow in your n8n instance
   - Copy your webhook URL
   - Update webhook URL in `index.html` (line 185)

3. Deploy or run locally:
   ```bash
   # Local development server
   python -m http.server 8000
   # or
   npx serve
   ```

4. Test the contact form:
   - Fill out the form with test data
   - Submit and verify webhook receives data
   - Check that automated email is sent

---

## 🔄 n8n Workflow

### Workflow Overview

The n8n automation workflow consists of the following nodes:

1. **Webhook Node:** Receives POST requests from contact form
2. **Set Node:** Formats and structures incoming data
3. **AI Agent Node:** Generates personalized response based on user message
4. **Email Node:** Sends automated reply to user's email address
5. **Response Node:** Returns success status to landing page

### Workflow Logic

```
Form Submission → Webhook → Data Processing → AI Generation → Email Delivery → Confirmation
```

### AI Response Template

The AI agent is configured to:
- Acknowledge the specific inquiry topic
- Thank the user professionally
- Provide expected follow-up timeline
- Maintain consistent brand voice
- Include relevant next steps

**Sample Response Structure:**
- Greeting with user's name
- Acknowledgment of their specific inquiry
- Thank you message
- Timeline for team follow-up (24-48 hours)
- Contact information for urgent matters
- Professional closing

### Workflow Configuration

Detailed workflow setup and webhook API documentation is available in [N8N_INTEGRATION.md](docs/N8N_INTEGRATION.md).

---

## 📚 Documentation

Additional documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [SETUP.md](docs/SETUP.md) | Quick start and installation guide |
| [N8N_INTEGRATION.md](docs/N8N_INTEGRATION.md) | Complete n8n workflow setup and configuration |
| [PROJECT_APPROACH.md](docs/PROJECT_APPROACH.md) | Thought process, decisions, and learnings |

---

## 🎓 Learning Outcomes

Through this tryout task, I gained practical experience in:

- Designing professional marketing landing pages
- Implementing form validation and error handling
- Integrating frontend applications with backend workflows
- Building automation workflows in n8n
- Configuring AI agents for automated responses
- Testing and debugging webhook integrations
- Deploying web applications

### Challenges & Solutions

**Challenge 1: Form Validation**
- Implemented real-time validation with clear error messages
- Added input sanitization to prevent malicious submissions

**Challenge 2: n8n Webhook Integration**
- Researched n8n documentation for webhook configuration
- Tested with various payload structures to ensure reliability

**Challenge 3: AI Response Quality**
- Experimented with different prompts for consistent tone
- Validated responses for professionalism and relevance

---

## 📧 Contact

**Marghareth Bueno**

Email: buenomarghareth@gmail.com

Project Repository: [https://github.com/yourusername/atheleia](https://github.com/yourusername/atheleia)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Submitted to:** Tidal Solutions
**Task:** Internship Tryout Task (2026)
**Submission Date:** [Insert Date]

Made with dedication by Marga

</div>