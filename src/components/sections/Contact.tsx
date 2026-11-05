import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Copy,
  Check,
  Send,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/ui/Icons';
import { portfolioData } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TiltCard } from '@/components/ui/TiltCard';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(portfolioData.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formData.get('name') || 'Visitor'}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nMessage:\n${formData.get('message')}`
    );
    window.location.href = `mailto:${portfolioData.personal.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Direct Communication"
          number="07"
          title="Ready to Build"
          highlight="Something Extraordinary?"
          subtitle="Let's connect. Open for software engineering internships, technical collaborations, and full-time opportunities."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Direct Contact Channels Card */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 sm:p-8 border-slate-800/80">
              <h3 className="text-xl font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Reach out directly via email, phone, or connect with me across professional platforms.
              </p>

              {/* Email channel */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Email</span>
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="text-xs sm:text-sm font-mono text-slate-200 hover:text-cyan-400 truncate block transition-colors"
                    >
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone channel */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Phone</span>
                    <a
                      href={`tel:${portfolioData.personal.phone}`}
                      className="text-xs sm:text-sm font-mono text-slate-200 hover:text-emerald-400 transition-colors"
                    >
                      {portfolioData.personal.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyPhone}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social profile buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <MagneticButton
                  asAnchor
                  href={portfolioData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                  className="w-full text-xs font-mono"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </MagneticButton>

                <MagneticButton
                  asAnchor
                  href={portfolioData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                  className="w-full text-xs font-mono"
                >
                  <Github className="w-4 h-4 text-slate-300" />
                  <span>GitHub</span>
                </MagneticButton>
              </div>

              {/* Location & Status Info */}
              <div className="mt-6 pt-6 border-t border-slate-800/60 space-y-2 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Prayagraj / Bihar, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open for Summer 2025/2026 Internships & Roles</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Interactive Fast Dispatch Form */}
          <div className="lg:col-span-7">
            <GlassCard className="p-6 sm:p-8 border-slate-800/80 glass-panel-glow">
              <h3 className="text-xl font-bold text-white mb-2">Send Message Intent</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill this prompt to automatically construct a formatted email dispatch.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Your Name
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Your Email
                    </label>
                    <input
                      name="email"
                      required
                      type="email"
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/70 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                    Message / Opportunity Brief
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Hello Rajeev, we would like to discuss an engineering role / collaboration..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/70 transition-colors resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full group mt-2"
                >
                  <Send className="w-4 h-4 mr-2 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>Dispatch Email to Rajeev</span>
                </MagneticButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
