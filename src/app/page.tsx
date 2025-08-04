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
  // Web Development Projects - Graphics2Prints Platform
  { 
    id: 1, 
    title: "Graphics2Prints Platform", 
    category: "Web Dev", 
    image: "/images/web-projects/landing-page.png", 
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"], 
    description: "Complete e-commerce platform for print services with custom design upload, admin dashboard, and order management system.",
    githubUrl: "https://github.com/Owolabi-ui/Graphics2Prints",
    liveUrl: "https://graphics2prints.com",
    extraImages: ["/images/web-projects/dashboard.png", "/images/web-projects/print-section.png"]
  },
  
  // DOA Prints Project
  { 
    id: 2, 
    title: "DOA Prints", 
    category: "Web Dev", 
    image: "/images/web-projects/doa-prints/loading-page.png", 
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"], 
    description: "Modern print service website with elegant design, smooth animations, and responsive user interface.",
    githubUrl: "https://github.com/Owolabi-ui/doaprints",
    liveUrl: "https://doaprints.vercel.app/",
    extraImages: ["/images/web-projects/doa-prints/section-1.png", "/images/web-projects/doa-prints/section-2.png"]
  },
  
  // Graphics Design Projects - Your Real Work
  { 
    id: 3, 
    title: "Corporate Logo Collection", 
    category: "Graphics", 
    image: "/images/logos/corporate-logo.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Professional corporate logo designs with modern aesthetics and brand identity focus."
  },
  { 
    id: 4, 
    title: "Custom Shopping Bag Design", 
    category: "Graphics", 
    image: "/images/bags/BAG MOCKUP.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Custom shopping bag design with brand integration and high-quality mockup presentation."
  },
  { 
    id: 5, 
    title: "Professional Business Cards", 
    category: "Graphics", 
    image: "/images/business-cards/business-card-1.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Elegant business card designs with modern typography and professional layout."
  },
  { 
    id: 6, 
    title: "Marketing Brochure", 
    category: "Graphics", 
    image: "/images/brochure/brochure-1.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Professional marketing brochure with engaging visuals and clear information hierarchy."
  },
  { 
    id: 7, 
    title: "Trifold Brochure Design", 
    category: "Graphics", 
    image: "/images/trifold/trifold-front-1.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Professional trifold brochure with strategic content layout and visual hierarchy."
  },
  
  // Additional Graphics Projects (shown when "Show More" is clicked)
  { 
    id: 8, 
    title: "Business Logo Design", 
    category: "Graphics", 
    image: "/images/logos/corporate-logo-2.jpg", 
    tech: ["CorelDRAW"], 
    description: "Clean and professional business logo design with versatile color schemes.",
    isExtended: true
  },
  { 
    id: 9, 
    title: "Brand Identity Design", 
    category: "Graphics", 
    image: "/images/logos/corporate-logo-3.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Complete brand identity package with logo variations and style guidelines.",
    isExtended: true
  },
  { 
    id: 10, 
    title: "Modern Logo Design", 
    category: "Graphics", 
    image: "/images/logos/corporate-logo-4.jpg", 
    tech: ["CorelDRAW"], 
    description: "Contemporary logo design with minimalist approach and strong visual impact.",
    isExtended: true
  },
  { 
    id: 11, 
    title: "Creative Business Cards", 
    category: "Graphics", 
    image: "/images/business-cards/business-card-2.jpg", 
    tech: ["CorelDRAW"], 
    description: "Creative and unique business card designs that stand out and make an impression.",
    isExtended: true
  },
  { 
    id: 12, 
    title: "Marcus Brand Bag", 
    category: "Graphics", 
    image: "/images/bags/marcus bag.jpg", 
    tech: ["CorelDRAW"], 
    description: "Branded shopping bag design for Marcus with logo placement and brand colors.",
    isExtended: true
  },
  { 
    id: 13, 
    title: "Girl Child Bag Design", 
    category: "Graphics", 
    image: "/images/bags/the girl child bag mockup.jpg", 
    tech: ["CorelDRAW", "Photoshop"], 
    description: "Special edition bag design with meaningful messaging and attractive visual design.",
    isExtended: true
  },
  { 
    id: 14, 
    title: "Tobi's Custom Bag", 
    category: "Graphics", 
    image: "/images/bags/tobi's bag mockup side 1.jpg", 
    tech: ["CorelDRAW"], 
    description: "Personalized bag design with custom graphics and professional mockup presentation.",
    isExtended: true
  },
  { 
    id: 15, 
    title: "Marketing Trifold", 
    category: "Graphics", 
    image: "/images/trifold/trifold-front-2.jpg", 
    tech: ["CorelDRAW"], 
    description: "Marketing-focused trifold brochure with compelling visuals and clear call-to-action.",
    isExtended: true
  }
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // State management
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<{
    id: number;
    title: string;
    category: string;
    image: string;
    tech: string[];
    description: string;
    githubUrl?: string;
    liveUrl?: string;
    behanceUrl?: string;
    extraImages?: string[];
    isExtended?: boolean;
  } | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  
  // Portfolio filtering logic
  const baseFilteredItems = portfolioFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);
  
  const filteredPortfolioItems = showAllProjects 
    ? baseFilteredItems 
    : baseFilteredItems.filter(item => !item.isExtended);
  
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

    // Image carousel for projects with multiple images
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const newIndex = { ...prev };
        portfolioItems.forEach(item => {
          if (item.extraImages && item.extraImages.length > 0) {
            const allImages = [item.image, ...item.extraImages];
            const currentIdx = newIndex[item.id] || 0;
            newIndex[item.id] = (currentIdx + 1) % allImages.length;
          }
        });
        return newIndex;
      });
    }, 3000); // Change image every 3 seconds

    // Loading animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      }
    });

    // Animate the name sliding off the screen
    tl.to('.loading-name', {
      duration: 1.5,
      x: window.innerWidth,
      ease: "power2.inOut",
      delay: 2
    })
    .to('.loading-screen', {
      duration: 0.8,
      opacity: 0,
      ease: "power2.inOut"
    }, "-=0.3");

    // Animate hero section after loading
    tl.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    , "-=0.7");

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

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-gray-800'}`}>
      {/* Loading Screen */}
      {isLoading && (
        <div 
          ref={loadingRef}
          className="loading-screen fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="loading-name text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 bg-clip-text text-transparent text-center px-4">
            EZEKIEL OWOLABI OROGBESAN
          </div>
        </div>
      )}

      {/* Compact Fixed Header */}
      <header className="fixed top-2 md:top-4 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border border-gray-300 dark:border-gray-700 rounded-full px-3 md:px-6 py-2 md:py-3">
        <nav className="flex items-center space-x-3 md:space-x-6">
          <div className="text-sm md:text-lg font-bold bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            EO
          </div>
          
          <div className="flex space-x-3 md:space-x-6">
            {[
              { name: 'Home', icon: HomeIcon, id: 'home' },
              { name: 'About', icon: AboutIcon, id: 'about' },
              { name: 'Services', icon: ServicesIcon, id: 'services' },
              { name: 'Contact', icon: ContactIcon, id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200 text-xs md:text-sm"
              >
                <item.icon />
                <span className="hidden md:inline">{item.name}</span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-1 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6" style={{color: isDarkMode ? 'white' : '#1f2937'}}>
            Hello, I'm Owolabi
          </h1>
          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl mb-6 md:mb-8" style={{color: isDarkMode ? 'white' : '#374151'}}>
            Full-Stack Developer & Graphic Designer
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            {['Next.js', 'Node.js', 'Rust', 'CorelDRAW', 'Photoshop'].map((tech) => (
              <span key={tech} className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-xs md:text-sm backdrop-blur-sm text-gray-800 dark:text-white">
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-gray-700 to-black dark:from-gray-600 dark:to-black border border-gray-600 dark:border-gray-500 rounded-full hover:from-gray-800 hover:to-gray-900 dark:hover:from-gray-500 dark:hover:to-gray-800 transition-all duration-300 transform hover:scale-105 text-sm md:text-base text-white"
          >
            Learn More About Me
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16" style={{color: isDarkMode ? 'white' : '#1f2937'}}>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6" style={{color: isDarkMode ? 'white' : '#111827'}}>Full-Stack Developer & Creative Designer</h3>
              <p className="mb-4 md:mb-6 leading-relaxed text-sm md:text-base" style={{color: isDarkMode ? 'white' : '#374151'}}>
                I'm a passionate developer with expertise in modern web technologies and a creative eye for design. 
                My journey spans from building high-performance web applications with Next.js and Node.js to creating 
                stunning visual designs with CorelDRAW and Photoshop.
              </p>
              <p className="mb-4 md:mb-6 leading-relaxed text-sm md:text-base" style={{color: isDarkMode ? 'white' : '#374151'}}>
                I also work with Rust for performance-critical applications, bringing system-level programming 
                expertise to web development through WebAssembly integration.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{color: isDarkMode ? 'white' : '#1f2937'}}>Development</h4>
                  <ul className="text-sm space-y-1" style={{color: isDarkMode ? 'white' : '#374151'}}>
                    <li>Next.js & React</li>
                    <li>Node.js & TypeScript</li>
                    <li>Rust & WebAssembly</li>
                    <li>MongoDB & PostgreSQL</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{color: isDarkMode ? 'white' : '#1f2937'}}>Design</h4>
                  <ul className="text-sm space-y-1" style={{color: isDarkMode ? 'white' : '#374151'}}>
                    <li>CorelDRAW</li>
                    <li>Adobe Photoshop</li>
                    <li>Logo Design</li>
                    <li>Brand Identity</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 md:mt-8">
                <button
                  onClick={() => scrollToSection('portfolio')}
                  className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-gray-700 to-black dark:from-gray-600 dark:to-black border border-gray-600 dark:border-gray-500 rounded-full hover:from-gray-800 hover:to-gray-900 dark:hover:from-gray-500 dark:hover:to-gray-800 transition-all duration-300 transform hover:scale-105 text-sm md:text-base text-white mr-4 mb-4"
                >
                  View My Work
                </button>
                
                {/* Social Media Links */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="text-sm font-medium" style={{color: isDarkMode ? 'white' : '#374151'}}>Connect with me:</span>
                  <div className="flex gap-3">
                    <a 
                      href="mailto:ezekielorogbesan@gmail.com" 
                      className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                      title="Email"
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://wa.me/+2348166411702" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                      title="WhatsApp"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.instagram.com/zeke_owolabi?igsh=dWNxcnJ1bjE0ODcy&utm_source=qr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                      title="Instagram"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://github.com/Owolabi-ui" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
                      title="GitHub"
                    >
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative order-first md:order-last">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <img 
                  src="/images/my-img.jpg" 
                  alt="Ezekiel Owolabi Orogbesan - Full-Stack Developer & Graphic Designer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-12 md:py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16" style={{color: isDarkMode ? 'white' : '#1f2937'}}>
            My Portfolio
          </h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-2 backdrop-blur-sm">
              {['All', 'Web Dev', 'Graphics'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setPortfolioFilter(filter)}
                  className={`px-3 py-1 md:px-6 md:py-2 rounded-full transition-all duration-300 text-xs md:text-sm ${
                    portfolioFilter === filter
                      ? 'bg-gradient-to-r from-gray-700 to-black text-white border border-gray-600'
                      : 'text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPortfolioItems.map((item) => {
              // Get the current image to display (cycling through if multiple images)
              let currentImage = item.image;
              if (item.extraImages && item.extraImages.length > 0) {
                const allImages = [item.image, ...item.extraImages];
                const imageIndex = currentImageIndex[item.id] || 0;
                currentImage = allImages[imageIndex];
              }
              
              return (
                <div
                  key={item.id}
                  className="portfolio-item group cursor-pointer"
                  onClick={() => setSelectedPortfolioItem(item)}
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 backdrop-blur-sm border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <img 
                        src={currentImage} 
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      {/* Image indicator dots for projects with multiple images */}
                      {item.extraImages && item.extraImages.length > 0 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {[item.image, ...item.extraImages].map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                (currentImageIndex[item.id] || 0) === index
                                  ? 'bg-white shadow-lg'
                                  : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 whitespace-nowrap ml-2">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-white text-sm mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tech.map((tech) => (
                          <span key={tech} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          {(portfolioFilter === "All" || portfolioFilter === "Graphics") && (
            <div className="flex justify-center mt-8 md:mt-12">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-gray-700 to-black dark:from-gray-600 dark:to-black border border-gray-600 dark:border-gray-500 rounded-full hover:from-gray-800 hover:to-gray-900 dark:hover:from-gray-500 dark:hover:to-gray-800 transition-all duration-300 transform hover:scale-105 text-sm md:text-base text-white"
              >
                {showAllProjects ? 'Show Less' : 'Show All Projects'} 
                <span className="ml-2">
                  {showAllProjects ? '▲' : '▼'}
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16" style={{color: isDarkMode ? 'white' : '#1f2937'}}>
            Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
              <div key={index} className="bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-3xl md:text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-700 dark:text-white mb-4 md:mb-6 leading-relaxed text-sm md:text-base">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700 dark:text-white">
                      <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full mr-3 flex-shrink-0"></span>
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
      <section id="contact" className="py-12 md:py-20 animate-on-scroll">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16" style={{color: isDarkMode ? 'white' : '#1f2937'}}>
            Get In Touch
          </h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 text-sm md:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 text-sm md:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-white">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-3 py-2 md:px-4 md:py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:border-gray-500 dark:focus:border-gray-400 focus:outline-none backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 resize-none text-sm md:text-base"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 md:py-3 bg-gradient-to-r from-gray-700 to-black dark:from-gray-600 dark:to-gray-900 rounded-lg hover:from-gray-800 hover:to-gray-900 dark:hover:from-gray-500 dark:hover:to-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm md:text-base text-white"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-300 dark:border-gray-600 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center space-y-4">
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm" style={{color: isDarkMode ? 'white' : '#374151'}}>Follow me:</span>
              <div className="flex gap-3">
                <a 
                  href="mailto:ezekielorogbesan@gmail.com" 
                  className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="Email"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://wa.me/+2348166411702" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
                  </svg>
                </a>
                
                <a 
                  href="https://www.instagram.com/zeke_owolabi?igsh=dWNxcnJ1bjE0ODcy&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="Instagram"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://github.com/Owolabi-ui" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  title="GitHub"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-white text-center">
              © 2025 OWOLABI. Built with Next.js, GSAP, and lots of ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      {selectedPortfolioItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 dark:border-gray-600">
            <div className="relative">
              <img 
                src={selectedPortfolioItem.image} 
                alt={selectedPortfolioItem.title}
                className="w-full h-48 md:h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedPortfolioItem(null)}
                className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{selectedPortfolioItem.title}</h3>
                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-white text-sm border border-gray-300 dark:border-gray-600 self-start">
                  {selectedPortfolioItem.category}
                </span>
              </div>
              <p className="text-gray-700 dark:text-white mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {selectedPortfolioItem.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPortfolioItem.tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 md:px-3 md:py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs md:text-sm text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Project Links */}
              <div className="flex flex-wrap gap-3">
                {selectedPortfolioItem.githubUrl && (
                  <a 
                    href={selectedPortfolioItem.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    View Code
                  </a>
                )}
                {selectedPortfolioItem.liveUrl && (
                  <a 
                    href={selectedPortfolioItem.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Live Demo
                  </a>
                )}
                {selectedPortfolioItem.behanceUrl && (
                  <a 
                    href={selectedPortfolioItem.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  >
                    View on Behance
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Project Widget */}
      <div className="fixed left-4 md:left-6 top-16 md:top-20 z-40">
        <div className="group">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-300/50 dark:hover:shadow-gray-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-700 dark:text-white font-medium">Current Project:</span>
              <a 
                href="https://graphics2prints.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-200 transition-colors duration-200 underline decoration-transparent hover:decoration-gray-800 dark:hover:decoration-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                graphics2prints.com
              </a>
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
