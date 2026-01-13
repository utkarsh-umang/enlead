import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from 'figma:asset/80f1fbd8b5de75c83a12cb2ec032855928774201.png';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: '#', label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0A1628] border-t border-[#00D9FF]/20 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <ImageWithFallback
                src={logoImage}
                alt="enLead Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
              />
            </div>
            <span className="text-lg sm:text-xl text-[#00D9FF]">
              enLead
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 sm:gap-8 text-sm sm:text-base">
            <a
              href="#"
              className="text-white/70 hover:text-[#00D9FF] transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-[#00D9FF] transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-[#00D9FF] transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-[#00D9FF]/30 hover:border-[#00D9FF] hover:bg-gradient-to-br hover:from-[#00D9FF]/10 hover:to-[#00B8D4]/10 transition-all flex items-center justify-center"
                >
                  <Icon className="size-4 sm:size-5 text-[#00D9FF] group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 sm:pt-8 border-t border-[#00D9FF]/10">
          <p className="text-white/60 text-xs sm:text-sm mb-2">
            © 2025 enLead AI. Dive Deep, Surface Value.
          </p>
          <p className="text-white/40 text-xs">
            Designed by{' '}
            <a
              href="https://www.linkedin.com/in/navaneeth-sankar-k-p"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D9FF]/70 hover:text-[#00D9FF] transition-colors"
            >
              Navaneeth Sankar K P
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}