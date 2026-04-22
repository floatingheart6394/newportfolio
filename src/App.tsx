import { motion, useScroll, useSpring, useInView, AnimatePresence, useMotionValue } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Cpu, 
  Award, 
  BookOpen, 
  ChevronRight,
  Terminal,
  Layers,
  Globe,
  Send,
  CheckCircle2,
  Loader2,
  Server,
  Camera,
  Image as ImageIcon,
  X,
  User,
  MapPin,
  GraduationCap,
  Star,
  Heart,
  Menu
} from "lucide-react";
import React, { useRef, useState, useEffect, useCallback } from "react";

// --- Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorColor, setCursorColor] = useState("#7c3aed");
  const [opacity, setOpacity] = useState(1);
  const [contrastMode, setContrastMode] = useState(false);
  const [isOverPurple, setIsOverPurple] = useState(false);
  const [isOverBlack, setIsOverBlack] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const overPurple = target.closest('#education-card, #contact, .bg-brand-600');
      const overBlack = target.closest('#projects, #participations, #footer, .bg-slate-900, .bg-slate-800');
      const isWhiteBg = (target.classList.contains('bg-white') || target.closest('.bg-white')) && !overPurple && !overBlack;
      
      setIsOverPurple(!!overPurple);
      setIsOverBlack(!!overBlack && !isWhiteBg);

      // Refined check for text: triggers consistently across words but respects empty space
      let isOverText = false;
      if (typeof (document as any).caretRangeFromPoint === 'function') {
        const range = (document as any).caretRangeFromPoint(e.clientX, e.clientY);
        if (range && range.startContainer.nodeType === 3) {
          const parent = range.startContainer.parentElement;
          const isTextTag = parent && ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'A', 'B', 'STRONG', 'EM'].includes(parent.tagName);
          
          if (isTextTag) {
            // Get the bounding box of the text range at this point
            // This prevents triggering if we are far away from the actual characters
            const rect = range.getBoundingClientRect();
            const distance = Math.sqrt(
              Math.pow(e.clientX - (rect.left + rect.width / 2), 2) + 
              Math.pow(e.clientY - (rect.top + rect.height / 2), 2)
            );
            
            // 20px threshold covers word gaps and line spacing without triggering in empty gutters
            if (distance < 20) {
              isOverText = true;
            }
          }
        }
      }

      // Precision check for icons: must be directly over the icon
      const targetElement = document.elementFromPoint(e.clientX, e.clientY);
      const isIcon = !!targetElement?.closest('svg, i, .lucide');

      const isContent = isOverText || isIcon;
      setContrastMode(isContent);

      if (overPurple) {
        // Black cursor on purple backgrounds
        setCursorColor("#000000");
      } else {
        // Brand purple cursor elsewhere
        setCursorColor("#7c3aed");
      }
      
      // Transparent version when over text/icons
      setOpacity(isContent ? 0.45 : 1);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Precision Context-Aware Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : (isHovering || contrastMode ? 2.8 : 1),
          // Shadow ONLY on buttons/links
          boxShadow: isHovering 
            ? "0 0 25px 10px rgba(124, 58, 237, 0.3)" 
            : "0 0 0px 0px rgba(0, 0, 0, 0)",
          backgroundColor: cursorColor,
          opacity: opacity,
          mixBlendMode: "normal",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 30,
          backgroundColor: { duration: 0.2 } 
        }}
      />
    </>
  );
};

