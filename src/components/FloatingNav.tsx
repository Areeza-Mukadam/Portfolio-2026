import React from 'react';

interface FloatingNavProps {
  onHoverInteractive?: (hovering: boolean) => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ onHoverInteractive }) => {
  const navItems = [
    { label: 'WORK', href: '#work' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      aria-label="Main Navigation"
    >
      <div className="glass-pill rounded-full px-6 py-2.5 flex items-center gap-7 transition-all duration-300">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            onMouseEnter={() => onHoverInteractive?.(true)}
            onMouseLeave={() => onHoverInteractive?.(false)}
            onFocus={() => onHoverInteractive?.(true)}
            onBlur={() => onHoverInteractive?.(false)}
            className="text-[11px] font-medium tracking-[0.22em] text-white/70 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white focus:ring-1 focus:ring-white/40 rounded px-1"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};
