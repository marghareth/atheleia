// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Glassmorphism Enhancement on Scroll
const nav = document.querySelector('nav');
const navContainer = document.querySelector('.nav-container');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navContainer.style.background = 'rgba(254, 250, 224, 0.85)';
        navContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.12)';
    } else {
        navContainer.style.background = 'rgba(254, 250, 224, 0.7)';
        navContainer.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
    }
});

// Form Handling with Better UX
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('.btn-submit');
const originalButtonText = submitButton.textContent;

// Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    let isValid = true;
    
    // Remove previous error states
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    
    // Validate Name
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate Email
    if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Message
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('input-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

// Form Submit Handler
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.cursor = 'not-allowed';
    submitButton.style.opacity = '0.7';
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    try {
        // Get the action URL (your n8n webhook)
        const webhookURL = contactForm.getAttribute('action');
        
        // Check if webhook URL is set
        if (!webhookURL || webhookURL === 'YOUR_N8N_WEBHOOK_URL_HERE') {
            throw new Error('Webhook URL not configured. Please set up your n8n webhook URL.');
        }
        
        // Send to n8n webhook
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Success!
            showSuccessMessage();
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
        
    } catch (error) {
        console.error('Error:', error);
        showErrorMessage(error.message);
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        submitButton.style.cursor = 'pointer';
        submitButton.style.opacity = '1';
    }
});

// Success Message
function showSuccessMessage() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-notification success-notification';
    messageDiv.innerHTML = `
        <div class="notification-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
                <strong>Message sent successfully!</strong>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
            </div>
        </div>
    `;
    
    contactForm.parentElement.insertBefore(messageDiv, contactForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Error Message
function showErrorMessage(errorText) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-notification error-notification';
    messageDiv.innerHTML = `
        <div class="notification-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
                <strong>Oops! Something went wrong.</strong>
                <p>${errorText || 'Please try again later or contact us directly.'}</p>
            </div>
        </div>
    `;
    
    contactForm.parentElement.insertBefore(messageDiv, contactForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// Real-time Input Validation Feedback
document.getElementById('fullName').addEventListener('blur', function() {
    if (this.value.trim().length > 0 && this.value.trim().length < 2) {
        this.classList.add('input-error');
    } else {
        this.classList.remove('input-error');
    }
});

document.getElementById('email').addEventListener('blur', function() {
    if (this.value.trim().length > 0 && !validateEmail(this.value.trim())) {
        this.classList.add('input-error');
    } else {
        this.classList.remove('input-error');
    }
});

document.getElementById('message').addEventListener('blur', function() {
    if (this.value.trim().length > 0 && this.value.trim().length < 10) {
        this.classList.add('input-error');
    } else {
        this.classList.remove('input-error');
    }
});

// Character Counter for Message Field
const messageField = document.getElementById('message');
const messageGroup = messageField.parentElement;
const charCounter = document.createElement('div');
charCounter.className = 'char-counter';
charCounter.textContent = '0 characters';
messageGroup.appendChild(charCounter);

messageField.addEventListener('input', function() {
    const length = this.value.length;
    charCounter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
    
    if (length >= 10) {
        charCounter.style.color = '#4CAF50';
    } else {
        charCounter.style.color = 'rgba(255, 255, 255, 0.7)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Testimonial Cards Hover Effect
document.querySelectorAll('.result-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Service Cards Hover Effect
document.querySelectorAll('.service-card, .service-detail-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Newsletter Form (if you want to add functionality later)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const button = this.querySelector('button');
        
        if (emailInput.value && validateEmail(emailInput.value)) {
            button.textContent = 'Subscribed!';
            button.style.background = '#4CAF50';
            emailInput.value = '';
            
            setTimeout(() => {
                button.textContent = 'Get Notified';
                button.style.background = '';
            }, 3000);
        } else {
            emailInput.style.border = '2px solid #ff4444';
            setTimeout(() => {
                emailInput.style.border = 'none';
            }, 2000);
        }
    });
}

// Mobile Menu Toggle (if you want to add mobile menu later)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.fontSize = '24px';
    hamburger.style.cursor = 'pointer';
    
    if (window.innerWidth <= 768) {
        hamburger.style.display = 'block';
        document.querySelector('.nav-container').prepend(hamburger);
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Lazy Loading for Images (better performance)
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

console.log('🚀 Atheleia Landing Page - All JavaScript loaded successfully!');

// ===== MODAL FUNCTIONALITY =====

const modalOverlay = document.getElementById('modalOverlay');
const modals = {
    faq: document.getElementById('faqModal'),
    contact: document.getElementById('contactModal'),
    legal: document.getElementById('legalModal')
};

// Open Modal
document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalType = trigger.getAttribute('data-modal');
        openModal(modalType);
    });
});

function openModal(type) {
    if (modals[type]) {
        modalOverlay.classList.add('active');
        modals[type].classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
}

// Close Modal
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeAllModals();
    });
});