const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Heavy Moving Grid */}
      <div className="absolute inset-0 opacity-[0.12] animate-move-grid" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(79, 70, 229, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(79, 70, 229, 0.5) 2px, transparent 2px)',
          backgroundSize: '50px 50px' 
        }} 
      />

      {/* Floating Code Snippets */}
      <motion.div 
        animate={{ 
          x: [-50, 250, -50],
          y: [-100, 100, -100],
          rotate: [0, 360]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[10%] text-brand-500/40 font-mono text-6xl font-black select-none"
      >
        {"{...}"}
      </motion.div>
      <motion.div 
        animate={{ 
          x: [150, -300, 150],
          y: [200, -200, 200],
          rotate: [360, 0]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[10%] right-[10%] text-cyan-500/40 font-mono text-8xl font-black select-none"
      >
        {"import"}
      </motion.div>

      {/* Falling Binary/Code "Particles" */}
      <div className="absolute inset-0 opacity-[0.25]">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -1000, opacity: 0 }}
            animate={{ y: 2500, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
            className="absolute text-brand-500 font-mono text-[10px] whitespace-nowrap writing-mode-vertical"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {Array(30).fill(0).map(() => (Math.random() > 0.5 ? "1" : "0")).join("")}
          </motion.div>
        ))}
      </div>
      
      {/* Moving Blobs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-12 h-12 rounded-full blur-3xl"
          style={{
            background: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#ec4899',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 600 - 300, 0],
            y: [0, Math.random() * 600 - 300, 0],
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 3, 1],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const SectionHeader = ({ title, subtitle, dark = false }: { title: string; subtitle?: string; dark?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      {subtitle && <p className={`text-lg max-w-2xl ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{subtitle}</p>}
      <div className="h-1.5 w-20 bg-brand-500 mt-4 rounded-full" />
    </motion.div>
  );
};

const ProjectCard = ({ project }: { project: any; key?: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full group"
    >
      <div className="h-80 bg-slate-50/50 backdrop-blur-sm relative overflow-hidden border-b border-slate-100 p-3">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-top rounded-xl border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-cyan-500/20 border-4 border-white shadow-sm">
            <Code2 className="w-12 h-12 text-slate-300 group-hover:text-brand-400 transition-colors" />
          </div>
        )}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand-600 shadow-sm border border-slate-100">
          {project.date}
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{project.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-100 group-hover:border-brand-200 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <ul className="space-y-2 mb-6">
          {project.highlights.slice(0, 2).map((h: string, i: number) => (
            <li key={i} className="text-xs text-slate-500 flex gap-2">
              <ChevronRight className="w-3 h-3 text-brand-500 shrink-0 mt-0.5" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          <a 
            href={project.github || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <Github className="w-4 h-4" /> Code
          </a>
          <a 
            href={project.demo || "#"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ParticipationCard = ({ item, onClick }: { item: any; onClick: () => void; key?: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.5, type: "spring" }}
      onClick={onClick}
      className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full group"
    >
      <div className="h-64 bg-slate-50/50 backdrop-blur-sm relative overflow-hidden border-b border-slate-100 p-3">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover object-center rounded-xl border-4 border-white shadow-sm group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center rounded-xl bg-slate-50 border-4 border-white shadow-sm">
            <Camera className="w-12 h-12 text-slate-200" />
          </div>
        )}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-brand-600 shadow-sm border border-slate-100">
          {item.date}
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{item.title}</h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags?.map((tag: string) => (
            <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded border border-slate-100 group-hover:border-brand-200 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <div className="flex items-center gap-2 text-sm font-bold text-brand-600 group-hover:translate-x-2 transition-transform cursor-pointer inline-flex">
          View Details <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
};

interface Achievement {
  title: string;
  issuer: string;
  instructor?: string;
  year: string;
  score?: string;
}

const CertificateCard = ({ i, idx, achievement, setSelectedItem }: { i: number; idx: number; achievement: Achievement; setSelectedItem: (item: any) => void }) => {
  const imgMap: Record<number, string> = {
    1: "/cert1.png",
    2: "/cert3.png",
    3: "/cert5.png",
    4: "/cert4.png",
    5: "/cert2.JPG"
  };
  const img = imgMap[i];

  const formattedDescription = `${achievement.title}\nIssued by: ${achievement.issuer}${achievement.instructor ? `\nInstructor: ${achievement.instructor}` : ''}\nYear: ${achievement.year}${achievement.score ? `\nScore: ${achievement.score}` : ''}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, rotate: idx % 2 === 0 ? -5 : 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        delay: idx * 0.1 
      }}
      whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
                onClick={() => {
                  if (img) {
                    setSelectedItem({ 
                      image: img, 
                      type: i === 5 ? "Achievement" : "Certification", 
                      title: achievement.title,
                      description: `Issued by: ${achievement.issuer}${achievement.instructor ? `\nInstructor: ${achievement.instructor}` : ''}\nYear: ${achievement.year}${achievement.score ? `\nScore: ${achievement.score}` : ''}`
                    });
                  }
                }}
      className="aspect-[4/3] bg-white/70 backdrop-blur-md rounded-2xl border-2 border-solid border-brand-500 flex flex-col items-center justify-center text-slate-300 group hover:border-brand-600 transition-all cursor-pointer overflow-hidden relative shadow-lg hover:shadow-2xl"
    >
      {img ? (
        <img 
          src={img} 
          alt={`Certificate ${i}`} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : (
        <>
          <Award className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Achievement</span>
        </>
      )}
      <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

const AchievementPoint = ({ achievement, idx }: { achievement: Achievement; idx: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: false }}
    transition={{ delay: idx * 0.05 }}
    className="flex gap-4 items-start group"
  >
    <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-brand-100 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
      <Award className="w-6 h-6" />
    </div>
    <div className="flex flex-col">
      <h4 className="text-slate-900 font-bold text-lg leading-tight group-hover:text-brand-600 transition-colors">{achievement.title}</h4>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
        <span className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-brand-400" />
          {achievement.issuer}
        </span>
        {achievement.instructor && (
          <span className="text-slate-400 text-sm italic font-medium">
            ({achievement.instructor})
          </span>
        )}
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
          {achievement.year}
        </span>
        {achievement.score && (
          <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
            Score: {achievement.score}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ image: string; title: string; description?: string; type?: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const resumeData = {
    name: "Reshma V",
    title: "AI & Data Science Student | Backend Developer",
    summary: "Dedicated second-year B.Tech student specializing in Artificial Intelligence and Data Science. I am passionate about engineering robust backend systems and crafting seamless full-stack experiences. With a foundation in Python, JavaScript, and RESTful architectures, I focus on building scalable, data-driven solutions and am eager to contribute to innovative production environments.",
    contact: {
      email: "reshmavijayakumar88@gmail.com",
      linkedin: "https://www.linkedin.com/in/reshma-vijayakumar",
      github: "https://github.com/floatingheart6394"
    },
    skills: [
      { category: "Languages", items: ["Python", "JavaScript", "SQL"], icon: <Terminal className="w-5 h-5" /> },
      { category: "Frameworks", items: ["FastAPI", "Node.js", "Express.js", "React.js", "Bootstrap"], icon: <Layers className="w-5 h-5" /> },
      { category: "Databases", items: ["PostgreSQL", "SQLite"], icon: <Database className="w-5 h-5" /> },
      { category: "Web Tech", items: ["HTML", "CSS", "REST APIs"], icon: <Globe className="w-5 h-5" /> },
      { category: "Tools", items: ["Git", "GitHub", "VS Code", "Jupyter Notebook"], icon: <Code2 className="w-5 h-5" /> }
    ],
    projects: [
      {
        title: "TRAVISTA - YOUR SMART TRAVEL COMPANION",
        date: "JAN 2026",
        image: "/travista.png",
        github: "https://github.com/floatingheart6394/Travista",
        demo: "https://travista-two.vercel.app/",
        description: "An AI-powered integrated travel platform that secured 2nd prize at the PSG iTech Project Expo 2026. Designed to unify itineraries, expense tracking, and emergency safety features into a single, seamless experience.",
        tags: ["Python", "FastAPI", "PostgreSQL", "RAG"],
        highlights: [
          "Secured 2nd Prize at Department Project Expo 2026 as Team Lead (ThinkSync)",
          "Led backend implementation, architecting RESTful APIs and database schemas",
          "Engineered unified system integration for AI itineraries and RAG-based assistance",
          "Managed end-to-end development lifecycles, team coordination, and GitHub workflows"
        ]
      },
      {
        title: "RESUME CHECKER- AI",
        date: "DEC 2025",
        image: "/resume-checker.png",
        github: "https://github.com/floatingheart6394/Resume-Checker",
        description: "AI-based resume analysis system using TF-IDF vectorization and Naive Bayes classification.",
        tags: ["Python", "Naive Bayes", "SQLite", "Matplotlib"],
        highlights: [
          "Implemented TF-IDF vectorization for content evaluation",
          "Performed feature extraction and model training for text classification",
          "Designed interactive web interface using HTML/CSS/JS",
          "Utilized Matplotlib for data visualization of analytical insights"
        ]
      }
    ],
    education: {
      institution: "PSG Institute of Technology and Applied Research, Neelambur",
      degree: "BTech Artificial Intelligence and Data Science",
      period: "2024 – 2028",
      cgpa: "8.33"
    },
    achievements: [
      { title: "The Complete Web Development Bootcamp", issuer: "Udemy", instructor: "Dr. Angela Yu", year: "2026" },
      { title: "Won 2nd Prize in Department Project Expo for Travista", issuer: "PSG iTech", year: "2026" },
      { title: "The Joy of Computing Using Python", issuer: "NPTEL", instructor: "Prof. Sudarshan Iyengar (IIT Ropar)", year: "2025", score: "85%" },
      { title: "Python PCAP: Certified Associate in Python Programming", issuer: "Udemy", instructor: "Adrian Weich", year: "2025" },
      { title: "Python PCEP: Certified Entry-Level Python Programmer", issuer: "Udemy", instructor: "Adrian Weich", year: "2024" }
    ],
    participations: [
      { 
        title: "SAP X Great Lakes Hackfest 2026", 
        date: "FEB 2026",
        image: "/Screenshot 2026-04-15 104929.png",
        description: "Represented Team PentaCode at SAP Hackfest 2026, developing a high-precision 4-level data filtering architecture. Engineered a multi-stage pipeline integrating rule-based logic, ML models, graph-based analytics, and LLM-driven refinement to optimize data processing relevance and accuracy.",
        tags: ["Hackathon", "ML", "LLM", "SAP"]
      },
      { 
        title: "GDG Coimbatore Devfest 2025", 
        date: "NOV 2025",
        image: "/Screenshot 2026-04-15 110941.png",
        description: "Attended DevFest Coimbatore 2025 themed 'Human & AI Collaboration.' Explored performance profiling using Chrome DevTools AI, building zero-cost SaaS platforms with Convex, and rapid prototyping of AI-powered applications with Firebase Studio. Gained deep insights into AI safety, prompt engineering, and collaborative software development from industry experts.",
        tags: ["GDG", "AI", "SaaS"]
      },
      { 
        title: "Industry Academia Conclave 2025", 
        date: "FEB 2025",
        image: "/Screenshot 2026-04-15 111117.png",
        description: "Participated in the 8th Industry Academia Conclave themed 'Engineering the Future with AI' at PSG iTech. Gained deep insights from industry leaders at DRDO, GitHub, and TCS on AI infrastructure, secure engineering, and GitHub workflows. Explored emerging career paths in Physical AI and open-source ecosystems to align academic projects with modern industry expectations.",
        tags: ["Conclave", "AI", "GitHub"]
      },
      { 
        title: "'Hands-on AI' workshop | SRiSHTi 2k24", 
        date: "OCT 2024",
        image: "/Screenshot 2026-04-15 111213.png",
        description: "Engaged in an intensive workshop at PSG College of Technology exploring Generative AI and transformers. Developed a chatbot and implemented Retrieval-Augmented Generation (RAG) workflows using Groq and Mistral AI under industry guidance.",
        tags: ["Workshop", "AI", "RAG"]
      }
    ],
    volunteering: [
      {
        role: "Class Representative",
        period: "2025-2026",
        description: "Serving as the primary liaison between students and faculty, ensuring smooth communication and addressing academic concerns. Managed class schedules and organized internal department activities."
      },
      {
        role: "Technical Event Lead",
        period: "Yukta 2k26",
        description: "Planned and executed a technical event named 'Fast & Curious - Web Drift' as part of the Yukta 2k26 symposium, focusing on vibe coding and industry standards."
      },
      {
        role: "Workshop Volunteer & Performer",
        period: "Yukta 2k25",
        description: "Volunteered for the Nex Gen AI workshop and performed dance during the symposium."
      },
      {
        role: "Executive Member of Coding Club",
        period: "2025-2026",
        description: "Coordinated a technical event named 'Code Warz' - a competitive coding event organized to enhance problem-solving skills among students."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-transparent font-sans relative">
      <BackgroundDecorations />
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 border-b border-black/10 ${scrolled ? "glass py-2 shadow-sm" : "py-4"}`}>
        <div className="container mx-auto px-6 flex justify-between md:justify-center items-center">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-brand-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex gap-6 lg:gap-10 items-center">
            {[
              { name: "About", icon: <User className="w-4 h-4" />, color: "text-purple-500" },
              { name: "Skills", icon: <Cpu className="w-4 h-4" />, color: "text-cyan-500" },
              { name: "Projects", icon: <Code2 className="w-4 h-4" />, color: "text-pink-500" },
              { name: "Achievements", icon: <Award className="w-4 h-4" />, color: "text-amber-500" },
              { name: "Participations", icon: <Globe className="w-4 h-4" />, color: "text-blue-500" },
              { name: "Volunteering", icon: <Heart className="w-4 h-4" />, color: "text-rose-500" },
              { name: "Contact", icon: <Mail className="w-4 h-4" />, color: "text-emerald-500" },
            ].map((item) => (
              <a 
                key={item.name} 
                href={`#${item.name.toLowerCase()}`}
                className="group flex flex-col items-center gap-1 transition-all"
              >
                <div className={`${item.color} opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                  {item.icon}
                </div>
                <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-brand-600 transition-colors">
                  {item.name}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile Logo/Name placeholder for balance */}
          <div className="md:hidden font-bold text-brand-600 tracking-tighter">RV.</div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-4 p-6">
                {[
                  { name: "About", icon: <User className="w-5 h-5" />, color: "text-purple-500" },
                  { name: "Skills", icon: <Cpu className="w-5 h-5" />, color: "text-cyan-500" },
                  { name: "Projects", icon: <Code2 className="w-5 h-5" />, color: "text-pink-500" },
                  { name: "Achievements", icon: <Award className="w-5 h-5" />, color: "text-amber-500" },
                  { name: "Participations", icon: <Globe className="w-5 h-5" />, color: "text-blue-500" },
                  { name: "Volunteering", icon: <Heart className="w-5 h-5" />, color: "text-rose-500" },
                  { name: "Contact", icon: <Mail className="w-5 h-5" />, color: "text-emerald-500" },
                ].map((item) => (
                  <a 
                    key={item.name} 
                    href={`#${item.name.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-brand-50 transition-colors"
                  >
                    <div className={item.color}>{item.icon}</div>
                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200 rounded-full filter blur-3xl opacity-40 animate-blob" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-pink-200 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-600 text-white text-sm font-bold mb-6 shadow-[0_0_20px_rgba(124,58,237,0.4)] animate-pulse border border-brand-400">
                  Available for Internships
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                  Hi, I'm <span className="text-gradient">{resumeData.name}</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                  Aspiring <span className="text-brand-600 font-semibold">AI Engineer</span> specializing in high-performance backend systems. I bridge the gap between data-driven insights and <span className="text-slate-900 font-semibold">scalable full-stack applications</span>.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a href="#projects" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 group">
                    View Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="flex-1 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                <div className="w-64 h-80 md:w-80 md:h-[420px] rounded-3xl bg-gradient-to-br from-brand-500 to-cyan-500 p-1 rotate-3 shadow-2xl">
                  <div className="w-full h-full bg-slate-100 rounded-[22px] overflow-hidden flex items-center justify-center border-4 border-dashed border-white/50">
                    <img 
                      src="/profile.png" 
                      alt="Reshma V" 
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-14 -right-10 w-40 h-44 hidden md:block z-20 group/badge rotate-[-12deg]">
                  <svg viewBox="0 0 100 110" className="w-full h-full drop-shadow-2xl transition-transform group-hover/badge:scale-110 duration-500">
                    {/* Ribbons */}
                    <g className="text-slate-300">
                      <path d="M38 70 L30 105 L42 95 L54 105 L46 70" fill="white" stroke="currentColor" strokeWidth="1" />
                      <path d="M62 70 L70 105 L58 95 L46 105 L54 70" fill="white" stroke="currentColor" strokeWidth="1" />
                    </g>
                    {/* Scalloped Rosette Body */}
                    <path 
                      fill="white" 
                      stroke="#e2e8f0" 
                      strokeWidth="1.5"
                      d="M50,5 Q54,5 57,8 Q60,11 64,11 Q68,11 71,14 Q74,17 77,21 Q80,25 80,29 Q80,33 83,36 Q86,39 86,43 Q86,47 83,50 Q80,53 80,57 Q80,61 77,65 Q74,69 71,72 Q68,75 64,75 Q60,75 57,78 Q54,81 50,81 Q46,81 43,78 Q40,75 36,75 Q32,75 29,72 Q26,69 23,65 Q20,61 20,57 Q20,53 17,50 Q14,47 14,43 Q14,39 17,36 Q20,33 20,29 Q20,25 23,21 Q26,17 29,14 Q32,11 36,11 Q40,11 43,8 Q46,5 50,5 Z"
                    />
                    <circle cx="50" cy="43" r="28" fill="none" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                  <div className="absolute top-[21%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-brand-600">
                    <Code2 className="w-7 h-7 mb-1 -ml-1" />
                    <span className="text-[9.5px] font-bold text-center uppercase tracking-tighter w-16 leading-tight">Software Developer</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>      {/* About & Education Section */}
      <section id="about" className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title="About me" 
              subtitle="A blend of academic excellence and passionate engineering."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Bio Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                className="md:col-span-8 bg-slate-50/60 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-slate-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Who I Am</h3>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    {resumeData.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white rounded-xl border border-brand-200 shadow-[0_0_15px_rgba(124,58,237,0.15)] flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-700">Open for Internships</span>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500" />
                    <span className="text-sm font-bold text-slate-700">Coimbatore, India</span>
                  </div>
                </div>
              </motion.div>

              {/* Education Card */}
              <motion.div 
                id="education-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 }}
                className="md:col-span-4 bg-brand-600/90 backdrop-blur-md rounded-3xl p-8 text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-colors" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Education</h3>
                    <p className="text-brand-100 text-sm font-medium mb-6">{resumeData.education.period}</p>
                    <h4 className="text-lg font-bold leading-tight mb-4">
                      {resumeData.education.degree}
                    </h4>
                    <p className="text-brand-100 text-sm leading-relaxed">
                      {resumeData.education.institution}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-brand-200" />
                      <span className="text-sm font-bold">CGPA: {resumeData.education.cgpa}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="md:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 text-white flex flex-col items-center justify-center text-center border border-slate-800"
                >
                  <span className="text-3xl font-bold text-brand-400 mb-1">2028</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Expected Graduation</span>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm"
                >
                  <span className="text-3xl font-bold text-brand-600 mb-1">{resumeData.education.cgpa}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Current CGPA</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-50 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100"
                >
                  <span className="text-3xl font-bold text-brand-600 mb-1">2</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Current Year</span>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 }}
                  className="bg-brand-50 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-brand-100"
                >
                  <span className="text-3xl font-bold text-brand-700 mb-1">AI & DS</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">Course</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Technical Skills" 
            subtitle="The tools and technologies I use to bring ideas to life."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {resumeData.skills.map((skill, idx) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-brand-200 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  {skill.icon}
                </div>
                <h4 className="font-bold text-slate-900 mb-3">{skill.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span key={item} className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-transparent text-slate-900">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-slate-600 max-w-xl">A selection of my recent work in AI and Backend development.</p>
              <div className="h-1.5 w-20 bg-brand-500 mt-4 rounded-full" />
            </div>
            <button className="text-brand-600 font-bold flex items-center gap-2 hover:text-brand-700 transition-colors">
              View All Github <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {resumeData.projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Certifications and Achievements" 
            subtitle="A collection of my professional certifications and key academic milestones."
          />
          
          <div className="max-w-6xl mx-auto space-y-20">
            {/* Row 1: Points 0, 1 & Certs 1, 5 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-10">
                <AchievementPoint achievement={resumeData.achievements[0]} idx={0} />
                <AchievementPoint achievement={resumeData.achievements[1]} idx={1} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <CertificateCard i={1} idx={0} achievement={resumeData.achievements[0]} setSelectedItem={setSelectedItem} />
                <CertificateCard i={5} idx={1} achievement={resumeData.achievements[1]} setSelectedItem={setSelectedItem} />
              </div>
            </div>

            {/* Row 2: Points 2, 3 & Certs 3, 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-10">
                <AchievementPoint achievement={resumeData.achievements[2]} idx={2} />
                <AchievementPoint achievement={resumeData.achievements[3]} idx={3} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <CertificateCard i={3} idx={2} achievement={resumeData.achievements[2]} setSelectedItem={setSelectedItem} />
                <CertificateCard i={2} idx={3} achievement={resumeData.achievements[3]} setSelectedItem={setSelectedItem} />
              </div>
            </div>

            {/* Row 3: Point 4 & Cert 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-10">
                <AchievementPoint achievement={resumeData.achievements[4]} idx={4} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <CertificateCard i={4} idx={4} achievement={resumeData.achievements[4]} setSelectedItem={setSelectedItem} />
                <div className="hidden md:block" /> {/* Spacer for alignment */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Participations Section */}
      <section id="participations" className="py-20 bg-transparent text-slate-900 relative">
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeader 
            title="Participations" 
            subtitle="Events, hackathons, and conferences I've attended."
            dark={false}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {resumeData.participations.map((item, idx) => (
              <ParticipationCard 
                key={idx} 
                item={item} 
                onClick={() => item.image && setSelectedItem({ 
                  image: item.image, 
                  type: "Participation", 
                  title: item.title, 
                  description: item.description 
                })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Volunteering Section */}
      <section id="volunteering" className="py-20 bg-transparent">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="Volunteering & Leadership" 
            subtitle="My contributions to the college community and technical clubs."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {resumeData.volunteering.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-brand-200 transition-all group"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{item.role}</h4>
                  <span className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-bold rounded-full whitespace-nowrap shrink-0">{item.period}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-brand-600/90 backdrop-blur-lg text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-400 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Let's build something <span className="text-cyan-200">extraordinary</span> together.</h2>
              <p className="text-brand-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                I'm currently looking for internship opportunities where I can contribute to meaningful projects and grow as a developer.
              </p>
              
              <div className="flex justify-center mb-12">
                <a href={`mailto:${resumeData.contact.email}`} className="flex flex-col md:flex-row items-center justify-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-700 flex items-center justify-center group-hover:bg-white group-hover:text-brand-600 transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-medium">{resumeData.contact.email}</span>
                </a>
              </div>

              <div className="flex justify-center gap-6">
                <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-2xl bg-brand-700 flex items-center justify-center hover:bg-brand-800 hover:scale-110 transition-all shadow-lg">
                  <Linkedin className="w-8 h-8" />
                </a>
                <a href={resumeData.contact.github} target="_blank" rel="noreferrer" className="w-16 h-16 rounded-2xl bg-brand-700 flex items-center justify-center hover:bg-brand-800 hover:scale-110 transition-all shadow-lg">
                  <Github className="w-8 h-8" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-12 bg-slate-900 text-slate-500 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© {new Date().getFullYear()} Reshma V. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal for Images */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
                <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-80 p-8 flex flex-col justify-start bg-white overflow-y-auto">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-widest mb-2">
                       {selectedItem.type || "Detail"}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {selectedItem.title}
                    </h3>
                  </div>
                  
                  <div className="h-[2px] w-8 bg-brand-500 rounded-full mb-6" />
                  
                  <div className="text-slate-600 text-sm leading-relaxed mb-8 whitespace-pre-line">
                    {selectedItem.description}
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Scroll Element: Floating Nav */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 100 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-2xl hover:bg-brand-700 transition-all"
        >
          <ChevronRight className="w-6 h-6 -rotate-90" />
        </button>
      </motion.div>
    </div>
  );
}
