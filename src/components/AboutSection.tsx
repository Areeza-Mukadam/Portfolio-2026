import React, { useState } from 'react';
import {
  Cpu,
  Code2,
  Sparkles,
  GraduationCap,
  CheckCircle2,
  Users,
  Database,
  Cloud,
} from 'lucide-react';

type Tab = 'about' | 'skills' | 'experience' | 'leadership';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('about');

  const skills = [
    {
      category: 'Programming & Core Engineering',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      items: [
        'C',
        'C++',
        'Java',
        'JavaScript',
        'Data Structures & Algorithms',
        'Object-Oriented Programming',
        'Problem Solving',
      ],
    },
    {
      category: 'Full-Stack Development',
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      items: [
        'HTML',
        'CSS',
        'Tailwind CSS',
        'JavaScript',
        'React',
        'Java Servlets',
        'JSP',
        'JDBC',
        'REST APIs',
      ],
    },
    {
      category: 'Cloud & DevOps',
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      items: [
        'AWS EC2',
        'Security Groups',
        'Network ACLs',
        'Docker',
        'Containerization',
        'Virtual Machines',
        'Web Deployment',
        'Git / GitHub',
      ],
    },
    {
      category: 'AI, ML & Intelligent Systems',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      items: [
        'Machine Learning — Learning',
        'AI-powered Applications',
        'RAG Technologies',
        'AI Agents',
        'AI APIs',
        'Deepfake Detection',
        'Intelligent Systems',
      ],
    },
    {
      category: 'Database & Data',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      items: [
        'MySQL',
        'MongoDB',
        'Database Management',
        'JDBC',
        'Data Handling',
      ],
    },
  ];

  const tabs = [
    { id: 'about' as Tab, label: 'About' },
    { id: 'skills' as Tab, label: 'Skills' },
    { id: 'experience' as Tab, label: 'Experience' },
    { id: 'leadership' as Tab, label: 'Leadership Roles' },
  ];

  return (
      <section
          id="about"
          className="relative py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10"
      >
        {/* =========================================================
          SECTION HEADER
      ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-white/40" />

            <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-mono font-medium">
            About & Expertise
          </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Building at the Intersection of{' '}
            <span className="name-script text-white/90">
            Engineering
          </span>{' '}
            & Intelligence
          </h2>
        </div>

        {/* =========================================================
          TABS
      ========================================================= */}
        <div className="mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                  relative shrink-0 px-5 py-3 rounded-xl
                  text-xs sm:text-sm font-mono tracking-wide
                  border transition-all duration-300
                  ${
                          isActive
                              ? 'bg-white text-black border-white'
                              : 'bg-white/[0.02] text-white/50 border-white/10 hover:border-white/20 hover:text-white'
                      }
                `}
                  >
                    {tab.label}

                    {isActive && (
                        <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-white rounded-full" />
                    )}
                  </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
          ABOUT TAB
      ========================================================= */}
        {activeTab === 'about' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* LEFT COLUMN — ABOUT */}
              <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-white/70 font-light leading-relaxed">

                <p>
                  I’m a{' '}
                  <strong className="text-white font-medium">
                    third-year Computer Engineering student
                  </strong>{' '}
                  at Thakur College of Engineering and Technology and a technology
                  enthusiast who genuinely enjoys learning, experimenting, and
                  understanding how things work.
                </p>

                <p>
                  My interest in technology goes beyond simply writing code. I
                  enjoy exploring different areas of computer science, building
                  projects, trying out new tools, and seeing how different
                  technologies can come together to solve practical problems.
                </p>

                <p>
                  My development journey has taken me through{' '}
                  <strong className="text-white font-medium">
                    C/C++, Java, JavaScript, React, databases, cloud technologies,
                    and AI
                  </strong>
                  . Each project and experience has helped me discover something
                  new and has made me more curious about what I can learn next.
                </p>

                <p>
                  I’m currently expanding my knowledge of{' '}
                  <strong className="text-white font-medium">
                    Machine Learning
                  </strong>{' '}
                  while exploring AI applications, Retrieval-Augmented Generation,
                  intelligent systems, and modern development tools. I believe
                  learning technology is a continuous process, and I enjoy learning
                  best by actually building and experimenting.
                </p>

                <p>
                  Whether it’s developing a web application, exploring an AI
                  concept, understanding cloud infrastructure, or working with a
                  team, I’m always looking for opportunities to learn something
                  new and turn that knowledge into something meaningful.
                </p>

                {/* EDUCATION */}
                <div className="glass-panel rounded-xl p-5 border border-white/10 mt-8">
                  <div className="flex items-start gap-4">

                    <div className="p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/80">
                      <GraduationCap className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        B.Tech in Computer Engineering
                      </h4>

                      <p className="text-xs text-white/50 font-mono mt-0.5">
                        Thakur College of Engineering and Technology
                      </p>

                      <div className="flex items-center gap-2 mt-3 text-xs text-white/75 font-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />

                        <span>
                      Third-year undergraduate • Mumbai
                    </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN — CURRENT FOCUS */}
              <div className="lg:col-span-5 space-y-6">

                <div className="glass-panel rounded-2xl p-7 border border-white/10">
                  <div className="flex items-center gap-3.5 mb-5">

                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                      Currently Exploring
                    </h3>

                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {[
                      'Machine Learning',
                      'AI Applications',
                      'RAG Technologies',
                      'AI Agents',
                      'Intelligent Systems',
                      'Cloud & Deployment',
                    ].map((item) => (
                        <span
                            key={item}
                            className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] text-white/80 border border-white/8"
                        >
                    {item}
                  </span>
                    ))}
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-7 border border-white/10">

                  <div className="flex items-center gap-3.5 mb-5">

                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
                      <Code2 className="w-5 h-5 text-purple-400" />
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                      What I Enjoy
                    </h3>

                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-white/60 font-light">

                    {[
                      'Learning new technologies',
                      'Building practical projects',
                      'Exploring AI & emerging technologies',
                      'Solving programming problems',
                      'Collaborating with others',
                    ].map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />

                          <span>{item}</span>
                        </div>
                    ))}

                  </div>

                </div>

              </div>
            </div>
        )}

        {/* =========================================================
          SKILLS TAB
      ========================================================= */}
        {activeTab === 'skills' && (
            <div className="relative overflow-hidden">

              {/* Left fade */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

              {/* Right fade */}
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

              <div className="about-marquee flex w-max gap-6">

                {/* FIRST SET */}
                <div className="flex gap-6">
                  {skills.map((skillGroup) => (
                      <SkillCard
                          key={`first-${skillGroup.category}`}
                          skillGroup={skillGroup}
                      />
                  ))}
                </div>

                {/* DUPLICATE SET — MAKES MARQUEE SEAMLESS */}
                <div className="flex gap-6">
                  {skills.map((skillGroup) => (
                      <SkillCard
                          key={`second-${skillGroup.category}`}
                          skillGroup={skillGroup}
                      />
                  ))}
                </div>

              </div>

              <p className="text-center text-[10px] text-white/25 font-mono mt-8">
                Hover to pause
              </p>

            </div>
        )}

        {/* =========================================================
          EXPERIENCE TAB
      ========================================================= */}
        {activeTab === 'experience' && (
            <div className="relative overflow-hidden">

              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

              <div className="experience-marquee flex w-max gap-6">

                {/* FIRST SET */}
                <div className="flex gap-6">

                  <ExperienceCard
                      title="AI & Software Development Experience"
                      subtitle="Internships • Projects • Applied Learning"
                  >
                    <div className="flex flex-col gap-2 mt-3 text-xs text-white/75 font-light">

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

                        <span>
                      Worked with AI tools for deepfake detection during
                      a CyberPeace Foundation internship.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

                        <span>
                      Completed IBM SkillsBuild × 1M1B virtual internship
                      focused on RAG technologies.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

                        <span>
                      Built Java web applications using JSP, Servlets,
                      and JDBC during an Advanced Java internship.
                    </span>
                      </div>

                    </div>
                  </ExperienceCard>

                  <ExperienceCard
                      title="Advanced Java Development"
                      subtitle="Java • Web Development • Backend"
                  >
                    <div className="flex flex-col gap-2 mt-3 text-xs text-white/75 font-light">

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />

                        <span>
                      Completed an Advanced Java in-house internship.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />

                        <span>
                      Worked with JSP, Servlets and JDBC while building
                      Java web applications.
                    </span>
                      </div>

                    </div>
                  </ExperienceCard>

                  <ExperienceCard
                      title="AI & RAG Technologies"
                      subtitle="Artificial Intelligence • Applied Learning"
                  >
                    <div className="flex flex-col gap-2 mt-3 text-xs text-white/75 font-light">

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />

                        <span>
                      Completed IBM SkillsBuild × 1M1B virtual internship
                      focused on Retrieval-Augmented Generation.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />

                        <span>
                      Explored how AI systems can work with external
                      knowledge and information.
                    </span>
                      </div>

                    </div>
                  </ExperienceCard>

                </div>

                {/* DUPLICATE SET */}
                <div className="flex gap-6">

                  <ExperienceCard
                      title="AI & Software Development Experience"
                      subtitle="Internships • Projects • Applied Learning"
                  >
                    <div className="flex flex-col gap-2 mt-3 text-xs text-white/75 font-light">

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

                        <span>
                      Worked with AI tools for deepfake detection during
                      a CyberPeace Foundation internship.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

                        <span>
                      Completed IBM SkillsBuild × 1M1B virtual internship
                      focused on RAG technologies.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />

                        <span>
                      Built Java web applications using JSP, Servlets,
                      and JDBC during an Advanced Java internship.
                    </span>
                      </div>

                    </div>
                  </ExperienceCard>

                  <ExperienceCard
                      title="Advanced Java Development"
                      subtitle="Java • Web Development • Backend"
                  >
                    <div className="flex flex-col gap-2 mt-3 text-xs text-white/75 font-light">

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />

                        <span>
                      Completed an Advanced Java in-house internship.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />

                        <span>
                      Worked with JSP, Servlets and JDBC while building
                      Java web applications.
                    </span>
                      </div>

                    </div>
                  </ExperienceCard>

                  <ExperienceCard
                      title="AI & RAG Technologies"
                      subtitle="Artificial Intelligence • Applied Learning"
                  >
                    <div className="flex flex-col gap-2 mt-3 text-xs text-white/75 font-light">

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />

                        <span>
                      Completed IBM SkillsBuild × 1M1B virtual internship
                      focused on Retrieval-Augmented Generation.
                    </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />

                        <span>
                      Explored how AI systems can work with external
                      knowledge and information.
                    </span>
                      </div>

                    </div>
                  </ExperienceCard>

                </div>

              </div>

              <p className="text-center text-[10px] text-white/25 font-mono mt-8">
                Hover to pause
              </p>

            </div>
        )}

        {/* =========================================================
          LEADERSHIP TAB
      ========================================================= */}
        {activeTab === 'leadership' && (
            <div className="relative overflow-hidden">

              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />

              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

              <div className="leadership-marquee flex w-max gap-6">

                {/* FIRST SET */}
                <div className="flex gap-6">

                  <LeadershipCard
                      title="Vice President — AI AETHRA Club"
                      subtitle="Leadership • AI/ML • Community"
                      iconColor="text-white/80"
                      checkColor="text-emerald-400"
                  >
                    Leading initiatives, collaborating with students, and
                    contributing to an AI-focused technical community.
                  </LeadershipCard>

                  <LeadershipCard
                      title="Former Working Committee Member — CSI"
                      subtitle="Technical Community • Collaboration • Events"
                      iconColor="text-white/80"
                      checkColor="text-indigo-400"
                  >
                    Contributed to student-led technical activities and
                    collaborative initiatives.
                  </LeadershipCard>

                </div>

                {/* DUPLICATE SET */}
                <div className="flex gap-6">

                  <LeadershipCard
                      title="Vice President — AI AETHRA Club"
                      subtitle="Leadership • AI/ML • Community"
                      iconColor="text-white/80"
                      checkColor="text-emerald-400"
                  >
                    Leading initiatives, collaborating with students, and
                    contributing to an AI-focused technical community.
                  </LeadershipCard>

                  <LeadershipCard
                      title="Former Working Committee Member — CSI"
                      subtitle="Technical Community • Collaboration • Events"
                      iconColor="text-white/80"
                      checkColor="text-indigo-400"
                  >
                    Contributed to student-led technical activities and
                    collaborative initiatives.
                  </LeadershipCard>

                </div>

              </div>

              <p className="text-center text-[10px] text-white/25 font-mono mt-8">
                Hover to pause
              </p>

            </div>
        )}

        {/* =========================================================
          MARQUEE ANIMATION
      ========================================================= */}
        <style>{`
        @keyframes aboutMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        @keyframes experienceMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        @keyframes leadershipMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 12px));
          }
        }

        .about-marquee {
          animation: aboutMarquee 65s linear infinite;
        }

        .experience-marquee {
          animation: experienceMarquee 70s linear infinite;
        }

        .leadership-marquee {
          animation: leadershipMarquee 75s linear infinite;
        }

        .about-marquee:hover,
        .experience-marquee:hover,
        .leadership-marquee:hover {
          animation-play-state: paused;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .about-marquee,
          .experience-marquee,
          .leadership-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
      </section>
  );
};