// Close on overlay click
modalOverlay.addEventListener('click', () => {
    closeAllModals();
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

function closeAllModals() {
    modalOverlay.classList.remove('active');
    Object.values(modals).forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = ''; // Restore scroll
}

// ===== CHAT WIDGET FUNCTIONALITY =====

const chatButton = document.getElementById('chatButton');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const typingIndicator = document.getElementById('typingIndicator');
const chatNotification = document.querySelector('.chat-notification');
const minimizeChat = document.getElementById('minimizeChat');

// Chat Widget Configuration
const CHAT_WEBHOOK_URL = 'YOUR_N8N_CHAT_WEBHOOK_URL_HERE'; // Replace with your n8n chat webhook

// Atheleia Business Knowledge (for reference)
const atheileiaKnowledge = {
    companyName: "Atheleia",
    services: [
        "Social Media Strategy - Build a community that loves your brand",
        "SEO & Content Marketing - Rank higher, get found, stay relevant",
        "Performance Marketing - Data-driven paid ads that convert",
        "Email Marketing - Automations and campaigns that nurture and convert",
        "Paid Ads - Facebook & Instagram campaigns",
        "Social Media Management - TikTok and social platform expertise"
    ],
    keyPoints: [
        "We help startups, small businesses, and personal brands",
        "We've achieved 47% sales increases, 2x website visits, and 70% profit margins for clients",
        "We specialize in paid advertising with proven results",
        "Free 20-minute strategy call available",
        "80+ happy clients and counting"
    ],
    contactInfo: "Book a free call to get started within 24 hours"
};

// Toggle Chat Window
chatButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = chatWindow.classList.contains('active');
    
    if (isActive) {
        chatWindow.classList.remove('active');
        chatButton.classList.remove('active');
    } else {
        chatWindow.classList.add('active');
        chatButton.classList.add('active');
        chatInput.focus();
        hideNotification();
    }
});

minimizeChat.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWindow.classList.remove('active');
    chatButton.classList.remove('active');
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    if (!chatWindow.contains(e.target) && !chatButton.contains(e.target)) {
        if (chatWindow.classList.contains('active')) {
            chatWindow.classList.remove('active');
            chatButton.classList.remove('active');
        }
    }
});

// Hide notification badge
function hideNotification() {
    chatNotification.classList.add('hidden');
}

// Quick Question Buttons
document.querySelectorAll('.quick-question-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const question = this.getAttribute('data-question');
        sendMessage(question);
    });
});

// Chat Form Submit
chatForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    sendMessage(message);
    chatInput.value = '';
});

