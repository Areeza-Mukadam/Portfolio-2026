import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  ArrowUp,
  ExternalLink,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const email = 'areezamukadam@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="contact"
      className="relative pt-28 pb-16 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-white/40" />

          <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-mono font-medium">
            Get In Touch
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
          Let’s Build Something{' '}
          <span className="name-script text-white/90">
            Extraordinary
          </span>
        </h2>

        <p className="text-sm sm:text-base text-white/60 max-w-xl font-light leading-relaxed">
          Open to engineering internships, full-time opportunities,
          high-impact collaborations, and technical discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24">

        {/* Left Column: Direct Contact & Social Cards */}
        <div className="lg:col-span-5 space-y-6">

          {/* Copyable Email Card */}
          <div className="glass-panel rounded-2xl p-7 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-center gap-3 text-white/50 mb-4">
              <Mail className="w-4 h-4" />

              <span className="text-xs font-mono uppercase tracking-[0.2em]">
                Direct Email
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-base sm:text-lg font-medium text-white truncate font-mono">
                {email}
              </span>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-white/90 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-white/40"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Profiles as Clickable Action Buttons */}
          <div className="grid grid-cols-2 gap-4">

            <a
              href="https://github.com/Areeza-Mukadam"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/25 flex items-center justify-between gap-2 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />

                <div>
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">
                    GitHub
                  </p>

                  <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    View Profile
                  </p>
                </div>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            <a
              href="https://www.linkedin.com/in/areeza-mukadam-047b40348/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel rounded-xl p-4 sm:p-5 border border-white/10 hover:border-white/25 flex items-center justify-between gap-2 transition-all hover:-translate-y-0.5 group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />

                <div>
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">
                    LinkedIn
                  </p>

                  <p className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                    View Profile
                  </p>
                </div>
              </div>

              <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

          </div>

          {/* Quick info note */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/50 leading-relaxed font-light">
            Based in India • Available for global remote roles and on-site engineering internships.
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <div className="flex items-center gap-2">
          <span>Crafted by</span>

          <span className="name-script text-base text-white/80 font-medium">
            Areeza
          </span>

          <span>© {new Date().getFullYear()}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none"
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </footer>
    </section>
  );
};
