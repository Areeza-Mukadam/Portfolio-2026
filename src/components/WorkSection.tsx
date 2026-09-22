import { ExternalLink, Github, ShoppingCart, ShoppingBag, Gamepad2 } from 'lucide-react';

interface Project {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  icon: React.ReactNode;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: 'ShopWise AI',
    tagline: 'AI-Powered Personal Shopping Assistant',
    description:
        'An AI-powered shopping assistant that understands natural-language requirements, extracts preferences and budget constraints, and generates personalized product recommendations. Gemini handles intent extraction and explanations, while deterministic backend scoring ranks products and surfaces trade-offs.',
    tags: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Gemini API',
      'Supabase',
      'PostgreSQL'
    ],
    category: 'AI / Full Stack',
    icon: <ShoppingCart className="w-5 h-5 text-indigo-400" />,
    githubUrl: 'https://github.com/Inzamam18/VibeCode',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'CommunityCart',
    tagline: 'AI-Powered Sustainable Second-Hand Marketplace',
    description:
        'A sustainable second-hand marketplace designed to make buying and selling pre-owned products more accessible through AI-assisted discovery and personalized recommendations. Built with a mobile-first architecture and a Spring Boot backend.',
    tags: [
      'React Native',
      'Expo',
      'TypeScript',
      'Spring Boot',
      'PostgreSQL',
      'Firebase',
      'FastAPI',
      'Gemini'
    ],
    category: 'Full Stack / AI',
    icon: <ShoppingBag className="w-5 h-5 text-indigo-400" />,
    githubUrl: 'https://github.com/Inzamam18/CommunityCart',
    liveUrl: '',
    featured: true,
  },
  {
    title: 'Chronicles of the Lost Starship',
    tagline: 'Interactive Sci-Fi Adventure with Persistent Game State',
    description:
        'A Java-based sci-fi adventure game where players navigate branching story paths, manage survival statistics, solve hacking challenges, save and load progress, and compete through a persistent leaderboard backed by MySQL.',
    tags: [
      'Java',
      'JSP',
      'Servlets',
      'MySQL',
      'JDBC',
      'HTML',
      'CSS',
      'JavaScript'
    ],
    category: 'Java / Web Application',
    icon: <Gamepad2 className="w-5 h-5 text-indigo-400" />,
    githubUrl: 'https://github.com/Areeza-Mukadam/Text-Based-Adventure-Game',
    liveUrl: '',
    featured: false,
  },
  {
    title: 'Chronicles of the Lost Starship',
    tagline: 'Interactive Sci-Fi Adventure with Persistent Game State',
    description:
        'A Java-based sci-fi adventure game where players navigate branching story paths, manage survival statistics, solve hacking challenges, save and load progress, and compete through a persistent leaderboard backed by MySQL.',
    tags: [
      'Java',
      'JSP',
      'Servlets',
      'MySQL',
      'JDBC',
      'HTML',
      'CSS',
      'JavaScript'
    ],
    category: 'Java / Web Application',
    icon: <Gamepad2 className="w-5 h-5 text-indigo-400" />,
    githubUrl: 'https://github.com/Areeza-Mukadam/Text-Based-Adventure-Game',
    liveUrl: '',
    featured: false,
  },
];

export const WorkSection: React.FC = () => {
  return (
    <section id="work" className="relative py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-white/40" />
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-mono font-medium">
            Featured Projects
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Engineered for <span className="name-script text-white/90">Performance</span> & Polish
        </h2>
        <p className="text-sm sm:text-base text-white/60 max-w-2xl font-light leading-relaxed">
          A selection of projects spanning computer systems engineering, scalable full-stack applications, and applied deep learning models.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative rounded-2xl glass-panel p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            <div>
              {/* Category & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
                  {project.category}
                </span>
                <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10">
                  {project.icon}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-white/70 mb-4 tracking-wide">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/55 font-light leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.03] text-white/60 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Clickable Action Buttons (URL hidden in href) */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/12 hover:border-white/30 text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                  >
                    <Github className="w-3.5 h-3.5 text-white/90" />
                    <span>View Source Code</span>
                  </a>
                )}
                {project.liveUrl && project.liveUrl.trim().length > 0 && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#100C22] hover:bg-white/90 text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
