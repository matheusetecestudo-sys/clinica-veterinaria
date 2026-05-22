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
  X
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
      <div className="bg-brand-600 text-white py-2.5 px-6 text-center text-xs font-bold tracking-widest z-[110] relative flex items-center justify-center gap-2 shadow-md">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        PLANTÃO VETERINÁRIO 24H: (11) 99287-6219
      </div>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 mt-9 ${isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
            />

            {/* Drawer Container */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[380px] bg-brand-950 text-white z-[110] shadow-2xl md:hidden flex flex-col justify-between p-8"
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
    <section id="home" className="relative min-h-screen flex flex-col justify-center bg-brand-950 py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop" 
          alt="Veterinarian with dog" 
          className="w-full h-full object-cover opacity-60 scale-105"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-50 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
            </span>
            <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">
              Excelência Hospitalar Itaim Bibi
            </span>
          </div>

          <h1 className="text-5xl md:text-[5.5rem] font-serif font-bold text-white leading-[1] mb-8 tracking-tighter">
            Excelência para <br /> 
            <span className="text-brand-400 italic">Vidas Extraordinárias.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-light max-w-2xl">
            Unindo tecnologia de ponta e o mais profundo respeito pela vida animal. Na DUNO, o cuidado sublime é a nossa única regra.
          </p>

          <div className="flex items-center gap-6 mb-12">
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Atendemos:</span>
            <div className="flex items-center gap-5">
              <span className="text-brand-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span> Cães</span>
              <span className="text-brand-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span> Gatos</span>
              <span className="text-brand-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span> Silvestres</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-400 hover:bg-white text-brand-950 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all shadow-2xl shadow-brand-400/20 flex items-center justify-center gap-3 group">
              <WhatsAppLogo className="w-5 h-5 fill-current" /> 
              <span>AGENDAR CONSULTA AGORA</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a href={WHATSAPP_URL.replace("uma consulta", "um atendimento de urgência")} target="_blank" rel="noopener noreferrer" className="border border-brand-400 text-brand-400 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-brand-400 hover:text-brand-950 transition-all flex items-center justify-center gap-2 group">
              <span>EMERGÊNCIA 24H</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "ESPECIALIDADES", value: "10+" },
    { label: "ATENDIMENTOS", value: "9.000+" },
    { label: "PLANTÃO", value: "24h" },
  ];

  return (
    <section className="relative z-20 bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center border border-brand-100">
        {stats.map((stat, i) => (
          <div key={i} className="group flex flex-col items-center">
            <div className="text-5xl md:text-6xl font-serif font-bold text-brand-950 mb-3 transition-transform group-hover:scale-110 duration-500">{stat.value}</div>
            <div className="text-xs font-bold text-brand-600 uppercase tracking-[0.3em]">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "CONSULTA VETERINÁRIA",
      description: "Atendimento clínico completo com especialistas dedicados à saúde preventiva e diagnósticos detalhados.",
      image: "/imagem/Consulta veterinária.png"
    },
    {
      title: "VACINAÇÃO",
      description: "Protocolos vacinais atualizados e seguros para garantir a imunização total e proteção contra doenças.",
      image: "/imagem/Vacinação.jpg"
    },
    {
      title: "EXAMES LABORIAIS",
      description: "Diagnósticos rápidos e precisos com laboratório próprio e tecnologia de ponta.",
      image: "/imagem/Exames laboratoriais.jpg"
    },
    {
      title: "CIRURGIAS VETERINÁRIAS",
      description: "Centro cirúrgico moderno com equipe especializada e monitoramento avançado.",
      image: "/imagem/Cirurgias veterinárias.jpg"
    },
    {
      title: "INTERNAÇÃO",
      description: "Acomodações climatizadas e supervisão médica 24 horas, garantindo conforto e segurança.",
      image: "/imagem/internação.png"
    },
    {
      title: "ATENDIMENTO EMERGENCIAL",
      description: "Equipe de prontidão absoluta para casos críticos com suporte vital avançado.",
      image: "/imagem/atendimento emergencial.jpg"
    },
    {
      title: "BANHO E TOSA",
      description: "Higiene e estética premium com produtos de alta qualidade em um ambiente relaxante.",
      image: "/imagem/Banho e tosa.png"
    },
    {
      title: "ATENDIMENTO DOMICILIAR",
      description: "Toda a excelência e cuidado da nossa clínica no conforto do seu lar.",
      image: "/imagem/Atendimento domiciliar.webp"
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Nossas Áreas de Atuação</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-brand-950 tracking-tighter uppercase">Nossos <span className="text-brand-600 italic">Serviços</span></h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col bg-white rounded-3xl overflow-hidden border border-brand-100 hover:border-brand-300 hover:shadow-2xl transition-all duration-500 group relative">
              {/* Image with fixed aspect ratio */}
              <div className="w-full aspect-[4/3] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-110" 
                />
                
                {/* Editorial Numbering */}
                <div className="absolute top-4 left-4 z-20 bg-brand-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <span className="text-[10px] font-bold text-brand-400 tracking-[0.2em]">0{index + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white border-t border-brand-50 relative">
                <div className="absolute top-0 right-6 w-10 h-1 bg-brand-400/50 rounded-b-full"></div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-serif font-bold text-brand-950 mb-3 uppercase tracking-tight leading-snug group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-brand-800/70 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* High Contrast Schedule Button */}
                <a 
                  href={`https://wa.me/5511992876219?text=${encodeURIComponent(`Olá! Gostaria de agendar o serviço de ${service.title} na Duno.`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-brand-950 text-brand-400 hover:bg-brand-800 transition-colors py-4 px-6 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-between w-full group/btn"
                >
                  <span>AGENDAR</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Mariana Silva", pet: "Bento (Golden Retriever)", text: "A DUNO salvou a vida do Bento após um atropelamento. O atendimento foi impecável e a equipe nos manteve informados o tempo todo.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
    { name: "Ricardo Oliveira", pet: "Luna (Persa)", text: "O padrão de higiene e o cuidado com gatos é diferenciado. A Luna se sente em casa, sem o estresse comum de outras clínicas.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
    { name: "Ana Paula Costa", pet: "Thor (Bulldog Francês)", text: "Especialistas de altíssimo nível. Resolvemos um problema dermatológico crônico que ninguém conseguia tratar há anos.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
    { name: "Carlos Eduardo", pet: "Mel (SRD)", text: "Precisei do plantão de madrugada e a rapidez salvou minha cachorrinha. O veterinário foi um anjo, estrutura fantástica.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" },
    { name: "Fernanda Lima", pet: "Fred (Calopsita)", text: "É tão difícil achar quem entenda de aves. A especialista em silvestres da Duno nos deu uma aula de manejo e cuidado.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" },
    { name: "Sérgio Martins", pet: "Nina (Spitz)", text: "Fizemos a castração e a limpeza de tártaro no mesmo dia com anestesia inalatória. A recuperação foi maravilhosa.", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop" }
  ];

  return (
    <section className="section-padding bg-brand-950 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Quote className="w-12 h-12 text-brand-400 mx-auto mb-6 opacity-50" />
          <span className="text-brand-400 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Vidas que Transformamos</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter uppercase">Nossos Pacientes <span className="text-brand-400 italic">Felizes.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-brand-900/40 p-8 rounded-[2rem] border border-brand-800/50 flex flex-col justify-between">
              <p className="text-base text-brand-100/90 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-brand-400" />
                <div>
                  <h4 className="text-base font-serif font-bold text-white uppercase">{review.name}</h4>
                  <p className="text-brand-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">{review.pet}</p>
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
    { name: "Dr. Carlos Eduardo", crmv: "CRMV-SP 12345", specialty: "Cirurgia Geral", subSpecialty: "Ortopedia Avançada", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop" },
    { name: "Dra. Marina Silva", crmv: "CRMV-SP 54321", specialty: "Medicina Felina", subSpecialty: "Dermatologia Veterinária", img: "https://images.unsplash.com/photo-1594824436998-d50d6ff71c66?q=80&w=400&auto=format&fit=crop" },
    { name: "Dr. Roberto Alves", crmv: "CRMV-SP 67890", specialty: "Animais Silvestres", subSpecialty: "Animais Exóticos", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop" },
    { name: "Dra. Juliana Mendes", crmv: "CRMV-SP 09876", specialty: "Anestesiologia", subSpecialty: "Terapia Intensiva (UTI)", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop" }
  ];

  return (
    <section id="equipe" className="section-padding bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Quem Cuida do seu Pet</span>
          <h2 className="text-5xl font-serif font-bold text-brand-950 uppercase tracking-tighter">Corpo <span className="text-brand-700 italic">Clínico</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((vet, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-brand-50 border border-brand-100">
              <div className="aspect-square overflow-hidden bg-brand-200">
                <img src={vet.img} alt={vet.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-6 bg-white absolute bottom-0 left-0 right-0 m-4 rounded-2xl shadow-xl transform transition-transform duration-500 translate-y-2 group-hover:-translate-y-2 border border-brand-50">
                <h3 className="font-serif font-bold text-brand-950 text-xl uppercase tracking-tight">{vet.name}</h3>
                <p className="text-brand-600 font-black text-sm tracking-widest mt-1 mb-3">{vet.crmv}</p>
                <div className="space-y-1">
                  <p className="text-brand-950 font-bold text-xs uppercase tracking-wider">{vet.specialty}</p>
                  <p className="text-brand-800/60 text-[10px] uppercase tracking-widest">{vet.subSpecialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SuccessCases = () => {
  const cases = [
    { name: "Max", especie: "Pitbull", condition: "Displasia Coxofemoral Severa", result: "Voltou a correr normalmente 3 meses após a cirurgia ortopédica.", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop" },
    { name: "Luna", especie: "Gato Persa", condition: "Obstrução Uretral Aguda", result: "Atendimento emergencial às 3h da manhã salvou seus rins. Recuperação 100%.", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400&auto=format&fit=crop" },
    { name: "Thor", especie: "Bulldog Francês", condition: "Síndrome Braquicefálica", result: "Correção cirúrgica das narinas. Respira sem ruídos e brinca sem limitações.", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=400&auto=format&fit=crop" }
  ];

  return (
    <section id="cases" className="py-32 bg-brand-950 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-400 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Vidas Transformadas</span>
          <h2 className="text-5xl font-serif font-bold uppercase tracking-tighter">Casos de <span className="text-brand-400 italic">Sucesso</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <span className="text-[9px] uppercase tracking-widest text-brand-400 font-bold block mb-1">Condição Tratada</span>
                    <p className="text-white text-sm font-medium">{c.condition}</p>
                  </div>
                  <div className="w-full h-[1px] bg-brand-800/50"></div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold block mb-1">Resultado</span>
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
          <div className="flex gap-6 items-start bg-red-950/40 p-4 rounded-2xl border border-red-500/30">
            <Activity className="text-red-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <p className="text-xl font-black text-red-400 mb-1">PLANTÃO EMERGÊNCIA</p>
              <a href="tel:5511999999999" className="text-3xl font-black text-white hover:text-red-400 transition-colors">(11) 99999-9999</a>
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
              className="border border-red-500 hover:bg-red-500 hover:text-white text-red-500 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 flex items-center justify-center gap-3 group w-full sm:w-auto"
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
      <Stats />
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
