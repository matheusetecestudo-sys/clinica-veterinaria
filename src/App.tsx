/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "motion/react";
import { 
  Stethoscope,
  HeartPulse, 
  Microscope,
  MapPin, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  Search,
  ChevronRight, 
  Instagram, 
  Facebook, 
  PawPrint,
  MessageCircle,
  Plus,
  Minus,
  Quote,
  ShieldCheck,
  Zap,
  Award,
  Activity,
  Syringe,
  Bone
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect, useRef } from "react";

// Fix for Leaflet marker icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const WHATSAPP_URL = "https://wa.me/5511992876219?text=Olá! Gostaria de agendar uma consulta na Duno.";

const LoadingScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-brand-950 flex flex-col items-center justify-center"
    >
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-8"
      >
        <PawPrint className="w-20 h-20 text-brand-400" />
      </motion.div>
      <h2 className="text-white text-3xl font-serif font-bold tracking-widest animate-pulse-soft">DUNO</h2>
      <div className="mt-8 w-48 h-1 bg-brand-900 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-brand-400"
        />
      </div>
    </motion.div>
  );
};

const WhatsAppLogo = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

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
      className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-shadow"
    >
      <WhatsAppLogo className="w-9 h-9 fill-current" />
    </motion.a>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Sobre", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-morphism py-2 shadow-sm" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PawPrint className="text-brand-600 w-8 h-8" />
          <span className="text-2xl font-serif font-bold tracking-tight text-brand-950 uppercase">DUNO</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-brand-950 hover:text-brand-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
            <WhatsAppLogo className="w-4 h-4 fill-current" /> Fale Conosco no WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-950" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-brand-950 border-b border-brand-100 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full mt-4 text-center flex items-center justify-center gap-2">
              <WhatsAppLogo className="w-4 h-4 fill-current" /> Fale Conosco no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop" 
          alt="Veterinarian with dog" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-brand-950/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl text-white"
        >
          <span className="inline-block px-4 py-1 bg-brand-400/20 border border-brand-400/30 rounded-full text-brand-400 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
            Excelência Hospitalar Itaim Bibi
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-4 drop-shadow-lg">
            A Saúde do <br /> <span className="text-brand-400 italic">Seu Pet é Arte.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-0 leading-relaxed font-medium max-w-lg drop-shadow-md">
            Referência em medicina avançada e atendimento humanizado na DUNO.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { icon: <HeartPulse className="w-5 h-5 text-brand-700" />, value: "22k+", label: "VIDAS SALVAS" },
    { icon: <Stethoscope className="w-5 h-5 text-brand-700" />, value: "15+", label: "ESPECIALISTAS" },
    { icon: <ShieldCheck className="w-5 h-5 text-brand-700" />, value: "24h", label: "SUPORTE VITAL" },
    { icon: <Award className="w-5 h-5 text-brand-700" />, value: "100%", label: "PADRÃO ELITE" },
  ];

  return (
    <section className="relative z-20 -mt-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-6 border border-brand-50"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-900 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
              {stat.icon}
            </div>
            <h3 className="text-3xl font-serif font-bold text-brand-950 mb-1 tracking-tighter">{stat.value}</h3>
            <p className="text-[9px] font-bold text-brand-600 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

function ServiceCard({ service, index }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      className="relative aspect-square rounded-3xl overflow-hidden group cursor-pointer shadow-2xl border border-white/10"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-[130%] object-cover scale-110 group-hover:scale-125 transition-transform duration-[1500ms] ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Sophisticated Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/20 via-brand-950/50 to-brand-950/90"></div>
      </motion.div>

      {/* Content - Info */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 uppercase tracking-tighter leading-none drop-shadow-2xl">
          {service.title}
        </h3>
        
        <p className="text-brand-50/80 text-xs leading-relaxed max-w-[240px] mb-8 font-medium group-hover:text-white transition-colors duration-500">
          {service.description}
        </p>

        <motion.a 
          href={WHATSAPP_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-brand-400 text-brand-950 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase flex items-center gap-3 transition-all shadow-2xl border border-brand-400/50"
        >
          <WhatsAppLogo className="w-4 h-4 fill-brand-950" /> AGENDAR CONSULTA
        </motion.a>
      </div>
    </motion.div>
  );
}

const Services = () => {
  const services = [
    {
      title: "MEDICINA DIAGNÓSTICA",
      description: "Laboratório próprio e imagens de alta resolução para diagnósticos imediatos.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "BLOCO CIRÚRGICO",
      description: "Equipamentos de suporte à vida e anestesia inalatória monitorada de alta precisão.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "INTERNAÇÃO ELITE",
      description: "Acomodações climatizadas e supervisão médica constante para recuperação segura.",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop"
    },
    {
      title: "VETERINÁRIA",
      description: "Acompanhamento integral do desenvolvimento e nutrição de ponta para seu pet.",
      image: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "HIGIENE SÔNICA",
      description: "Tratamentos para cálculo dentário e profilaxia bucal avançada com tecnologia.",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop"
    },
    {
      title: "ESPECIALIDADES",
      description: "Cardiologia, Fisioterapia e Ortopedia com especialistas de renome internacional.",
      image: "https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="services" className="section-padding bg-[#FDFDFD] relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-[0.04] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-brand-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block"
          >
            Nossas Áreas de Atuação
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-serif font-bold text-brand-950 mb-6 leading-none tracking-tighter"
          >
            MEDICINA DE <br /> <span className="text-brand-600 italic">ALTA PERFORMANCE.</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-[1px] bg-brand-200 mx-auto mt-10"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PetGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2074&auto=format&fit=crop" },
    { url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop" },
    { url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop" },
    { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop" },
    { url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=1974&auto=format&fit=crop" },
    { url: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?q=80&w=2080&auto=format&fit=crop" },
  ];

  return (
    <section className="py-10 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 mb-8"
      >
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Nossos Pacientes Felizes</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-950 leading-none">
            VIDAS QUE <br /> <span className="text-brand-700 italic">TRANSFORMAMOS.</span>
          </h2>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-6">
        {images.map((img, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedImage(img.url)}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <img 
              src={img.url} 
              alt="Happy Pet" 
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                <Search className="text-white w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-brand-950/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-full"
            >
              <img 
                src={selectedImage} 
                alt="Enlarged Pet" 
                className="w-full h-full object-contain rounded-3xl"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="section-padding bg-brand-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <Quote className="w-12 h-12 text-brand-400 mx-auto mb-6 opacity-50" />
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 uppercase tracking-tighter">RELATOS DE <span className="text-brand-400 italic">CONFIANÇA.</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-900/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-brand-800/50 flex flex-col justify-between"
            >
              <p className="text-lg text-brand-100/80 leading-relaxed italic mb-8">"{review.text}"</p>
              <div>
                <h4 className="text-base font-serif font-bold text-white uppercase tracking-tight">{review.name}</h4>
                <p className="text-brand-400 text-[9px] font-bold uppercase tracking-widest mt-1">{review.pet}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Standards = () => {
  const items = [
    { icon: <HeartPulse className="w-5 h-5" />, title: "CUIDADO INTEGRAL", desc: "Time médico de alta prontidão e centro cirúrgico ativo para sua tranquilidade." },
    { icon: <MessageCircle className="w-5 h-5" />, title: "INTERNAÇÃO HUMANIZADA", desc: "Monitoramento intensivo com relatórios em vídeo no seu WhatsApp." },
    { icon: <Microscope className="w-5 h-5" />, title: "EXCELÊNCIA DIAGNÓSTICA", desc: "Equipamentos de imagem e laboratoriais de padrão internacional." },
  ];

  return (
    <section className="section-padding bg-brand-50 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-xl border-[8px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop" 
              alt="Golden Standards" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-700 rounded-full flex items-center justify-center text-white text-center p-4 shadow-xl rotate-12">
            <p className="font-serif font-bold text-sm leading-tight">PADRÃO ELITE DE CUIDADO</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Por que escolher a Duno?</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-950 mb-8 leading-none tracking-tighter">
            NOSSOS <br /> <span className="text-brand-700 italic">PADRÕES DE OURO.</span>
          </h2>
          
          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md shrink-0 text-brand-700">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold text-brand-950 mb-1 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-brand-800/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=2070&auto=format&fit=crop" 
              alt="Veterinary Specialist" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-brand-900 p-6 rounded-[1.5rem] shadow-xl hidden md:block max-w-[240px] text-white">
            <h4 className="text-2xl font-serif font-bold mb-1">DUNO</h4>
            <p className="text-xs font-medium text-brand-100/80">Excelência que seu pet merece, cuidado que ele sente.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">A Clínica</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-950 mb-6 leading-tight">
            Ciência e <span className="text-brand-700 italic">Empatia</span> em cada atendimento.
          </h2>
          <div className="space-y-4 text-base text-brand-800/70 leading-relaxed">
            <p>
              Na DUNO, acreditamos que a medicina veterinária deve ser exercida com o mais alto rigor científico, sem nunca perder a ternura e o respeito pela vida animal.
            </p>
            <p>
              Nossa estrutura foi planejada para oferecer um ambiente calmo e seguro, reduzindo o estresse dos pacientes e proporcionando uma experiência positiva para tutores e pets.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center shadow-sm text-brand-700">
                <PawPrint className="w-5 h-5" />
              </div>
              <p className="font-bold text-brand-950 uppercase tracking-widest text-[9px]">Tecnologia Global</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-50 rounded-full flex items-center justify-center shadow-sm text-brand-700">
                <HeartPulse className="w-5 h-5" />
              </div>
              <p className="font-bold text-brand-950 uppercase tracking-widest text-[9px]">Cuidado Humanizado</p>
            </div>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-10 inline-flex items-center gap-3 py-3 px-8 text-sm">
            <WhatsAppLogo className="w-4 h-4 fill-white" /> FALAR COM ESPECIALISTA NO WHATSAPP
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Quais são os horários de atendimento?",
      answer: "Funcionamos de segunda a sexta das 08h às 22h e sábados das 08h às 18h. No entanto, temos uma equipe de plantão 24h para emergências críticas."
    },
    {
      question: "Preciso agendar consulta com antecedência?",
      answer: "Para consultas de rotina e especialistas, recomendamos o agendamento prévio via WhatsApp para garantir sua vaga. Emergências são atendidas por ordem de chegada."
    },
    {
      question: "A clínica atende animais silvestres?",
      answer: "Sim! Temos especialistas em animais exóticos e silvestres em nossa equipe. Entre em contato para verificar a disponibilidade do especialista no dia."
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos todos os cartões de crédito e débito (parcelamento em até 10x sem juros), PIX e dinheiro. Também trabalhamos com alguns planos de saúde pet."
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-brand-50">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-brand-600 font-bold uppercase tracking-widest text-[10px] mb-4 block">Dúvidas Frequentes</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-950 uppercase tracking-tighter">PERGUNTAS <span className="text-brand-700 italic">COMUNS.</span></h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-100">
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-5 flex justify-between items-center bg-white hover:bg-brand-50 transition-colors"
              >
                <span className="text-sm md:text-base font-serif font-bold text-brand-950 text-left uppercase tracking-tight">{faq.question}</span>
                {activeIndex === index ? <Minus className="text-brand-700 w-4 h-4" /> : <Plus className="text-brand-700 w-4 h-4" />}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-brand-800/70 leading-relaxed text-base">
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

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-10"
        >
          <div>
            <span className="text-brand-600 font-bold uppercase tracking-widest text-[9px] mb-3 block">Onde Estamos</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-950 mb-6 leading-none tracking-tighter">
              DUNO <br /> <span className="text-brand-700 italic uppercase">ITAIM BIBI</span>
            </h2>
            
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-brand-950 mb-0.5 uppercase tracking-tight">ENDEREÇO</h4>
                  <p className="text-brand-800/60 text-sm">Av. Brigadeiro Faria Lima, 2000 - Itaim Bibi, SP</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-brand-900 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-serif font-bold text-brand-950 mb-0.5 uppercase tracking-tight">HORÁRIOS</h4>
                  <p className="text-brand-800/60 text-sm">Seg-Sex: 08:00 - 20:00 | Sáb: 08:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[350px] rounded-[2rem] overflow-hidden shadow-lg border-[6px] border-brand-50 z-0">
            <MapContainer 
              center={[-23.5899, -46.6815]} 
              zoom={15} 
              scrollWheelZoom={false} 
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[-23.5899, -46.6815]}>
                <Popup>
                  <div className="text-brand-950 font-serif font-bold">DUNO</div>
                  <div className="text-xs text-brand-800/70">Av. Brigadeiro Faria Lima, 2000</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-10 bg-brand-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-[0.05] pointer-events-none"></div>
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-brand-100"
        >
          <span className="text-brand-600 font-bold uppercase tracking-[0.4em] text-[9px] mb-4 block">Atendimento Imediato</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-950 mb-6 leading-tight tracking-tighter">
            PRONTO PARA DAR O <br /> <span className="text-brand-700 italic">MELHOR AO SEU PET?</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 text-base"
            >
              <WhatsAppLogo className="w-5 h-5 fill-white" /> AGENDAR NO WHATSAPP
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-950 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <PawPrint className="text-brand-400 w-8 h-8" />
              <span className="text-3xl font-serif font-bold tracking-tighter uppercase">DUNO</span>
            </div>
            <p className="text-brand-300 text-base leading-relaxed font-medium">
              ONDE A MEDICINA DE ELITE E O AMOR INCONDICIONAL TRANSFORMAM VIDAS EM PINHEIROS.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-brand-800 rounded-full flex items-center justify-center hover:bg-brand-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 border border-brand-800 rounded-full flex items-center justify-center hover:bg-brand-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-serif font-bold mb-6 uppercase tracking-widest">ESPECIALIDADES</h4>
            <ul className="space-y-4 text-brand-300 font-bold text-xs tracking-widest">
              <li><a href="#services" className="hover:text-brand-400 transition-colors">CIRURGIA AVANÇADA</a></li>
              <li><a href="#services" className="hover:text-brand-400 transition-colors">EXAMES DIAGNÓSTICOS</a></li>
              <li><a href="#services" className="hover:text-brand-400 transition-colors">INTERNAÇÃO VIP</a></li>
              <li><a href="#services" className="hover:text-brand-400 transition-colors">CONSULTAS EXPERT</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-serif font-bold mb-6 uppercase tracking-widest">CONTATO</h4>
            <ul className="space-y-6 text-brand-300">
              <li className="flex gap-3">
                <MapPin className="text-brand-400 shrink-0 w-5 h-5" />
                <span className="font-bold text-xs tracking-widest">AV. BRIGADEIRO FARIA LIMA, 2000 - ITAIM BIBI, SP</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-brand-400 shrink-0 w-5 h-5" />
                <span className="font-bold text-xs tracking-widest">(11) 99287-6219</span>
              </li>
              <li className="flex gap-3">
                <Clock className="text-brand-400 shrink-0 w-5 h-5" />
                <span className="font-bold text-xs tracking-widest uppercase">ATENDIMENTO PERSONALIZADO</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-900 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-500 text-[9px] font-bold tracking-[0.3em] uppercase">
          <p>© 2026 DUNO. TODOS OS DIREITOS RESERVADOS.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-300 transition-colors">PRIVACIDADE</a>
            <a href="#" className="hover:text-brand-300 transition-colors">TERMOS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white selection:bg-brand-200 selection:text-brand-900">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <Stats />
          <Services />
          <PetGallery />
          <Standards />
          <Testimonials />
          <About />
          <FAQ />
          <Contact />
          <CTA />
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </div>
  );
}
