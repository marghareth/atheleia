# Atheleia - Digital Marketing Agency Website

<div align="center">

![Atheleia Banner](https://img.shields.io/badge/Atheleia-Digital%20Marketing-FF6B9D?style=for-the-badge)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)](https://github.com/yourusername/atheleia)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)

**A modern, glassmorphism-styled landing page for a digital marketing agency**

[Demo](#) • [Documentation](docs/) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [n8n Integration](#n8n-integration)
- [Customization](#customization)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

Atheleia is a production-ready landing page for digital marketing agencies. Built with modern web technologies and featuring a stunning glassmorphism design system, this website helps agencies showcase their services, results, and capture leads through integrated contact forms and AI chat.

### Why Atheleia?

- ✨ **Modern Design**: Glassmorphism UI with animated gradients
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🚀 **Performance Optimized**: Lazy loading, smooth animations, fast load times
- 🤖 **AI-Powered Chat**: Integrated chat widget with n8n backend
- 📧 **Lead Capture**: Contact forms connected to n8n workflows
- ♿ **Accessible**: ARIA labels, semantic HTML, keyboard navigation
- 🎨 **Easy to Customize**: Clean code, well-documented, modular structure

---

## ✨ Features

### Design & UI
- 🎨 Glassmorphism design system with frosted glass effects
- 🌈 Animated gradient backgrounds with floating blobs
- 💫 Smooth scroll animations and transitions
- 📊 Scroll progress indicator
- ⬆️ Back-to-top button
- 🌙 Optimized color palette for readability

### Functionality
- 📱 Responsive mobile navigation with hamburger menu
- 💬 AI-powered chat widget with n8n integration
- 📝 Contact form with validation and n8n webhook
- 🎭 Modal popups for FAQ, Contact Info, and Legal
- 🖼️ Lazy loading images with fade-in effects
- 🔄 Real-time form validation with error handling

### Content Sections
- 🏠 Hero section with CTA buttons
- 🏢 Trusted by companies showcase
- 📋 Services overview (4 main services)
- 📈 Results/testimonials carousel
- 🎯 Detailed services section
- 📞 Multiple CTAs throughout the page
- 📧 Contact form with webhook integration
- 🦶 Footer with newsletter signup

### Technical
- ⚡ Vanilla JavaScript (no dependencies)
- 🔌 n8n webhook integration for backend
- 🎯 SEO optimized with meta tags
- 🌐 Open Graph tags for social sharing
- 🔒 Form validation and sanitization
- 📱 Mobile-first responsive design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup and structure |
| **CSS3** | Styling with custom properties and animations |
| **JavaScript (ES6+)** | Interactivity and dynamic functionality |
| **n8n** | Backend automation for forms and chat |
| **Google Fonts** | Typography (Inter & Instrument Serif) |
| **SVG** | Scalable graphics and icons |

### Why No Framework?

This project intentionally uses **vanilla JavaScript** instead of frameworks like React or Vue because:
- ⚡ Faster load times (no framework overhead)
- 🎯 Better performance (no virtual DOM)
- 📦 Smaller bundle size
- 🔧 Easier to customize
- 🎓 More accessible for beginners
- 🚀 Simpler deployment (just static files)

---

## 🚀 Getting Started

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code, Sublime, etc.)
- [n8n](https://n8n.io) instance (self-hosted or cloud)
- Basic knowledge of HTML, CSS, and JavaScript

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/atheleia.git
   cd atheleia
   ```

2. **Set up your assets**
   - Replace placeholder images in `/assets/` with your own
   - Update logo SVGs with your branding
   - Customize avatar images for testimonials

3. **Configure n8n webhooks**
   - Follow the [n8n Integration Guide](docs/N8N_INTEGRATION.md)
   - Update webhook URLs in `index.html` and `script.js`

4. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Or just open index.html directly
   ```

5. **Customize content**
   - Edit text content in `index.html`
   - Adjust colors in `style.css` (CSS custom properties)
   - Modify animations and interactions in `script.js`

---

## 🔌 n8n Integration

This website uses **n8n** for backend automation. n8n handles:

1. **Contact Form Submissions** → Email notifications, CRM updates
2. **Chat Widget Messages** → AI responses, lead qualification
3. **Newsletter Signups** → Email list management

### Webhook Endpoints

```javascript
// Contact Form
https://atheleia.app.n8n.cloud/webhook/contact-form

// Chat Widget
https://atheleia.app.n8n.cloud/webhook/chat
```

### Setup Instructions

📚 **Detailed guide**: [docs/N8N_INTEGRATION.md](docs/N8N_INTEGRATION.md)

**Quick setup:**

1. Import the workflows from `/n8n-workflows/`
2. Activate the workflows in n8n
3. Copy your webhook URLs
4. Update URLs in the code:
   - `index.html` line 185 (contact form)
   - `script.js` line 352 (chat widget)

---

## 🎨 Customization

### Quick Customization Guide

#### 1. **Colors**
Edit CSS custom properties in `style.css`:
```css
:root {
    --bg-cream: #FEFAE0;
    --bg-peach: #FEE0B9;
    --text-black: #000000;
    /* Customize these colors */
}
```

#### 2. **Content**
Edit text directly in `index.html`:
- Company name: Search and replace "Atheleia"
- Services: Lines 73-96
- Testimonials: Lines 110-150
- Contact info: Lines 270-300

#### 3. **Images**
Replace files in `/assets/`:
- `avatar1.svg`, `avatar2.svg`, `avatar3.svg` - Client avatars
- `logo1.svg` - `logo5.svg` - Company logos
- `img1.svg` - `img3.svg` - Project screenshots

#### 4. **Fonts**
Change Google Fonts in `index.html` head:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont...">
```

📚 **Full guide**: [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md)

---

## 🌐 Deployment

### Option 1: Static Hosting (Recommended)

**Netlify, Vercel, or GitHub Pages**

1. Connect your repository
2. Configure build settings: `None` (static site)
3. Set publish directory: `/` (root)
4. Deploy!

### Option 2: Traditional Web Hosting

1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in the root
3. Configure your domain DNS
4. Enable HTTPS (recommended)

### Option 3: CDN Deployment

Use Cloudflare Pages, AWS S3 + CloudFront, or similar.

📚 **Full guide**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [SETUP.md](docs/SETUP.md) | Detailed setup instructions |
| [N8N_INTEGRATION.md](docs/N8N_INTEGRATION.md) | n8n webhook configuration |
| [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) | How to customize the site |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment options and guides |
| [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) | Common issues and solutions |
| [API_REFERENCE.md](docs/API_REFERENCE.md) | n8n webhook API documentation |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and formatting
- Test on multiple browsers before submitting
- Update documentation if needed
- Keep commits atomic and well-described

---

## 🐛 Known Issues

- Chat widget may not work without n8n setup
- Some animations may be slow on older devices
- Mobile menu needs testing on various screen sizes

See [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) for solutions.

---

## 🗓️ Roadmap

- [ ] Add dark mode toggle
- [ ] Implement blog section
- [ ] Add more animation options
- [ ] Create WordPress theme version
- [ ] Multi-language support
- [ ] Analytics integration guide
- [ ] A/B testing setup

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Design inspiration from modern glassmorphism trends
- [n8n](https://n8n.io) for the powerful automation platform
- Google Fonts for typography
- The open-source community

---

## 📧 Contact

**Your Name/Company** - your@email.com

Project Link: [https://github.com/yourusername/atheleia](https://github.com/yourusername/atheleia)

Website: [https://atheleia.com](https://atheleia.com)

---

<div align="center">

Made with ❤️ by [Your Name]

⭐ Star this repo if you found it helpful!

</div>