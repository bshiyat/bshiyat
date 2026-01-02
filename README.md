# Bshiyat - AI/AGI Technology Company Website

> Pioneering Intelligent Solutions for Digital Transformation

A cutting-edge, modern company website showcasing Bshiyat's AI/AGI technology solutions. Built with pure HTML, CSS, and JavaScript featuring glassmorphism design, particle animations, and smooth scroll effects.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## ✨ Features

### Design & Aesthetics
- **Modern Glassmorphism UI** - Translucent cards with backdrop blur effects
- **Dark Mode by Default** - Professional dark theme with electric blue accents
- **Gradient Animations** - Dynamic color-shifting text and elements
- **Particle Background** - Interactive particle system in hero section
- **Smooth Animations** - Scroll-triggered animations and parallax effects

### Functionality
- **Responsive Design** - Mobile-first approach, works on all devices
- **Sticky Navigation** - Transforms on scroll with glassmorphic background
- **Animated Stats Counter** - Numbers count up when scrolled into view
- **Smooth Scrolling** - Seamless navigation between sections
- **Contact Form** - Fully functional with validation and notifications
- **Interactive Elements** - Hover effects, transitions, and micro-interactions
- **Performance Optimized** - Throttled scroll events and intersection observers

### Content Sections
1. **Hero Section** - Bold headline with animated stats and CTA
2. **About** - Mission, values, founder info, and global reach
3. **Solutions** - 4 flagship products with detailed features
4. **Industries** - Target sectors and use cases
5. **Why Bshiyat** - Key differentiators and advantages
6. **Contact** - Professional contact form with features list
7. **Footer** - Navigation links and company info

---

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Download all files to a folder
2. Double-click `index.html`
3. Website opens in your default browser

### Option 2: Local Server (Recommended)

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (http-server):
```bash
npm install -g http-server
http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

---

## 📁 Project Structure

```
bshiyat-website/
│
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
└── README.md           # Documentation (this file)
```

---

## 🎨 Customization Guide

### Colors
Edit the CSS variables in `styles.css` (lines 10-25):

```css
:root {
    --primary-blue: #0066FF;        /* Main brand color */
    --electric-cyan: #00E5FF;       /* Accent color */
    --electric-purple: #7C3AED;     /* Secondary accent */
    --deep-bg: #0A0E27;             /* Background */
    --dark-surface: #151932;        /* Surface color */
}
```

### Typography
Change fonts by modifying the Google Fonts import in `index.html` (line 9-10):

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

And update CSS variables:
```css
--font-primary: 'Inter', sans-serif;
--font-display: 'Space Grotesk', sans-serif;
```

### Content
Update text directly in `index.html`:
- **Hero section**: Lines 45-85
- **About section**: Lines 90-145
- **Solutions**: Lines 150-280
- **Contact info**: Update form action or add backend integration

### Stats Counter
Modify target values in HTML `data-target` attributes:

```html
<div class="stat-value" data-target="60">0</div>
```

---

## 🌐 Deployment

### GitHub Pages
1. Create a GitHub repository
2. Upload all files
3. Go to Settings → Pages
4. Select source: `main` branch
5. Save and wait for deployment

### Netlify
1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your folder
3. Site goes live instantly
4. Custom domain available

### Vercel
```bash
npm i -g vercel
cd your-project-folder
vercel
```

### Traditional Hosting (cPanel, etc.)
1. Upload all files via FTP
2. Place in `public_html` or `www` folder
3. Access via your domain

---

## 🔧 Advanced Configuration

### Form Integration

#### With Formspree:
1. Sign up at [formspree.io](https://formspree.io)
2. Add action to form in `index.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

#### With EmailJS:
1. Add EmailJS library before closing `</body>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

2. Update `initFormHandler()` in `script.js` with EmailJS config

### Analytics Integration

Add before closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### SEO Optimization

Update meta tags in `<head>`:

```html
<!-- Essential META Tags -->
<meta property="og:title" content="Bshiyat - AI/AGI Solutions">
<meta property="og:type" content="website">
<meta property="og:image" content="URL_TO_IMAGE">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:card" content="summary_large_image">

<!-- Favicon -->
<link rel="icon" type="image/png" href="favicon.png">
```

---

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note**: Requires modern browser with support for:
- CSS Grid & Flexbox
- CSS Custom Properties
- Intersection Observer API
- Canvas API

---

## 🎯 Performance Tips

1. **Optimize Images**: Use WebP format, compress images
2. **Minify Files**: Use tools like `uglify-js` and `cssnano`
3. **Enable Caching**: Configure caching headers
4. **CDN**: Use Cloudflare or similar for static assets
5. **Lazy Loading**: Uncomment lazy load function in `script.js`

### Minification Commands:

```bash
# CSS
npx cssnano styles.css styles.min.css

# JavaScript
npx uglify-js script.js -o script.min.js -c -m
```

---

## 🐛 Troubleshooting

### Issue: Animations not working
**Solution**: Check browser console for errors. Ensure JavaScript is enabled.

### Issue: Particle background not showing
**Solution**: Canvas API must be supported. Check `particleCanvas` element exists.

### Issue: Mobile menu not opening
**Solution**: Verify `navToggle` and `navMenu` IDs match in HTML and JS.

### Issue: Stats not counting
**Solution**: Ensure stats are scrolled into view. Check `data-target` attributes.

### Issue: Form not submitting
**Solution**: Check browser console. Add backend integration or use Formspree/EmailJS.

---

## 🔄 Future Enhancements

Potential features to add:

- [ ] Blog section with CMS integration
- [ ] Case studies/portfolio showcase
- [ ] Live chat widget
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Video backgrounds
- [ ] Team member profiles
- [ ] Client testimonials carousel
- [ ] Interactive product demos
- [ ] Newsletter signup

---

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 Bshiyat

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Credits

**Designed & Developed for Bshiyat**

- Design Inspiration: Modern AI/tech company websites
- Fonts: Google Fonts (Inter, Space Grotesk)
- Icons: Unicode emoji and custom SVG
- Particle System: Custom Canvas implementation

---

## 📞 Support

For questions or support:
- Website: Use the contact form
- GitHub: Open an issue in the repository

---

## 🌟 Showcase

This website features:
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript
- 🎨 **Modern Design** - Glassmorphism & gradient effects
- 📱 **Fully Responsive** - Works on all screen sizes
- ♿ **Accessible** - Semantic HTML and ARIA labels
- 🚀 **Fast** - Optimized performance with lazy loading
- 💎 **Production Ready** - Clean, maintainable code

---

**Built with ❤️ for Bshiyat - Crafting Tomorrow's Intelligence Today**

*Last updated: January 2026*
