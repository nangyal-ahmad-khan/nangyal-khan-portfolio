import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  User, 
  Clock, 
  MapPin, 
  Calendar,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Server,
  ArrowRight,
  RefreshCw,
  DollarSign,
  Layers,
  FileText,
  Lock
} from 'lucide-react';
import { EnquiryFormPayload } from '../types';

interface ContactProps {
  email: string;
  name: string;
  location: string;
  whatsappNumber?: string;
  selectedServicePreset?: string;
}

export const Contact: React.FC<ContactProps> = ({
  email,
  name,
  location,
  whatsappNumber = '+923000000000',
  selectedServicePreset,
}) => {
  const [formData, setFormData] = useState<EnquiryFormPayload>({
    name: '',
    email: '',
    projectType: selectedServicePreset || 'Web App / SaaS',
    budget: '$3,000 – $5,000',
    details: '',
    honeypot: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showResendModal, setShowResendModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Sync selectedServicePreset if parent changes it
  useEffect(() => {
    if (selectedServicePreset) {
      setFormData((prev) => ({
        ...prev,
        projectType: selectedServicePreset,
      }));
    }
  }, [selectedServicePreset]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validateForm = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    } else if (formData.name.trim().length > 100) {
      errs.name = 'Name must be under 100 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!formData.details.trim() || formData.details.trim().length < 5) {
      errs.details = 'Please describe your project or requirements (at least 5 characters).';
    } else if (formData.details.trim().length > 5000) {
      errs.details = 'Project details must be under 5,000 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // POST to secure server API route which invokes Resend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        // Strictly use required failure format if server fails
        setErrorMessage(
          data.error ||
            `Something went wrong while sending your message. Please email ${email} directly.`
        );
      }
    } catch (err: any) {
      console.error('Submission network error:', err);
      setSubmitStatus('error');
      setErrorMessage(
        `Something went wrong while sending your message. Please email ${email} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate fallback mailto link pre-populated with visitor input
  const getDirectMailtoUrl = () => {
    const subject = `New Project Enquiry — ${formData.name || 'Client'} — ${formData.projectType}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget: ${formData.budget}\n\nProject Details:\n${formData.details}`;
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Clean WhatsApp phone number for link
  const cleanPhone = whatsappNumber.replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
    `Hi Nangyal, I am reaching out regarding a ${formData.projectType} project.`
  )}`;

  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${name}
EMAIL;TYPE=INTERNET,PREF:${email}
TITLE:Creative Technologist & Digital Builder
NOTE:Portfolio Direct Contact for ${name}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${name.replace(/\s+/g, '_')}_Contact.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#050505] dark:bg-[#050505] light:bg-[#f4f1ea] border-t border-white/5 dark:border-white/5 light:border-[#C5A059]/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] text-[10px] font-mono tracking-widest uppercase mb-3">
            <Mail className="w-3 h-3" />
            <span>06 // DIRECT CLIENT INBOX & PROJECT ENQUIRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 font-heading mb-4">
            Have a project in mind? Let's build something exceptional.
          </h2>
          <p className="text-sm sm:text-base text-white/60 dark:text-white/60 light:text-zinc-600 leading-relaxed font-light">
            Every submission is routed securely through our server-side Resend API pipeline directly to <span className="text-[#C5A059] font-mono font-medium">{email}</span> with automated Reply-To routing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Communication Hub */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Primary Direct Inbox Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Target Inbox Address
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Direct Delivery</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-black dark:bg-black light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-300 flex items-center justify-between gap-3 mb-6">
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-sm sm:text-base font-bold text-[#C5A059] hover:underline transition-colors truncate"
                  title="Click to compose email"
                >
                  {email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-[#C5A059] border border-white/10 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Action Buttons: Direct Email + WhatsApp */}
              <div className="space-y-2.5">
                <a
                  id="direct-email-button"
                  href={`mailto:${email}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-black hover:bg-[#C5A059] text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me Directly</span>
                </a>

                {whatsappNumber && (
                  <a
                    id="whatsapp-chat-button"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                )}

                <button
                  onClick={downloadVCard}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Save Contact Card (.vcf)</span>
                </button>
              </div>
            </div>

            {/* Quick Context & Location */}
            <div className="p-6 rounded-2xl bg-white/[0.02] dark:bg-white/[0.02] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 space-y-3.5">
              <div className="flex items-center gap-3 text-xs text-white/70 dark:text-white/70 light:text-zinc-700">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Location: <strong className="text-white font-medium">{location}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/70 dark:text-white/70 light:text-zinc-700">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Response Time: <strong className="text-white font-medium">Within 24 Hours</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/70 dark:text-white/70 light:text-zinc-700">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Delivery: <strong className="text-emerald-400 font-medium">Resend Server API + Spam Guard</strong></span>
              </div>
            </div>

            {/* Architecture Info Trigger */}
            <button
              onClick={() => setShowResendModal(true)}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#C5A059]/40 text-left text-xs font-mono text-white/50 hover:text-[#C5A059] flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#C5A059]" />
                <span>Resend Architecture & Domain Setup Guide</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>

          </div>

          {/* Right Column: Contact & Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-white border border-white/10 dark:border-white/10 light:border-zinc-200 shadow-2xl backdrop-blur-md">
              
              {/* SUCCESS CONFIRMATION STATE */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white dark:text-white light:text-zinc-900 font-heading">
                      Message sent successfully.
                    </h3>
                    <p className="text-sm text-white/70 dark:text-white/70 light:text-zinc-600 max-w-md leading-relaxed font-light mx-auto">
                      Thanks for reaching out. I'll review your project details and get back to you soon.
                    </p>
                  </div>

                  {/* Submission Summary Card */}
                  <div className="w-full max-w-md p-4 rounded-xl bg-black/60 border border-white/10 text-left text-xs font-mono text-white/70 space-y-1.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#C5A059] font-bold mb-2">
                      Delivered Enquiry Summary:
                    </div>
                    <div><span className="text-white/40">From:</span> {formData.name} ({formData.email})</div>
                    <div><span className="text-white/40">Project Type:</span> {formData.projectType}</div>
                    <div><span className="text-white/40">Budget:</span> {formData.budget}</div>
                    <div><span className="text-white/40">Destination:</span> {email}</div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <a
                      href={getDirectMailtoUrl()}
                      className="px-5 py-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors inline-flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Open Copy in Mail App</span>
                    </a>

                    <button
                      onClick={() => {
                        setSubmitStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          projectType: 'Web App / SaaS',
                          budget: '$3,000 – $5,000',
                          details: '',
                          honeypot: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-lg bg-white text-black hover:bg-[#C5A059] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </motion.div>
              )}

              {/* FORM STATE (or ERROR STATE with form visible) */}
              {submitStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-bold text-white dark:text-white light:text-zinc-900 font-heading mb-1">
                      Send a Project Enquiry
                    </h3>
                    <p className="text-xs text-white/40 dark:text-white/40 light:text-zinc-600 font-mono">
                      All fields deliver directly to {email} with reply-to routing
                    </p>
                  </div>

                  {/* FAILURE ALERT BANNER */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs space-y-3"
                    >
                      <div className="flex items-start gap-2.5 text-red-200">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-100">{errorMessage}</p>
                          <p className="text-[11px] text-red-300/80 mt-1 font-light">
                            You can click below to immediately dispatch this exact enquiry through your default email client.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={getDirectMailtoUrl()}
                          className="px-3.5 py-1.5 rounded-lg bg-red-500 text-white text-[11px] font-bold uppercase tracking-wider hover:bg-red-400 transition-colors inline-flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send via Email Client Fallback</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus('idle')}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 text-[11px] font-mono transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Anti-Spam Honeypot Field (Invisible to legitimate users, filled by bots) */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="website_url_hp">Please leave this field empty</label>
                    <input
                      id="website_url_hp"
                      type="text"
                      name="website_url_hp"
                      value={formData.honeypot || ''}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-[11px] font-mono uppercase tracking-wider text-white/60 dark:text-white/60 light:text-zinc-700 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className={`w-full px-4 py-2.5 rounded-xl bg-black/60 dark:bg-black/60 light:bg-zinc-100 border text-xs text-white dark:text-white light:text-zinc-900 placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-white/10 dark:border-white/10 light:border-zinc-300 focus:ring-[#C5A059] focus:border-[#C5A059]'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-[11px] font-mono uppercase tracking-wider text-white/60 dark:text-white/60 light:text-zinc-700 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-black/60 dark:bg-black/60 light:bg-zinc-100 border text-xs text-white dark:text-white light:text-zinc-900 placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500/50'
                            : 'border-white/10 dark:border-white/10 light:border-zinc-300 focus:ring-[#C5A059] focus:border-[#C5A059]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Type and Budget Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Type */}
                    <div>
                      <label
                        htmlFor="contact-project-type"
                        className="block text-[11px] font-mono uppercase tracking-wider text-white/60 dark:text-white/60 light:text-zinc-700 mb-1.5"
                      >
                        Project Type
                      </label>
                      <select
                        id="contact-project-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 dark:bg-black/60 light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-300 text-xs text-white dark:text-white light:text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all cursor-pointer"
                      >
                        <option value="Web App / SaaS" className="bg-black text-white">
                          Web App / SaaS
                        </option>
                        <option value="UI/UX & Design System" className="bg-black text-white">
                          UI/UX & Design System
                        </option>
                        <option value="Portfolio & Brand Website" className="bg-black text-white">
                          Portfolio & Brand Website
                        </option>
                        <option value="Full-Stack Development" className="bg-black text-white">
                          Full-Stack Development
                        </option>
                        <option value="Mobile / Interactive" className="bg-black text-white">
                          Mobile / Interactive
                        </option>
                        <option value="Technical Consultation / Other" className="bg-black text-white">
                          Technical Consultation / Other
                        </option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block text-[11px] font-mono uppercase tracking-wider text-white/60 dark:text-white/60 light:text-zinc-700 mb-1.5"
                      >
                        Budget Range
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 dark:bg-black/60 light:bg-zinc-100 border border-white/10 dark:border-white/10 light:border-zinc-300 text-xs text-white dark:text-white light:text-zinc-900 focus:outline-none focus:ring-1 focus:ring-[#C5A059] focus:border-[#C5A059] transition-all cursor-pointer"
                      >
                        <option value="< $1,000" className="bg-black text-white">
                          &lt; $1,000
                        </option>
                        <option value="$1,000 – $3,000" className="bg-black text-white">
                          $1,000 – $3,000
                        </option>
                        <option value="$3,000 – $5,000" className="bg-black text-white">
                          $3,000 – $5,000
                        </option>
                        <option value="$5,000 – $10,000" className="bg-black text-white">
                          $5,000 – $10,000
                        </option>
                        <option value="$10,000+" className="bg-black text-white">
                          $10,000+
                        </option>
                        <option value="Flexible / To be discussed" className="bg-black text-white">
                          Flexible / To be discussed
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-details"
                        className="block text-[11px] font-mono uppercase tracking-wider text-white/60 dark:text-white/60 light:text-zinc-700"
                      >
                        Project Details *
                      </label>
                      <span className="text-[10px] font-mono text-white/40">
                        {formData.details.length} / 5000
                      </span>
                    </div>
                    <textarea
                      id="contact-details"
                      rows={5}
                      required
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Outline your project scope, timeline, key features, goals, or reference websites..."
                      className={`w-full px-4 py-3 rounded-xl bg-black/60 dark:bg-black/60 light:bg-zinc-100 border text-xs text-white dark:text-white light:text-zinc-900 placeholder:text-white/30 focus:outline-none focus:ring-1 transition-all resize-y ${
                        errors.details
                          ? 'border-red-500 focus:ring-red-500/50'
                          : 'border-white/10 dark:border-white/10 light:border-zinc-300 focus:ring-[#C5A059] focus:border-[#C5A059]'
                      }`}
                    />
                    {errors.details && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.details}</p>
                    )}
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-black hover:bg-[#C5A059] text-xs font-bold uppercase tracking-wider shadow-xl transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending Project Enquiry...</span>
                      </span>
                    ) : (
                      <>
                        <span>Send Project Enquiry</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-white/40 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#C5A059]" />
                      <span>Encrypted API Transport</span>
                    </span>
                    <span>Direct: {email}</span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Resend Architecture & Domain Verification Setup Modal */}
      <AnimatePresence>
        {showResendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResendModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0a0a0c] border border-white/10 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#C5A059]/10 text-[#C5A059]">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">
                      Resend Server-Side API Architecture
                    </h3>
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      Secure Inbox Delivery Protocol
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowResendModal(false)}
                  className="p-1 rounded-lg text-white/50 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Architecture Flow Diagram */}
              <div className="p-4 rounded-xl bg-black border border-white/10 space-y-3 font-mono text-xs text-white/80">
                <div className="text-[#C5A059] font-bold text-[11px] uppercase tracking-wider">
                  Submission Pipeline:
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] bg-white/[0.03] p-3 rounded-lg border border-white/5">
                  <span className="text-white">Visitor</span>
                  <span className="text-[#C5A059]">&rarr;</span>
                  <span className="text-white">Contact Form</span>
                  <span className="text-[#C5A059]">&rarr;</span>
                  <span className="text-white">Server API Route</span>
                  <span className="text-[#C5A059]">&rarr;</span>
                  <span className="text-white">Resend API</span>
                  <span className="text-[#C5A059]">&rarr;</span>
                  <span className="text-emerald-400 font-bold">{email}</span>
                </div>
              </div>

              {/* Environment Variables Explanation */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold text-white uppercase font-mono text-[11px] text-[#C5A059]">
                  Required Server Environment Variables:
                </h4>
                <div className="space-y-1.5 font-mono text-[11px] bg-black p-3.5 rounded-xl border border-white/10 text-white/70">
                  <p><span className="text-cyan-400">RESEND_API_KEY</span>: Secret API key from Resend (never exposed to browser).</p>
                  <p><span className="text-cyan-400">CONTACT_EMAIL</span>: Destination inbox (<code className="text-white">{email}</code>).</p>
                  <p><span className="text-cyan-400">RESEND_FROM_EMAIL</span>: Sender address (e.g. <code className="text-white">Nangyal Khan &lt;hello@YOURDOMAIN.com&gt;</code> or testing fallback <code className="text-white">onboarding@resend.dev</code>).</p>
                </div>
              </div>

              {/* Domain Verification Explanation */}
              <div className="space-y-2 text-xs font-light text-white/70">
                <h4 className="font-bold text-white uppercase font-mono text-[11px] text-[#C5A059]">
                  Domain Verification for Production Deliverability:
                </h4>
                <p>
                  Resend allows instant testing via <code className="text-white bg-black px-1.5 py-0.5 rounded border border-white/10">onboarding@resend.dev</code> which sends to your verified account email.
                </p>
                <p>
                  To send from your custom branded domain (e.g. <strong className="text-white">hello@yourdomain.com</strong>) to any client worldwide:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1 text-[11px] text-white/60 font-mono">
                  <li>Add your domain in the Resend Dashboard (<code className="text-white">resend.com/domains</code>).</li>
                  <li>Add the provided MX, SPF, and DKIM TXT DNS records to your domain provider.</li>
                  <li>Once verified, set <code className="text-white">RESEND_FROM_EMAIL="Nangyal Khan &lt;hello@yourdomain.com&gt;"</code>.</li>
                </ol>
              </div>

              {/* Reply-To Note */}
              <div className="p-3 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 text-[11px] font-mono text-[#C5A059]">
                ✓ Reply-To Header is automatically attached with the visitor's email, so when you click Reply in your inbox, your email draft goes straight to the prospect.
              </div>

              <button
                onClick={() => setShowResendModal(false)}
                className="w-full py-2.5 rounded-lg bg-white text-black hover:bg-[#C5A059] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close & Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
