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
import icon from 'leaflet/dist/images/marker-icon.png';
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

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre", href: "#about" },
    { name: "Galeria", href: "#gallery" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center">
            <PawPrint className="text-brand-400 w-6 h-6" />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-tighter transition-colors duration-500 ${isScrolled ? "text-brand-950" : "text-white"}`}>DUNO</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-[11px] font-bold uppercase tracking-[0.2em] relative group ${isScrolled ? "text-brand-950/70 hover:text-brand-950" : "text-white/70 hover:text-white"}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3 !px-6 !text-[9px]">AGENDAR AGORA</a>
        </div>

        <button 
          className={`md:hidden p-2 rounded-lg ${isScrolled ? "text-brand-950" : "text-white"}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl overflow-hidden md:hidden border-t border-brand-50"
          >
            <div className="p-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-brand-950">{link.name}</a>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full mt-6 text-center">FALAR NO WHATSAPP</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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

          <h1 className="text-5xl md:text-[5.5rem] font-serif font-bold text-white leading-[1] mb-10 tracking-tighter">
            Excelência para <br /> 
            <span className="text-brand-400 italic">Vidas Extraordinárias.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed font-light max-w-2xl">
            Unindo tecnologia de ponta e o mais profundo respeito pela vida animal. Na DUNO, o cuidado sublime é a nossa única regra.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-400 text-brand-950 px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all shadow-2xl shadow-brand-400/20 flex items-center justify-center gap-3">
              <WhatsAppLogo className="w-5 h-5 fill-current" /> 
              AGENDAR CONSULTA
            </a>
            <a href="#services" className="border border-white/30 text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-brand-950 transition-all flex items-center justify-center">
              CONHECER SERVIÇOS
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "VIDAS TRANSFORMADAS", value: "9k+" },
    { label: "MESTRES ESPECIALISTAS", value: "10+" },
    { label: "VIGILÂNCIA ABSOLUTA", value: "24h" },
    { label: "PADRÃO OURO", value: "Elite" },
  ];

  return (
    <section className="relative z-20 bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-10 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center border border-brand-100">
        {stats.map((stat, i) => (
          <div key={i} className="group">
            <div className="text-4xl md:text-5xl font-serif font-bold text-brand-950 mb-2 transition-transform group-hover:scale-110 duration-500">{stat.value}</div>
            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-[0.3em]">{stat.label}</div>
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
      title: "EXAMES LABORATORIAIS",
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
      description: "Estética animal com produtos de alta qualidade em um ambiente relaxante.",
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

        <div className="grid grid-cols-2 gap-2">
          {services.map((service, index) => (
            <div key={index} className="group relative aspect-square overflow-hidden cursor-pointer bg-brand-950">
              {/* Main Image */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105 opacity-90 group-hover:opacity-80" 
              />
              
              {/* Editorial Numbering */}
              <div className="absolute top-8 left-8 z-30">
                <span className="text-[10px] font-bold text-white/40 tracking-[0.4em]">0{index + 1}</span>
              </div>

              {/* Permanent Bottom Info Area */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 z-40 bg-gradient-to-t from-brand-950 via-brand-950/80 to-transparent">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 uppercase tracking-tighter leading-none">
                  {service.title}
                </h3>
                
                {/* Description - Always visible on mobile, reveal on hover on desktop */}
                <div className="max-h-24 md:max-h-0 overflow-hidden md:group-hover:max-h-24 transition-all duration-700 ease-in-out">
                  <p className="text-white/60 text-xs leading-relaxed mb-6 line-clamp-2">
                    {service.description}
                  </p>
                </div>

                {/* WhatsApp Button - High Impact */}
                <div className="flex items-center justify-between mt-2">
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 bg-brand-400 text-brand-950 px-5 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-all transform md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 duration-500"
                  >
                    <WhatsAppLogo className="w-4 h-4 fill-current" />
                    AGENDAR AGORA
                  </a>
                  
                  <ChevronRight className="text-white/20 w-5 h-5 md:group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Subtle inner border */}
              <div className="absolute inset-0 border border-white/5 pointer-events-none z-50"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Mariana Silva", pet: "Bento (Golden Retriever)", text: "A DUNO salvou a vida do Bento. O atendimento foi impecável e a equipe nos manteve informados o tempo todo." },
    { name: "Ricardo Oliveira", pet: "Luna (Persa)", text: "O padrão de higiene e o cuidado com gatos é diferenciado. A Luna se sente em casa, sem o estresse comum de outras clínicas." },
    { name: "Ana Paula Costa", pet: "Thor (Bulldog Francês)", text: "Especialistas de altíssimo nível. Resolvemos um problema dermatológico crônico que ninguém conseguia tratar." },
  ];

  return (
    <section className="section-padding bg-brand-950 text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <Quote className="w-12 h-12 text-brand-400 mx-auto mb-6 opacity-50" />
          <span className="text-brand-400 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Vidas que Transformamos</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter uppercase">Nossos Pacientes <span className="text-brand-400 italic">Felizes.</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-brand-900/30 p-10 rounded-[2.5rem] border border-brand-800/50">
              <p className="text-lg text-brand-100/80 italic mb-8">"{review.text}"</p>
              <div>
                <h4 className="text-xl font-serif font-bold text-white uppercase">{review.name}</h4>
                <p className="text-brand-400 text-[10px] font-bold uppercase tracking-widest mt-1">{review.pet}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-white px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5]">
          <img src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=2070&auto=format&fit=crop" alt="Sobre Duno" className="w-full h-full object-cover" />
        </div>
        <div>
          <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px] mb-6 block">A Experiência Duno</span>
          <h2 className="text-5xl font-serif font-bold text-brand-950 mb-8 leading-tight">Ciência com Alma e <span className="text-brand-700 italic">Empatia Verdadeira.</span></h2>
          <p className="text-lg text-brand-800/70 leading-relaxed mb-10">
            Na DUNO, redefinimos a medicina veterinária ao integrar o mais alto rigor técnico a um atendimento que acolhe e entende a individualidade de cada ser. Nossa clínica opera em perfeita sintonia entre tecnologia e humanização.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-700 shadow-sm"><PawPrint className="w-6 h-6" /></div>
              <p className="font-bold text-brand-950 uppercase tracking-widest text-[10px]">Tecnologia Global</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-700 shadow-sm"><HeartPulse className="w-6 h-6" /></div>
              <p className="font-bold text-brand-950 uppercase tracking-widest text-[10px]">Cuidado Humanizado</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImpactSection = () => (
  <section className="py-40 bg-brand-950 overflow-hidden relative text-center px-6">
    {/* Subtle Decorative Elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-brand-400 to-transparent opacity-50"></div>
    
    <div className="max-w-4xl mx-auto relative z-10">
      <div className="w-16 h-16 bg-brand-900 rounded-2xl flex items-center justify-center mx-auto mb-12 border border-brand-800 shadow-2xl">
        <HeartPulse className="text-brand-400 w-8 h-8" />
      </div>
      
      <span className="text-brand-400 font-bold uppercase tracking-[0.6em] text-[10px] mb-8 block">Manifesto de Excelência</span>
      
      <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-12 leading-[1.1] tracking-tighter">
        A VIDA É O NOSSO <br /> 
        <span className="text-brand-400 italic">MAIOR COMPROMISSO.</span>
      </h2>
      
      <div className="w-20 h-[1px] bg-brand-800 mx-auto mb-12"></div>
      
      <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-16 max-w-2xl mx-auto font-light">
        Na DUNO, não tratamos apenas animais; honramos o vínculo sagrado entre você e seu melhor amigo através da medicina de elite.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-8">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-white text-brand-950 px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-brand-400 transition-all shadow-2xl">
          FALAR COM UM ESPECIALISTA
        </a>
      </div>
    </div>

    {/* Luxury Ambient Light */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-brand-900/20 rounded-full blur-[120px]"></div>
  </section>
);

const PetGallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800",
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=800",
    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=800",
  ];

  return (
    <section id="gallery" className="py-32 bg-brand-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4 block">Histórias que nos Inspiram</span>
          <h2 className="text-5xl font-serif font-bold text-brand-950 uppercase tracking-tighter">Legado de <span className="text-brand-700 italic">Sorrisos</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="rounded-3xl overflow-hidden aspect-square shadow-md">
              <img src={img} alt="Pet" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { question: "Quais são os horários de atendimento?", answer: "Funcionamos de segunda a sexta das 08h às 22h e sábados das 08h às 18h. Emergências críticas 24h." },
    { question: "Preciso agendar consulta com antecedência?", answer: "Para consultas de rotina e especialistas, recomendamos o agendamento prévio via WhatsApp." },
    { question: "A clínica atende animais silvestres?", answer: "Sim! Temos especialistas em animais exóticos e silvestres em nossa equipe." },
    { question: "Quais formas de pagamento são aceitas?", answer: "Aceitamos todos os cartões (parcelado em até 10x), PIX e convênios selecionados." }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-white px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-950 text-center mb-16 uppercase tracking-tighter">Dúvidas <span className="text-brand-700 italic">Frequentes</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-brand-100 rounded-2xl overflow-hidden">
              <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="w-full p-6 flex justify-between items-center text-left bg-white hover:bg-brand-50 transition-colors">
                <span className="font-serif font-bold text-brand-950 uppercase">{faq.question}</span>
                {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              {activeIndex === index && <div className="p-6 pt-0 text-brand-800/70">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="section-padding bg-brand-950 text-white px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-5xl font-serif font-bold mb-10 tracking-tighter uppercase">Onde <span className="text-brand-400 italic">Estamos.</span></h2>
        <div className="space-y-8">
          <div className="flex gap-6"><MapPin className="text-brand-400 w-8 h-8 shrink-0" /><p className="text-lg">Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi, SP</p></div>
          <div className="flex gap-6"><Phone className="text-brand-400 w-8 h-8 shrink-0" /><p className="text-lg">(11) 99287-6219</p></div>
          <div className="flex gap-6"><Clock className="text-brand-400 w-8 h-8 shrink-0" /><p className="text-lg">Seg-Sex: 08:00 - 20:00 | Sáb: 08:00 - 18:00</p></div>
        </div>
      </div>
      <div className="h-[400px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10">
        <MapContainer center={[-23.5899, -46.6815]} zoom={15} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[-23.5899, -46.6815]} />
        </MapContainer>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 bg-black text-white/50 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16 text-left">
      <div>
        <div className="flex items-center gap-2 mb-6"><PawPrint className="text-brand-400 w-8 h-8" /><span className="text-2xl font-serif font-bold text-white uppercase tracking-tighter">DUNO</span></div>
        <p className="text-sm leading-relaxed">Excelência hospitalar e cuidado humanizado no coração do Itaim Bibi.</p>
      </div>
      <div>
        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-widest">Especialidades</h4>
        <ul className="text-xs space-y-4 tracking-widest font-bold">
          <li>CIRURGIA AVANÇADA</li>
          <li>EXAMES DIAGNÓSTICOS</li>
          <li>INTERNAÇÃO 24H</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-serif font-bold mb-6 uppercase tracking-widest">Siga-nos</h4>
        <div className="flex gap-6"><Instagram className="w-6 h-6 hover:text-brand-400 cursor-pointer" /><Facebook className="w-6 h-6 hover:text-brand-400 cursor-pointer" /></div>
      </div>
    </div>
    <p className="text-center text-[10px] font-bold tracking-[0.5em] pt-12 border-t border-white/5">© 2026 DUNO. TODOS OS DIREITOS RESERVADOS.</p>
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
      <About />
      <ImpactSection />
      <PetGallery />
      <FAQ />
      <Contact />
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
