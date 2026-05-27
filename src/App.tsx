// Rollback to e547e39
import React, { useState, useEffect } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  ArrowRight,
  Plus, 
  Minus, 
  Search, 
  HeartPulse, 
  Stethoscope, 
  ShieldCheck, 
  Award,
  PawPrint,
  Quote,
  Menu,
  X,
  Activity,
  ShieldPlus
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
// @ts-ignore
import icon from 'leaflet/dist/images/marker-icon.png';
// @ts-ignore
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const WHATSAPP_URL = "https://wa.me/5511992876219?text=Olá! Gostaria de agendar uma consulta na Duno.";

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Equipe", href: "#equipe" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 bg-brand-900 rounded-xl flex items-center justify-center">
              <PawPrint className="text-brand-400 w-7 h-7" />
            </div>
            <span className={`text-3xl font-serif font-bold tracking-tighter transition-colors duration-500 ${isScrolled ? "text-brand-950" : "text-white"}`}>DUNO</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-[11px] font-bold uppercase tracking-[0.2em] relative group ${isScrolled ? "text-brand-950 hover:text-brand-600" : "text-white/90 hover:text-white"}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-400 text-brand-950 hover:bg-white transition-colors py-3.5 px-7 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <span>AGENDAR CONSULTA</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-brand-950 bg-brand-50" : "text-white bg-white/10 backdrop-blur-sm"} border ${isScrolled ? "border-brand-100" : "border-white/20"}`} 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] md:hidden"
            />

            {/* Drawer Container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[380px] bg-brand-950 text-white z-[10001] shadow-2xl md:hidden flex flex-col justify-between p-8"
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center">
                      <PawPrint className="text-brand-400 w-5 h-5" />
                    </div>
                    <span className="text-xl font-serif font-bold tracking-tighter">DUNO</span>
                  </div>
                  <button 
                    className="p-2 rounded-lg text-white hover:text-brand-400 transition-colors" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Fechar Menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="text-3xl font-serif font-bold text-white hover:text-brand-400 transition-colors uppercase tracking-tight"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Info & CTA */}
              <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white/70 text-xs tracking-wider">
                    <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>Av. Faria Lima, 2000 - Itaim Bibi, SP</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-xs tracking-wider">
                    <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                    <span>(11) 99287-6219</span>
                  </div>
                </div>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary w-full text-center py-4 bg-brand-400 text-brand-950 hover:bg-white hover:text-brand-950 font-bold uppercase tracking-wider group"
                >
                  <span>FALAR NO WHATSAPP</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center bg-brand-950 py-32 lg:py-40 overflow-hidden">
      {/* Background Image: 100% of the card/section area */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/imagem/banner03.png" 
          alt="Duno Clínica Veterinária" 
          className="w-full h-full object-contain scale-105"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Dark brand gradient overlays for perfect text contrast and styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/30"></div>
      </div>
      
      {/* Ambient glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-900/20 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl text-left"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
            </span>
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">
              Excelência Hospitalar Itaim Bibi
            </span>
          </div>

          <h1 className="text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-serif font-bold text-white leading-[1.05] mb-6 tracking-tighter">
            Excelência para <br /> 
            <span className="text-brand-400 italic">Vidas Extraordinárias.</span>
          </h1>

          <p className="text-base md:text-lg text-white/80 mb-10 leading-relaxed font-light max-w-2xl">
            Unindo tecnologia de ponta e o mais profundo respeito pela vida animal. Na DUNO, o cuidado sublime é a nossa única regra.
          </p>

          <div className="flex items-center gap-6 mb-12">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Atendemos:</span>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-brand-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span> Cães</span>
              <span className="text-brand-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span> Gatos</span>
              <span className="text-brand-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span> Silvestres</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-400 hover:bg-white text-brand-950 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-xl shadow-brand-400/10 flex items-center justify-center gap-3 group">
              <WhatsAppLogo className="w-5 h-5 fill-current" /> 
              <span>AGENDAR CONSULTA AGORA</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={WHATSAPP_URL.replace("uma consulta", "um atendimento de urgência")} target="_blank" rel="noopener noreferrer" className="border border-brand-400/40 text-brand-400 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-brand-400 hover:text-brand-950 hover:border-brand-400 transition-all duration-300 flex items-center justify-center gap-2 group">
              <span>EMERGÊNCIA 24H</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// About Section
const About = () => (
  <section id="sobre" className="section-padding bg-brand-50 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif font-bold text-brand-950">Sobre a DUNO</h2>
        <p className="text-lg text-brand-800 mt-4 max-w-2xl mx-auto">
          Somos uma clínica veterinária de excelência, combinando tecnologia avançada e cuidado humanizado para garantir a melhor saúde aos seus pets.
        </p>
      </div>
      <img src="/imagem/about.jpg" alt="Sobre Duno" className="w-full h-auto rounded-xl shadow-lg" />
    </div>
  </section>
);



const Services = () => {
  const services = [
    {
      title: "Consulta Veterinária",
      description: "Atendimento clínico completo com foco na saúde preventiva do seu pet.",
      image: "/imagem/Consulta veterinária.png"
    },
    {
      title: "Vacinação",
      description: "Protocolos vacinais atualizados e seguros para imunização total.",
      image: "/imagem/Vacinação.jpg"
    },
    {
      title: "Exames Laboratoriais",
      description: "Diagnósticos rápidos com laboratório próprio e tecnologia avançada.",
      image: "/imagem/Exames laboratoriais.jpg"
    },
    {
      title: "Cirurgias Veterinárias",
      description: "Centro cirúrgico moderno com anestesiologia e monitoramento seguro.",
      image: "/imagem/Cirurgias veterinárias.jpg"
    },
    {
      title: "Internação",
      description: "Supervisão veterinária 24 horas em ambientes confortáveis e climatizados.",
      image: "/imagem/internação.png"
    },
    {
      title: "Atendimento Emergencial",
      description: "Equipe de prontidão absoluta e UTI veterinária para casos críticos.",
      image: "/imagem/atendimento emergencial.jpg"
    },
    {
      title: "Banho e Tosa",
      description: "Estética e higiene premium com produtos de ponta em ambiente relaxante.",
      image: "/imagem/Banho e tosa.png"
    },
    {
      title: "Atendimento Domiciliar",
      description: "O cuidado de excelência da nossa clínica no conforto da sua casa.",
      image: "/imagem/Atendimento domiciliar.webp"
    }
  ];

  return (
    <section id="services" className="section-padding bg-brand-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Nossas Áreas de Atuação</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-950 tracking-tighter">Nossos <span className="text-brand-700 italic">Serviços</span></h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-brand-200 transition-all duration-500 group flex flex-col"
            >
              {/* Image with shorter aspect-ratio */}
              <div className="w-full aspect-[16/10] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-3 md:p-5 flex flex-col flex-1">
                <h3 className="text-xs md:text-base font-bold text-brand-950 mb-1 leading-snug">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
                  {service.description}
                </p>
                <a
                  href={`https://wa.me/5511992876219?text=${encodeURIComponent(`Olá! Gostaria de agendar o serviço de ${service.title} na Duno.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white rounded-full py-2.5 px-4 text-[9px] md:text-[11px] font-bold uppercase tracking-widest transition-colors duration-300 w-full mt-auto"
                >
                  AGENDAR
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StarRating = () => (
  <div className="flex items-center gap-1 mb-4">
    {[1,2,3,4,5].map(i => (
      <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const reviews = [
    {
      name: "Mariana Silva",
      role: "Tutora do Bento",
      pet: "Golden Retriever",
      text: "A DUNO salvou a vida do Bento após um atropelamento. O atendimento foi impecável e a equipe nos manteve informados o tempo todo.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Ricardo Oliveira",
      role: "Tutor da Luna",
      pet: "Gato Persa",
      text: "O padrão de higiene e o cuidado com gatos é diferenciado. A Luna se sente em casa, sem o estresse comum de outras clínicas.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    {
      name: "Ana Paula Costa",
      role: "Tutora do Thor",
      pet: "Bulldog Francês",
      text: "Especialistas de altíssimo nível. Resolvemos um problema dermatológico crônico que ninguém conseguia tratar há anos.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-padding bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Vidas que Transformamos</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-950">O que nossos <span className="text-brand-700 italic">clientes dizem.</span></h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">Veja como a vida dos pets e de seus tutores mudou de verdade.</p>
        </div>
        {/* Mobile carousel */}
        <div className="lg:hidden relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {reviews.map((review, i) => (
              <div key={i} className="w-full shrink-0 px-4">
                <div className="bg-white rounded-3xl border border-brand-200 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-brand-950 text-sm">{review.name}</h4>
                      <p className="text-brand-600 text-xs uppercase">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                  <p className="text-brand-400 text-xs uppercase">{review.pet}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))} disabled={activeIndex === 0} className="p-2 bg-brand-100 rounded-full disabled:opacity-30">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)} className={`w-2 h-2 rounded-full ${activeIndex === i ? 'bg-brand-400 w-4' : 'bg-brand-200'}`}></button>
              ))}
            </div>
            <button onClick={() => setActiveIndex(prev => Math.min(reviews.length - 1, prev + 1))} disabled={activeIndex === reviews.length - 1} className="p-2 bg-brand-100 rounded-full disabled:opacity-30">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {reviews.map((review, i) => (
              <p className="text-gray-600 italic text-sm leading-relaxed mb-8 flex-1">
                "{review.text}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                <div className="relative shrink-0">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-600 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 fill-white" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-950 text-sm">{review.name}</h4>
                  <p className="text-brand-600 text-[10px] font-bold uppercase tracking-widest mt-0.5">{review.role} • <span className="text-brand-500">VERIFICADO</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    {
      name: "Dr. Carlos Eduardo",
      crmv: "CRMV-SP 12345",
      specialty: "Cirurgia Geral e Ortopedia",
      bio: "Especialista em cirurgias de alta complexidade. Mais de 12 anos transformando vidas com procedimentos ortopédicos e cirurgia guiada de última geração.",
      img: "/imagem/veterinario_2.webp"
    },
    {
      name: "Dra. Marina Silva",
      crmv: "CRMV-SP 54321",
      specialty: "Medicina Felina e Dermatologia",
      bio: "Referência nacional em saúde felina. Trata casos dermatológicos complexos com protocolos inovadores, devolvendo qualidade de vida aos felinos.",
      img: "/imagem/veterinaria_1.webp"
    },
    {
      name: "Dra. Juliana Mendes",
      crmv: "CRMV-SP 09876",
      specialty: "Anestesiologia e UTI Veterinária",
      bio: "Especialista em anestesia inalatória de alta segurança e terapia intensiva. Garante o máximo conforto e monitoramento multiparamétrico.",
      img: "/imagem/veterinaria_3.webp"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="equipe" className="section-padding bg-brand-50/50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Quem Cuida do seu Pet</span>
          <h2 className="text-5xl font-serif font-bold text-brand-950 tracking-tighter">Corpo <span className="text-brand-700 italic">Clínico</span></h2>
        </div>

        {/* Carousel for mobile/tablet, grid for desktop */}
        <div className="relative">
          {/* Mobile/Tablet view (hidden on lg, slider) */}
          <div className="lg:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {team.map((vet, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col max-w-sm mx-auto">
                    <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                      <img
                        src={vet.img}
                        alt={vet.name}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                          <span className="text-white text-xs font-bold tracking-widest">{vet.crmv}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-brand-950 text-lg leading-tight mb-1">{vet.name}</h3>
                      <p className="text-brand-600 font-bold text-[11px] uppercase tracking-widest mb-3">{vet.specialty}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{vet.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots and Arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-brand-200 flex items-center justify-center text-brand-600 disabled:opacity-30 disabled:pointer-events-none hover:bg-brand-50 bg-white"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <div className="flex gap-2">
                {team.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${activeIndex === i ? 'bg-brand-600 w-4' : 'bg-brand-200'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveIndex(prev => Math.min(team.length - 1, prev + 1))}
                disabled={activeIndex === team.length - 1}
                className="w-10 h-10 rounded-full border border-brand-200 flex items-center justify-center text-brand-600 disabled:opacity-30 disabled:pointer-events-none hover:bg-brand-50 bg-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop view (grid, hidden on mobile/tablet) */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {team.map((vet, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <img
                    src={vet.img}
                    alt={vet.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                      <span className="text-white text-xs font-bold tracking-widest">{vet.crmv}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-brand-950 text-lg leading-tight mb-1">{vet.name}</h3>
                  <p className="text-brand-600 font-bold text-[11px] uppercase tracking-widest mb-3">{vet.specialty}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{vet.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SuccessCases = () => {
  const cases = [
    { name: "Max", especie: "Pitbull", condition: "Displasia Coxofemoral Severa", result: "Voltou a correr normalmente 3 meses após a cirurgia ortopédica.", img: "/imagem/pet01.jpg" },
    { name: "Luna", especie: "Gato Persa", condition: "Obstrução Uretral Aguda", result: "Atendimento emergencial às 3h da manhã salvou seus rins. Recuperação 100%.", img: "/imagem/pet02.jpg" },
    { name: "Thor", especie: "Bulldog Francês", condition: "Síndrome Braquicefálica", result: "Correção cirúrgica das narinas. Respira sem ruídos e brinca sem limitações.", img: "/imagem/pet03.jpg" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="cases" className="py-32 bg-brand-950 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-400 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Vidas Transformadas</span>
          <h2 className="text-5xl font-serif font-bold uppercase tracking-tighter">Casos de <span className="text-brand-400 italic">Sucesso</span></h2>
        </div>

        {/* Carousel for mobile/tablet, grid for desktop */}
        <div className="relative">
          {/* Mobile/Tablet view (hidden on lg, slider) */}
          <div className="lg:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {cases.map((c, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <div className="bg-brand-900 rounded-[2rem] overflow-hidden border border-brand-800 flex flex-col max-w-sm mx-auto">
                    <div className="h-64 overflow-hidden relative">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      <div className="absolute top-4 right-4 bg-brand-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                        <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">{c.especie}</span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-2xl font-serif font-bold uppercase mb-6 text-white">{c.name}</h3>
                      <div className="space-y-4 mb-8 flex-1">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-brand-400 font-bold block mb-1">Condição Tratada</span>
                          <p className="text-white text-sm font-medium">{c.condition}</p>
                        </div>
                        <div className="w-full h-[1px] bg-brand-800/50"></div>
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold block mb-1">Resultado</span>
                          <p className="text-brand-100/80 text-sm leading-relaxed">{c.result}</p>
                        </div>
                      </div>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                        AGENDAR CONSULTA <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Dots and Arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-brand-800 flex items-center justify-center text-brand-400 disabled:opacity-30 disabled:pointer-events-none hover:bg-brand-900 bg-brand-900"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <div className="flex gap-2">
                {cases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${activeIndex === i ? 'bg-brand-400 w-4' : 'bg-white/20'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveIndex(prev => Math.min(cases.length - 1, prev + 1))}
                disabled={activeIndex === cases.length - 1}
                className="w-10 h-10 rounded-full border border-brand-800 flex items-center justify-center text-brand-400 disabled:opacity-30 disabled:pointer-events-none hover:bg-brand-900 bg-brand-900"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop view (grid, hidden on mobile/tablet) */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <div key={i} className="bg-brand-900 rounded-[2rem] overflow-hidden border border-brand-800 flex flex-col group">
                <div className="h-64 overflow-hidden relative">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-brand-950/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">{c.especie}</span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-bold uppercase mb-6 text-white">{c.name}</h3>
                  <div className="space-y-4 mb-8 flex-1">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-brand-400 block mb-1">Condição Tratada</span>
                      <p className="text-white text-sm font-medium">{c.condition}</p>
                    </div>
                    <div className="w-full h-[1px] bg-brand-800/50"></div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-emerald-400 block mb-1">Resultado</span>
                      <p className="text-brand-100/80 text-sm leading-relaxed">{c.result}</p>
                    </div>
                  </div>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-brand-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors">
                    AGENDAR CONSULTA <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Infrastructure = () => {
  const infraData = [
    { title: "Centro Cirúrgico de Alta Complexidade", desc: "Equipado com Anestesia Inalatória e Monitoramento Multiparamétrico de última geração.", icon: <Activity className="w-8 h-8 text-brand-400" /> },
    { title: "UTI Veterinária 24H", desc: "Suporte intensivo ininterrupto com oxigenoterapia, aquecimento controlado e acompanhamento veterinário 24/7.", icon: <ShieldPlus className="w-8 h-8 text-brand-400" /> },
    { title: "Laboratório e Imagem", desc: "Raio-X digital e ultrassom de alta definição no local. Resultados rápidos para diagnósticos precisos.", icon: <Stethoscope className="w-8 h-8 text-brand-400" /> },
    { title: "99,7% de Sucesso Cirúrgico", desc: "Nossos protocolos rígidos de assepsia e manejo anestésico garantem os maiores índices de segurança do país.", icon: <HeartPulse className="w-8 h-8 text-brand-400" /> }
  ];

  return (
    <section className="section-padding bg-brand-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Tecnologia e Segurança</span>
          <h2 className="text-5xl font-serif font-bold text-brand-950 uppercase tracking-tighter">Infraestrutura <span className="text-brand-700 italic">Hospitalar</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {infraData.map((item, i) => (
            <div key={i} className="bg-white p-8 md:p-10 rounded-3xl border border-brand-100 shadow-xl shadow-brand-900/5 flex gap-6 items-start group hover:border-brand-300 transition-colors">
              <div className="bg-brand-950 p-4 rounded-2xl shrink-0 group-hover:bg-brand-900 transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-brand-950 uppercase mb-3 leading-tight">{item.title}</h3>
                <p className="text-brand-800/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "Quais são os horários de atendimento da clínica?", answer: "Funcionamos de segunda a sexta das 08h às 20h e sábados das 08h às 18h. Nosso plantão emergencial funciona 24h por dia, todos os dias da semana, incluindo feriados." },
    { question: "Onde vocês estão localizados?", answer: "Estamos localizados na Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi, SP. Contamos com estacionamento próprio para sua comodidade." },
    { question: "Preciso agendar consulta com antecedência?", answer: "Para consultas de rotina, vacinação e especialistas, é altamente recomendável o agendamento prévio via WhatsApp. Em casos de urgência e emergência, o atendimento é imediato no plantão 24h." },
    { question: "A clínica atende animais silvestres e exóticos?", answer: "Sim! Temos veterinários especializados no manejo e tratamento de animais silvestres, aves e répteis." },
    { question: "Quais formas de pagamento são aceitas?", answer: "Aceitamos todos os cartões de crédito e débito, PIX, dinheiro e convênios veterinários selecionados. Tratamentos complexos podem ser parcelados em até 10x sem juros." },
    { question: "Fazem cirurgias complexas e ortopédicas?", answer: "Sim, nosso centro cirúrgico é de alta complexidade, equipado com anestesia inalatória, monitoramento completo e UTI veterinária para o pós-operatório." },
    { question: "O pet pode ficar internado com vocês?", answer: "Sim, possuímos internação 24h com baias separadas para cães, gatos e silvestres, garantindo o máximo conforto e acompanhamento veterinário ininterrupto." },
    { question: "Fazem exames laboratoriais na hora?", answer: "Contamos com laboratório próprio que nos permite realizar exames de sangue, imagem (Raio-X e Ultrassom) e obter resultados rapidamente para iniciar o tratamento adequado." },
    { question: "Qual o valor da consulta?", answer: "Como os valores variam dependendo da especialidade (Clínico Geral vs Especialistas), pedimos que entre em contato direto pelo WhatsApp para passarmos o orçamento correto para o seu caso." },
    { question: "Vocês aplicam vacinas importadas?", answer: "Trabalhamos exclusivamente com vacinas éticas importadas (V10, V8, Raiva, Gripe, Giárdia, etc) para garantir a melhor imunização e segurança para o seu pet." }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-950 text-center mb-16 uppercase tracking-tighter">Dúvidas <span className="text-brand-700 italic">Frequentes</span></h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className={`border border-brand-100 rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === index ? 'shadow-xl shadow-brand-900/5 bg-white' : 'bg-brand-50/30'}`}>
              <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="w-full p-6 md:p-8 flex justify-between items-center text-left hover:bg-brand-50 transition-colors">
                <span className="font-serif font-bold text-brand-950 text-lg uppercase pr-8 leading-snug">{faq.question}</span>
                {activeIndex === index ? <Minus className="w-6 h-6 shrink-0 text-brand-600" /> : <Plus className="w-6 h-6 shrink-0 text-brand-600" />}
              </button>
              {activeIndex === index && (
                <div className="px-6 md:px-8 pb-8 pt-2">
                  <div className="w-12 h-1 bg-brand-400 mb-6"></div>
                  <p className="text-brand-800/80 leading-relaxed text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="section-padding bg-brand-950 text-white px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[40%_60%] gap-12 lg:gap-20 items-center">
      <div>
        <h2 className="text-5xl font-serif font-bold mb-10 tracking-tighter uppercase">Onde <span className="text-brand-400 italic">Estamos.</span></h2>
        <div className="space-y-8 mb-12">
          <div className="flex gap-6 items-start">
            <MapPin className="text-brand-400 w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-lg font-bold mb-1">Endereço</p>
              <p className="text-brand-100/70">Av. Brigadeiro Faria Lima, 2000<br/>Itaim Bibi, São Paulo - SP</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <Phone className="text-brand-400 w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-lg font-bold mb-1">Contato Regular</p>
              <p className="text-brand-100/70">(11) 99287-6219</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <Phone className="text-brand-400 w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-lg font-bold mb-1">Plantão Emergência</p>
              <p className="text-brand-100/70">(11) 99999-9999</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <Clock className="text-brand-400 w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-lg font-bold mb-1">Horários (Rotina)</p>
              <p className="text-brand-100/70">Seg-Sex: 08:00 - 20:00<br/>Sáb: 08:00 - 18:00</p>
            </div>
          </div>
        </div>
        <a 
          href="https://maps.google.com/?q=Av.+Brigadeiro+Faria+Lima,+2000+-+Itaim+Bibi" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-3 bg-brand-800 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] transition-colors"
        >
          <MapPin className="w-4 h-4" /> ABRIR NO GOOGLE MAPS
        </a>
      </div>
      <div className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 lg:order-last order-first">
        <MapContainer center={[-23.5899, -46.6815]} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[-23.5899, -46.6815]} />
        </MapContainer>
      </div>
    </div>
  </section>
);

const CTASection = () => {
  return (
    <section className="py-24 bg-brand-950 text-white relative overflow-hidden px-6">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 bg-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-brand-400 to-transparent opacity-30"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-brand-900/40 border border-brand-800/80 rounded-[3rem] p-10 md:p-16 text-center backdrop-blur-md shadow-3xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brand-950/80 border border-brand-800 rounded-full mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-400"></span>
            </span>
            <span className="text-brand-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              Atendimento Emergencial 24h & Consultas
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tighter leading-tight uppercase">
            GARANTA O MELHOR CUIDADO <br />
            <span className="text-brand-400 italic font-medium">PARA QUEM VOCÊ AMA.</span>
          </h2>

          <p className="text-base md:text-lg text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Seja para uma consulta preventiva de rotina ou um atendimento de emergência, nossa equipe médica de elite está de prontidão absoluta. Fale conosco agora mesmo.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-brand-400 hover:bg-white text-brand-950 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 group w-full sm:w-auto"
            >
              <WhatsAppLogo className="w-5 h-5 fill-current" />
              <span>AGENDAR NO WHATSAPP</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="tel:5511999999999" 
              className="border border-brand-400/40 text-brand-400 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              <span>EMERGÊNCIA (LIGAR AGORA)</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-brand-900/10 rounded-full blur-[100px]"></div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 bg-black text-white/50 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16 text-left">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-6"><PawPrint className="text-brand-400 w-8 h-8" /><span className="text-2xl font-serif font-bold text-white uppercase tracking-tighter">DUNO</span></div>
        <p className="text-sm leading-relaxed mb-6 max-w-sm">Excelência hospitalar e cuidado humanizado no coração do Itaim Bibi. Atendimento de elite para quem você mais ama.</p>
        <p className="text-[10px] font-bold tracking-widest text-brand-400">Responsável Técnico: Dr. Carlos Eduardo (CRMV-SP 12345)<br/>Razão Social: Duno Clínica Veterinária LTDA - CNPJ: 00.000.000/0001-00</p>
      </div>
      <div>
        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-widest">Links Rápidos</h4>
        <ul className="text-xs space-y-4 tracking-widest font-bold">
          <li><a href="#services" className="hover:text-brand-400 transition-colors">SERVIÇOS</a></li>
          <li><a href="#equipe" className="hover:text-brand-400 transition-colors">CORPO CLÍNICO</a></li>
          <li><a href="#faq" className="hover:text-brand-400 transition-colors">DÚVIDAS FREQUENTES</a></li>
          <li><a href="#" className="hover:text-brand-400 transition-colors">POLÍTICA DE PRIVACIDADE</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-widest">Siga-nos</h4>
        <div className="flex gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-brand-950 p-3 rounded-full hover:bg-brand-400 hover:text-brand-950 transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-brand-950 p-3 rounded-full hover:bg-brand-400 hover:text-brand-950 transition-colors"><Facebook className="w-5 h-5" /></a>
        </div>
      </div>
    </div>
    <p className="text-center text-[10px] font-bold tracking-[0.5em] pt-12 border-t border-white/5">© 2026 DUNO CLÍNICA VETERINÁRIA. TODOS OS DIREITOS RESERVADOS.</p>
  </footer>
);

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Testimonials />
      <Team />
      <SuccessCases />
      <Infrastructure />
      <FAQ />
      <Contact />
      <CTASection />
      <Footer />
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <WhatsAppLogo className="w-9 h-9 fill-current" />
      </a>
    </div>
  );
}
