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
  Quote
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
    { name: "A Clínica", href: "#about" },
    { name: "Galeria", href: "#gallery" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center">
            <PawPrint className="text-brand-400 w-6 h-6" />
          </div>
          <span className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled ? "text-brand-950" : "text-white"}`}>DUNO</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${isScrolled ? "text-brand-950/70 hover:text-brand-950" : "text-white/70 hover:text-white"}`}
            >
              {link.name}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-400 text-brand-950 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
            AGENDAR AGORA
          </a>
        </div>

        <button 
          className={`md:hidden p-2 ${isScrolled ? "text-brand-950" : "text-white"}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden border-t border-brand-50">
          <div className="p-8 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-serif font-bold text-brand-950">{link.name}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center bg-brand-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop" 
          alt="Veterinary Excellence" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-none tracking-tighter">
            Excelência para <br /> <span className="text-brand-400 italic">Vidas Extraordinárias.</span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-xl font-light leading-relaxed">
            Unindo tecnologia de ponta e respeito absoluto pela vida animal. Na DUNO, o cuidado sublime é a nossa única regra.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-400 text-brand-950 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white transition-all shadow-xl hover:shadow-brand-400/20">
              AGENDAR CONSULTA
            </a>
            <a href="#services" className="border border-white/30 text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-white hover:text-brand-950 transition-all">
              VER SERVIÇOS
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
    { label: "ESPECIALISTAS", value: "10+" },
    { label: "VIGILÂNCIA", value: "24h" },
    { label: "PADRÃO OURO", value: "Elite" },
  ];

  return (
    <section className="relative z-20 -mt-20 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center border border-brand-100/50">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-serif font-bold text-brand-950 mb-2">{stat.value}</div>
            <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "CONSULTA", desc: "Clínica geral e especialistas.", image: "/imagem/Consulta veterinária.png" },
    { title: "VACINAÇÃO", desc: "Protocolos seguros.", image: "/imagem/Vacinação.jpg" },
    { title: "EXAMES", desc: "Laboratório de ponta.", image: "/imagem/Exames laboratoriais.jpg" },
    { title: "CIRURGIA", desc: "Centro cirúrgico moderno.", image: "/imagem/Cirurgias veterinárias.jpg" },
    { title: "INTERNAÇÃO", desc: "Supervisão 24 horas.", image: "/imagem/internação.png" },
    { title: "EMERGÊNCIA", desc: "Suporte vital imediato.", image: "/imagem/atendimento emergencial.jpg" },
    { title: "BANHO E TOSA", desc: "Estética animal premium.", image: "/imagem/Banho e tosa.png" },
    { title: "DOMICILIAR", desc: "Cuidado no seu lar.", image: "/imagem/Atendimento domiciliar.webp" },
    { title: "CHECK-UP", desc: "Avaliação preventiva.", image: "/imagem/Check-up veterinário completo.jpg" },
  ];

  return (
    <section id="services" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif font-bold text-brand-950 mb-16 text-center uppercase tracking-tighter">Nossos <span className="text-brand-600 italic">Serviços</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group rounded-[2rem] overflow-hidden border border-brand-50 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-serif font-bold text-brand-950 mb-4 uppercase">{s.title}</h3>
                <p className="text-brand-800/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
        <h2 className="text-5xl font-serif font-bold text-brand-950 mb-16 text-center uppercase tracking-tighter">Legado de <span className="text-brand-700 italic">Sorrisos</span></h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <img key={i} src={img} alt="Pet" className="rounded-3xl aspect-square object-cover shadow-md hover:scale-[1.02] transition-transform duration-500" />
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-32 bg-white px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="rounded-[3rem] overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=800" alt="About Duno" className="w-full h-full object-cover" />
      </div>
      <div>
        <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px] mb-6 block">A Experiência Duno</span>
        <h2 className="text-5xl font-serif font-bold text-brand-950 mb-8 leading-tight">Ciência com Alma e <span className="text-brand-700 italic">Empatia Verdadeira.</span></h2>
        <p className="text-lg text-brand-800/70 leading-relaxed mb-8">
          Na DUNO, redefinimos a medicina veterinária ao integrar o mais alto rigor técnico a um atendimento que acolhe e entende a individualidade de cada ser.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-brand-600 font-bold uppercase tracking-widest text-[11px] hover:text-brand-950 transition-colors">
          Saiba Mais sobre nossa missão <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 bg-brand-950 text-white px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div>
        <h2 className="text-5xl font-serif font-bold mb-10 tracking-tighter uppercase">Fale <span className="text-brand-400 italic">Conosco</span></h2>
        <div className="space-y-8">
          <div className="flex gap-6">
            <MapPin className="text-brand-400 w-8 h-8 shrink-0" />
            <p className="text-lg font-medium">Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi, SP</p>
          </div>
          <div className="flex gap-6">
            <Phone className="text-brand-400 w-8 h-8 shrink-0" />
            <p className="text-lg font-medium">(11) 99287-6219</p>
          </div>
          <div className="flex gap-6">
            <Clock className="text-brand-400 w-8 h-8 shrink-0" />
            <p className="text-lg font-medium">Seg-Sex: 08:00 - 20:00 | Sáb: 08:00 - 18:00</p>
          </div>
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
  <footer className="py-12 bg-black text-white/40 text-center px-6 border-t border-white/5">
    <div className="flex justify-center gap-8 mb-8">
      <Instagram className="w-6 h-6 hover:text-white cursor-pointer" />
      <Facebook className="w-6 h-6 hover:text-white cursor-pointer" />
    </div>
    <p className="text-[10px] font-bold uppercase tracking-[0.4em]">© 2026 DUNO. TODOS OS DIREITOS RESERVADOS.</p>
  </footer>
);

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <PetGallery />
      <About />
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

import { Menu, X } from 'lucide-react';
