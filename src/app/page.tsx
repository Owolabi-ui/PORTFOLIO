"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PortfolioModal } from "../components/PortfolioModal";
import { portfolioItems } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { name: "Home", id: "home", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  ) },
  { name: "About", id: "about", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.8-3.3 5.1-5 8-5s6.2 1.7 8 5" />
    </svg>
  ) },
  { name: "Capabilities", id: "capabilities", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="4" rx="1.5" />
      <rect x="13.5" y="12.5" width="7" height="8" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="4" rx="1.5" />
    </svg>
  ) },
  { name: "Experience", id: "experience", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M4 19V7.5A2.5 2.5 0 0 1 6.5 5H17.5A2.5 2.5 0 0 1 20 7.5V19" />
      <path d="M9 9h6M9 13h6M9 17h4" />
    </svg>
  ) },
  { name: "Projects", id: "projects", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 18V8.5A2.5 2.5 0 0 1 7.5 6H10l2 2h4.5A2.5 2.5 0 0 1 19 10.5V18" />
      <path d="M5 18h14" />
    </svg>
  ) },
  { name: "Contact", id: "contact", icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ) },
];

const capabilityCards = [
  {
    title: "IT Operations & Infrastructure",
    description:
      "Identity and access management, device operations, troubleshooting, and system support that keep teams productive and secure.",
    bullets: [
      "Microsoft Entra ID",
      "Apple Business Manager",
      "Directory synchronization",
      "Systems troubleshooting",
    ],
  },
  {
    title: "Workflow & Process Optimization",
    description:
      "Operational systems planning and process automation that reduce friction and improve how teams work across departments.",
    bullets: [
      "Process automation",
      "Data migration",
      "Workflow design",
      "Operational planning",
    ],
  },
  {
    title: "Web & Software Development",
    description:
      "Custom web platforms and digital tools designed to solve practical business problems with strong user experience and clean execution.",
    bullets: [
      "Next.js & Node.js",
      "TypeScript & JavaScript",
      "API integration",
      "Responsive web design",
    ],
  },
];

const experienceEntries = [
  {
    role: "IT Specialist / Systems Administrator",
    company: "The Initiative for Equal Rights (TIERs)",
    period: "June 2026 – Present",
    bullets: [
      "Designed and launched a custom Electronic Medical Records booking platform to streamline client intake and busy operational workflows.",
      "Integrated and synchronized the platform with Microsoft Entra ID to improve identity management and access control.",
      "Managed device and directory operations through Apple Business Manager and Entra ID directory syncs.",
      "Supported system migration and technical troubleshooting to keep day-to-day operations stable and uninterrupted.",
    ],
  },
  {
    role: "Full-Stack Developer & Graphic Designer",
    company: "Herde Enterprises",
    period: "2021 – Present",
    bullets: [
      "Developed web-based solutions for clients and internal operations using modern technologies and responsive interfaces.",
      "Streamlined production workflows and improved operational efficiency through automation and digital process improvements.",
      "Collaborated with stakeholders to translate business needs into technical requirements and design decisions.",
      "Supported digital and print operations with user-focused interfaces, branded assets, and production-ready design work.",
    ],
  },
];

const toolGroups = [
  { title: "Development", items: ["Next.js", "Node.js", "TypeScript", "JavaScript", "Rust", "API Integration"] },
  { title: "IT & Systems", items: ["Microsoft Entra ID", "Apple Business Manager", "Directory Sync", "IT Support", "Systems Troubleshooting"] },
  { title: "Design", items: ["CorelDRAW", "Photoshop", "Responsive Web Design", "UX/UI", "Brand Design"] },
];

