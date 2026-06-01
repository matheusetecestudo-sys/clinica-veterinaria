/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OptimizedImage } from "./components/OptimizedImage";
import { 
  Heart, 
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  Plus,
  Minus,
  Quote,
  Star,
  Activity,
  ArrowRight,
  Shield,
  Smile,
  Stethoscope,
  ChevronRight,
  Check,
  ChevronDown
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix for Leaflet marker icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const WHATSAPP_URL = "https://wa.me/5511992876219?text=Olá! Gostaria de agendar uma consulta para o meu pet na Clínica Duno.";

// Custom WhatsApp SVG icon component
const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
  </svg>
);

// Green Floating WhatsApp Button with pure logo matching the User prompt print exactly
const WhatsAppButton = () => {
  return (
    <motion.a 
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[99] bg-[#25d366] text-white p-4 rounded-full shadow-[0_12px_30px_rgba(37,211,102,0.5)] hover:bg-[#20ba5a] transition-all flex items-center justify-center cursor-pointer border border-white/20"
      title="Falar no WhatsApp"
      id="floating-whatsapp"
    >
      <WhatsAppLogo className="w-8 h-8 text-white" />
    </motion.a>
  );
};

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScrollProgress);
    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[4px] bg-transparent z-[110] pointer-events-none">
      <div 
        className="h-full bg-[#f97316] shadow-[0_0_10px_#f97316] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

