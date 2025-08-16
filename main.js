// Data
// Edit these placeholders with your current focus
const nowData = [
  { emoji: "🧭", title: "[Currently Placeholder #1]", description: "Describe what you're focused on right now.", date: "[Month YYYY]" },
  { emoji: "🛠️", title: "[Currently Placeholder #2]", description: "Another current initiative or learning area.", date: "[Month YYYY]" },
  { emoji: "📈", title: "[Currently Placeholder #3]", description: "Progress, metrics, or outcomes you're tracking.", date: "[Month YYYY]" }
];

// Edit these placeholders with your projects
const projectsData = [
  {
    id: 1,
    title: "[Project Title 1]",
    description: "Short one-liner about what the project does and why it matters.",
    icon: "✨",
    tech: ["Tech A", "Tech B", "Tech C"],
    github: "https://github.com/your-handle/your-repo",
    demo: "https://your-demo-link.example.com"
  },
  {
    id: 2,
    title: "[Project Title 2]",
    description: "Key functionality or outcome. Keep it concise and impactful.",
    icon: "🚀",
    tech: ["Tech A", "Tech B"],
    github: "https://github.com/your-handle/your-repo",
    demo: null
  },
  {
    id: 3,
    title: "[Project Title 3]",
    description: "What makes it unique or interesting.",
    icon: "📱",
    tech: ["Tech A", "Tech B"],
    github: "https://github.com/your-handle/your-repo",
    demo: null
  },
  {
    id: 4,
    title: "[Project Title 4]",
    description: "Brief value proposition and scope.",
    icon: "🧠",
    tech: ["Tech A", "Tech B", "Tech C"],
    github: "https://github.com/your-handle/your-repo",
    demo: null
  }
];

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.theme);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);

    // Smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
}

// Smooth Scroll Animations
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    this.setupIntersectionObserver();
    this.setupSectionIndicator();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll(
      '.section-title, .about-text, .now-item, .project-card, .projects-title, .projects-subtitle, .contact-text, .contact-link'
    );

    animatedElements.forEach(el => observer.observe(el));
  }

  setupSectionIndicator() {
    const sections = document.querySelectorAll('section[id]');
    const indicators = document.querySelectorAll('.indicator-dot');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Remove active class from all indicators
            indicators.forEach(indicator => indicator.classList.remove('active'));

            // Add active class to corresponding indicator
            const activeIndicator = document.querySelector(`[data-section="${entry.target.id}"]`);
            if (activeIndicator) {
              activeIndicator.classList.add('active');
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-40% 0px -40% 0px'
      }
    );

    sections.forEach(section => sectionObserver.observe(section));

    // Add click handlers to indicators
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const targetId = indicator.dataset.section;
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      });
    });
  }
}

// Now Section Management
class NowSection {
  constructor() {
    this.container = document.getElementById('nowList');
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = nowData.map(item => `
      <div class="now-item">
        <div class="now-emoji">${item.emoji}</div>
        <div class="now-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="now-date">${item.date}</div>
        </div>
      </div>
    `).join('');
  }
}

// Projects Section Management
class ProjectsSection {
  constructor() {
    this.container = document.getElementById('projectsGrid');
    this.render();
  }

