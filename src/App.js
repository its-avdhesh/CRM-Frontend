import React, { useState, useEffect, lazy, Suspense } from "react";
import "@/App.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  GraduationCap, 
  Globe2, 
  Award, 
  BookOpen, 
  Users, 
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Building2,
  FileText,
  Mail,
  Phone,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  Target,
  TrendingUp,
  HeartHandshake,
  Star
} from "lucide-react";

// Official Partner Logos from their websites
const WoosongLogo = ({ size = "default" }) => (
  <div className="flex items-center" data-testid="woosong-logo">
    <img 
      src="https://english.wsu.ac.kr/site/main_eng/images/logo.png" 
      alt="Woosong University"
      className={size === "small" ? "h-8" : "h-10 md:h-12"}
      style={{ objectFit: 'contain' }}
    />
  </div>
);

// aivancity - Official logo image
const AivancityLogo = ({ size = "default", showTagline = true }) => (
  <div className="flex items-center" data-testid="aivancity-logo">
    <img 
      src="https://customer-assets.emergentagent.com/job_dual-degree-hub/artifacts/872sh3et_logo-footer-aivancity.png" 
      alt="aivancity - School of AI & Data"
      className={size === "small" ? "h-8" : "h-10 md:h-14"}
      style={{ objectFit: 'contain' }}
    />
  </div>
);

// INTI - Official logo image
const IntiLogo = ({ size = "default" }) => (
  <div className="flex items-center" data-testid="inti-logo">
    <img 
      src="https://customer-assets.emergentagent.com/job_dual-degree-hub/artifacts/osnfrd3t_INTI-40.png" 
      alt="INTI International University"
      className={size === "small" ? "h-10" : "h-12 md:h-16"}
      style={{ objectFit: 'contain' }}
    />
  </div>
);

// Official Medicaps Logo from brand identity
const MedicapsLogo = ({ light = false }) => (
  <div className="flex items-center gap-2" data-testid="medicaps-logo">
    <img 
      src="https://www.medicaps.ac.in/public/frontend/images/medicaps-logo-fin.webp" 
      alt="Medicaps University"
      className={`h-10 md:h-12 ${light ? 'brightness-0 invert' : ''}`}
      style={{ objectFit: 'contain' }}
    />
  </div>
);

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Partners', href: '#partners' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
      data-testid="main-navigation"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <MedicapsLogo />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="nav-link text-sm"
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#hero-form" 
              className="btn-primary text-sm"
              data-testid="nav-apply-btn"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl p-6 mb-4 animate-fade-in" data-testid="mobile-menu">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block py-3 text-lg font-medium text-gray-700 hover:text-[#283887]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#hero-form" 
              className="btn-primary mt-4 w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