// Navbar component with clean, organized layout across desktop & mobile
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "INÍCIO", href: "#inicio" },
    { name: "SERVIÇOS", href: "#servicos" },
    { name: "RESULTADOS", href: "#resultados" },
    { name: "DIFERENCIAIS", href: "#diferenciais" },
    { name: "A CLÍNICA", href: "#about" },
    { name: "ESPECIALISTAS", href: "#equipe" },
    { name: "FAQ", href: "#faq" },
    { name: "CONTATO", href: "#contato" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${isScrolled ? "bg-black/95 border-b border-white/5 shadow-2xl py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Name Logotype Only "DUNO" in Orange */}
        <a href="#inicio" className="flex items-center gap-2 group shrink-0">
          <span className="text-xl md:text-2xl font-serif font-black text-[#f97316] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105">DUNO</span>
        </a>

        {/* Unified Center Menu - streamlined and beautifully spaced */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 justify-center">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="text-white/80 hover:text-[#f97316] text-[11px] font-bold tracking-[0.2em] transition-colors duration-300 uppercase whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Unified Right Call Button - short, direct, extremely premium */}
        <div className="hidden lg:flex items-center shrink-0">
          <motion.a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white text-[10px] font-bold tracking-[0.2em] rounded-full transition-all flex items-center gap-2.5 group/btn whitespace-nowrap"
          >
            <span>AGENDAR CONSULTA</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform shrink-0" />
          </motion.a>
        </div>

        {/* Mobile menu button with lg:hidden to avoid duplication or empty spacing */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-white/90 hover:text-[#f97316] transition-colors p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drop down menu with correct lg:hidden and polished structure */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 border-t border-white/5 absolute top-full left-0 right-0 z-50 py-8 px-6 shadow-2xl backdrop-blur-md"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/90 hover:text-[#f97316] text-[11px] font-bold tracking-[0.2em] border-b border-white/5 pb-2.5 transition-colors block uppercase"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <a 
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-center text-xs tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-2.5 group whitespace-nowrap"
                >
                  <span>AGENDAR CONSULTA</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero - copy layout of print: elegant, with orange subtitle accents and large typography
const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[90vh] bg-black flex items-center justify-start overflow-hidden pt-20 pb-6 md:pt-24 md:pb-8">
      {/* Background Image Wrapper - Full-screen coverage on all devices */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Desktop Image */}
        <div className="hidden md:block w-full h-full">
          <OptimizedImage 
            src="https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/bannerdesktop.png" 
            alt="Clínica Veterinária Duno de Alta Performance" 
            className="w-full h-full object-cover filter contrast-[1.04] brightness-90 transition-transform duration-[6000ms] scale-102"
            containerClassName="w-full h-full"
            priority
            sizes="100vw"
          />
        </div>
        {/* Mobile Image */}
        <div className="block md:hidden w-full h-full">
          <OptimizedImage 
            src="https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/bannermobile.png" 
            alt="Clínica Veterinária Duno de Alta Performance - Mobile" 
            className="w-full h-full object-cover filter contrast-[1.04] brightness-90"
            containerClassName="w-full h-full"
            priority
            sizes="100vw"
          />
        </div>
        {/* Underlay / gradients for premium styling and text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-10 flex flex-col justify-center text-left">
          {/* Tag matches print */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-3 md:mb-4"
          >
            <div className="h-[2px] w-6 bg-[#f97316]"></div>
            <span className="text-[#f97316] text-[10px] font-bold tracking-[0.4em] uppercase">HOSPITAL VETERINÁRIO 24H</span>
          </motion.div>

          {/* Title - highly elegant and professional */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[36px] md:text-[68px] font-serif font-bold text-white mb-3 md:mb-4 leading-[1.1] tracking-tighter uppercase"
          >
            Cuidado médico <br />
            <span className="text-[#f97316] italic font-normal">de alta precisão</span> <br />
            24 horas por dia.
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base max-w-[580px] mb-4 md:mb-5 leading-relaxed font-normal"
          >
            Referência em diagnósticos complexos, cirurgias avançadas e atendimento humanizado. Na Duno, a saúde do seu pet é tratada com máximo rigor científico e carinho humano.
          </motion.p>

          {/* Species treated badge row - Inform types of animals */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mb-5 flex flex-wrap gap-2.5 items-center border-t border-b border-white/10 py-3.5 max-w-[620px]"
          >
            <span className="text-[#f97316] text-[8.5px] font-bold tracking-[0.25em] uppercase mr-1">PACIENTES ATENDIDOS:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Cão / Caninos", emoji: "🐶" },
                { name: "Gato / Felinos", emoji: "🐱" },
                { name: "Animais Silvestres", emoji: "🦜" },
                { name: "Exóticos e Pets de Bolso", emoji: "🦎" }
              ].map((species, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10 text-[10.5px] text-white font-medium hover:bg-white/10 transition-colors"
                >
                  <span>{species.emoji}</span>
                  <span>{species.name}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3.5 mb-4 md:mb-6"
          >
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-7 py-3.5 bg-[#f97316] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:bg-[#ea580c] hover:shadow-[0_10px_30px_rgba(249,115,22,0.4)] active:scale-95 shadow-xl inline-flex items-center justify-center gap-2.5 group/btn whitespace-nowrap"
            >
              <span>AGENDAR CONSULTA</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover/btn:translate-x-1 transition-transform shrink-0" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Explorer micro label mimicking print */}
      <div className="absolute bottom-6 left-6 md:left-12 z-10 hidden md:flex items-center gap-4 text-white/30 text-[9px] font-mono tracking-[0.4em] uppercase">
        <span className="w-20 h-[1px] bg-white/20"></span>
        <span>ROLE PARA EXPLORAR</span>
      </div>
    </section>
  );
};

interface ServiceItem {
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
}

// Services Section styled exactly like the screenshot
const Services = () => {
  const servicesList: ServiceItem[] = [
    {
      title: "Consulta Veterinária",
      description: "Consulta geral, diagnósticos precisos e prevenção para o seu pet.",
      fullDescription: "Avaliação físico-clínica completa, orientação vacinal personalizada e exames preliminares minuciosos para garantir a prevenção de patologias e a saúde integral do seu animal de estimação.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/consulta_veterinaria.png"
    },
    {
      title: "Atendimento Emergencial",
      description: "Pronto atendimento e socorro imediato 24 horas por dia.",
      fullDescription: "Equipe de médicos-veterinários intensivistas de plantão 24 horas para socorrer qualquer urgência crítica imediata, amparada por suporte de oxigenio, UTI e monitoramento eletrônico contínuo.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/atendimento_emergencial.jpg"
    },
    {
      title: "Cirurgias Veterinárias",
      description: "Procedimentos cirúrgicos seguros com anestesia moderna.",
      fullDescription: "Complexo cirúrgico equipado com alta tecnologia cirúrgica estéril, controle anestésico inalatório computadorizado e protocolos rigorosos de controle de dor pós-operatória.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/cirurgias_veterinarias.jpg"
    },
    {
      title: "Exames Laboratoriais",
      description: "Análises clínicas minuciosas e diagnósticos confiáveis.",
      fullDescription: "Processamento ágil e preciso de painéis hematológicos, bioquímicos, urinálise e citologias para guiar e voltar a conduta terapêutica ideal com máxima segurança científica.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/exames_laboratoriais.jpg"
    },
    {
      title: "Vacinação",
      description: "Proteção vacinal de qualidade com vacinas importadas.",
      fullDescription: "Imunização estratégica utilizando exclusivamente vacinas importadas de laboratórios líderes globais, oferecendo proteção robusta e segura contra as principais zoonoses e infecções.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/vacinacao.jpg"
    },
    {
      title: "Internação",
      description: "Espaço confortável com monitoramento constante 24 horas.",
      fullDescription: "Acomodações individuais limpas e climatizadas para cães e gatos de forma separada, aliadas à vigilância assistencial veterinária ininterrupta para plena recuperação e bem-estar do pet.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/internacao.png"
    }
  ];

  return (
    <section id="servicos" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-neutral-50/50 relative overflow-hidden">
      {/* Decorative subtle grid background */}
      <div className="absolute inset-0 bg-grid-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none opacity-50" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f97316]/10 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse"></span>
            <span className="text-[#f97316] font-bold uppercase tracking-[0.3em] text-[9px] block">
              NOSSOS SERVIÇOS 24H
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-4 leading-tight tracking-tighter uppercase">
            Medicina Veterinária <br />
            <span className="text-[#f97316] italic font-normal font-serif">de Alta Performance.</span>
          </h2>
          <p className="text-gray-550 text-xs md:text-sm max-w-[620px] mx-auto leading-relaxed">
            Tecnologia de ponta e zelo científico sob os mais rigorosos padrões médico-veterinários do país, garantindo máximo reestabelecimento e bem-estar.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[2px] bg-[#f97316] mx-auto mt-4"
          ></motion.div>
        </motion.div>

        {/* Services Grid layout made responsive with orange cards borders */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden border-2 border-[#f97316]/85 md:border-[#f97316]/30 shadow-[0_20px_40px_rgba(249,115,22,0.08)] md:shadow-[0_4px_20px_rgba(0,0,0,0.01)] md:hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] md:hover:border-[#f97316]/85 transition-all duration-500 flex flex-col group p-3 xs:p-4.5 lg:p-5 relative h-full"
              id={`service-card-${index}`}
            >
              {/* Top accent line on hover and permanently on mobile */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#f97316] to-[#ea580c] transform scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Card Image using precise aspect ratio matching success cases */}
              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4.5 relative bg-neutral-100">
                <OptimizedImage 
                  src={service.image} 
                  alt={service.title} 
                  className="scale-105 md:scale-100 md:group-hover:scale-108 transition-transform duration-700 ease-out filter contrast-[1.02]"
                  containerClassName="w-full h-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text & Action content content-to-button margins optimized to equal success cases */}
              <div className="flex-grow flex flex-col justify-between p-1 sm:p-2">
                <div className="mb-3.5 sm:mb-5 text-center">
                  <h3 className="font-sans text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold text-[#f97316] mb-1 sm:mb-2 leading-tight uppercase text-center">
                    {service.title}
                  </h3>
                  
                  {/* Mobile Description */}
                  <p className="block md:hidden text-neutral-900 leading-normal sm:leading-relaxed font-semibold text-center text-[10px] xs:text-[11.5px] sm:text-[13px] md:text-[12.5px]">
                    {service.description}
                  </p>
                  
                  {/* Desktop Description */}
                  <p className="hidden md:block text-neutral-800 leading-relaxed font-semibold text-center text-[12.5px]">
                    {service.fullDescription || service.description}
                  </p>
                </div>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 sm:py-3.5 md:py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-center text-[8.5px] xs:text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(249,115,22,0.3)] border-none whitespace-nowrap group/btn"
                >
                  <span>
                    <span className="inline md:hidden">AGENDAR</span>
                    <span className="hidden md:inline">AGENDAR CONSULTA</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1.5 transition-transform shrink-0" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Gallery ("GALERIA DE EXCELÊNCIA" from the print template style)
const Gallery = () => {
  const cases = [
    {
      tag: "ROTINA EXCELÊNCIA (CÃO)",
      title: "Check-up Geral do Husky Luke",
      desc: "Avaliação preventiva completa do Husky de olhos azuis em consulta de rotina domiciliar para manutenção de bem-estar absoluto.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/pet01.jpg",
      objectPosition: "object-center"
    },
    {
      tag: "ANIMAIS SILVESTRES (AVE)",
      title: "Medicina Preventiva do Papagaio Fred",
      desc: "Monitoramento clínico geral e acompanhamento nutricional detalhado para excelente qualidade de vida e imunidade de aves exóticas.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/pet02.jpg",
      objectPosition: "object-top"
    },
    {
      tag: "CHECK-UP COMPLETO (GATO)",
      title: "Saúde Integrativa do Gato Pipoca",
      desc: "Diagnóstico precoce e acompanhamento dermatológico, auditivo e oftalmológico de felino SRD para vitalidade plena.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/pet03.jpg",
      objectPosition: "object-center"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <section id="resultados" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-neutral-100 relative border-t border-neutral-200">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">
            GALERIA DE EXCELÊNCIA VET
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4 uppercase tracking-tighter">
            CASOS CLÍNICOS E <span className="text-[#f97316] italic font-normal">RESULTADOS REAIS.</span>
          </h2>
          <p className="text-neutral-800 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Conheça as histórias reais de superação de pacientes complexos que recuperaram vitalidade e bem-estar em nosso hospital 24h. Cada tratamento é planejado no detalhe.
          </p>
        </motion.div>

        {/* Modern Medical Stats under the header for elite presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6 md:mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/60 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 flex items-center justify-center text-[#f97316] shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold text-neutral-900 tracking-tight font-sans">98.4%</span>
              <span className="block text-[10px] text-neutral-800 font-bold uppercase tracking-wider">Sucesso Cirúrgico</span>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/60 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold text-neutral-900 tracking-tight font-sans">UTI 24H</span>
              <span className="block text-[10px] text-neutral-800 font-bold uppercase tracking-wider">Cuidado Intensivo</span>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-neutral-200/60 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 flex items-center justify-center text-[#f97316] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="block text-xl font-bold text-neutral-900 tracking-tight font-sans">+25 mil</span>
              <span className="block text-[10px] text-neutral-800 font-bold uppercase tracking-wider">Pets Reabilitados</span>
            </div>
          </div>
        </div>

        {/* Carousel for Mobile only */}
        <div className="block md:hidden relative mt-4">
          <div className="overflow-hidden px-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden border-2 border-[#f97316]/85 flex flex-col p-3 xs:p-4.5 lg:p-6 relative text-center shadow-[0_20px_40px_rgba(249,115,22,0.08)] animate-fade-in"
              >
                {/* Top Accent Line permanently displayed on mobile */}
                <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#f97316] to-[#ea580c] transform scale-x-100 transition-transform duration-500 origin-left" />

                <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5 relative bg-neutral-100">
                  <OptimizedImage 
                    src={cases[activeSlide].image} 
                    alt={cases[activeSlide].title} 
                    className={`w-full h-full object-cover scale-105 ${cases[activeSlide].objectPosition || "object-center"}`}
                    containerClassName="w-full h-full"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between p-1 sm:p-2">
                  <div className="mb-3.5 sm:mb-5 text-center">
                    <span className="text-neutral-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase block mb-1">
                      {cases[activeSlide].tag}
                    </span>
                    <h3 className="font-sans text-[11px] xs:text-[13px] sm:text-base md:text-lg font-bold text-[#f97316] mb-1 sm:mb-2 leading-tight uppercase text-center">
                       {cases[activeSlide].title}
                    </h3>
                    <p className="text-neutral-900 leading-normal sm:leading-relaxed font-semibold text-center text-[10px] xs:text-[11.5px] sm:text-[13px] md:text-[12.5px]">
                      {cases[activeSlide].desc}
                    </p>
                  </div>

                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 sm:py-3.5 md:py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-center text-[8.5px] xs:text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(249,115,22,0.3)] border-none whitespace-nowrap group/btn"
                  >
                    <span>FALE AGORA</span>
                    <ArrowRight className="w-4 h-4 text-white shrink-0" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white transition-colors shadow-sm cursor-pointer border-none"
              aria-label="Caso anterior"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {cases.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? "w-6 bg-[#f97316]" : "w-2 bg-neutral-300"}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white transition-colors shadow-sm cursor-pointer border-none"
              aria-label="Próximo caso"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid for Desktop/Tablet */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {cases.map((cs, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-[1.25rem] sm:rounded-[2rem] overflow-hidden border-2 border-[#f97316]/85 md:border-[#f97316]/30 shadow-[0_20px_40px_rgba(249,115,22,0.08)] md:shadow-[0_4px_20px_rgba(0,0,0,0.01)] md:hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] md:hover:border-[#f97316]/85 transition-all duration-500 flex flex-col group p-3 xs:p-4.5 lg:p-6 relative h-full"
            >
              {/* Top Accent Light Block permanently on mobile / hover on desktop */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#f97316] to-[#ea580c] transform scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-5 relative bg-neutral-100">
                <OptimizedImage 
                  src={cs.image} 
                  alt={cs.title} 
                  className={`scale-105 md:scale-100 md:group-hover:scale-105 transition-transform duration-700 ${cs.objectPosition || "object-center"}`}
                  containerClassName="w-full h-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="flex-grow flex flex-col justify-between p-0.5 sm:p-1.5">
                <div className="mb-3 sm:mb-5 text-center">
                  <span className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block mb-1">
                    {cs.tag}
                  </span>
                  <h3 className="font-sans text-base md:text-lg font-bold text-[#f97316] mb-1 sm:mb-1.5 leading-tight uppercase text-center">
                    {cs.title}
                  </h3>
                  <p className="text-neutral-900 text-[13px] md:text-[12.5px] leading-relaxed font-semibold text-center">
                    {cs.desc}
                  </p>
                </div>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 sm:py-3.5 md:py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full font-bold text-center text-[8.5px] xs:text-[10px] sm:text-[10px] tracking-wider uppercase flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 hover:shadow-[0_4px_15px_rgba(249,115,22,0.3)] border-none whitespace-nowrap group/btn"
                >
                  <span>FALE AGORA</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1.5 transition-transform shrink-0" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Por que escolher a Duno? (Golden standards of Duno - kept exactly as requested)
const Standards = () => {
  const items = [
    { 
      num: "01",
      icon: <Heart className="w-5 h-5 animate-pulse text-[#f97316]" />, 
      title: "CUIDADO INTEGRAL 24H", 
      desc: "Corpo clínico multidisciplinar trabalhando em sintonia para restabelecer a estabilidade e a felicidade do pet." 
    },
    { 
      num: "02",
      icon: <Shield className="w-5 h-5 text-[#f97316]" />, 
      title: "EMPATIA E SEGURANÇA", 
      desc: "Abordagem livre do medo, acolhimento diferenciado, monitoramento por câmeras e respostas rápidas." 
    },
    { 
      num: "03",
      icon: <Stethoscope className="w-5 h-5 text-[#f97316]" />, 
      title: "PADRÃO HOSPITALAR ELITE", 
      desc: "Equipamentos cirúrgicos esterilizados sob rígidas rotinas humanas e laboratório de análise integrado de pronto socorro." 
    },
  ];

  return (
    <section id="diferenciais" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-white overflow-hidden border-t border-neutral-100 relative">
      {/* Subtle decorative grid background for high-end feel */}
      <div className="absolute inset-0 bg-grid-neutral-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none opacity-40" />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header centered beautifully */}
        <div className="text-center mb-6 md:mb-8">
          <span className="text-[#f97316] font-bold uppercase tracking-widest text-[10px] mb-3 block font-sans">Por que escolher a Duno?</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-none uppercase tracking-tighter">
            NOSSOS PADRÕES <span className="text-[#f97316] italic font-normal">DE OURO.</span>
          </h2>
          <div className="h-[2px] w-20 bg-[#f97316] mx-auto mt-4"></div>
        </div>
        
        {/* Full-width cards with orange border exactly like services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="bg-white rounded-[1.25rem] sm:rounded-[2rem] border-2 border-[#f97316]/85 md:border-[#f97316]/30 shadow-[0_20px_40px_rgba(249,115,22,0.08)] md:shadow-[0_4px_20px_rgba(0,0,0,0.01)] md:hover:shadow-[0_20px_40px_rgba(249,115,22,0.08)] md:hover:border-[#f97316]/85 transition-all duration-500 bg-neutral-50/50 p-6 xs:p-7 md:p-6 relative overflow-hidden group min-h-[220px] flex flex-col items-center justify-between text-center"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#f97316] to-[#ea580c] transform scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Light Watermark Number */}
              <div className="absolute top-6 right-8 font-serif font-bold text-4xl text-[#f97316]/10 md:text-neutral-100 md:group-hover:text-[#f97316]/10 transition-colors duration-300 select-none">
                {item.num}
              </div>

              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#f97316]/10 md:bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#f97316] scale-110 md:scale-100 md:group-hover:scale-110 md:group-hover:bg-[#f97316]/10 transition-all duration-300 mb-4 mx-auto">
                {item.icon}
              </div>

              <div>
                <h4 className="text-sm font-sans font-extrabold text-[#f97316] mb-2 uppercase tracking-tight text-center">
                  {item.title}
                </h4>
                <p className="text-neutral-900 text-[13.5px] md:text-xs leading-relaxed font-semibold text-center">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// A clínica como está (About section - kept exactly as requested)
const About = () => {
  return (
    <section id="about" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-black text-white relative">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-neutral-900 relative">
            <OptimizedImage 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=2070&auto=format&fit=crop" 
              alt="Clínica Veterinária Duno Carinho e Conforto" 
              className="filter brightness-75 contrast-105"
              containerClassName="absolute inset-0"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {/* Subtle logo badge from print */}
          <div className="absolute -bottom-6 -right-6 bg-neutral-950 border border-neutral-800 p-6 rounded-[1.5rem] shadow-2xl hidden md:block max-w-[240px] text-white">
            <h4 className="text-xl font-serif font-bold tracking-widest text-[#f97316] mb-1">DUNO</h4>
            <p className="text-[11px] font-bold text-neutral-200">Excelência técnica de alto nível técnico unida a confortos modernos.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#f97316] font-bold uppercase tracking-widest text-[10px] mb-3 block">A Clínica</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight uppercase">
              Tecnologia de ponta. <br />
              <span className="text-[#f97316] italic font-normal">Conforto absoluto.</span>
            </h2>
          </motion.div>
          
          <div className="space-y-4 text-xs md:text-sm text-neutral-200 leading-relaxed font-semibold">
            <p>
              Unimos a precisão cirúrgica de um hospital de ponta com a ternura de um atendimento acolhedor. Nossa clínica funciona de forma integrada, agilizando diagnósticos minuciosos.
            </p>
            <p>
              Nossa estrutura física foi meticulosamente projetada para abrigar cães e gatos em consultórios acusticamente segregados, reduzindo qualquer desconforto ambiental do seu companheiro de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 bg-neutral-900 border border-[#f97316]/30 md:border-white/5 p-4 rounded-2xl md:hover:border-[#f97316]/30 transition-all duration-300">
              <Smile className="w-5 h-5 text-[#f97316]" />
              <p className="font-bold text-white uppercase tracking-widest text-[9px]">Acolhimento Premium</p>
            </div>
            <div className="flex items-center gap-3 bg-neutral-900 border border-[#f97316]/30 md:border-white/5 p-4 rounded-2xl md:hover:border-[#f97316]/30 transition-all duration-300">
              <Activity className="w-5 h-5 text-[#f97316]" />
              <p className="font-bold text-white uppercase tracking-widest text-[9px]">Monitoramento 24h</p>
            </div>
          </div>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 py-4 px-8 bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-[10px] tracking-widest uppercase rounded-full transition-all duration-300 group whitespace-nowrap shrink-0">
            <span>FALE AGORA</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Nossa Autoridade (Doctors / Specialists section)
const Authority = () => {
  const doctors = [
    {
      name: "Dra. Viviane Rocha",
      cro: "CRMV/SP 12431",
      specialty: "ANESTESIOLOGIA & ODONTOLOGIA VET",
      desc: "Pós-graduada e especialista em anestesiologia de alta segurança e suporte vital em procedimentos de reconstrução e assepsia.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/vt01.png"
    },
    {
      name: "Dr. Alexandre Silva",
      cro: "CRMV/SP 43212",
      specialty: "MEDICINA INTENSIVA & CIRURGIÃO CHEFE",
      desc: "Mestre em cirurgia pela USP, com ampla atuação em triagem, anestesiologia e procedimentos reconstrutivos complexos de alta performance.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/vt02.png"
    },
    {
      name: "Dra. Beatriz Santos",
      cro: "CRMV/SP 87629",
      specialty: "CARDIOLOGIA & EXAMES DIAGNÓSTICOS",
      desc: "Especialista em cardiologia veterinária de alta complexidade, diagnósticos rápidos e desenvolvimento de tratamentos preventivos avançados.",
      image: "https://raw.githubusercontent.com/matheusetecestudo-sys/clinica-veterinaria/main/public/imagens/vt03.png"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % doctors.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  return (
    <section id="equipe" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-neutral-100 border-t border-neutral-200">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto font-sans z-10 relative"
      >
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f97316]/10 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-pulse"></span>
            <span className="text-[#f97316] font-bold uppercase tracking-[0.3em] text-[9px] block">CORPO CLÍNICO DUNO</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight uppercase tracking-tighter">
            Especialistas em <br />
            <span className="text-[#f97316] italic font-normal font-serif">vidas salvas.</span>
          </h2>
          <p className="text-gray-550 text-xs md:text-sm max-w-[620px] mx-auto mt-3 leading-relaxed">
            Profissionais dedicados de amplo saber acadêmico. Oferecemos as melhores condutas com base no mais rígido rigor científico do país.
          </p>
        </div>

        {/* Carousel for Tablet & Mobile (under lg width) */}
        <div className="block lg:hidden relative">
          <div className="overflow-hidden px-1">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#f97316]/30 p-4 xs:p-5 md:p-6 relative cursor-pointer group shadow-[0_25px_50px_rgba(249,115,22,0.08)] min-h-[480px] flex flex-col justify-between"
              >
                {/* Top Accent Line permanently displayed on mobile */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-[#f97316] transform scale-x-100" />

                <div className="flex flex-col h-full justify-between gap-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-200/50 flex items-end justify-center min-h-[260px] xs:min-h-[290px] max-h-[340px] shadow-inner">
                    <OptimizedImage 
                      src={doctors[activeSlide].image} 
                      alt={doctors[activeSlide].name} 
                      className="filter contrast-[1.03] object-contain object-bottom w-full h-full max-h-full"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-[8.5px] font-bold tracking-widest uppercase shadow-sm">
                      ✓ PLANTÃO ATIVO
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[8px] font-mono font-bold text-white tracking-widest">
                      {doctors[activeSlide].cro}
                    </div>
                  </div>

                  <div className="p-1 text-center">
                    <span className="text-[#f97316] text-[10px] sm:text-[10.5px] font-bold tracking-[0.25em] uppercase block mb-1.5 text-center">
                      {doctors[activeSlide].specialty}
                    </span>
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-neutral-900 mb-2 uppercase tracking-tight text-center">
                      {doctors[activeSlide].name}
                    </h3>
                    <p className="text-neutral-600 text-[13px] sm:text-sm leading-relaxed font-normal text-center">
                      {doctors[activeSlide].desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white transition-colors shadow-sm cursor-pointer border-none"
              aria-label="Especialista anterior"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {doctors.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? "w-6 bg-[#f97316]" : "w-2 bg-neutral-300"}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white transition-colors shadow-sm cursor-pointer border-none"
              aria-label="Próximo especialista"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Doctors Grid for Desktop (lg and up) - LARGER AND MORE MAJESTIC */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {doctors.map((dr, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-neutral-200/80 hover:shadow-[0_30px_60px_rgba(249,115,22,0.1)] hover:border-[#f97316]/50 transition-all p-4 xs:p-5 md:p-6 duration-500 cursor-pointer group relative flex flex-col justify-between"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-[#f97316] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex flex-col h-full justify-between gap-5">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-200/50 flex items-end justify-center shadow-inner">
                  <OptimizedImage 
                    src={dr.image} 
                    alt={dr.name} 
                    className="filter contrast-[1.03] object-contain object-bottom w-full h-full max-h-full group-hover:scale-102 transition-transform duration-700 ease-out"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute top-5 left-5 bg-emerald-500 text-white px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-md">
                    ✓ PLANTÃO ATIVO
                  </div>
                  <div className="absolute bottom-5 left-5 bg-black/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-[10px] font-mono font-bold text-white tracking-widest leading-none shadow-md">
                    {dr.cro}
                  </div>
                </div>

                <div className="px-1 pt-1 pb-3 text-center">
                  <span className="text-[#f97316] text-[11px] font-bold tracking-[0.25em] uppercase block mb-1.5 text-center">
                    {dr.specialty}
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-slate-900 mb-2 tracking-tight uppercase text-center">
                    {dr.name}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed font-normal text-center">
                    {dr.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Depoimentos (Testimonials) with black color accents and elegant quoting layout
const Testimonials = () => {
  const reviews = [
    { 
      name: "Mariana L.", 
      role: "Tutora do Golden Max", 
      text: "No momento em que o Max rompeu o fêmur, o atendimento cirúrgico rápido e impecável da Duno salvou a vida dele.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    { 
      name: "Rodrigo F.", 
      role: "Tutor do Oliver", 
      text: "Suporte de emergência ágil com comunicação transparente pelo WhatsApp durante todo o tratamento do Oliver.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    { 
      name: "Juliana Mendes", 
      role: "Tutora da Gatinha Amora", 
      text: "Excelente cardiologia. O consultório exclusivo para felinos manteve a Amora sem estresse ambiental.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="depoimentos" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-black text-white relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <Quote className="w-10 h-10 text-[#f97316] mx-auto mb-3 opacity-40" />
          <span className="text-neutral-300 font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block">O QUE DIZEM DE NÓS</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-tighter">
            A prova de nossa <span className="text-[#f97316] italic font-normal font-serif">excelência.</span>
          </h2>
        </motion.div>

        {/* Carousel for Mobile only */}
        <div className="block md:hidden relative mt-4">
          <div className="overflow-hidden px-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900 p-4 xs:p-5 rounded-[2rem] border border-[#f97316]/40 flex flex-col justify-between min-h-[250px] shadow-[0_25px_50px_rgba(249,115,22,0.04)] relative"
              >
                {/* Top Accent Line permanently displayed on mobile */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f97316]/80 to-transparent transform scale-x-100 transition-transform duration-500" />

                <div>
                  <div className="flex gap-1 mb-4 text-[#f97316] justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#f97316]" />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-100 leading-relaxed italic mb-4 font-semibold text-center">
                    "{reviews[activeSlide].text}"
                  </p>
                </div>
                <div className="flex flex-col items-center gap-1.5 border-t border-white/5 pt-4 text-center">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-white/15 bg-neutral-850 flex items-center justify-center font-bold font-serif text-white text-base relative">
                    <OptimizedImage 
                      src={reviews[activeSlide].image} 
                      alt={reviews[activeSlide].name} 
                      className="w-full h-full object-cover animate-fade-in" 
                      containerClassName="absolute inset-0"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#f97316] uppercase tracking-tight text-center">{reviews[activeSlide].name}</h4>
                    <p className="text-[#f97316] text-[9px] font-bold uppercase tracking-widest mt-0.5 text-center">{reviews[activeSlide].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white transition-colors shadow-sm cursor-pointer border-none"
              aria-label="Depoimento anterior"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeSlide === idx ? "w-6 bg-[#f97316]" : "w-2 bg-neutral-700"}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f97316] hover:bg-[#ea580c] text-white transition-colors shadow-sm cursor-pointer border-none"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Grid for Desktop / Tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900/60 backdrop-blur-sm p-6 lg:p-7 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-[#f97316]/30 transition-all duration-300"
            >
              <div>
                <div className="flex gap-1 mb-4 text-[#f97316] justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#f97316]" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-neutral-100 leading-relaxed italic mb-5 font-semibold text-center">
                  "{review.text}"
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 border-t border-white/5 pt-4 text-center">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-white/15 bg-neutral-850 flex items-center justify-center font-bold font-serif text-white text-base relative">
                  <OptimizedImage 
                    src={review.image} 
                    alt={review.name} 
                    className="w-full h-full object-cover" 
                    containerClassName="absolute inset-0"
                    sizes="44px"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-[#f97316] uppercase tracking-tight text-center">{review.name}</h4>
                  <p className="text-[#f97316] text-[9px] font-bold uppercase tracking-widest mt-0.5 text-center">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const faqs = [
    {
      question: "Qual o horário de funcionamento e triagem de emergência?",
      answer: "Funcionamos 24 horas por dia, 7 dias por semana, incluindo feriados e madrugadas. Nossa equipe de urgência vet está de plantão físico constante no hospital."
    },
    {
      question: "Como funciona o agendamento de consultas ou vacinas?",
      answer: "Recomendamos agendar previamente pelo WhatsApp para garantir atendimento de imediato, organizando os horários de forma a reduzir o estresse ambiental do seu pet na recepção."
    },
    {
      question: "Como funciona a entrega de resultados de exames?",
      answer: "Possuímos laboratório calibrado integrado à própria infraestrutura. Hemogramas e outros testes cruciais ficam prontos em até 30 minutos em situações de emergência."
    },
    {
      question: "Como sou atualizado sobre as cirurgias do meu pet?",
      answer: "Nossa equipe envia boletins informativos e fotos do pet em cada transição para garantir conforto e total monitoramento aos tutores no WhatsApp."
    },
    {
      question: "Vocês atendem planos de saúde veterinários?",
      answer: "No momento operamos apenas de forma particular para garantir insumos de alta qualidade e dedicação exclusiva sem limitações operacionais, mas emitimos notas fiscais completas e laudos técnicos para que você solicite o reembolso junto ao seu convênio."
    },
    {
      question: "Quais as formas de pagamento disponíveis?",
      answer: "Oferecemos condições flexíveis, com pagamento à vista via Pix, além de parcelamento facilitado em até 10x sem juros em todos os cartões de crédito para consultas, cirurgias e internações."
    },
    {
      question: "Como funcionam as visitas ao pet internado?",
      answer: "As visitas são incentivadas diariamente em horários pré-determinados para que o tutor acompanhe de perto o amor e a evolução do paciente. Entendemos que o carinho da família é terapêutico."
    },
    {
      question: "Como garantem a segurança anestésica nas cirurgias?",
      answer: "Utilizamos anestesia inalatória de última geração acompanhada de monitoramento cardiorrespiratório contínuo, eletrocardiograma e pressão não invasiva, com acompanhamento de um anestesista qualificado em sala durante todo o procedimento."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-white relative">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto z-10 relative"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 md:mb-8"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-widest text-[10px] mb-3 block font-sans">DÚVIDAS FREQUENTES</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight uppercase">
            Tudo o que você <br />
            <span className="text-[#f97316] italic font-normal">precisa saber.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className={`bg-neutral-50 rounded-[1.8rem] overflow-hidden border ${activeIndex === index ? "border-[#f97316]/55 shadow-[0_8px_30px_rgba(249,115,22,0.04)]" : "border-[#f97316]/25 md:border-neutral-100"} transition-all duration-300`}>
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-4 md:p-5 flex justify-between items-center text-left hover:bg-neutral-100/50 transition-colors"
                id={`faq-btn-${index}`}
              >
                <span className={`text-sm md:text-base font-bold ${activeIndex === index ? "text-[#f97316]" : "text-gray-900"} uppercase tracking-tight select-none min-w-0 whitespace-normal block pr-4 flex-1`}>{faq.question}</span>
                {activeIndex === index ? <Minus className="text-[#f97316] w-4.5 h-4.5 shrink-0" /> : <Plus className="text-[#f97316] w-4.5 h-4.5 shrink-0" />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: {
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1]
                      },
                      opacity: {
                        duration: 0.3,
                        ease: "linear"
                      }
                    }}
                    className="overflow-hidden border-t border-neutral-100 bg-white"
                  >
                    <motion.div 
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="p-4 md:p-5 text-neutral-800 font-semibold leading-relaxed text-sm"
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Helper component to capture map clicks
const MapClickTracker = ({ onClick }: { onClick: (latlng: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      onClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  });
  return null;
};

// Onde Estamos / Contact Section
const Contact = () => {
  const [tempMarker, setTempMarker] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <section id="contato" className="py-8 md:py-10 px-6 md:px-12 lg:px-20 bg-neutral-50 border-t border-neutral-200">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto z-10 relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Location Box Left */}
          <div className="lg:col-span-5 bg-white p-5 md:p-7 rounded-[2rem] border border-[#f97316]/40 md:border-neutral-200 flex flex-col justify-between shadow-[0_25px_50px_rgba(249,115,22,0.04)] md:shadow-sm md:hover:border-[#f97316]/40 md:hover:shadow-[0_25px_50px_rgba(249,115,22,0.04)] transition-all duration-300 relative group overflow-hidden">
            {/* Top Accent line */}
            <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-[#f97316] to-transparent transform scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 rounded-t-[2rem]" />
            <div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-[#f97316] font-bold uppercase tracking-widest text-[9px] mb-3 block">ONDE ESTAMOS</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-5 leading-tight uppercase">
                  Venha nos <br />
                  <span className="text-[#f97316] italic font-normal">visitar.</span>
                </h2>
              </motion.div>
              
              <div className="space-y-4 font-sans">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-[#f97316]/10 rounded-2xl flex items-center justify-center text-[#f97316] shrink-0">
                    <MapPin className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">Nossa Localização</h4>
                    <p className="text-neutral-850 text-xs leading-relaxed font-semibold">Av. Paulista, 1000 - Bela Vista - São Paulo - SP, 01310-100</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-[#f97316]/10 rounded-2xl flex items-center justify-center text-[#f97316] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">Horário de Funcionamento</h4>
                    <p className="text-neutral-850 text-xs leading-relaxed font-semibold">
                      Emergência e Triagem 24/7 permanente.<br />
                      Exames Laboratoriais: Seg a Sáb, 08h às 19h
                    </p>
                  </div>
                </div>

                {/* Map Click interactive info panel */}
                <div className="mt-4 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-100 text-xs text-neutral-500">
                  <p className="font-medium text-neutral-700 mb-1 flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f97316] animate-pulse" />
                    Interação com o Mapa
                  </p>
                  <p className="leading-relaxed">
                    Clique em qualquer ponto do mapa para criar um marcador temporário com as coordenadas exatas da sua localização.
                  </p>
                  
                  <AnimatePresence>
                    {tempMarker && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden border-t border-neutral-200/60 pt-3"
                      >
                        <p className="font-bold text-[#f97316] uppercase tracking-wider text-[10px] mb-1.5">Marcador Criado</p>
                        <div className="flex justify-between items-center bg-white border border-neutral-200/50 rounded-xl p-2.5 font-mono text-[11px] text-neutral-850">
                          <span>Lat: {tempMarker.lat.toFixed(5)}</span>
                          <span>Lng: {tempMarker.lng.toFixed(5)}</span>
                        </div>
                        <button 
                          onClick={() => setTempMarker(null)}
                          className="text-red-500 hover:text-red-700 font-semibold underline text-[11px] mt-2 block"
                        >
                          Limpar marcador
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center justify-between">
              <div className="whitespace-nowrap shrink-0 text-left">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Triagem no WhatsApp 24h</p>
                <p className="text-lg font-mono font-bold text-gray-900 mt-1 pb-1 leading-none">(11) 99287-6219</p>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full transition-all duration-300 shrink-0 select-none flex items-center justify-center shadow-md">
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Map Right */}
          <div className="lg:col-span-7 h-[400px] lg:h-auto rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-white z-0 min-h-[350px]">
            <MapContainer 
              center={[-23.5615, -46.656]} 
              zoom={16} 
              scrollWheelZoom={false} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickTracker onClick={(latlng) => setTempMarker(latlng)} />

              <Marker position={[-23.5615, -46.656]}>
                <Popup>
                  <div className="text-black font-serif font-bold text-sm uppercase">DUNO</div>
                  <div className="text-xs text-gray-500">Av. Paulista, 1000 - Pronto Atendimento 24h</div>
                </Popup>
              </Marker>

              {tempMarker && (
                <Marker position={[tempMarker.lat, tempMarker.lng]}>
                  <Popup>
                    <div className="text-black font-sans text-xs p-1">
                      <div className="font-bold text-[#f97316] uppercase tracking-wider text-[10px] mb-1">Local Marcado</div>
                      <div className="font-mono text-[11px] mb-1">Lat: {tempMarker.lat.toFixed(5)}</div>
                      <div className="font-mono text-[11px] mb-2">Lng: {tempMarker.lng.toFixed(5)}</div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setTempMarker(null);
                        }}
                        className="text-[10px] text-red-500 hover:text-red-700 underline font-semibold mt-1 block"
                      >
                        Remover marcador
                      </button>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Bottom CTA before footer
const CTA = () => {
  return (
    <section className="py-8 md:py-10 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-pattern opacity-[0.01] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-neutral-900/60 rounded-[3rem] p-6 md:p-10 border border-white/5 shadow-2xl backdrop-blur-xl"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-[0.4em] text-[10px] mb-3 block font-sans">ATENDIMENTO IMEDIATO</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight tracking-tighter uppercase">
            Seu pet sob proteção máxima a <br />
            <span className="text-[#f97316] italic font-normal font-serif">um clique de distância.</span>
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed font-normal">
            Fale diretamente com nossa recepção pelo WhatsApp. Nossa equipe médica de plantão está pronta para tirar suas dúvidas emergenciais e agendar.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-[#f97316] text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#ea580c] transition-all hover:scale-105 active:scale-95 duration-350 inline-flex items-center justify-center gap-2 group whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">AGENDAR CONSULTA</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform shrink-0" />
            </a>
            <span className="text-white/30 text-[9px] font-mono tracking-[0.25em] uppercase">RÁPIDO • HUMANIZADO • RETORNO EM POUCOS MINUTOS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer - Duno only logs
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Desc */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2 group text-[#f97316]">
              <span className="text-2xl font-serif font-black tracking-widest uppercase hover:scale-105 transition-transform">DUNO</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed font-normal">
              Hospital e clínica de medicina veterinária profissional. Equipamentos de alta tecnologia acoplados a um atendimento humanizado de altíssima performance.
            </p>
            <div className="flex gap-4">
              <span className="text-[#f97316] text-[10px] font-mono tracking-widest font-bold border border-[#f97316]/20 px-3 py-1 rounded">
                CRMV-SP 100293
              </span>
            </div>
          </div>

          {/* Links Quick */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-[#f97316] mb-6">Navegação</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1 lg:space-y-3 lg:gap-0 text-xs text-gray-400 font-normal">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#resultados" className="hover:text-white transition-colors">Resultados</a></li>
              <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">A Clínica</a></li>
              <li><a href="#equipe" className="hover:text-white transition-colors">Especialistas</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Dúvidas (FAQ)</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Links Legal */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-[#f97316] mb-6">Informações</h4>
            <ul className="space-y-3 text-xs text-gray-400 font-normal">
              <li><span className="block text-[11px] font-bold text-white uppercase">Atendimento:</span> Emergência & Triagem 24/7</li>
              <li><span className="block text-[11px] font-bold text-white uppercase">Exames & Rotina:</span> Seg a Sáb, 08h às 19h</li>
              <li><span className="block text-[11px] font-bold text-white uppercase">WhatsApp 24h:</span> (11) 99287-6219</li>
              <li><span className="block text-[11px] font-bold text-white uppercase">Local:</span> Av. Paulista, 1000 - Bela Vista, SP</li>
            </ul>
          </div>

          {/* Newsletter / Contact Prompt */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-[#f97316] mb-6">Atendimento Prontidão</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Preocupado com seu pet? Toque no botão de suporte abaixo para falar imediatamente com a nossa equipe médica no WhatsApp.
            </p>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white text-[10px] font-bold tracking-[0.2em] rounded-full text-center transition-all flex items-center justify-center gap-2 group"
            >
              <span>PLANTÃO 24H</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-500 font-normal tracking-wide">
            © {new Date().getFullYear()} Duno Clínica Veterinária Ltda. Todos os direitos reservados. CRMV/SP 100293.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white transition-opacity duration-700">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <Standards />
      <About />
      <Authority />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