  render() {
    if (!this.container) {
      console.error('Projects container not found!');
      return;
    }

    console.log('Rendering projects...');

    this.container.innerHTML = projectsData.map(project => `
      <div class="project-card glass" onclick="window.open('${project.demo || project.github}', '_blank')">
        <div class="project-image">
          <div class="project-icon">${project.icon}</div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.github}" class="project-link" target="_blank" rel="noopener" onclick="event.stopPropagation()">GitHub</a>
            ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener" onclick="event.stopPropagation()">Live Demo</a>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    console.log('Projects rendered:', this.container.children.length);
  }
}

// Smooth Navigation
class Navigation {
  constructor() {
    this.nav = document.getElementById('nav');
    this.lastScrollY = window.scrollY;
    this.init();
  }

  init() {
    // Smooth scrolling for logo
    const logo = document.querySelector('.nav-logo');
    if (logo) {
      logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Hide/show navigation based on scroll direction
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
  }

  handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      this.nav.style.transform = 'translateY(-100%)';
    } else {
      this.nav.style.transform = 'translateY(0)';
    }

    this.lastScrollY = currentScrollY;
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Lazy load images
    this.setupLazyLoading();

    // Preload critical resources
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  preloadCriticalResources() {
    // Preload critical fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap'
    ];

    fontPreloads.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = font;
      document.head.appendChild(link);
    });
  }
}

// Accessibility Enhancements
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    // Keyboard navigation
    this.setupKeyboardNavigation();

    // Focus management
    this.setupFocusManagement();

    // Skip to main content link
    this.addSkipLink();
  }

  setupKeyboardNavigation() {
    // Tab navigation for section indicators
    const indicators = document.querySelectorAll('.indicator-dot');
    indicators.forEach(indicator => {
      indicator.setAttribute('tabindex', '0');
      indicator.setAttribute('role', 'button');
      indicator.setAttribute('aria-label', `Go to ${indicator.dataset.section} section`);

      indicator.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          indicator.click();
        }
      });
    });
  }

  setupFocusManagement() {
    // Show focus indicators when using keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#hero';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 16px;
      background: var(--color-accent);
      color: white;
      padding: 8px 16px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '16px';
    });

    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Smooth Easing Functions (Framer Motion inspired)
const easing = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  spring: [0.25, 0.46, 0.45, 0.94]
};

// Custom Animation Helper
class AnimationHelper {
  static animate(element, properties, options = {}) {
    const {
      duration = 300,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay = 0
    } = options;

    return new Promise((resolve) => {
      setTimeout(() => {
        element.style.transition = `all ${duration}ms ${easing}`;

        Object.keys(properties).forEach(prop => {
          element.style[prop] = properties[prop];
        });

        setTimeout(() => {
          element.style.transition = '';
          resolve();
        }, duration);
      }, delay);
    });
  }

  static staggerChildren(parent, options = {}) {
    const children = Array.from(parent.children);
    const { stagger = 100, ...animationOptions } = options;

    children.forEach((child, index) => {
      this.animate(child, { opacity: '1', transform: 'translateY(0)' }, {
        ...animationOptions,
        delay: index * stagger
      });
    });
  }
}

// Initialize Application
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Initialize all managers
    this.themeManager = new ThemeManager();
    this.scrollAnimations = new ScrollAnimations();
    this.navigation = new Navigation();
    this.nowSection = new NowSection();
    this.projectsSection = new ProjectsSection();
    this.interactiveTerminal = new InteractiveTerminal();
    this.performanceOptimizer = new PerformanceOptimizer();
    this.accessibilityManager = new AccessibilityManager();

    // Add smooth page transitions
    this.setupPageTransitions();

    // Debug: Check if projects are rendered
    console.log('Portfolio with interactive terminal initialized ✨');
    console.log('Projects container:', document.getElementById('projectsGrid'));
    console.log('Projects data:', projectsData);
  }

  setupPageTransitions() {
    // Smooth page load animation
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';

      requestAnimationFrame(() => {
        document.body.style.opacity = '1';
      });
    });

    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        // Re-trigger animations when page becomes visible
        const visibleElements = document.querySelectorAll('.visible');
        visibleElements.forEach(el => {
          el.style.animation = 'none';
          requestAnimationFrame(() => {
            el.style.animation = '';
          });
        });
      }
    });

    // Subtle parallax for liquid background
    const liquid = document.querySelector('.liquid-bg');
    if (liquid) {
      let latestX = 0, latestY = 0, scrollY = 0;
      const update = () => {
        const tx = latestX * 0.02;
        const ty = latestY * 0.02 + scrollY * -0.03;
        liquid.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
        requestAnimationFrame(update);
      };
      update();

      window.addEventListener('mousemove', (e) => {
        latestX = (e.clientX - window.innerWidth / 2);
        latestY = (e.clientY - window.innerHeight / 2);
      }, { passive: true });

      window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
      }, { passive: true });
    }
  }
}

// Interactive Terminal Component
class InteractiveTerminal {
  constructor() {
    this.input = document.getElementById('terminalInput');
    this.output = document.getElementById('terminalOutput');
    this.cursor = document.getElementById('terminalCursor');
    this.soundToggle = document.getElementById('soundToggle');

    this.commandHistory = [];
    this.historyIndex = -1;
    this.currentInput = '';
    this.soundEnabled = true;

    this.commands = {
      'help': this.showHelp.bind(this),
      'whoami': this.whoami.bind(this),
      'ls': this.listCommands.bind(this),
      'cat': this.catFile.bind(this),
      'git': this.gitCommand.bind(this),
      'ps': this.processStatus.bind(this),
      'skills': this.showSkills.bind(this),
      'contact': this.showContact.bind(this),
      'resume': this.downloadResume.bind(this),
      'clear': this.clearTerminal.bind(this),
      'date': this.showDate.bind(this),
      'pwd': this.showPath.bind(this),
      'echo': this.echo.bind(this),
      'neofetch': this.neofetch.bind(this),
      'tree': this.showTree.bind(this)
    };

    this.availableFiles = ['about.txt', 'skills.json', 'projects.md', 'contact.info'];

    this.init();
  }

  init() {
    if (!this.input) return;

    this.setupEventListeners();
    this.setupWidgetControls();
    // Cache prompt element in the input line for accurate cursor positioning
    this.promptEl = document.querySelector('.terminal-input-line .terminal-prompt');
    this.updateCursorPosition();
  }

  setupEventListeners() {
    // Input handling
    this.input.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('focus', () => this.cursor.style.opacity = '1');
    this.input.addEventListener('blur', () => this.cursor.style.opacity = '0.5');

    // Sound toggle
    this.soundToggle?.addEventListener('click', this.toggleSound.bind(this));
  }

  setupWidgetControls() {
    const terminalToggle = document.getElementById('terminalToggle');
    const terminalOverlay = document.getElementById('terminalOverlay');
    const terminalClose = document.getElementById('terminalClose');
    const terminalMinimize = document.getElementById('terminalMinimize');

    // Open terminal
    terminalToggle?.addEventListener('click', () => {
      this.openTerminal();
    });

    // Close terminal
    terminalClose?.addEventListener('click', () => {
      this.closeTerminal();
    });

    // Minimize terminal (same as close for now)
    terminalMinimize?.addEventListener('click', () => {
      this.closeTerminal();
    });

    // Close on overlay click
    terminalOverlay?.addEventListener('click', (e) => {
      if (e.target === terminalOverlay) {
        this.closeTerminal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && terminalOverlay?.classList.contains('active')) {
        this.closeTerminal();
      }
    });
  }

  openTerminal() {
    const overlay = document.getElementById('terminalOverlay');
    overlay?.classList.add('active');

    // Focus input after animation
    setTimeout(() => {
      this.input?.focus();
      this.playSound('startup');
    }, 300);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeTerminal() {
    const overlay = document.getElementById('terminalOverlay');
    overlay?.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';

    this.playSound('tab');
  }

  handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        this.executeCommand();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.navigateHistory(-1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.navigateHistory(1);
        break;
      case 'Tab':
        e.preventDefault();
        this.autoComplete();
        break;
      case 'l':
        if (e.ctrlKey) {
          e.preventDefault();
          this.clearTerminal();
        }
        break;
    }
  }

  handleInput() {
    this.updateCursorPosition();
  }

  updateCursorPosition() {
    const textWidth = this.getTextWidth(this.input.value, this.input);
    const baseLeft = this.input ? this.input.offsetLeft : 0; // start at input field left edge
    this.cursor.style.left = `${baseLeft + textWidth}px`;
  }

  getTextWidth(text, element) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const style = window.getComputedStyle(element);
    context.font = `${style.fontSize} ${style.fontFamily}`;
    return context.measureText(text).width;
  }

  executeCommand() {
    const command = this.input.value.trim();
    if (!command) return;

    this.addToHistory(command);
    this.addOutput(`eric@portfolio:~$ ${command}`, 'prompt');

    const [cmd, ...args] = command.split(' ');

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      this.addOutput(`Command not found: ${cmd}`, 'error');
      this.addOutput(`Type 'help' to see available commands.`, 'info');
      this.playSound('error');
    }

    this.input.value = '';
    this.updateCursorPosition();
    this.scrollToBottom();
  }

  addToHistory(command) {
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;
  }

  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;

    this.historyIndex += direction;

    if (this.historyIndex < 0) {
      this.historyIndex = 0;
    } else if (this.historyIndex >= this.commandHistory.length) {
      this.historyIndex = this.commandHistory.length;
      this.input.value = '';
    } else {
      this.input.value = this.commandHistory[this.historyIndex];
    }

    this.updateCursorPosition();
  }

  autoComplete() {
    const input = this.input.value;
    const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));

    if (matches.length === 1) {
      this.input.value = matches[0];
      this.updateCursorPosition();
      this.playSound('tab');
    } else if (matches.length > 1) {
      this.addOutput(`eric@portfolio:~$ ${input}`, 'prompt');
      this.addOutput(matches.join('  '), 'info');
    }
  }

  addOutput(text, type = 'normal') {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (type === 'prompt') {
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = text.split('$ ')[0] + '$ ';

      const command = document.createElement('span');
      command.className = 'terminal-text';
      command.textContent = text.split('$ ')[1] || '';

      line.appendChild(prompt);
      line.appendChild(command);
    } else {
      const span = document.createElement('span');
      span.className = `terminal-${type}`;
      span.textContent = text;
      line.appendChild(span);
    }

    this.output.appendChild(line);
  }

  addTypingOutput(text, type = 'normal', delay = 30) {
    return new Promise((resolve) => {
      const line = document.createElement('div');
      line.className = 'terminal-line';

      const span = document.createElement('span');
      span.className = `terminal-${type}`;
      line.appendChild(span);

      this.output.appendChild(line);

      let i = 0;
      const typeChar = () => {
        if (i < text.length) {
          span.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, delay);
          this.scrollToBottom();
        } else {
          resolve();
        }
      };

      typeChar();
    });
  }

  scrollToBottom() {
    const terminalBody = document.getElementById('terminalBody');
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  playSound(type) {
    if (!this.soundEnabled) return;

    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
      case 'startup':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        break;
      case 'tab':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        break;
      case 'error':
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        break;
      default:
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.soundToggle.classList.toggle('muted', !this.soundEnabled);
    this.addOutput(`Sound effects ${this.soundEnabled ? 'enabled' : 'disabled'}`, 'info');
  }

  // Command implementations
  showHelp() {
    this.addOutput('Available commands:', 'info');
    this.addOutput('');

    const commands = [
      ['whoami', 'Display user information'],
      ['ls', 'List available commands and files'],
      ['cat <file>', 'Display file contents'],
      ['git log --oneline', 'Show recent projects'],
      ['ps aux', 'Show current projects/processes'],
      ['skills --list', 'Display technical skills'],
      ['contact --info', 'Show contact information'],
      ['resume --download', 'Download resume'],
      ['neofetch', 'Display system information'],
      ['tree', 'Show portfolio structure'],
      ['clear', 'Clear terminal screen'],
      ['help', 'Show this help message']
    ];

    commands.forEach(([cmd, desc]) => {
      this.addOutput(`  ${cmd.padEnd(20)} ${desc}`, 'text');
    });

    this.addOutput('');
    this.addOutput('Navigation: ↑↓ for history, Tab for autocomplete, Ctrl+L to clear', 'info');
  }

  whoami() {
    this.addOutput('eric_xu - Software Engineer & AI/ML Developer', 'success');
    this.addOutput('');
    this.addOutput('Currently seeking internship opportunities in:', 'text');
    this.addOutput('• Full-stack development', 'text');
    this.addOutput('• AI/ML engineering', 'text');
    this.addOutput('• Software engineering', 'text');
  }

  listCommands() {
    this.addOutput('Commands:', 'info');
    Object.keys(this.commands).forEach(cmd => {
      this.addOutput(`  ${cmd}`, 'text');
    });

    this.addOutput('');
    this.addOutput('Files:', 'info');
    this.availableFiles.forEach(file => {
      this.addOutput(`  ${file}`, 'text');
    });
  }

  async catFile(args) {
    const filename = args[0];

    if (!filename) {
      this.addOutput('Usage: cat <filename>', 'error');
      return;
    }

    if (!this.availableFiles.includes(filename)) {
      this.addOutput(`cat: ${filename}: No such file or directory`, 'error');
      return;
    }

    switch (filename) {
      case 'about.txt':
        await this.addTypingOutput('# About Eric Xu', 'info');
        await this.addTypingOutput('');
        await this.addTypingOutput("I'm a passionate software engineer and AI/ML enthusiast with a love for creating elegant solutions to complex problems. My journey in tech started with curiosity about how things work, and has evolved into a deep appreciation for well-crafted software that makes people's lives better.", 'text');
        await this.addTypingOutput('');
        await this.addTypingOutput('Currently seeking internship opportunities where I can contribute to innovative projects and continue learning from experienced teams.', 'text');
        break;

      case 'skills.json':
        await this.addTypingOutput(JSON.stringify({
          "languages": ["Python", "JavaScript", "TypeScript", "Java", "C++"],
          "frameworks": ["React", "Node.js", "Express", "Next.js", "Flask"],
          "ai_ml": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Pandas"],
          "databases": ["PostgreSQL", "MongoDB", "Redis"],
          "cloud": ["AWS", "Docker", "Kubernetes"],
          "tools": ["Git", "VS Code", "Figma", "Postman"]
        }, null, 2), 'text', 10);
        break;

      case 'contact.info':
        await this.addTypingOutput('# Contact Information', 'info');
        await this.addTypingOutput('');
        await this.addTypingOutput('Email: eric@example.com', 'text');
        await this.addTypingOutput('GitHub: https://github.com/ericxu', 'text');
        await this.addTypingOutput('LinkedIn: https://linkedin.com/in/ericxu', 'text');
        await this.addTypingOutput('Location: San Francisco, CA', 'text');
        break;
    }
  }

  gitCommand(args) {
    if (args[0] === 'log' && args[1] === '--oneline') {
      this.addOutput('Recent commits (projects):', 'info');
      this.addOutput('');

      const projects = [
        ['a1b2c3d', 'feat: AI Task Manager with NLP categorization'],
        ['e4f5g6h', 'feat: Real-time collaboration platform'],
        ['i7j8k9l', 'feat: iOS fitness tracker with HealthKit'],
        ['m0n1o2p', 'feat: ML model deployment pipeline'],
        ['q3r4s5t', 'feat: Cryptocurrency trading bot'],
        ['u6v7w8x', 'feat: Developer portfolio template']
      ];

      projects.forEach(([hash, message]) => {
        this.addOutput(`${hash} ${message}`, 'text');
      });
    } else {
      this.addOutput('Usage: git log --oneline', 'error');
    }
  }

  processStatus() {
    this.addOutput('USER       PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND', 'info');

    const processes = [
      ['eric      1001  15.2  8.1  2.1GB 512MB pts/0   R+   09:00   2:15 ai-code-assistant'],
      ['eric      1002  12.8  6.4  1.8GB 384MB pts/1   S    08:30   1:45 system-design-study'],
      ['eric      1003   8.5  4.2  1.2GB 256MB pts/2   S    10:15   0:30 music-ai-experiment'],
      ['eric      1004   5.1  2.8  800MB 128MB pts/3   S    07:00   3:20 open-source-contrib'],
      ['eric      1005   2.3  1.5  400MB  64MB pts/4   S    11:00   0:15 portfolio-terminal']
    ];

    processes.forEach(process => {
      this.addOutput(process, 'text');
    });
  }

  async showSkills(args) {
    if (args[0] === '--list') {
      this.addOutput('Technical Skills Assessment:', 'info');
      this.addOutput('');

      const skills = [
        ['JavaScript/TypeScript', 90],
        ['Python', 85],
        ['React/Next.js', 88],
        ['Node.js/Express', 82],
        ['AI/ML (TensorFlow)', 78],
        ['PostgreSQL/MongoDB', 80],
        ['AWS/Docker', 75],
        ['Git/DevOps', 85]
      ];

      for (const [skill, level] of skills) {
        const line = document.createElement('div');
        line.className = 'terminal-line';

        const skillMeter = document.createElement('div');
        skillMeter.className = 'skill-meter';
        skillMeter.innerHTML = `
          <span class="skill-name">${skill}</span>
          <div class="skill-bar">
            <div class="skill-fill" style="width: 0%"></div>
          </div>
          <span class="skill-percentage">${level}%</span>
        `;

        line.appendChild(skillMeter);
        this.output.appendChild(line);

        // Animate skill bar
        setTimeout(() => {
          const fill = skillMeter.querySelector('.skill-fill');
          fill.style.width = `${level}%`;
        }, 100);

        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } else {
      this.addOutput('Usage: skills --list', 'error');
    }
  }

  showContact(args) {
    if (args[0] === '--info') {
      this.addOutput('📧 Contact Information:', 'info');
      this.addOutput('');
      this.addOutput('Email:    eric@example.com', 'text');
      this.addOutput('GitHub:   https://github.com/ericxu', 'text');
      this.addOutput('LinkedIn: https://linkedin.com/in/ericxu', 'text');
      this.addOutput('Location: San Francisco, CA', 'text');
      this.addOutput('Timezone: PST (UTC-8)', 'text');
      this.addOutput('');
      this.addOutput('💼 Available for:', 'success');
      this.addOutput('• Software Engineering Internships', 'text');
      this.addOutput('• AI/ML Engineering Roles', 'text');
      this.addOutput('• Full-stack Development Projects', 'text');
    } else {
      this.addOutput('Usage: contact --info', 'error');
    }
  }

  downloadResume(args) {
    if (args[0] === '--download') {
      this.addOutput('Initiating resume download...', 'info');

      // Create progress bar
      const line = document.createElement('div');
      line.className = 'terminal-line';

      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-bar-terminal';
      progressContainer.innerHTML = `
        <span class="terminal-text">Downloading:</span>
        <div class="progress-fill-terminal">
          <div class="progress-bar-inner"></div>
        </div>
        <span class="terminal-text">0%</span>
      `;

      line.appendChild(progressContainer);
      this.output.appendChild(line);

      // Animate progress
      let progress = 0;
      const progressBar = progressContainer.querySelector('.progress-bar-inner');
      const progressText = progressContainer.querySelector('.terminal-text:last-child');

      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;

        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            this.addOutput('✅ Resume downloaded successfully!', 'success');
            this.addOutput('Opening resume in new tab...', 'info');
            window.open('/resume.pdf', '_blank');
          }, 500);
        }
      }, 100);
    } else {
      this.addOutput('Usage: resume --download', 'error');
    }
  }

  clearTerminal() {
    this.output.innerHTML = '';
    this.addOutput('Terminal cleared.', 'info');
  }

  showDate() {
    const now = new Date();
    this.addOutput(now.toString(), 'text');
  }

  showPath() {
    this.addOutput('/home/eric/portfolio', 'text');
  }

  echo(args) {
    this.addOutput(args.join(' '), 'text');
  }

  async neofetch() {
    const ascii = `
    ╭─────────────────────────╮
    │     Eric's Portfolio    │
    ╰─────────────────────────╯
    `;

    this.addOutput(ascii, 'text');
    await this.addTypingOutput('OS: Portfolio Linux v2024.12', 'info', 20);
    await this.addTypingOutput('Host: Software Engineer Workstation', 'info', 20);
    await this.addTypingOutput('Kernel: JavaScript-6.0.0-LTS', 'info', 20);
    await this.addTypingOutput('Uptime: Seeking internships', 'info', 20);
    await this.addTypingOutput('Packages: React, Python, AI/ML', 'info', 20);
    await this.addTypingOutput('Shell: zsh with oh-my-zsh', 'info', 20);
    await this.addTypingOutput('Terminal: Interactive Portfolio CLI', 'info', 20);
    await this.addTypingOutput('CPU: Problem Solving Unit (8 cores)', 'info', 20);
    await this.addTypingOutput('Memory: Unlimited curiosity', 'info', 20);
  }

  showTree() {
    const tree = `
portfolio/
├── about/
│   ├── bio.txt
│   ├── interests.md
│   └── achievements.json
├── projects/
│   ├── ai-task-manager/
│   ├── collaboration-platform/
│   ├── ios-fitness-tracker/
│   └── ml-deployment-pipeline/
├── skills/
│   ├── languages/
│   ├── frameworks/
│   ├── ai-ml/
│   └── tools/
├── experience/
│   ├── internships/
│   ├── projects/
│   └── contributions/
└── contact/
    ├── email.txt
    ├── social-links.json
    └── resume.pdf
    `;

    this.addOutput(tree, 'text');
  }
}

// Start the application
new App();