/* =========================================================
   SKILL CARD
========================================================= */

interface SkillCardProps {
  skillGroup: {
    category: string;
    icon: React.ReactNode;
    items: string[];
  };
}

const SkillCard: React.FC<SkillCardProps> = ({ skillGroup }) => {
  return (
      <div className="glass-panel rounded-2xl p-7 w-[340px] sm:w-[400px] shrink-0 transition-all duration-300 hover:border-white/20">

        <div className="flex items-center gap-3.5 mb-5">

          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
            {skillGroup.icon}
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight">
            {skillGroup.category}
          </h3>

        </div>

        <div className="flex flex-wrap gap-2.5">

          {skillGroup.items.map((item) => (
              <span
                  key={item}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.03] text-white/80 border border-white/8 hover:border-white/20 transition-colors"
              >
            {item}
          </span>
          ))}

        </div>

      </div>
  );
};

/* =========================================================
   EXPERIENCE CARD
========================================================= */

interface ExperienceCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
                                                         title,
                                                         subtitle,
                                                         children,
                                                       }) => {
  return (
      <div className="glass-panel rounded-xl p-6 sm:p-7 border border-white/10 w-[350px] sm:w-[440px] shrink-0 transition-all duration-300 hover:border-white/20">

        <div className="flex items-start gap-4">

          <div className="p-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/80 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-white tracking-wide">
              {title}
            </h4>

            <p className="text-xs text-white/50 font-mono mt-0.5">
              {subtitle}
            </p>

            {children}

          </div>

        </div>

      </div>
  );
};

/* =========================================================
   LEADERSHIP CARD
========================================================= */

interface LeadershipCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  iconColor: string;
  checkColor: string;
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({
                                                         title,
                                                         subtitle,
                                                         children,
                                                         iconColor,
                                                         checkColor,
                                                       }) => {
  return (
      <div className="glass-panel rounded-xl p-6 sm:p-7 border border-white/10 w-[350px] sm:w-[440px] shrink-0 transition-all duration-300 hover:border-white/20">

        <div className="flex items-start gap-4">

          <div className={`p-2.5 rounded-lg bg-white/[0.05] border border-white/10 ${iconColor} shrink-0`}>
            <Users className="w-5 h-5" />
          </div>

          <div>

            <h4 className="text-sm font-semibold text-white tracking-wide">
              {title}
            </h4>

            <p className="text-xs text-white/50 font-mono mt-0.5">
              {subtitle}
            </p>

            <div className="flex items-start gap-2 mt-3 text-xs text-white/75 font-light">

              <CheckCircle2
                  className={`w-3.5 h-3.5 ${checkColor} mt-0.5 shrink-0`}
              />

              <span>{children}</span>

            </div>

          </div>

        </div>

      </div>
  );
};

export default AboutSection;