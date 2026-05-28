/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.859-4.407 9.862-9.83.001-2.628-1.01-5.1-2.861-6.956C16.61 1.96 14.137.95 11.516.95c-5.44 0-9.866 4.41-9.869 9.837-.001 1.83.479 3.619 1.391 5.2l-.372 1.36.376-.135 1.705.54z" />
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-[99] bg-[#25d366] text-white p-4.5 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] transition-all flex items-center justify-center cursor-pointer border border-[#25d366]/10"
      title="Falar no WhatsApp"
      id="floating-whatsapp"
    >
      <WhatsAppLogo className="w-8 h-8 fill-white" />
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
    { name: "CLÍNICA", href: "#about" },
    { name: "ESPECIALISTAS", href: "#equipe" },
    { name: "DEPOIMENTOS", href: "#depoimentos" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-500 ${isScrolled ? "bg-black/95 border-b border-white/5 shadow-2xl py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Name Logotype Only "DUNO" in Orange */}
        <a href="#inicio" className="flex items-center gap-2 group shrink-0">
          <span className="text-xl md:text-2xl font-serif font-black text-[#f97316] tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105">DUNO</span>
        </a>

        {/* Unified Center Menu with lg: breakpoint for perfect alignment */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8 justify-center">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="text-white/80 hover:text-[#f97316] text-[10px] xl:text-[11px] font-bold tracking-[0.15em] transition-colors duration-300 uppercase whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Unified Right Call Button (with phone link removed as requested) */}
        <div className="hidden lg:flex items-center shrink-0">
          <motion.a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-[#f97316] hover:bg-[#ea580c] text-white text-[10px] font-bold tracking-[0.15em] rounded-full transition-all flex items-center gap-2.5 group/btn"
          >
            <span>AGENDAR CONSULTA DE ALTA PERFORMANCE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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
                  className="w-full py-4 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-center text-xs tracking-[0.2em] rounded-full transition-all flex items-center justify-center gap-2.5 group"
                >
                  <span>AGENDAR ATENDIMENTO PRIORITÁRIO</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
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
    <section id="inicio" className="relative min-h-screen bg-black flex items-center justify-start overflow-hidden pt-24 pb-12">
      {/* Background Image with sophisticated luxury overlay - Made brighter and vibrant as requested */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=2000" 
          alt="Clínica Veterinária Duno de Alta Performance" 
          className="w-full h-full object-cover opacity-65 object-center filter contrast-[1.05] brightness-95 transition-transform duration-[6000ms] scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Softened radial and linear dark templates on the left for maximum white text contrast while exposing the actual image colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-10 flex flex-col justify-center text-left">
          {/* Tag matches print */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-[2px] w-6 bg-[#f97316]"></div>
            <span className="text-[#f97316] text-[10px] font-bold tracking-[0.4em] uppercase">TECNOLOGIA E ACOLHIMENTO DE EXCELÊNCIA</span>
          </motion.div>

          {/* Title - replicating print template "Transforme seu sorriso. Transforme sua vida" */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[40px] md:text-[68px] font-serif font-bold text-white mb-6 leading-[1.1] tracking-tighter uppercase"
          >
            Transforme a <br />
            <span className="text-[#f97316] italic font-normal">saúde do seu pet.</span> <br />
            Transforme sua vida.
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 text-sm md:text-base max-w-[580px] mb-10 leading-relaxed font-normal"
          >
            Profissionais de referência, exames diagnósticos de altíssima precisão e infraestrutura cirúrgica integrada 24h. Na Duno, a saúde de quem você ama é tratada com rigor científico e acolhimento de excelência.
          </motion.p>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-[#f97316] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:bg-[#ea580c] hover:shadow-[0_10px_30px_rgba(249,115,22,0.4)] active:scale-95 shadow-xl inline-flex items-center justify-center gap-2.5 group"
            >
              <span>AGENDAR CONSULTA DE EXCELÊNCIA</span>
              <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#servicos" 
              className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-white/10 active:scale-95 inline-flex items-center justify-center gap-2 group"
            >
              <span>CONHECER NOSSOS SERVIÇOS</span>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Explorer micro label mimicking print */}
      <div className="absolute bottom-10 left-6 md:left-12 z-10 hidden md:flex items-center gap-4 text-white/30 text-[9px] font-mono tracking-[0.4em] uppercase">
        <span className="w-20 h-[1px] bg-white/20"></span>
        <span>ROLE PARA EXPLORAR</span>
      </div>
    </section>
  );
};

interface ServiceItem {
  title: string;
  description: string;
  image: string;
}

// Services Section styled exactly like the screenshot: white cards, rounded-3xl corners, light/gray saiba mais button pill with arrow, subtle shadow, light section background
const Services = () => {
  const servicesList: ServiceItem[] = [
    {
      title: "Pronto Socorro 24h",
      description: "Instalação hospitalar de pronto atendimento completo e triagem médica imediata em qualquer dia/horário.",
      image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Cirurgia Complexa",
      description: "Procedimentos de altíssima segurança sob anestesia inalatória e monitoramento multiparamétrico de ponta.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Ultrassonografia & Raio-X",
      description: "Diagnóstico imediato e preciso de tecidos moles e ossos através de radiologia e imagem ultrassonográfica digital.",
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Fisioterapia Vet",
      description: "Reabilitação rápida de lesões ou pós-operatórios com equipe especializada em fisiatria motora canina e felina.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Cardiologia Especializada",
      description: "Análise eletrocardiográfica preventiva e exames Ecodoppler para acompanhar o coração do seu companheiro.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Odontologia de Prevenção",
      description: "Remoção de tártaros, tratamento de gengivas e cirurgias periodontais de excelência para a boca do pet.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Vacinação Importada",
      description: "Esquema vacinal seguro de alto rigor com vacinas europeias e americanas para estabilização de imunidade.",
      image: "https://images.unsplash.com/photo-1596499717302-34d64718e24f?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "UTI Veterinária",
      description: "Equipe intensiva de alto nível e leitos hospitalares monitorados segundo a segundo para reabilitação séria.",
      image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="servicos" className="py-24 px-6 md:px-12 lg:px-20 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            NOSSOS SERVIÇOS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black mb-6 leading-tight tracking-tighter">
            Tratamentos de <br />
            <span className="text-[#f97316] italic font-normal">Alta Performance.</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[620px] mx-auto leading-relaxed">
            Tecnologia de ponta e zelo científico para cuidar da saúde do seu animal e elevar sua qualidade de vida a um novo patamar de estabilização.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[2px] bg-[#f97316]/30 mx-auto mt-8"
          ></motion.div>
        </motion.div>

        {/* Services Grid layout made responsive (4x2 on desktop, 2x4 on mobile) with custom responsive padding */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:border-neutral-200 transition-all duration-300 group"
              id={`service-card-${index}`}
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Text & Action content dynamically sized for 2 columns view */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-sans text-xs sm:text-sm md:text-base lg:text-lg font-bold text-neutral-900 mb-2 md:mb-3 tracking-tight text-left uppercase">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-500 text-[10px] sm:text-[11px] md:text-xs leading-relaxed mb-4 md:mb-6 text-left font-normal line-clamp-3">
                    {service.description}
                  </p>
                </div>

                {/* Pill Button scaled nicely for smaller screen widths in grid-cols-2 display */}
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 sm:py-3.5 sm:px-5 bg-[#F8F9FA] hover:bg-[#F1F3F5] rounded-xl sm:rounded-2xl flex items-center justify-between text-[10px] sm:text-xs font-bold text-neutral-900 tracking-wide transition-all"
                >
                  <span className="text-[9px] sm:text-[11px] font-bold text-neutral-900">Saiba Mais</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-800 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery ("GALERIA DE EXCELÊNCIA" from the print template style)
const Gallery = () => {
  const cases = [
    {
      tag: "ORTOPEDIA DE SUCESSO",
      title: "Reconstituição do Fêmur do Max",
      desc: "O Golden Max sofreu uma ruptura traumática crítica de ligamento e osso. Passou por cirurgia corretiva e voltou a correr alegremente em poucas semanas.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800"
    },
    {
      tag: "MEDICINA CARDIOLÓGICA",
      title: "Estabilização Coronária de Amora",
      desc: "A Gata Amora foi diagnosticada a tempo com cardiomiopatia congênita severa. Através de controle terapêutico rigoroso, recuperou total disposição ativa.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800"
    },
    {
      tag: "ONCOLOGIA & VIDA",
      title: "Vigilância do Bulldog Oliver",
      desc: "Oliver passou por intervenções oncológicas delicadas e quimioterapia orientada. Hoje, o quadro é estável e segue em monitoramento livre de dor.",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="resultados" className="py-24 px-6 md:px-12 lg:px-20 bg-neutral-50 relative border-t border-neutral-100">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
            GALERIA DE EXCELÊNCIA
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4 uppercase tracking-tighter">
            Transformações <span className="text-[#f97316] italic font-normal">Reais.</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
            Resultados reais de pacientes que recuperaram a saúde e o vigor sob nossos cuidados especializados. Cada tratamento é planejado no detalhe e executado com carinho absoluto.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((cs, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 flex flex-col group p-4 hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={cs.image} 
                  alt={cs.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[8.5px] font-bold text-[#f97316] tracking-widest uppercase">
                  {cs.tag}
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-between p-2">
                <div className="mb-6">
                  <h3 className="font-sans text-lg font-bold text-neutral-900 mb-2 leading-tight uppercase">
                    {cs.title}
                  </h3>
                  <p className="text-gray-500 text-[12px] leading-relaxed font-normal">
                    {cs.desc}
                  </p>
                </div>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-[#f97316] hover:text-white hover:shadow-lg text-center text-[10px] tracking-widest uppercase transition-all duration-300 inline-flex items-center justify-center gap-2.5 group"
                >
                  <span>CONSULTAR AVALIAÇÃO DO CASO CLÍNICO</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Por que escolher a Duno? (Golden standards of Duno - kept exactly as requested)
const Standards = () => {
  const items = [
    { icon: <Heart className="w-5 h-5 animate-pulse text-[#f97316]" />, title: "CUIDADO INTEGRAL 24H", desc: "Corpo clínico multidisciplinar trabalhando em sintonia para restabelecer a estabilidade e a felicidade do pet." },
    { icon: <Shield className="w-5 h-5 text-[#f97316]" />, title: "EMPATIA E SEGURANÇA", desc: "Abordagem livre do medo, acolhimento diferenciado, monitoramento por câmeras e respostas rápidas." },
    { icon: <Stethoscope className="w-5 h-5 text-[#f97316]" />, title: "PADRÃO HOSPITALAR ELITE", desc: "Equipamentos cirúrgicos esterilizados sob rígidas rotinas humanas e laboratório de análise integrado de pronto socorro." },
  ];

  return (
    <section id="diferenciais" className="py-24 px-6 md:px-12 lg:px-20 bg-white overflow-hidden border-t border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-square rounded-[3rem] overflow-hidden shadow-xl border-[8px] border-neutral-50">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
              alt="Veterinary Clinical Excellence" 
              className="w-full h-full object-cover filter brightness-95"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#f97316] rounded-full flex items-center justify-center text-white text-center p-4 shadow-xl rotate-12">
            <p className="font-serif font-bold text-[10px] leading-tight uppercase tracking-wider">PADRÃO ELITE DE MEDICINA VET</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
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
            <span className="text-[#f97316] font-bold uppercase tracking-widest text-[10px] mb-4 block">Por que escolher a Duno?</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8 leading-tight tracking-tighter uppercase">
              Nossos <br /> <span className="text-[#f97316] italic uppercase font-normal">Padrões de Ouro.</span>
            </h2>
          </motion.div>
          
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center shadow-sm shrink-0 text-[#f97316]">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-neutral-900 mb-1 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// A clínica como está (About section - kept exactly as requested)
const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 lg:px-20 bg-black text-white relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-neutral-900">
            <img 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=2070&auto=format&fit=crop" 
              alt="Clínica Veterinária Duno Carinho e Conforto" 
              className="w-full h-full object-cover filter brightness-75 contrast-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          {/* Subtle logo badge from print */}
          <div className="absolute -bottom-6 -right-6 bg-neutral-950 border border-neutral-800 p-6 rounded-[1.5rem] shadow-2xl hidden md:block max-w-[240px] text-white">
            <h4 className="text-xl font-serif font-bold tracking-widest text-[#f97316] mb-1">DUNO</h4>
            <p className="text-[11px] font-medium text-gray-400">Excelência técnica de alto nível técnico unida a confortos modernos.</p>
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
            <span className="text-[#f97316] font-bold uppercase tracking-widest text-[10px] mb-4 block">A Clínica</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight uppercase">
              Tecnologia de ponta. <br />
              <span className="text-[#f97316] italic font-normal">Conforto absoluto.</span>
            </h2>
          </motion.div>
          
          <div className="space-y-4 text-xs md:text-sm text-gray-400 leading-relaxed font-normal">
            <p>
              Unimos a precisão cirúrgica de um hospital de ponta com a ternura de um atendimento acolhedor. Nossa clínica funciona de forma integrada, agilizando diagnósticos minuciosos.
            </p>
            <p>
              Nossa estrutura física foi meticulosamente projetada para abrigar cães e gatos em consultórios acusticamente segregados, reduzindo qualquer desconforto ambiental do seu companheiro de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="flex items-center gap-3 bg-neutral-900/60 p-4 rounded-2xl border border-white/5">
              <Smile className="w-5 h-5 text-[#f97316]" />
              <p className="font-bold text-white uppercase tracking-widest text-[9px]">Acolhimento Premium</p>
            </div>
            <div className="flex items-center gap-3 bg-neutral-900/60 p-4 rounded-2xl border border-white/5">
              <Activity className="w-5 h-5 text-[#f97316]" />
              <p className="font-bold text-white uppercase tracking-widest text-[9px]">Monitoramento 24h</p>
            </div>
          </div>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2.5 py-4 px-8 bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-[10px] tracking-widest uppercase rounded-full transition-all duration-300 group">
            <span>FALAR COM NOSSO CONCIERGE</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// Nossa Autoridade (Doctors / Specialists section)
const Authority = () => {
  const doctors = [
    {
      name: "Dr. Alexandre Silva",
      cro: "CRMV/SP 43212",
      specialty: "MEDICINA INTENSIVA & CIRURGIÃO CHEFE",
      desc: "Mestre em cirurgia de pequenos animais na USP, com especialidade em técnicas reconstrutivas complexas.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Dra. Beatriz Santos",
      cro: "CRMV/SP 87629",
      specialty: "CARDIOLOGIA & EXAMES DIAGNÓSTICOS",
      desc: "Especialista em cardiopatias caninas de alta complexidade com rigor e tratamentos medicamentosos avançados.",
      image: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Dr. Vinícius Rocha",
      cro: "CRMV/SP 12431",
      specialty: "ANESTESIOLOGIA & ODONTOLOGIA VET",
      desc: "Pós-graduado com foco prioritário em assepsia, suporte vital monitorado e intervenção dentária segura.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section id="equipe" className="py-24 px-6 md:px-12 lg:px-20 bg-neutral-100 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[#f97316] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">NOSSA AUTORIDADE MÉDICA</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight uppercase tracking-tighter">
            Mentes brilhantes por trás de<br />
            <span className="text-[#f97316] italic font-normal font-serif">vidas salvas.</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-[620px] mx-auto mt-4 leading-relaxed">
            Profissionais dedicados de amplo saber acadêmico. Oferecemos as melhores condutas com base em evidências científicas sólidas.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((dr, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-neutral-200 hover:shadow-xl transition-all p-4 duration-500 cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                <img 
                  src={dr.image} 
                  alt={dr.name} 
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-95"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[9px] font-mono font-bold text-white tracking-widest">
                  {dr.cro}
                </div>
              </div>

              <div className="p-2">
                <span className="text-[#f97316] text-[9px] font-bold tracking-[0.25em] uppercase block mb-1">
                  {dr.specialty}
                </span>
                <h3 className="font-sans text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {dr.name}
                </h3>
                <p className="text-gray-550 text-xs leading-relaxed font-normal mb-6">
                  {dr.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Depoimentos (Testimonials) with black color accents and elegant quoting layout
const Testimonials = () => {
  const reviews = [
    { 
      name: "Mariana L. - Empresária", 
      role: "Tutora do Golden Max", 
      text: "Eu estava desesperada quando o Max rompeu o fêmur. Na Duno eles realizaram um atendimento cirúrgico impecável e muito carinhoso. Hoje ele corre feliz como se nada tivesse acontecido." 
    },
    { 
      name: "Rodrigo F. - Arquiteto", 
      role: "Tutor do Oliver", 
      text: "O atendimento de emergência correu super rápido e com transparência absoluta. Fui mantido informado sobre o estado da internação do Oliver o tempo todo no WhatsApp." 
    },
    { 
      name: "Juliana Mendes - Autônoma", 
      role: "Tutora da Gatinha Amora", 
      text: "A equipe de cardiologia foi maravilhosa. O consultório específico para gatos manteve a Amora calminha e sem estresse ambiental durante todos os exames." 
    },
  ];

  return (
    <section id="depoimentos" className="py-24 px-6 md:px-12 lg:px-20 bg-black text-white relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f97316]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <Quote className="w-12 h-12 text-[#f97316] mx-auto mb-6 opacity-40 animate-pulse" />
          <span className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">O QUE DIZEM DE NÓS</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-tighter">
            A prova de nossa <span className="text-[#f97316] italic font-normal font-serif">excelência.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-neutral-900/60 backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between hover:border-[#f97316]/30 transition-all duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6 text-[#f97316]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#f97316]" />
                  ))}
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed italic mb-8 font-normal">
                  "{review.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                <div className="w-11 h-11 rounded-full bg-neutral-800 flex items-center justify-center font-bold font-serif text-white text-base">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white uppercase tracking-tight">{review.name}</h4>
                  <p className="text-[#f97316] text-[9px] font-bold uppercase tracking-widest mt-0.5">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-widest text-[10px] mb-4 block font-sans">DÚVIDAS FREQUENTES</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight uppercase">
            Tudo o que você <br />
            <span className="text-[#f97316] italic font-normal">precisa saber.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-neutral-50 rounded-[1.8rem] overflow-hidden border border-neutral-100 transition-all duration-300">
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-neutral-100/50 transition-colors"
                id={`faq-btn-${index}`}
              >
                <span className="text-sm md:text-base font-bold text-gray-900 uppercase tracking-tight select-none">{faq.question}</span>
                {activeIndex === index ? <Minus className="text-[#f97316] w-4.5 h-4.5 shrink-0" /> : <Plus className="text-[#f97316] w-4.5 h-4.5 shrink-0" />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-neutral-100"
                  >
                    <div className="p-6 text-gray-500 font-normal leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Onde Estamos / Contact Section
const Contact = () => {
  return (
    <section id="contato" className="py-24 px-6 md:px-12 lg:px-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          {/* Location Box Left */}
          <div className="lg:col-span-5 bg-white p-8 md:p-10 rounded-[2rem] border border-neutral-200 flex flex-col justify-between shadow-sm">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="text-[#f97316] font-bold uppercase tracking-widest text-[9px] mb-3 block">ONDE ESTAMOS</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8 leading-tight uppercase">
                  Venha nos <br />
                  <span className="text-[#f97316] italic font-normal">visitar.</span>
                </h2>
              </motion.div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-[#f97316]/10 rounded-2xl flex items-center justify-center text-[#f97316] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">Nossa Localização</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">Av. Paulista, 1000 - Bela Vista - São Paulo - SP, 01310-100</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-[#f97316]/10 rounded-2xl flex items-center justify-center text-[#f97316] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-tight mb-1">Horário de Funcionamento</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Emergência e Triagem 24/7 permanente.<br />
                      Exames Laboratoriais: Seg a Sáb, 08h às 19h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Triagem no WhatsApp 24h</p>
                <p className="text-lg font-mono font-bold text-gray-900 mt-1">(11) 99287-6219</p>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-neutral-100 hover:bg-[#f97316] hover:text-white rounded-full transition-all duration-300 text-neutral-900">
                <ArrowRight className="w-5 h-5" />
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
              <Marker position={[-23.5615, -46.656]}>
                <Popup>
                  <div className="text-black font-serif font-bold text-sm uppercase">DUNO</div>
                  <div className="text-xs text-gray-500">Av. Paulista, 1000 - Pronto Atendimento 24h</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Bottom CTA before footer
const CTA = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-pattern opacity-[0.01] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-neutral-900/60 rounded-[3rem] p-8 md:p-14 border border-white/5 shadow-2xl backdrop-blur-xl"
        >
          <span className="text-[#f97316] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">ATENDIMENTO IMEDIATO</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight tracking-tighter uppercase">
            Seu pet sob proteção máxima a <br />
            <span className="text-[#f97316] italic font-normal font-serif">um clique de distância.</span>
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Fale diretamente com nossa recepção pelo WhatsApp. Nossa equipe médica de plantão está pronta para tirar suas dúvidas emergenciais e agendar.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto bg-[#f97316] text-white px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#ea580c] transition-all hover:scale-105 active:scale-95 duration-350 inline-flex items-center justify-center gap-2.5 shadow-xl group"
            >
              <span>GARANTIR DIRETRIZES DE TRATAMENTO PRIORITÁRIO</span>
              <ArrowRight className="w-4.5 h-4.5 text-white group-hover:translate-x-1.5 transition-transform" />
            </a>
            <span className="text-white/30 text-[9px] font-mono tracking-[0.25em] uppercase">SEGURO • SEM BUROCRACIA • RESPOSTA EM MENOS DE 5 MINUTOS</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer - Duno only logs
const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-white/5">
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
            <ul className="space-y-3 text-xs text-gray-400 font-normal">
              <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#resultados" className="hover:text-white transition-colors">Resultados</a></li>
              <li><a href="#diferenciais" className="hover:text-white transition-colors">Por Que Nós</a></li>
            </ul>
          </div>

          {/* Links Legal */}
          <div>
            <h4 className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-[#f97316] mb-6">Informações</h4>
            <ul className="space-y-3 text-xs text-gray-400 font-normal">
              <li><span className="block text-[11px] font-bold text-white uppercase">Emergência:</span> Pronto Atendimento Permanente 24h</li>
              <li><span className="block text-[11px] font-bold text-white uppercase">Vacinação:</span> Protocolo de excelência</li>
              <li><span className="block text-[11px] font-bold text-white uppercase">Local:</span> Av. Paulista, 1000 - São Paulo</li>
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
              className="w-full py-3 bg-[#f97316] hover:bg-[#ea580c] text-white text-[10px] font-bold tracking-[0.2em] rounded-full text-center transition-all flex items-center justify-center gap-2.5 group"
            >
              <span>CONSULTAR NOSSO PLANTÃO MÉDICO 24H</span>
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-500 font-normal tracking-wide">
            © {new Date().getFullYear()} Duno Clínica Veterinária Ltda. Todos os direitos reservados. CRMV/SP 100293.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
            <span className="text-[#f97316] font-bold">• LARANJA</span>
            <span>• PRETO</span>
            <span>• BRANCO</span>
          </div>
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
