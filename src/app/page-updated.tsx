"use client"
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Icon Components
const HomeIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2z" />
  </svg>
);

const AboutIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
  </svg>
);

const PortfolioIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const ServicesIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
    <path d="M12 12a4 4 0 0 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

const ContactIcon = () => (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const SunIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

// Portfolio data structure
const portfolioItems = [
  { id: 1, title: "E-commerce Platform", category: "Web Dev", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d", tech: ["Next.js", "Node.js", "MongoDB"], description: "A full-stack e-commerce solution with payment integration and admin dashboard." },
  { id: 2, title: "Brand Identity Design", category: "Graphics", image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea", tech: ["CorelDRAW", "Photoshop"], description: "Complete brand identity package including logo, color palette, and brand guidelines." },
  { id: 3, title: "Performance CLI Tool", category: "Rust", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", tech: ["Rust", "WebAssembly"], description: "High-performance command-line tool for file processing with WebAssembly integration." },
  { id: 4, title: "Restaurant Website", category: "Web Dev", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0", tech: ["React", "TypeScript"], description: "Modern restaurant website with online ordering and reservation system." },
  { id: 5, title: "Logo Collection", category: "Graphics", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d", tech: ["Illustrator", "CorelDRAW"], description: "Collection of modern logos for various tech startups and businesses." },
  { id: 6, title: "Web Scraper", category: "Rust", image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a", tech: ["Rust", "Tokio"], description: "Asynchronous web scraper built with Rust for high-performance data extraction." },
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<typeof portfolioItems[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Portfolio filtering logic
  const filteredPortfolioItems = portfolioFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);
  
  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Contact form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Set initial dark mode
    document.documentElement.classList.add('dark');

    // GSAP ScrollTrigger animations (non-hijacking)
    gsap.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power2.out" }
    );

    // Animate sections on scroll
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.fromTo(element,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stagger portfolio items
    gsap.fromTo('.portfolio-item',
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-white/20">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Portfolio
          </div>
          
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Home', icon: HomeIcon, id: 'home' },
              { name: 'About', icon: AboutIcon, id: 'about' },
              { name: 'Portfolio', icon: PortfolioIcon, id: 'portfolio' },
              { name: 'Services', icon: ServicesIcon, id: 'services' },
              { name: 'Contact', icon: ContactIcon, id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Hello, I'm SOMMY
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 text-gray-300">
            Full-Stack Developer & Graphic Designer
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Next.js', 'Node.js', 'Rust', 'CorelDRAW', 'Photoshop'].map((tech) => (
              <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Full-Stack Developer & Creative Designer</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a passionate developer with expertise in modern web technologies and a creative eye for design. 
                My journey spans from building high-performance web applications with Next.js and Node.js to creating 
                stunning visual designs with CorelDRAW and Photoshop.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I also work with Rust for performance-critical applications, bringing system-level programming 
                expertise to web development through WebAssembly integration.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Development</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>Next.js & React</li>
                    <li>Node.js & TypeScript</li>
                    <li>Rust & WebAssembly</li>
                    <li>MongoDB & PostgreSQL</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-purple-400">Design</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>CorelDRAW</li>
                    <li>Adobe Photoshop</li>
                    <li>Logo Design</li>
                    <li>Brand Identity</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold">S</span>
                  </div>
                  <p className="text-gray-300">Professional Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            My Portfolio
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-4 bg-white/10 rounded-full p-2 backdrop-blur-sm">
              {['All', 'Web Dev', 'Graphics', 'Rust'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPortfolioFilter(filter)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    portfolioFilter === filter
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolioItems.map((item) => (
              <div
                key={item.id}
                className="portfolio-item group cursor-pointer"
                onClick={() => setSelectedPortfolioItem(item)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-full text-blue-400">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((tech) => (
                        <span key={tech} className="text-xs px-2 py-1 bg-white/10 rounded text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💻',
                title: 'Web Development',
                description: 'Full-stack web applications using Next.js, React, and Node.js with modern best practices.',
                features: ['Responsive Design', 'API Development', 'Database Integration', 'Performance Optimization']
              },
              {
                icon: '🎨',
                title: 'Graphic Design',
                description: 'Creative visual solutions including logos, brand identity, and marketing materials.',
                features: ['Logo Design', 'Brand Identity', 'Print Design', 'Digital Graphics']
              },
              {
                icon: '⚡',
                title: 'Rust Development',
                description: 'High-performance system programming and WebAssembly integration for web applications.',
                features: ['CLI Tools', 'WebAssembly', 'Performance Critical Code', 'System Programming']
              }
            ].map((service, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-500 focus:outline-none backdrop-blur-sm text-white placeholder-gray-400 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/20 backdrop-blur-md">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 SOMMY. Built with Next.js, GSAP, and lots of ☕
          </p>
        </div>
      </footer>

      {/* Portfolio Modal */}
      {selectedPortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedPortfolioItem.image} 
                alt={selectedPortfolioItem.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedPortfolioItem(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedPortfolioItem.title}</h3>
                <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm">
                  {selectedPortfolioItem.category}
                </span>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {selectedPortfolioItem.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPortfolioItem.tech.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-white/10 rounded text-sm text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Projects Floating Widget */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="group">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-white/20 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-blue-500/25">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-xs text-gray-300 font-medium">Recent Project</p>
                <p className="text-sm font-semibold text-blue-400">E-commerce Platform</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