const floatingToolOffsets = ["-rotate-2", "rotate-2", "translate-y-3", "-translate-y-2", "rotate-1", "-rotate-1"];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [portfolioFilter, setPortfolioFilter] = useState<"All" | "Web Dev" | "Graphics">("All");
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioItems)[number] | null>(null);
  const [activeCapability, setActiveCapability] = useState<number | null>(0);
  const [showAllMobileProjects, setShowAllMobileProjects] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const filteredProjects =
    portfolioFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((project) => project.category === portfolioFilter);

  const shellClass = isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900";
  const panelClass = isDarkMode
    ? "border-slate-700 bg-slate-900/70"
    : "border-slate-200 bg-white/80 shadow-[0_16px_50px_rgba(15,23,42,0.08)]";
  const mutedText = isDarkMode ? "text-slate-300" : "text-slate-700";
  const softMutedText = isDarkMode ? "text-slate-200" : "text-slate-600";
  const headingText = isDarkMode ? "text-white" : "text-slate-900";
  const subtleText = isDarkMode ? "text-slate-400" : "text-slate-500";
  const pillClass = isDarkMode
    ? "border-slate-700 bg-slate-900/50 text-slate-200"
    : "border-slate-200 bg-slate-100 text-slate-700";
  const inputClass = isDarkMode
    ? "border-slate-700 bg-slate-950/60 text-white placeholder:text-slate-400 focus:border-gray-400"
    : "border-slate-300 bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:border-gray-500";
  const primaryButtonClass = isDarkMode
    ? "bg-gray-500 text-white hover:bg-gray-400"
    : "bg-gray-700 text-white hover:bg-gray-600";
  const secondaryButtonClass = isDarkMode
    ? "border-slate-700 bg-slate-900/60 text-slate-100 hover:border-slate-500 hover:bg-slate-800"
    : "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-100";
  const accentText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const accentBadgeClass = isDarkMode
    ? "border-gray-500/40 bg-gray-500/10 text-gray-200"
    : "border-gray-300 bg-gray-100 text-gray-700";
  const cardSoft = isDarkMode
    ? "border-slate-800 bg-slate-900/70"
    : "border-slate-200 bg-white";
  const projectCardBg = isDarkMode
    ? "border-slate-700 bg-slate-900/60"
    : "border-slate-200 bg-white";
  const projectTagClass = isDarkMode
    ? "border-slate-700 bg-slate-800 text-slate-200"
    : "border-slate-200 bg-slate-100 text-slate-700";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    document.documentElement.classList.toggle("dark", nextMode);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent successfully! I will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again or email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");

    const timeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setIsLoading(false),
    });

    timeline
      .to(".loading-name", { x: window.innerWidth * 0.9, duration: 1.5, delay: 1.4 })
      .to(".loading-screen", { opacity: 0, duration: 0.7 }, "-=0.5");

    timeline
      .fromTo(
        ".hero-title",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.35",
      )
      .fromTo(
        ".hero-subtitle",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.7",
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.6",
      );

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.fromTo(
        element,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${shellClass}`}>
      {isLoading && (
        <div className="loading-screen fixed inset-0 z-[100] flex items-center justify-center bg-slate-950">
          <div className="loading-name whitespace-nowrap text-center text-4xl font-black tracking-[-0.06em] text-transparent md:text-7xl">
            <span className="bg-gradient-to-r from-slate-200 via-white to-slate-400 bg-clip-text">
              EZEKIEL OWOLABI OROGBESAN
            </span>
          </div>
        </div>
      )}

      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <nav className={`glass-panel flex items-center justify-between gap-2 rounded-full px-3 py-2.5 md:px-6 md:py-3 ${panelClass}`}>
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className={`hidden items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] md:flex md:text-sm ${accentText}`}
            >
              EO
            </button>

            <div className="hidden items-center gap-5 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition ${isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex flex-1 items-center justify-center gap-2 md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex h-10 flex-1 items-center justify-center rounded-full border transition ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                  aria-label={item.name}
                  title={item.name}
                >
                  <span className="flex h-4 w-4 items-center justify-center">{item.icon}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleDarkMode}
              className={`ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                isDarkMode
                  ? "border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? "☀" : "☾"}
            </button>
          </nav>
        </div>
      </header>

      <main className="pt-28">
        <section id="home" className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:px-6 md:pt-6">
          <div className="grid gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
            <div className="reveal pt-0 md:pt-4">
              <p className={`mb-4 text-[0.68rem] font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.35em] ${accentText}`}>
                IT Specialist • Web Developer • Operations Builder
              </p>
              <h1 className={`hero-title text-[2.7rem] font-black leading-[0.9] tracking-[-0.07em] sm:text-[3.2rem] md:text-6xl lg:text-7xl ${headingText}`}>
                I build smarter systems, smoother workflows, and digital experiences that work.
              </h1>
              <p className={`hero-subtitle mt-6 max-w-xl text-base leading-7 md:text-lg md:leading-8 ${mutedText}`}>
                I&apos;m Ezekiel Orogbesan — an IT specialist, operations coordinator, and web developer.
              </p>

              <div className="hero-cta mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className={`rounded-full px-6 py-3 text-sm font-semibold transition ${primaryButtonClass}`}
                >
                  View my work
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={`rounded-full border px-6 py-3 text-sm font-semibold transition ${secondaryButtonClass}`}
                >
                  Let&apos;s talk
                </button>
              </div>

              <div className={`mt-10 flex flex-wrap gap-3 text-sm ${softMutedText}`}>
                {[
                  "Next.js",
                  "Node.js",
                  "Microsoft Entra ID",
                  "Apple Business Manager",
                  "Rust",
                  "CorelDRAW",
                  "Photoshop",
                ].map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full border px-3 py-1.5 ${pillClass}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal relative mx-auto hidden w-full justify-center pt-0 md:pt-2 lg:mx-0 lg:flex lg:justify-end">
              <div className={`soft-card relative w-full max-w-[300px] overflow-hidden rounded-[2rem] p-2 md:max-w-[440px] md:p-3 ${isDarkMode ? "" : "border border-slate-200"}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? "from-gray-500/15 via-transparent to-slate-500/10" : "from-gray-200 via-transparent to-slate-200"}`} />
                <div className={`relative overflow-hidden rounded-[1.5rem] border ${isDarkMode ? "border-slate-700 bg-slate-900" : "border-slate-200 bg-white"}`}>
                  <Image
                    src="/images/34273041-134C-4417-A942-1ECEFBC8063A_1_105_c.jpeg"
                    alt="Ezekiel Owolabi Orogbesan"
                    width={800}
                    height={950}
                    className="h-[360px] w-full object-cover object-center md:h-[520px]"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="about-marquee mb-8 overflow-hidden border-y border-slate-200/70 py-3 dark:border-slate-700/80 md:mb-12">
            <div className="about-marquee-track flex min-w-max items-center gap-10 whitespace-nowrap">
              <span className={`text-[clamp(2.2rem,7vw,7rem)] font-black tracking-[-0.06em] ${headingText}`}>
                IT Specialist • Web Developer • Operations Builder
              </span>
              <span className={`text-[clamp(2.2rem,7vw,7rem)] font-black tracking-[-0.06em] ${headingText}`}>
                IT Specialist • Web Developer • Operations Builder
              </span>
              <span className={`text-[clamp(2.2rem,7vw,7rem)] font-black tracking-[-0.06em] ${headingText}`}>
                IT Specialist • Web Developer • Operations Builder
              </span>
            </div>
          </div>

          <div className={`space-y-5 text-base leading-7 md:space-y-6 md:text-base md:leading-8 ${mutedText}`}>
            <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
              Professional summary
            </p>
            <p>
              I&apos;m an IT specialist, operations coordinator, and web developer focused on building efficient digital systems that support real business operations. I work at the intersection of infrastructure, workflow optimization, and custom web development to help teams work smarter and scale with confidence.
            </p>
            <p>
              My background includes systems administration, identity management, process automation, client support, and product development. I help organizations simplify technical complexity and turn operational pain points into practical, reliable digital solutions.
            </p>
          </div>
        </section>

        <section id="capabilities" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mb-8 text-center md:mb-12">
            <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
              Core capabilities
            </p>
            <h2 className={`mt-4 text-2xl font-bold tracking-[-0.04em] md:text-5xl ${headingText}`}>
              Systems, workflows, and digital tools that move businesses forward
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            {capabilityCards.map((service, index) => (
              <div
                key={service.title}
                className={`soft-card rounded-[1.5rem] border-l-2 border-l-gray-500 p-5 transition md:rounded-[2rem] md:p-7 ${
                  index === 0
                    ? isDarkMode
                      ? "bg-gradient-to-br from-slate-800 via-slate-900/80 to-slate-900"
                      : "bg-gradient-to-br from-slate-100 via-white to-slate-50"
                    : cardSoft
                }`}
              >
                {index === 0 && (
                  <p className={`mb-5 text-[10px] font-medium uppercase tracking-[0.25em] ${subtleText}`}>
                    01 / Capabilities
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setActiveCapability(activeCapability === index ? null : index)}
                  className="flex w-full items-start gap-4 text-left md:pointer-events-none"
                  aria-expanded={activeCapability === index}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl md:h-12 md:w-12 ${isDarkMode ? "bg-gray-500/10 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 md:h-6 md:w-6">
                      <path d="M12 2 4 6v6c0 5 3.4 9.7 8 10 4.6-.3 8-5 8-10V6l-8-4Z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="m9 12 2 2 4-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-lg font-semibold leading-tight md:text-2xl ${headingText}`}>{service.title}</span>
                    <span className={`mt-2 block line-clamp-1 text-sm leading-6 md:line-clamp-none md:leading-7 ${mutedText}`}>{service.description}</span>
                  </span>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg md:hidden ${isDarkMode ? "border-slate-700 text-slate-200" : "border-slate-300 text-slate-700"}`}>
                    {activeCapability === index ? "−" : "+"}
                  </span>
                </button>

                <ul className={`mt-5 space-y-2 text-sm ${activeCapability === index ? "block" : "hidden"} md:block ${softMutedText}`}>
                  {service.bullets.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-gray-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mb-8 md:mb-12">
            <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
              Experience
            </p>
            <h2 className={`mt-4 text-2xl font-bold tracking-[-0.04em] md:text-5xl ${headingText}`}>
              Practical work across IT, operations, and development
            </h2>
          </div>

          <div className="space-y-3 md:space-y-6">
            {experienceEntries.map((entry, index) => (
              <div key={entry.role} className={`rounded-[1.5rem] border-l-2 border-l-gray-500 p-5 md:rounded-[2rem] md:p-8 ${index === 0 ? (isDarkMode ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900" : "border-slate-200 bg-gradient-to-br from-slate-100 to-white") : projectCardBg}`}>
                <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className={`mb-3 text-[10px] font-medium uppercase tracking-[0.25em] ${subtleText}`}>0{index + 1} / Experience</p>
                    <p className={`text-[10px] uppercase tracking-[0.2em] md:text-sm md:tracking-[0.25em] ${subtleText}`}>{entry.period}</p>
                    <h3 className={`mt-3 text-xl font-semibold md:text-2xl ${headingText}`}>{entry.role}</h3>
                    <p className={`mt-1 text-sm md:text-base ${mutedText}`}>{entry.company}</p>
                  </div>
                </div>

                <ul className={`space-y-3 text-sm leading-7 md:text-base ${mutedText}`}>
                  {entry.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-gray-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className={`mt-14 max-w-3xl text-3xl font-bold leading-[1.05] tracking-[-0.05em] md:mt-20 md:text-5xl ${headingText}`}>
            Systems, workflows, and digital tools designed to make work feel lighter.
          </p>
        </section>

        <section id="projects" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
                Featured projects
              </p>
              <h2 className={`mt-3 text-2xl font-bold tracking-[-0.04em] md:text-5xl ${headingText}`}>
                Work shaped by operations, design, and technical delivery
              </h2>
            </div>

            <div className={`flex flex-wrap gap-2 rounded-full border p-2 ${panelClass}`}>
              {(["All", "Web Dev", "Graphics"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    setPortfolioFilter(filter);
                    setShowAllMobileProjects(false);
                  }}
                  className={`rounded-full px-3 py-2 text-xs transition md:px-4 md:text-sm ${
                    portfolioFilter === filter
                      ? "bg-gray-600 text-white"
                      : isDarkMode
                        ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => setSelectedProject(project)}
                className={`group overflow-hidden rounded-[1.4rem] border text-left transition duration-300 active:scale-[0.98] md:hover:-translate-y-1 ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900/70 hover:border-gray-500/60"
                    : "border-slate-200 bg-white hover:border-gray-400"
                } ${index >= 4 && !showAllMobileProjects ? "hidden md:block" : ""} ${index % 2 === 0 ? "lg:translate-y-6" : ""}`}
              >
                <div className="relative h-72 overflow-hidden md:h-60">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? "from-slate-950 via-slate-950/20 to-transparent" : "from-slate-900/60 via-slate-900/10 to-transparent"}`} />
                  <span className={`absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${accentBadgeClass}`}>
                    {project.accent || project.category}
                  </span>
                </div>

                <div className={`relative z-10 -mt-8 mx-3 mb-3 space-y-4 rounded-[1.2rem] p-5 md:mx-0 md:mb-0 md:mt-0 md:rounded-none ${isDarkMode ? "bg-slate-900 md:bg-transparent" : "bg-white md:bg-transparent"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-[10px] font-medium uppercase tracking-[0.25em] ${subtleText}`}>
                      0{index + 1} · {project.category}
                    </span>
                    <span className={`flex items-center gap-1 text-xs ${subtleText}`}>
                      View details
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
                        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>

                  <h3 className={`text-xl font-semibold ${headingText}`}>{project.title}</h3>
                  <p className={`line-clamp-3 text-sm leading-7 ${mutedText}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`rounded-full border px-2.5 py-1 text-[10px] ${projectTagClass}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredProjects.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllMobileProjects(!showAllMobileProjects)}
              className={`mx-auto mt-6 flex rounded-full border px-5 py-3 text-sm font-semibold transition active:scale-[0.98] md:hidden ${secondaryButtonClass}`}
            >
              {showAllMobileProjects ? "Show fewer projects" : `Show ${filteredProjects.length - 4} more projects`}
            </button>
          )}
        </section>

        <section id="tools" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mb-8 md:mb-12">
            <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
              Tools / tech stack
            </p>
            <h2 className={`mt-4 text-2xl font-bold tracking-[-0.04em] md:text-5xl ${headingText}`}>
              Tools used across development, operations, and design
            </h2>
          </div>

          <div className="relative min-h-[340px] overflow-hidden py-10 md:grid md:min-h-0 md:grid-cols-3 md:gap-6 md:overflow-visible md:py-0">
            <div className={`pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl md:hidden ${isDarkMode ? "bg-slate-700/50" : "bg-slate-300/60"}`} />
            <p className={`absolute inset-x-0 top-0 text-center text-[10px] font-medium uppercase tracking-[0.3em] md:hidden ${subtleText}`}>
              The working stack
            </p>
            <div className="relative flex flex-wrap content-center justify-center gap-x-3 gap-y-5 md:hidden">
              {toolGroups.flatMap((group) => group.items).map((item, index) => (
                <span
                  key={item}
                  className={`rounded-full border px-4 py-2.5 text-sm font-medium shadow-lg transition ${floatingToolOffsets[index % floatingToolOffsets.length]} ${
                    isDarkMode
                      ? "border-slate-700 bg-slate-900/90 text-slate-100 shadow-slate-950/30"
                      : "border-slate-200 bg-white/90 text-slate-700 shadow-slate-300/30"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-3 md:gap-6">
            {toolGroups.map((group, index) => (
              <div key={group.title} className={`rounded-[1.5rem] border-l-2 border-l-gray-500 p-5 md:rounded-[2rem] md:p-6 ${index === 0 ? (isDarkMode ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900" : "border-slate-200 bg-gradient-to-br from-slate-100 to-white") : projectCardBg}`}>
                {index === 0 && <p className={`mb-3 text-[10px] font-medium uppercase tracking-[0.25em] ${subtleText}`}>01 / Toolkit</p>}
                <h3 className={`mb-4 text-xl font-semibold ${headingText}`}>{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className={`rounded-full border px-3 py-1.5 text-xs md:text-sm ${pillClass}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        </section>

        <section id="education" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="mb-8 md:mb-12">
            <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
              Education & certificates
            </p>
            <h2 className={`mt-4 text-2xl font-bold tracking-[-0.04em] md:text-5xl ${headingText}`}>
              Continued learning with a practical, hands-on approach
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-6">
            <div className={`rounded-[1.5rem] border-l-2 border-l-gray-500 p-5 md:rounded-[2rem] md:p-6 ${isDarkMode ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900" : "border-slate-200 bg-gradient-to-br from-slate-100 to-white"}`}>
              <p className={`mb-3 text-[10px] font-medium uppercase tracking-[0.25em] ${subtleText}`}>01 / Learning</p>
              <p className={`text-[10px] uppercase tracking-[0.2em] md:text-sm md:tracking-[0.25em] ${subtleText}`}>Education</p>
              <h3 className={`mt-3 text-lg font-semibold md:text-xl ${headingText}`}>National Open University of Nigeria</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>Undergraduate studies (ongoing)</p>
            </div>
            <div className={`rounded-[1.5rem] border-l-2 border-l-gray-500 p-5 md:rounded-[2rem] md:p-6 ${projectCardBg}`}>
              <p className={`text-[10px] uppercase tracking-[0.2em] md:text-sm md:tracking-[0.25em] ${subtleText}`}>Secondary school</p>
              <h3 className={`mt-3 text-lg font-semibold md:text-xl ${headingText}`}>Eben Noble College</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>High School Certificate</p>
            </div>
            <div className={`rounded-[1.5rem] border-l-2 border-l-gray-500 p-5 md:rounded-[2rem] md:p-6 ${projectCardBg}`}>
              <p className={`text-[10px] uppercase tracking-[0.2em] md:text-sm md:tracking-[0.25em] ${subtleText}`}>Certification</p>
              <h3 className={`mt-3 text-lg font-semibold md:text-xl ${headingText}`}>Udemy</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>Web Solutions and IT certificate</p>
            </div>
          </div>
        </section>

        <section id="contact" className="reveal mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
            <div className={`soft-card rounded-[1.5rem] p-5 md:rounded-[2rem] md:p-10 ${cardSoft}`}>
              <p className={`text-xs font-medium uppercase tracking-[0.25em] md:text-sm md:tracking-[0.3em] ${accentText}`}>
                Let&apos;s work together
              </p>
              <h2 className={`mt-4 text-2xl font-bold tracking-[-0.04em] md:text-4xl ${headingText}`}>
                Need a website, brand asset, or creative partner?
              </h2>
              <p className={`mt-5 text-sm leading-7 md:text-base md:leading-8 ${mutedText}`}>
                I help businesses turn ideas into polished digital experiences that feel premium and perform well.
              </p>

              <div className={`mt-8 space-y-4 ${softMutedText}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${isDarkMode ? "bg-gray-500/10 text-gray-300" : "bg-gray-200 text-gray-700"}`}>✉</span>
                  <a href="mailto:ezekielorogbesan@gmail.com" className={`${isDarkMode ? "hover:text-white" : "hover:text-slate-900"} text-sm md:text-base`}>
                    ezekielorogbesan@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${isDarkMode ? "bg-emerald-500/10 text-emerald-300" : "bg-emerald-100 text-emerald-700"}`}>☎</span>
                  <a href="https://wa.me/+2348166411702" target="_blank" rel="noreferrer" className={`${isDarkMode ? "hover:text-white" : "hover:text-slate-900"} text-sm md:text-base`}>
                    +234 816 641 1702
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${isDarkMode ? "bg-sky-500/10 text-sky-300" : "bg-sky-100 text-sky-700"}`}>GH</span>
                  <a href="https://github.com/owolabi-ui" target="_blank" rel="noreferrer" className={`${isDarkMode ? "hover:text-white" : "hover:text-slate-900"} text-sm md:text-base`}>
                    github.com/owolabi-ui
                  </a>
                </div>
              </div>

              <div className="relative mt-8 h-52 overflow-hidden rounded-[1.35rem] lg:hidden">
                <Image
                  src="/images/34273041-134C-4417-A942-1ECEFBC8063A_1_105_c.jpeg"
                  alt="Ezekiel Owolabi Orogbesan"
                  fill
                  sizes="(max-width: 1023px) 100vw, 0px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-200">
                    Let&apos;s build together
                  </p>
                  <p className="mt-2 text-lg font-semibold leading-tight">
                    Practical digital work, built around your goals.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={`soft-card rounded-[1.5rem] p-5 md:rounded-[2rem] md:p-10 ${cardSoft}`}>
              <div className="grid gap-5 md:grid-cols-2">
                <label className={`block text-sm md:col-span-1 ${softMutedText}`}>
                  <span className="mb-2 block">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    required
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`}
                    placeholder="Your name"
                  />
                </label>

                <label className={`block text-sm md:col-span-1 ${softMutedText}`}>
                  <span className="mb-2 block">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    required
                    className={`w-full rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`}
                    placeholder="you@example.com"
                  />
                </label>

                <label className={`block text-sm md:col-span-2 ${softMutedText}`}>
                  <span className="mb-2 block">Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    required
                    className={`w-full resize-none rounded-2xl border px-4 py-3 outline-none transition ${inputClass}`}
                    placeholder="Tell me a little about your project..."
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-full px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${primaryButtonClass}`}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
                <p className={`text-xs ${subtleText}`}>Typically replies within 24 hours.</p>
              </div>
            </form>

          </div>
        </section>
      </main>

      {selectedProject && (
        <PortfolioModal item={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