// Send Message Function
async function sendMessage(message) {
    // Add user message to chat
    addMessage(message, 'user');
    
    // Show typing indicator
    showTyping();
    
    // Scroll to bottom
    scrollToBottom();
    
    try {
        // Check if webhook URL is configured
        if (!CHAT_WEBHOOK_URL || CHAT_WEBHOOK_URL === 'YOUR_N8N_CHAT_WEBHOOK_URL_HERE') {
            // Simulate AI response for demo (remove this when n8n is set up)
            setTimeout(() => {
                const demoResponse = getDemoResponse(message);
                hideTyping();
                addMessage(demoResponse, 'bot');
                scrollToBottom();
            }, 1500);
            return;
        }
        
        // Send to n8n webhook
        const response = await fetch(CHAT_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                timestamp: new Date().toISOString(),
                context: atheileiaKnowledge // Send business knowledge to n8n
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            hideTyping();
            
            // Add AI response to chat
            const aiResponse = data.response || data.message || "I'm here to help! Can you provide more details?";
            addMessage(aiResponse, 'bot');
            scrollToBottom();
        } else {
            throw new Error('Failed to get response');
        }
        
    } catch (error) {
        console.error('Chat error:', error);
        hideTyping();
        addMessage("I'm having trouble connecting right now. Please try the contact form below or email us directly!", 'bot');
        scrollToBottom();
    }
}

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-circle-small">You</div>
            </div>
            <div class="message-bubble">
                <div class="message-content">${escapeHtml(text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <div class="avatar-circle-small">A</div>
            </div>
            <div class="message-bubble">
                <div class="message-content">${escapeHtml(text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
}

// Demo Response (for testing without n8n)
function getDemoResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('service') || msg.includes('offer') || msg.includes('do you do')) {
        return "Great question! At Atheleia, we offer:\n\n• Social Media Strategy\n• SEO & Content Marketing\n• Performance Marketing (Paid Ads)\n• Email Marketing\n\nWe specialize in helping startups and small businesses scale through data-driven strategies. Would you like to know more about any specific service?";
    }
    
    if (msg.includes('price') || msg.includes('cost') || msg.includes('pricing')) {
        return "Our pricing is customized based on your specific needs and goals. I'd recommend booking a free 20-minute strategy call with our team to discuss the best package for you. Would you like me to help you schedule one?";
    }
    
    if (msg.includes('start') || msg.includes('get started') || msg.includes('begin')) {
        return "Excellent! Getting started is easy:\n\n1. Book a free 20-minute strategy call\n2. We'll discuss your goals and challenges\n3. Get a customized plan within 24 hours\n\nYou can book a call using the button on our homepage, or I can take your contact info right now!";
    }
    
    if (msg.includes('result') || msg.includes('success') || msg.includes('work')) {
        return "We've achieved some incredible results for our clients! For example:\n\n• 47% sales increase for BackPack INC\n• $0 to $1,000,000 in sales for BBR\n• 80% SEO search improvement\n• 3x revenue from ads\n\nOur approach is data-driven and focused on real, measurable ROI. Would you like to see more case studies?";
    }
    
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
        return "You can reach us through:\n\n• Contact form on this page (we respond within 24 hours)\n• Book a free call directly from our website\n• Fill out the 'Get In Touch' form below\n\nOur team typically responds within a few hours during business days. What works best for you?";
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "Hello! 👋 I'm Atheleia's AI assistant. I'm here to help you learn about our digital marketing services. What would you like to know?";
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
        return "You're very welcome! Is there anything else I can help you with today? 😊";
    }
    
    // Default response
    return "That's a great question! While I can provide general information about Atheleia's services, I'd recommend connecting with our team for personalized answers. You can:\n\n• Book a free 20-minute call\n• Fill out our contact form below\n• Ask me about our services, pricing, or results\n\nWhat would you like to know more about?";
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}

// Show/Hide Typing Indicator
function showTyping() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

function hideTyping() {
    typingIndicator.style.display = 'none';
}

// Scroll to Bottom
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Auto-show welcome notification after 3 seconds
setTimeout(() => {
    if (!chatWindow.classList.contains('active')) {
        chatNotification.classList.remove('hidden');
    }
}, 3000);

console.log('💬 Chat widget initialized successfully!');
console.log('✨ All features loaded: Modals, Chat, Forms, Animations');