# Eric Xu - Portfolio Website

A modern, fast, and accessible portfolio website built with vanilla HTML, CSS, and JavaScript. Inspired by clean, minimal design with smooth animations and excellent performance.

## 🚀 Features

- **Fast & Lightweight**: Vanilla JavaScript, no heavy frameworks
- **Responsive Design**: Mobile-first approach, works on all devices
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader friendly
- **Performance**: Lighthouse scores 95+ across all metrics
- **Dark/Light Mode**: Persistent theme switching
- **Smooth Animations**: Scroll-triggered reveals with reduced motion support
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Interactive**: Smooth scrolling, active section highlighting, project filtering

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── style.css           # All styles with CSS custom properties
├── main.js             # JavaScript functionality
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine instructions
├── README.md           # This file
└── assets/             # Images and other assets
    ├── portrait.jpg    # Profile image
    ├── project-*.jpg   # Project screenshots
    └── favicon/        # Favicon files
```

## 🛠 Customization

### Updating Content

#### Personal Information
Edit the following in `index.html`:
- Hero name and tagline
- Tech stack chips
- About me narrative
- Contact information

#### Now Section
Update the `nowData` array in `main.js`:
```javascript
const nowData = [
  {
    emoji: "🤖",
    title: "Your current project",
    description: "Description of what you're working on",
    date: "Dec 2024",
    progress: ["Tech", "Stack", "Used"]
  }
  // Add more items...
];
```

#### Projects
Update the `projectsData` array in `main.js`:
```javascript
const projectsData = [
  {
    id: 1,
    title: "Project Name",
    description: "Project description",
    image: "/project-image.jpg",
    tech: ["React", "Node.js"],
    tags: ["web", "fullstack"],
    github: "https://github.com/username/repo",
    demo: "https://demo-url.com"
  }
  // Add more projects...
];
```

#### Tech Stack
Update the tech chips in the hero section of `index.html`:
```html
<div class="tech-stack">
  <div class="tech-chip">Your Tech</div>
  <!-- Add more chips... -->
</div>
```

### Styling

The design uses CSS custom properties for easy theming. Main variables are in `:root`:

```css
:root {
  --color-accent: #2563eb;        /* Primary accent color */
  --color-bg: #ffffff;            /* Background color */
  --color-text: #1a1a1a;          /* Text color */
  /* ... more variables */
}
```

### Adding New Sections

1. Add the HTML section to `index.html`
2. Add navigation link to the nav
3. Add styles to `style.css`
4. Update the sections array in `main.js` for scroll highlighting

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Custom domain support available

### Netlify
1. Drag and drop the project folder to Netlify
2. Or connect via GitHub for automatic deployments
3. Configure custom domain if needed

## 📊 Performance

This portfolio is optimized for performance:

- **Lighthouse Scores**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

### Performance Features
- Lazy loading images
- Preloading critical resources
- Optimized CSS and JavaScript
- Minimal dependencies
- Efficient animations

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Focus management
- Screen reader announcements
- Reduced motion support
- High contrast ratios
- Skip to main content link

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `index.html` in a modern browser
3. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx serve .
   
   # PHP
   php -S localhost:8000
   ```

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Content Guidelines

### Writing Tips
- Keep descriptions concise and impactful
- Use active voice
- Highlight achievements with numbers when possible
- Update the "Now" section regularly to keep content fresh

### Image Guidelines
- Use high-quality images (at least 2x resolution for retina displays)
- Optimize images for web (WebP format recommended)
- Include descriptive alt text
- Maintain consistent aspect ratios

### SEO Best Practices
- Update meta descriptions for each major update
- Use descriptive page titles
- Include relevant keywords naturally
- Keep URLs clean and descriptive

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this template for your own portfolio.

## 📞 Support

If you have questions about customizing this portfolio, feel free to reach out:
- Email: eric@example.com
- GitHub: [@ericxu](https://github.com/ericxu)
- LinkedIn: [Eric Xu](https://linkedin.com/in/ericxu)

---

Built with ❤️ by Eric Xu