"use client"
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { SplitText } from "gsap/SplitText";

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

gsap.registerPlugin(Observer, SplitText);

export default function Home() {
  // GSAP refs
  const sectionsRef = useRef<HTMLElement[]>([]);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const headingsRef = useRef<HTMLHeadingElement[]>([]);
  const outerWrappersRef = useRef<HTMLDivElement[]>([]);
  const innerWrappersRef = useRef<HTMLDivElement[]>([]);
  const splitHeadingsRef = useRef<any[]>([]);
  const animatingRef = useRef(false);
  const currentIndexRef = useRef(-1);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  
  // State management
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<typeof portfolioItems[0] | null>(null);
  
  // Portfolio filtering logic
  const filteredPortfolioItems = portfolioFilter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);
  
  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    sectionsRef.current = Array.from(document.querySelectorAll("section"));
    imagesRef.current = Array.from(document.querySelectorAll(".bg"));
    headingsRef.current = Array.from(document.querySelectorAll(".section-heading"));
    outerWrappersRef.current = Array.from(document.querySelectorAll(".outer"));
    innerWrappersRef.current = Array.from(document.querySelectorAll(".inner"));

    splitHeadingsRef.current = headingsRef.current.map(
      (heading) => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })
    );

    const wrap = gsap.utils.wrap(0, sectionsRef.current.length);

    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    function gotoSection(index: number, direction: number) {
      index = wrap(index);
      animatingRef.current = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: function () {
          animatingRef.current = false;
        },
      });

      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], { yPercent: -15 * dFactor }).set(sectionsRef.current[currentIndexRef.current], { autoAlpha: 0 });
      }

      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(imagesRef.current[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadingsRef.current[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );

      currentIndexRef.current = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: function () {
        if (!animatingRef.current) {
          gotoSection(currentIndexRef.current - 1, -1);
        }
        return;
      },
      onUp: function () {
        if (!animatingRef.current) {
          gotoSection(currentIndexRef.current + 1, 1);
        }
        return;
      },
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);

    // Carousel animation setup
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const items = carousel.querySelectorAll<HTMLDivElement>(".carousel-image");
    const totalItems = items.length;
    const centerIndex = Math.floor(totalItems / 2);

    gsap.killTweensOf(items);
    gsap.killTweensOf(carousel);

    items.forEach((item, i) => {
      gsap.set(item, {
        x: (i - centerIndex) * 220,
        scale: i === centerIndex ? 1 : 0.7,
        opacity: i === centerIndex ? 1 : 0.5,
        zIndex: i === centerIndex ? 10 : 1,
      });
    });

    let currentIndex = centerIndex;

    const updateCoverFlow = (newIndex: number) => {
      currentIndex = newIndex;
      items.forEach((item, i) => {
        const offset = i - currentIndex;
        const scale = offset === 0 ? 1 : 0.7;
        const opacity = offset === 0 ? 1 : 0.5;
        const x = offset * 220;
        const zIndex = offset === 0 ? 10 : 1;

        gsap.to(item, {
          duration: 0.5,
          x,
          scale,
          opacity,
          zIndex,
          ease: "power3.out",
        });
      });
    };

    const next = () => {
      const newIndex = (currentIndex + 1) % totalItems;
      updateCoverFlow(newIndex);
    };

    const intervalId = setInterval(next, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={`relative min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} font-sans transition-colors duration-300`}>
      {/* Glowing Recent Project Box */}
      <a
        href="#portfolio"
        className="fixed right-6 top-1/2 z-40 flex flex-col items-center group"
        style={{ transform: 'translateY(-50%)' }}
        aria-label="Recent Project"
      >
        <div
          className="border-2 border-blue-400 rounded-xl px-4 py-2 bg-black/80 text-white shadow-lg transition-all duration-300 group-hover:shadow-blue-400 group-hover:border-blue-500 group-hover:scale-105 group-hover:bg-black/90"
          style={{ boxShadow: '0 0 16px 0 rgba(59,130,246,0.5)' }}
        >
          <span className="font-semibold text-base tracking-wide">Recent Project</span>
        </div>
        <span className="mt-2 text-blue-400 text-xs opacity-80 group-hover:underline">See more →</span>
      </a>

      {/* Header with Navigation */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-30 bg-black/20 backdrop-blur-sm">
        <div className="text-xl font-bold">Owolabi</div>
        
        <nav className="flex gap-8 text-lg">
          {[
            { href: "#home", label: "Home", Icon: HomeIcon },
            { href: "#about", label: "About", Icon: AboutIcon },
            { href: "#portfolio", label: "Portfolio", Icon: PortfolioIcon },
            { href: "#services", label: "Services", Icon: ServicesIcon },
            { href: "#contact", label: "Contact", Icon: ContactIcon },
          ].map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              className="group relative flex flex-col items-center hover:text-blue-400 transition-colors"
            >
              <span className="block group-hover:hidden w-6 h-6 flex items-center justify-center">
                <Icon />
              </span>
              <span className="absolute top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </nav>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>

      {/* Section 1: Home */}
      <section className="fixed top-0 left-0 w-full h-screen invisible" style={{ visibility: "hidden" }}>
        <div className="outer w-full h-screen overflow-hidden">
          <div className="inner w-full h-screen overflow-hidden">
            <div
              className="bg flex flex-col items-center justify-center absolute top-0 left-0 w-full pt-28 h-full bg-cover bg-center px-6 text-white text-center mx-auto"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(https://images.unsplash.com/photo-1617478755490-e21232a5eeaf?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU1NjM5NA&ixlib=rb-1.2.1&q=75&w=1920)",
              }}
            >
              <h2 className="section-heading text-4xl font-extrabold mb-4 uppercase tracking-wide">
                Crafting Seamless Web Experiences
              </h2>
              <h3 className="text-xl font-semibold mb-4 max-w-xl">
                I build fast, secure, and scalable digital solutions using Next.js, Node.js, and Rust — from modern landing pages to full-stack platforms.
              </h3>
              <p className="mb-6 max-w-xl">
                With every line of code, I focus on performance, accessibility, and sleek UI/UX. Whether you're launching a startup or revamping a legacy app, I bring technical depth and frontend finesse to every build.
              </p>
              <a href="#projects" className="text-blue-400 hover:underline text-lg font-semibold">
                → View My Web Projects
              </a>
              
              {/* Carousel */}
              <div
                ref={(el) => {
                  if (el && !carouselRef.current) {
                    carouselRef.current = el;
                  }
                }}
                className="carousel mt-8 w-full max-w-4xl h-64 relative overflow-hidden select-none cursor-grab"
                style={{ perspective: "800px", transformStyle: "preserve-3d" }}
              >
                {[...Array(5)].map((_, i) => {
                  const c = Math.floor((i / 5) * 360);
                  return (
                    <div
                      key={i}
                      className="carousel-image absolute top-1/2 left-1/2 w-48 h-48 flex items-center justify-center text-white bg-gray-700 rounded-lg shadow-lg"
                      style={{
                        margin: "-96px 0 0 -96px",
                        backgroundColor: `hsl(${c}, 60%, 50%)`,
                        transformOrigin: "50% 50%",
                      }}
                    >
                      Project {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: About */}
      <section className="fixed top-0 left-0 w-full h-full invisible" style={{ visibility: "hidden" }}>
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-cover bg-center px-6 text-white text-center mx-auto"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%), url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&w=1920)",
              }}
            >
              <h2 className="section-heading text-4xl font-extrabold mb-4 uppercase tracking-wide">
                Full-Stack Developer & Designer
              </h2>
              <h3 className="text-xl font-semibold mb-4 max-w-3xl">
                I'm a passionate developer with expertise in modern web technologies and graphic design, creating digital experiences that are both functional and beautiful.
              </h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mb-6">
                <div className="text-center">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">Web Development</h4>
                  <p className="text-sm">Next.js, React, Node.js, TypeScript, MongoDB</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">Systems Programming</h4>
                  <p className="text-sm">Rust, WebAssembly, Performance Optimization</p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-bold mb-2 text-blue-400">Graphic Design</h4>
                  <p className="text-sm">CorelDRAW, Photoshop, Brand Identity, UI/UX</p>
                </div>
              </div>
              <a href="#portfolio" className="text-blue-400 hover:underline text-lg font-semibold">
                → Explore My Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Portfolio */}
      <section className="fixed top-0 left-0 w-full h-full invisible" style={{ visibility: "hidden" }}>
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg flex flex-col items-center justify-start absolute top-0 left-0 w-full h-full bg-cover bg-center px-6 text-white pt-24 overflow-y-auto"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url(https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=srgb&fm=jpg&w=1920)",
              }}
            >
              <div className="w-full max-w-6xl mx-auto">
                <h2 className="section-heading text-4xl font-extrabold mb-8 text-center uppercase tracking-wide">
                  My Portfolio
                </h2>
                
                {/* Portfolio Filter */}
                <div className="flex justify-center mb-8 gap-4 flex-wrap">
                  {["All", "Web Dev", "Graphics", "Rust"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setPortfolioFilter(filter)}
                      className={`px-6 py-2 rounded-full transition-all duration-300 ${
                        portfolioFilter === filter
                          ? "bg-blue-500 text-white shadow-lg scale-105"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                
                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {filteredPortfolioItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      onClick={() => setSelectedPortfolioItem(item)}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-blue-300 text-sm mb-3">{item.category}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-white/20 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Services */}
      <section className="fixed top-0 left-0 w-full h-full invisible" style={{ visibility: "hidden" }}>
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-cover bg-center px-6 text-white text-center mx-auto"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&w=1920)",
              }}
            >
              <h2 className="section-heading text-4xl font-extrabold mb-4 uppercase tracking-wide">
                Services & Solutions
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Web Development</h3>
                  <p className="text-sm">Modern, responsive websites and web applications built with Next.js, React, and Node.js.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Performance Tools</h3>
                  <p className="text-sm">High-performance applications and CLI tools built with Rust for maximum efficiency.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Graphic Design</h3>
                  <p className="text-sm">Brand identity, logo design, and visual communication using CorelDRAW and Photoshop.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Print Solutions</h3>
                  <p className="text-sm">Professional printing services through Herde Enterprises - from business cards to banners.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Full-Stack Development</h3>
                  <p className="text-sm">End-to-end web solutions with database design, API development, and deployment.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Consulting</h3>
                  <p className="text-sm">Technical consulting for architecture decisions, performance optimization, and best practices.</p>
                </div>
              </div>
              <a href="#contact" className="text-blue-400 hover:underline text-lg font-semibold">
                → Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Contact */}
      <section className="fixed top-0 left-0 w-full h-screen invisible" style={{ visibility: "hidden" }}>
        <div className="outer w-full h-screen overflow-hidden">
          <div className="inner w-full h-screen overflow-hidden">
            <div
              className="bg flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-cover bg-center px-6 text-white text-center"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%), url(https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&w=1920)",
              }}
            >
              <h2 className="section-heading text-4xl font-extrabold mb-4 uppercase tracking-wide">
                Let's Create Something Amazing
              </h2>
              <h3 className="text-xl font-semibold mb-8 max-w-2xl">
                Ready to bring your ideas to life? Let's collaborate on your next project.
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-blue-400">Get In Touch</h4>
                  <div className="space-y-2 text-left">
                    <p>📧 contact@owolabi.dev</p>
                    <p>💼 LinkedIn: /in/owolabi-ui</p>
                    <p>🐙 GitHub: /Owolabi-ui</p>
                    <p>🌍 Available Worldwide</p>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h4 className="text-lg font-bold mb-4 text-blue-400">Quick Contact</h4>
                  <form className="space-y-4 text-left">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 rounded bg-white/20 placeholder-gray-300 text-white"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 rounded bg-white/20 placeholder-gray-300 text-white"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full p-3 rounded bg-white/20 placeholder-gray-300 text-white resize-none"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      {selectedPortfolioItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPortfolioItem(null)}
        >
          <div
            className="bg-white/10 backdrop-blur-md rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPortfolioItem.image}
                alt={selectedPortfolioItem.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedPortfolioItem(null)}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 text-xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedPortfolioItem.title}</h3>
              <p className="text-blue-300 mb-4">{selectedPortfolioItem.category}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedPortfolioItem.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-500/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                {selectedPortfolioItem.description}
              </p>
              <div className="flex gap-4">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  View Live
                </button>
                <button className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg transition-colors">
                  View Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