// NoPaperForms Widget Component
const NoPaperFormsWidget = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize the widget when component mounts
    const initializeWidget = () => {
      const container = document.getElementById('npf-widget-container');
      if (!container) return;

      // Clear previous content
      container.innerHTML = '';

      // Create the widget div
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'npf_wgts';
      widgetDiv.setAttribute('data-height', '400px');
      widgetDiv.setAttribute('data-w', '1242a8cbbc551970993f589ee9febba6');
      
      container.appendChild(widgetDiv);

      // Wait a bit for the DOM to update, then trigger script reload
      setTimeout(() => {
        // Try to re-initialize NoPaperForms if the function exists
        if (window.npf && window.npf.init) {
          window.npf.init();
        } else {
          // If npf doesn't exist, reload the script
          const existingScript = document.querySelector('script[src*="emwgts.js"]');
          if (existingScript) {
            existingScript.remove();
          }
          
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://widgets.nopaperforms.com/emwgts.js';
          document.body.appendChild(script);
        }
        
        setIsInitialized(true);

        // Check the agreement checkbox after widget loads
        const checkAgreementCheckbox = () => {
          const checkboxes = container.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            // Check if it's the specific agreement checkbox
            const parentText = checkbox.parentElement?.textContent || '';
            const nextSiblingText = checkbox.nextSibling?.textContent || '';
            
            if (parentText.includes('I agree to receive information') || 
                nextSiblingText.includes('I agree to receive information') ||
                parentText.includes('agree to receive') ||
                nextSiblingText.includes('agree to receive')) {
              
              // Programmatically check the checkbox
              checkbox.checked = true;
              checkbox.dispatchEvent(new Event('change', { bubbles: true }));
              checkbox.dispatchEvent(new Event('click', { bubbles: true }));
              
              console.log('Agreement checkbox checked programmatically');
            }
          });
        };

        // Try to check the agreement checkbox multiple times
        setTimeout(checkAgreementCheckbox, 500);
        setTimeout(checkAgreementCheckbox, 1000);
        setTimeout(checkAgreementCheckbox, 2000);
        setTimeout(checkAgreementCheckbox, 3000);
      }, 200);
    };

    initializeWidget();
  }, []);

  return (
    <div 
      id="npf-widget-container" 
      style={{ 
        minHeight: '400px', 
        width: '100%',
        position: 'relative',
        backgroundColor: '#A21D2E', // Red background matching website
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '0'
      }}
      className={isInitialized ? 'npf-initialized' : ''}
    >
      {!isInitialized && (
        <div className="flex items-center justify-center h-96 text-gray-500">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#283887] mx-auto mb-2"></div>
            <p>Loading form...</p>
          </div>
        </div>
      )}
      <style dangerouslySetInnerHTML={{
        __html: `
          #npf-widget-container, #npf-widget-container * {
            color: white !important;
            background-color: transparent !important;
            font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
          }
          #npf-widget-container {
            background: #A21D2E !important;
            border-radius: 1.5rem !important;
          }
          #npf-widget-container input[type="text"], 
          #npf-widget-container input[type="email"], 
          #npf-widget-container input[type="tel"], 
          #npf-widget-container select, 
          #npf-widget-container textarea {
            color: #1e293b !important;
            background-color: white !important;
            border: 1px solid #475569 !important;
            border-radius: 0.75rem !important;
            padding: 12px 16px !important;
            font-size: 16px !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          }
          #npf-widget-container input[type="text"]:focus, 
          #npf-widget-container input[type="email"]:focus, 
          #npf-widget-container input[type="tel"]:focus, 
          #npf-widget-container select:focus, 
          #npf-widget-container textarea:focus {
            border-color: #283887 !important;
            outline: none !important;
            box-shadow: 0 0 0 3px rgba(40, 56, 135, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          }
          #npf-widget-container label {
            color: white !important;
            font-weight: 600 !important;
            font-size: 14px !important;
            margin-bottom: 6px !important;
            display: block !important;
          }
          #npf-widget-container span {
            color: white !important;
            font-weight: 500 !important;
          }
          #npf-widget-container p {
            color: white !important;
            font-weight: 500 !important;
          }
          #npf-widget-container div {
            color: white !important;
          }
          #npf-widget-container button, #npf-widget-container input[type="submit"], #npf-widget-container input[type="button"] {
            background: #283887 !important;
            color: white !important;
            border: none !important;
            border-radius: 0.75rem !important;
            padding: 12px 24px !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: all 0.2s ease !important;
            box-shadow: 0 2px 4px rgba(40, 56, 135, 0.2) !important;
          }
          #npf-widget-container button:hover, 
          #npf-widget-container input[type="submit"]:hover, 
          #npf-widget-container input[type="button"]:hover {
            background: #1e2a5a !important;
            transform: translateY(-1px) !important;
            box-shadow: 0 4px 8px rgba(40, 56, 135, 0.3) !important;
          }
          #npf-widget-container div {
            margin-bottom: 16px !important;
          }
          #npf-widget-container .npf_wgts {
            background: transparent !important;
            padding: 0 !important;
          }
          #npf-widget-container input[type="checkbox"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container input[type="checkbox"]:not([class]):not([id]) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container input[type="checkbox"][style*="position: absolute"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container * input[type="checkbox"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container div:has(input[type="checkbox"]) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container div:has(input[type="checkbox"]) * {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container [class*="captcha"] input[type="checkbox"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
          #npf-widget-container [class*="captcha"] div:has(input[type="checkbox"]) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            width: 0 !important;
            height: 0 !important;
            position: absolute !important;
            left: -9999px !important;
          }
        `
      }} />
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="hero-section pt-24 pb-16 md:pt-32 md:pb-24" data-testid="hero-section">
      <div className="hero-bg-pattern"></div>
      <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#283887]/10 rounded-full mb-6">
              <Globe2 className="w-4 h-4 text-[#283887]" />
              <span className="text-sm font-medium text-[#283887]">International Dual Degree Programs</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              One Degree.<br />
              <span className="gradient-text">Two Countries.</span><br />
              Global Careers.
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Start at Medicaps University, finish at a top global university. 
              Gain international exposure and dual credentials that set you apart.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#programs" className="btn-primary" data-testid="hero-explore-btn">
                Explore Programs <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="https://www.medicaps.ac.in/public/frontend/pdf/prospectus-2025-26.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
                data-testid="hero-brochure-btn"
              >
                <FileText className="w-5 h-5" /> Download Brochure
              </a>
            </div>
            
            {/* Country Flags - Global Reach */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm text-gray-500">Study destinations:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-full shadow-sm">
                  <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-5 h-4 rounded-sm object-cover" />
                  <span className="text-xs font-medium text-gray-700">India</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-full shadow-sm">
                  <img src="https://flagcdn.com/w40/kr.png" alt="South Korea" className="w-5 h-4 rounded-sm object-cover" />
                  <span className="text-xs font-medium text-gray-700">South Korea</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-full shadow-sm">
                  <img src="https://flagcdn.com/w40/fr.png" alt="France" className="w-5 h-4 rounded-sm object-cover" />
                  <span className="text-xs font-medium text-gray-700">France</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-full shadow-sm">
                  <img src="https://flagcdn.com/w40/my.png" alt="Malaysia" className="w-5 h-4 rounded-sm object-cover" />
                  <span className="text-xs font-medium text-gray-700">Malaysia</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right - CRM Form Placeholder */}
          <div className="animate-fade-in-up delay-200" id="hero-form">
            <div className="rounded-3xl p-8 shadow-2xl" style={{ backgroundColor: '#A21D2E' }} data-testid="crm-form-placeholder">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#283887] to-[#A21D2E] flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Get Your Free Brochure</h3>
                <p className="text-gray-300">Fill in your details to receive program information</p>
              </div>
              
              {/* NoPaperForms Widget */}
              <div className="crm-form-widget" data-testid="crm-embed-area">
                <NoPaperFormsWidget />
              </div>
              
              <p className="text-xs text-center text-gray-400 mt-4">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Quote & Stats Section - between Hero and USPs
const QuoteSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#283887] to-[#A21D2E] relative overflow-hidden" data-testid="quote-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Quote */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6 bg-white rounded-xl p-3 shadow-lg">
              <img 
                src="https://www.medicaps.ac.in/public/frontend/images/medicaps-logo-fin.webp" 
                alt="Medicaps University"
                className="h-12"
              />
            </div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              "Your future isn't just about where you study—it's about how far your education can take you."
            </blockquote>
            <p className="text-white/70 text-lg">
              — Medicaps University, Shaping Global Leaders Since 2000
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                <Globe2 className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">4</div>
              <div className="text-white/70 text-sm">Countries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">3</div>
              <div className="text-white/70 text-sm">Partner Universities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">5</div>
              <div className="text-white/70 text-sm">Dual Degree Programs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/20 flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">24+</div>
              <div className="text-white/70 text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// USPs Section
const USPsSection = () => {
  const usps = [
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Global Exposure at the Right Stage",
      description: "Academically mature students ready for international learning environments."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Seamless Credit Mapping",
      description: "Unified curriculum ensures smooth academic transfer between institutions."
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "International Campus Experience",
      description: "Final year abroad for research projects and industry exposure."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Smarter Investment",
      description: "International outcomes at optimized costs compared to full abroad programs."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Readiness",
      description: "Global credentials and stronger placement pathways worldwide."
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "End-to-End Support",
      description: "Complete assistance with admissions, visas, and transitions."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-white" data-testid="usps-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#A21D2E]/10 rounded-full text-[#A21D2E] text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="section-title">Why Global Programs at Medicaps?</h2>
          <p className="section-subtitle mx-auto">
            Discover the unique advantages that make our dual degree programs stand out.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usps.map((usp, index) => (
            <div 
              key={index} 
              className="usp-card"
              style={{ animationDelay: `${index * 100}ms` }}
              data-testid={`usp-card-${index}`}
            >
              <div className="usp-icon text-[#283887]">
                {usp.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{usp.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Partners Section
const PartnersSection = () => {
  const partners = [
    {
      name: "Woosong University",
      country: "South Korea",
      logo: <WoosongLogo />,
      description: "A leading private university known for innovation in education and strong industry connections in the K-Tech ecosystem.",
      color: "woosong",
      accent: "#0D9488",
      website: "https://english.wsu.ac.kr",
      bgColor: "bg-teal-50"
    },
    {
      name: "aivancity",
      country: "France",
      logo: <AivancityLogo />,
      description: "Paris-based school specializing in AI, Data Science, and Technology. Access to the European tech ecosystem.",
      color: "aivancity",
      accent: "#1E3A5F",
      website: "https://www.aivancity.ai",
      bgColor: "bg-slate-50"
    },
    {
      name: "INTI International University",
      country: "Malaysia",
      logo: <IntiLogo />,
      description: "One of Malaysia's premier private institutions offering industry-integrated learning with ASEAN market insights.",
      color: "inti",
      accent: "#B91C1C",
      website: "https://newinti.edu.my",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section id="partners" className="py-20 md:py-28 bg-gray-50" data-testid="partners-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#283887]/10 rounded-full text-[#283887] text-sm font-semibold mb-4">
            Global Network
          </span>
          <h2 className="section-title">Our University Partners</h2>
          <p className="section-subtitle mx-auto">
            Collaborate with world-class institutions across Asia and Europe.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <a 
              key={index} 
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`partner-card ${partner.color} ${partner.bgColor} p-8 shadow-lg card-hover block rounded-2xl border border-gray-100`}
              data-testid={`partner-card-${partner.color}`}
            >
              <div className="mb-6 h-20 flex items-center bg-white rounded-xl p-4 shadow-sm">
                {partner.logo}
              </div>
              <div className="country-tag mb-4">
                <MapPin className="w-4 h-4" />
                {partner.country}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>
              <div className="mt-4 flex items-center text-sm font-medium" style={{ color: partner.accent }}>
                Visit Website <ExternalLink className="w-4 h-4 ml-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Programs Section
const ProgramsSection = () => {
  const programs = [
    {
      partner: "Woosong University",
      partnerLogo: <WoosongLogo />,
      country: "South Korea",
      flag: "🇰🇷",
      color: "woosong",
      headerBg: "bg-gradient-to-r from-teal-600 to-teal-500",
      tagline: "Gateway to K-Tech Innovation",
      stats: { students: "500+", placements: "95%", partners: "50+" },
      courses: [
        {
          name: "B.Tech",
          structure: "3+1 Year Program",
          icon: <GraduationCap className="w-6 h-6" />,
          eligibility: "10+2 with PCM (60%+)",
          duration: "4 Years Total",
          details: [
            { label: "3 Years", location: "Medicaps University, India", desc: "Core engineering foundation" },
            { label: "1 Year", location: "Woosong University, South Korea", desc: "Specialization & industry exposure" }
          ]
        },
        {
          name: "MBA",
          structure: "1+1 Year Program",
          icon: <Briefcase className="w-6 h-6" />,
          eligibility: "Bachelor's degree (50%+)",
          duration: "2 Years Total",
          details: [
            { label: "1 Year", location: "Medicaps University, India", desc: "Business fundamentals" },
            { label: "1 Year", location: "Woosong University, South Korea", desc: "Global business strategy" }
          ]
        }
      ],
      highlights: ["Samsung & LG Industry Visits", "Korean Language Certificate", "Tech Startup Ecosystem Access", "Cultural Immersion Program"]
    },
    {
      partner: "aivancity",
      partnerLogo: <AivancityLogo />,
      country: "France",
      flag: "🇫🇷",
      color: "aivancity",
      headerBg: "bg-gradient-to-r from-slate-800 to-slate-700",
      tagline: "Europe's Premier AI & Data School",
      stats: { students: "300+", placements: "92%", partners: "40+" },
      courses: [
        {
          name: "B.Tech + B.S.",
          structure: "3+1 Year Program",
          subtitle: "AI & Data Science",
          icon: <BookOpen className="w-6 h-6" />,
          eligibility: "10+2 with PCM (60%+)",
          duration: "4 Years Total",
          details: [
            { label: "3 Years", location: "Medicaps University, India", desc: "CS & AI fundamentals" },
            { label: "1 Year", location: "aivancity, Paris, France", desc: "Advanced AI specialization" }
          ]
        },
        {
          name: "M.Tech + M.S.",
          structure: "1+1 Year Program",
          subtitle: "AI & Data Science",
          icon: <Target className="w-6 h-6" />,
          eligibility: "B.Tech/BE (55%+)",
          duration: "2 Years Total",
          details: [
            { label: "1 Year", location: "Medicaps University, India", desc: "Research methodology" },
            { label: "1 Year", location: "aivancity, Paris, France", desc: "AI research & thesis" }
          ]
        }
      ],
      highlights: ["European Tech Giants Network", "AI Ethics & Governance Focus", "Paris Campus Experience", "Schengen Zone Opportunities"]
    },
    {
      partner: "INTI International University",
      partnerLogo: <IntiLogo />,
      country: "Malaysia",
      flag: "🇲🇾",
      color: "inti",
      headerBg: "bg-gradient-to-r from-red-700 to-red-600",
      tagline: "ASEAN's Business Gateway",
      stats: { students: "200+", placements: "90%", partners: "30+" },
      courses: [
        {
          name: "Global MBA",
          structure: "1+1 Year Program",
          icon: <TrendingUp className="w-6 h-6" />,
          eligibility: "Bachelor's degree (50%+)",
          duration: "2 Years Total",
          details: [
            { label: "1 Year", location: "Medicaps University, India", desc: "Management foundation" },
            { label: "1 Year", location: "INTI University, Malaysia", desc: "Global business immersion" }
          ]
        }
      ],
      highlights: ["Fortune 500 Internships", "ASEAN Business Network", "Multicultural Leadership", "Industry Mentorship Program"]
    }
  ];

  return (
    <section id="programs" className="py-20 md:py-28" data-testid="programs-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#A21D2E]/10 rounded-full text-[#A21D2E] text-sm font-semibold mb-4">
            Study Pathways
          </span>
          <h2 className="section-title">Programs & Study Pathways</h2>
          <p className="section-subtitle mx-auto">
            Choose your path to a global career with our structured dual degree programs.
          </p>
        </div>
        
        <div className="space-y-10">
          {programs.map((program, pIndex) => (
            <div 
              key={pIndex} 
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
              data-testid={`program-${program.color}`}
            >
              {/* Program Header */}
              <div className={`${program.headerBg} p-6 md:p-8`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="bg-white rounded-xl p-3 shadow-lg">
                      {program.partnerLogo}
                    </div>
                    <div>
                      <div className="text-white/70 text-sm mb-1">In collaboration with</div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">{program.partner}</h3>
                      <p className="text-white/80 text-sm mt-1">{program.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-2xl">{program.flag}</span>
                    <span className="text-white font-medium">{program.country}</span>
                  </div>
                </div>
              </div>
              
              {/* Courses Grid */}
              <div className="p-6 md:p-8">
                <div className={`grid ${program.courses.length > 1 ? 'lg:grid-cols-2' : ''} gap-6 mb-8`}>
                  {program.courses.map((course, cIndex) => (
                    <div 
                      key={cIndex} 
                      className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                      data-testid={`course-${program.color}-${cIndex}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#283887]">
                            {course.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{course.name}</h4>
                            {course.subtitle && (
                              <span className="text-sm text-[#A21D2E] font-medium">{course.subtitle}</span>
                            )}
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-[#283887] text-white rounded-full text-xs font-semibold">
                          {course.structure}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Award className="w-4 h-4" />
                          <span>{course.eligibility}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        {course.details.map((detail, dIndex) => (
                          <div key={dIndex} className="flex items-start gap-3 bg-white rounded-xl p-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${
                              dIndex === 0 ? 'bg-[#283887]' : 'bg-[#A21D2E]'
                            }`}>
                              {detail.label.split(' ')[0]}
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900">{detail.label}</div>
                              <div className="text-sm text-gray-500">{detail.location}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{detail.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Highlights */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-[#A21D2E]" />
                    <span className="font-semibold text-gray-900">Program Highlights</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {program.highlights.map((highlight, hIndex) => (
                      <span 
                        key={hIndex}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Competencies Section
const CompetenciesSection = () => {
  const competencies = [
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Cross-Cultural Intelligence",
      description: "Navigate diverse cultural environments with ease and confidence."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Global Academic Readiness",
      description: "Prepared for international academic standards and expectations."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Industry-Relevant Problem Solving",
      description: "Apply knowledge to real-world challenges across industries."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Professional Communication & Presence",
      description: "Excel in global professional settings with polished skills."
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-gray-50" data-testid="competencies-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-2 bg-[#283887]/10 rounded-full text-[#283887] text-sm font-semibold mb-4">
              Graduate Outcomes
            </span>
            <h2 className="section-title mb-6">Key Competencies You'll Gain</h2>
            <p className="text-gray-600 text-lg mb-8">
              Our dual degree programs are designed to equip you with competencies 
              that matter in today's global marketplace.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {competencies.map((comp, index) => (
                <div 
                  key={index} 
                  className="competency-card bg-white"
                  data-testid={`competency-${index}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#283887]/10 to-[#A21D2E]/10 flex items-center justify-center text-[#283887] flex-shrink-0">
                    {comp.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{comp.title}</h4>
                    <p className="text-sm text-gray-600">{comp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=400&fit=crop&auto=format&q=75"
              alt="Students collaborating on project"
              className="rounded-3xl shadow-2xl w-full object-cover"
              loading="lazy"
              width="500"
              height="400"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#283887] to-[#A21D2E] flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-500">Global Alumni</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Success stories across Asia & Europe</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#283887] text-white rounded-2xl shadow-xl p-4">
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5" />
                <span className="font-bold">4 Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Admissions Section
const AdmissionsSection = () => {
  const steps = [
    { step: 1, title: "Submit Application", description: "Complete online application with required documents." },
    { step: 2, title: "Document Verification", description: "Our team reviews your academic credentials." },
    { step: 3, title: "Counseling Session", description: "One-on-one guidance to choose the right program." },
    { step: 4, title: "Admission Offer", description: "Receive your offer letter upon selection." },
    { step: 5, title: "Visa Assistance", description: "Complete support for visa processing." },
    { step: 6, title: "Begin Your Journey", description: "Start your dual degree program!" }
  ];

  const scholarships = [
    "Meritorious Students",
    "Sports Excellence",
    "Alumni Referral",
    "Sibling Discount",
    "Early Bird Offer",
    "Need-Based Aid"
  ];

  return (
    <section id="admissions" className="py-20 md:py-28 bg-gray-50" data-testid="admissions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#A21D2E]/10 rounded-full text-[#A21D2E] text-sm font-semibold mb-4">
            Get Started
          </span>
          <h2 className="section-title">Admissions & Scholarships</h2>
          <p className="section-subtitle mx-auto">
            Your journey to a global education starts here. Follow these simple steps.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Application Process</h3>
            <div className="space-y-6">
              {steps.map((item, index) => (
                <div key={index} className="timeline-item" data-testid={`admission-step-${index}`}>
                  <div className="timeline-dot">{item.step}</div>
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scholarships */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Scholarship Categories</h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#283887] to-[#A21D2E] flex items-center justify-center">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Financial Support</h4>
                  <p className="text-gray-600">Multiple scholarship options available</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {scholarships.map((scholarship, index) => (
                  <span 
                    key={index} 
                    className="scholarship-badge"
                    data-testid={`scholarship-${index}`}
                  >
                    <Star className="w-4 h-4" />
                    {scholarship}
                  </span>
                ))}
              </div>
              
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-600 text-sm mb-4">
                  Scholarships are awarded based on merit, achievements, and financial need. 
                  Contact our admissions team for detailed eligibility criteria.
                </p>
                <a 
                  href="#hero-form" 
                  className="btn-primary inline-flex"
                  data-testid="scholarship-apply-btn"
                >
                  Apply for Scholarship <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Yukta Kandhari",
      program: "B.Tech, Computer Science",
      package: "48 LPA",
      company: "Top One Percent",
      quote: "I am very lucky that I am studying in Medicaps University. The relationship between faculties and students is exceptional. The dual degree program opened doors I never knew existed.",
      image: "https://www.medicaps.ac.in/uploads/testimonial/yukta-(1).webp"
    },
    {
      name: "Chhavi Jain",
      program: "B.Tech, Engineering",
      package: "52 LPA",
      company: "Microsoft",
      quote: "Medicaps University takes pride in delivering top-notch placements, connecting students with leading companies and global brands.",
      image: "https://www.medicaps.ac.in/uploads/testimonial/chhavi-jain.webp"
    },
    {
      name: "Ashvin Jain",
      program: "B.Tech, Computer Science",
      package: "44 LPA",
      company: "Amazon",
      quote: "The industry exposure and mentorship at Medicaps prepared me for a global career. Best decision of my academic journey.",
      image: "https://www.medicaps.ac.in/uploads/testimonial/ashvin-jain.webp"
    }
  ];

  return (
    <section className="py-20 md:py-28" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#283887]/10 rounded-full text-[#283887] text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <p className="section-subtitle mx-auto">
            Hear from students who transformed their careers through our programs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#283887]/20"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.program}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-600 italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-500 block">Placed at</span>
                  <span className="text-sm font-medium text-gray-700">{testimonial.company}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">Package</span>
                  <span className="text-xl font-bold text-[#A21D2E]">{testimonial.package}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      question: "How does credit transfer work between universities?",
      answer: "Our unified curriculum ensures seamless credit mapping between Medicaps and partner universities. All courses are pre-approved and recognized by both institutions, eliminating any credit recognition issues."
    },
    {
      question: "What are the total costs compared to studying abroad for 4 years?",
      answer: "Our dual degree programs offer significant cost savings - typically 40-60% less than studying abroad for the entire duration. You benefit from Indian fee structure for the initial years while gaining international credentials."
    },
    {
      question: "Do I get two separate degrees or a single dual degree?",
      answer: "Upon successful completion, you receive credentials from both institutions. The exact format varies by program - some offer two separate degrees, while others offer a joint/dual degree certificate."
    },
    {
      question: "What support is provided for visa applications?",
      answer: "Medicaps provides comprehensive visa assistance including document preparation, application guidance, interview preparation, and coordination with partner universities for required documentation."
    },
    {
      question: "Can I work part-time while studying abroad?",
      answer: "Work permissions vary by country. In South Korea, France, and Malaysia, international students are generally allowed to work part-time (20-28 hours/week) during academic sessions."
    },
    {
      question: "What are the language requirements for partner universities?",
      answer: "All programs are taught in English. Some programs may offer optional local language courses to enhance your cultural experience and employability in the host country."
    }
  ];

  return (
    <section id="faqs" className="py-20 md:py-28 bg-gray-50" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#A21D2E]/10 rounded-full text-[#A21D2E] text-sm font-semibold mb-4">
            FAQs
          </span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle mx-auto">
            Find answers to common questions about our dual degree programs.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`} 
              className="faq-item px-6"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-[#283887] py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="#hero-form" className="btn-primary inline-flex" data-testid="faq-contact-btn">
            <Mail className="w-5 h-5" /> Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="footer py-16" data-testid="footer" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white rounded-lg p-2">
                <img 
                  src="https://www.medicaps.ac.in/public/frontend/images/medicaps-logo-fin.webp" 
                  alt="Medicaps University"
                  className="h-10"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Empowering students with global education opportunities through 
              strategic international partnerships and dual degree programs.
            </p>
            
            {/* Partner Logos in Footer */}
            <div className="mb-6">
              <p className="text-white/50 text-sm mb-3">In collaboration with:</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="bg-white rounded-lg p-2">
                  <img 
                    src="https://english.wsu.ac.kr/site/main_eng/images/logo.png" 
                    alt="Woosong University"
                    className="h-8"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="bg-white rounded-lg p-2">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_dual-degree-hub/artifacts/872sh3et_logo-footer-aivancity.png" 
                    alt="aivancity"
                    className="h-8"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="bg-white rounded-lg p-2">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_dual-degree-hub/artifacts/osnfrd3t_INTI-40.png" 
                    alt="INTI International University"
                    className="h-8"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://www.medicaps.ac.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Main Website
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#programs" className="text-white/70 hover:text-white transition-colors">Programs</a></li>
              <li><a href="#partners" className="text-white/70 hover:text-white transition-colors">Partners</a></li>
              <li><a href="#admissions" className="text-white/70 hover:text-white transition-colors">Admissions</a></li>
              <li><a href="#faqs" className="text-white/70 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/70">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>A.B. Road Pigdamber, Rau, Indore, MP 453331</span>
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Phone className="w-4 h-4" />
                +91 731-3111500
              </li>
              <li className="flex items-center gap-2 text-white/70">
                <Mail className="w-4 h-4" />
                director.admissions@medicaps.ac.in
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Medicaps University. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://www.medicaps.ac.in/quick-links/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://www.medicaps.ac.in/quick-links/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a minimum loading time to prevent flash
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e2e8f0',
          borderTop: '4px solid #283887',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <h1 style={{ color: '#283887', marginBottom: '10px' }}>Medicaps University</h1>
        <p style={{ color: '#64748b' }}>Global Dual Degree Programs</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="App" data-testid="app-container">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#283887] focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <Navigation />
      <main role="main" id="main-content" aria-label="Main content">
        <HeroSection />
        <QuoteSection />
        <USPsSection />
        <PartnersSection />
        <ProgramsSection />
        <CompetenciesSection />
        <AdmissionsSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
