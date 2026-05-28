import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook, 
  Plus, 
  X,
  Check,
  Star,
  ArrowRight,
  Menu,
  MessageCircle,
  Dog,
  Cat,
  Bird,
  Rabbit,
  Shield,
  Heart,
  Award,
  Activity
} from 'lucide-react';

const ProgressBar = () => {
  const [scroll, setScroll] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScroll(scrolled);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="fixed top-0 left-0 h-1 bg-brand-primary z-[100000]" style={{ width: `${scroll}%` }} />;
};
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "INÍCIO", href: "#home" },
    { name: "SERVIÇOS", href: "#services" },
    { name: "EQUIPE", href: "#equipe" },
    { name: "ANTES E DEPOIS", href: "#cases" },
    { name: "DEPOIMENTOS", href: "#depoimentos" },
    { name: "FAQ", href: "#faq" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${isScrolled ? "bg-[#0D0D0D] py-4 shadow-lg border-b border-white/5" : "bg-transparent py-6"}`}>
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <div className="text-logo cursor-pointer">
            DUNO<span className="text-brand-primary">.</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-white/80 hover:text-brand-primary font-medium text-[14px] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-brand-primary text-white hover:bg-brand-600 transition-colors py-2.5 px-6 rounded text-[13px] font-bold uppercase tracking-wide">
              AGENDAR
            </a>
          </div>

          <button 
            className="lg:hidden p-2 text-brand-primary" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:bg-[#128C7E] transition-all duration-300 flex items-center justify-center z-[99999] hover:scale-110 active:scale-95"
        title="Fale conosco no WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.01 14.07 1.006 11.72 1.005c-5.441 0-9.866 4.372-9.87 9.802 0 1.814.504 3.59 1.46 5.168L2.29 21.73l5.952-1.564z" />
          <path d="M16.596 13.565c-.279-.14-.1.353-.627-.14-.26-.26-.814-.526-1.127-.682-.313-.157-.542-.236-.772.109-.23.344-.888 1.109-1.088 1.332-.2.223-.4.256-.679.116-.279-.14-1.178-.434-2.244-1.385-.829-.739-1.39-1.653-1.554-1.933-.163-.28-.018-.431.122-.57.125-.125.279-.328.42-.492.14-.164.187-.279.279-.465.093-.187.047-.35-.024-.492-.07-.14-.627-1.512-.859-2.071-.226-.543-.454-.47-.627-.478-.162-.008-.349-.01-.536-.01-.187 0-.492.07-.75.35-.258.28-.984.962-.984 2.345 0 1.383 1.007 2.717 1.147 2.903.14.187 1.982 3.026 4.8 4.237.67.289 1.192.462 1.6.592.673.214 1.285.184 1.768.112.539-.08 1.653-.676 1.885-1.332.23-.656.23-1.218.162-1.332-.068-.115-.246-.187-.525-.327z" />
        </svg>
      </a>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0D0D0D] z-[10000] flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="text-white font-bold text-[20px]">DUNO<span className="text-brand-primary">.</span></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-primary p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
              <div className="flex flex-col w-full border-2 border-brand-primary rounded-[12px] overflow-hidden">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white text-xl font-medium"
              >
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_URL} className="bg-brand-primary text-white text-center py-4 rounded font-bold uppercase tracking-wide mt-4 w-full">
              AGENDAR
            </a>
          </div>
        </div>
      )}
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex flex-col justify-center bg-[#0D0D0D] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/imagem/banner03.png" 
          alt="Duno Clínica Veterinária" 
          className="w-full h-full object-cover object-center"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(13,13,13,0.92) 50%, rgba(13,13,13,0.3) 100%)' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6">
        <div className="max-w-[600px] pt-12 md:pt-0">
          <h1 className="text-white font-[800] text-[40px] md:text-[64px] leading-[1.1] mb-6">
            Transforme a vida <br />
            <span className="italic text-brand-primary">do seu pet.</span> <br />
            Transforme sua <br />
            família.
          </h1>
          
          <p className="text-white/70 text-[16px] leading-relaxed max-w-[480px] mb-10">
            Lemos cada sinal do seu animal como ninguém. Em nossa clínica, cada consulta é personalizada, humanizada e realizada com os equipamentos mais modernos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              AGENDE SUA CONSULTA
            </a>
            <a href="#services" className="btn-outline w-full sm:w-auto sm:ml-4">
              SAIBA MAIS
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 animate-bounce">
        <div className="w-[1px] h-12 bg-white/50 mb-2"></div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Clínica Geral", desc: "Atendimento completo com foco na saúde preventiva do seu pet.", image: "/imagem/Consulta veterinária.png" },
    { title: "Vacinação", desc: "Protocolos vacinais atualizados e seguros para imunização.", image: "/imagem/Vacinação.jpg" },
    { title: "Odontologia Veterinária", desc: "Saúde bucal avançada para qualidade de vida.", image: "/imagem/Exames laboratoriais.jpg" },
    { title: "Dermatologia Animal", desc: "Diagnóstico e tratamento de condições de pele e alergias.", image: "/imagem/Cirurgias veterinárias.jpg" },
    { title: "Endoscopia Clínica", desc: "Procedimentos minimamente invasivos.", image: "/imagem/internação.png" },
    { title: "Cirurgia e Internação", desc: "Centro cirúrgico e monitoramento 24h.", image: "/imagem/atendimento emergencial.jpg" },
    { title: "Exames de Imagem", desc: "Raio-X e ultrassom de alta resolução.", image: "/imagem/Banho e tosa.png" },
    { title: "Prevenção & Bem-Estar", desc: "Acompanhamento geriátrico e nutricional.", image: "/imagem/Atendimento domiciliar.webp" }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="mb-[56px]">
        <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">NOSSOS SERVIÇOS</span>
        <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
          Tratamentos de <span className="text-brand-primary italic">Alta<br/>Performance</span>
        </h2>
        <p className="text-[#6B6B6B] text-[16px] mt-4 max-w-[600px] leading-[1.7]">
          Nossos protocolos são desenhados para oferecer longevidade e conforto ao seu pet, com excelência clínica incomparável.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="flex flex-col group cursor-pointer border-2 border-brand-primary/20 hover:border-brand-primary rounded-[12px] overflow-hidden p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white"
          >
            <div className="w-full h-[200px] shrink-0 mb-4 overflow-hidden rounded-[8px]">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
            <h3 className="font-[600] text-[16px] text-brand-text mb-2">
              {service.title}
            </h3>
            <p className="text-[#6B6B6B] text-[14px] mb-4 leading-[1.7] flex-1">
              {service.desc}
            </p>
            <a href={WHATSAPP_URL} className="text-brand-primary font-[600] text-[14px] flex items-center gap-1 hover:underline mt-auto">
              Saiba Mais <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const SuccessCases = () => {
  const cases = [
    { num: "01", name: "Max - Husky", desc: "Recuperação total após cirurgia ortopédica avançada e reabilitação.", img: "/imagem/pet01.jpg" },
    { num: "02", name: "Kiwi - Papagaio", desc: "Tratamento de infecção respiratória com retorno do canto normal.", img: "/imagem/pet02.jpg" },
    { num: "03", name: "Luna - Gato", desc: "Controle de doença renal crônica e melhora na qualidade de vida.", img: "/imagem/pet03.jpg" }
  ];

  return (
    <section id="cases" className="py-20 px-6 bg-[#F7F7F7]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-[56px] text-center md:text-left">
          <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">GALERIA DE EXCELÊNCIA</span>
          <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
            Transformações <span className="text-brand-primary italic">Reais</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {cases.map((c, i) => (
            <div 
              key={i} 
              className="flex flex-col w-full border-2 border-brand-primary/20 hover:border-brand-primary rounded-[12px] overflow-hidden p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white group cursor-pointer"
            >
              <div className="relative w-full aspect-[4/3] rounded-[8px] overflow-hidden mb-[16px]">
                <img 
                  src={c.img} 
                  alt={c.name} 
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${c.name.includes("Papagaio") ? "object-top" : "object-center"}`} 
                />
              </div>
              <h3 className="font-[700] text-[20px] text-brand-text mb-2">{c.name}</h3>
              <p className="text-[#6B6B6B] text-[14px] leading-[1.7] mb-6 line-clamp-3">{c.desc}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

const Infrastructure = () => {
  const values = [
    { 
      title: "Excelência Médica", 
      desc: "Práticas avançadas, precisão em diagnósticos e constante atualização da nossa equipe.", 
      icon: Award 
    },
    { 
      title: "Cuidado Humanizado", 
      desc: "Empatia e carinho incondicional com cada paciente, tratando-os como membros da família.", 
      icon: Heart 
    },
    { 
      title: "Transparência", 
      desc: "Conduta ética inabalável, preços justos e clareza total em cada diagnóstico.", 
      icon: Shield 
    },
    { 
      title: "Inovação Médica", 
      desc: "Investimento constante em infraestrutura cirúrgica e técnicas inovadoras.", 
      icon: Activity 
    }
  ];

  const species = [
    { name: "Cães", desc: "Clínica médica geral, ortopedia, cardiologia e cirurgias avançadas.", icon: Dog },
    { name: "Gatos", desc: "Ambiente exclusivo e atendimento especializado livre de estresse (Cat Friendly).", icon: Cat },
    { name: "Aves", desc: "Atendimento clínico e cirúrgico para aves domésticas e silvestres.", icon: Bird },
    { name: "Pequenos Mamíferos", desc: "Consultas, odontologia preventiva e orientações para roedores e coelhos.", icon: Rabbit },
    { name: "Répteis", desc: "Acompanhamento clínico, nutricional e tratamento de patologias específicas.", icon: Shield },
    { name: "Animais Exóticos", desc: "Cuidado clínico dedicado a animais silvestres e espécies exóticas.", icon: Star }
  ];

  return (
    <section className="py-[96px] px-6 bg-[#0D0D0D] border-t border-b border-white/5">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[52%_48%] gap-16 items-start">
        {/* Left Column: Mission & Values */}
        <div>
          <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">COMPROMISSO</span>
          <h2 className="text-[32px] md:text-[44px] font-[800] text-white leading-[1.2] mb-6">
            Nossa Missão & <span className="text-brand-primary italic">Valores</span>
          </h2>
          <div className="bg-[#1A1A1A] border-l-4 border-brand-primary p-6 rounded-r-[12px] mb-10">
            <h3 className="text-white font-[700] text-[18px] mb-2">Missão da DUNO</h3>
            <p className="text-white/70 text-[15px] leading-[1.7]">
              Proporcionar excelência em medicina veterinária de alta performance, unindo tecnologia médica de ponta a um acolhimento profundamente humano para garantir saúde e bem-estar integral a cada pet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="bg-[#161616] p-6 rounded-[12px] border border-white/5 hover:border-brand-primary/40 transition-all duration-300">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h4 className="text-white font-[700] text-[16px] mb-2">{v.title}</h4>
                  <p className="text-white/60 text-[13.5px] leading-[1.6]">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Species Served */}
        <div className="lg:pl-6">
          <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">ESPECIALIDADES</span>
          <h2 className="text-[32px] md:text-[44px] font-[800] text-white leading-[1.2] mb-6">
            Espécies que <span className="text-brand-primary italic">Atendemos</span>
          </h2>
          <p className="text-white/65 text-[15px] leading-[1.7] mb-8">
            Nossa estrutura hospitalar e corpo clínico altamente especializado estão preparados para prestar atendimento clínico e cirúrgico completo para:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {species.map((s, i) => {
              const IconComp = s.icon;
              return (
                <div 
                  key={i} 
                  className="flex gap-4 p-4 rounded-[12px] bg-[#161616] border border-white/5 hover:border-brand-primary/30 hover:shadow-[0_4px_20px_rgba(232,103,26,0.05)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-[8px] flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                    <IconComp className="w-5 h-5 text-white/70 group-hover:text-brand-primary transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white font-[700] text-[15px] mb-1 group-hover:text-brand-primary transition-colors">{s.name}</h4>
                    <p className="text-white/55 text-[12.5px] leading-[1.5]">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const Team = () => {
  const team = [
    { name: "Dr. Carlos Eduardo", crmv: "CRMV-SP 12345", specialty: "Cirurgia Geral e Ortopedia", bio: "Especialista em cirurgias complexas e recuperação motora de cães de médio e grande porte.", img: "/imagem/veterinario_2.webp" },
    { name: "Dra. Marina Silva", crmv: "CRMV-SP 54321", specialty: "Medicina Felina", bio: "Compreende a linguagem única dos felinos, tratando-os em ambientes livres de estresse.", img: "/imagem/veterinaria_1.webp" },
    { name: "Dra. Juliana Mendes", crmv: "CRMV-SP 09876", specialty: "Anestesiologia Veterinária", bio: "Garante procedimentos 100% seguros com monitoramento contínuo durante e após as cirurgias.", img: "/imagem/veterinaria_3.webp" }
  ];

  return (
    <section id="equipe" className="py-20 px-6 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-[56px] text-center">
          <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">NOSSA EQUIPE</span>
          <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
            Mentes brilhantes por trás de <span className="text-brand-primary italic">vidas</span><br/>
            <span className="text-brand-primary italic">saudáveis.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((vet, i) => (
            <div 
              key={i} 
              className="flex flex-col rounded-[16px] overflow-hidden border border-gray-100 hover:border-brand-primary/40 shadow-minimal hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 bg-white group"
            >
              {/* Profile Image Wrapper */}
              <div className="w-full aspect-[4/5] overflow-hidden relative">
                <img 
                  src={vet.img} 
                  alt={vet.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                />
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Details Container */}
              <div className="p-6 flex flex-col items-start flex-grow">
                <h3 className="font-[700] text-[20px] text-brand-text group-hover:text-brand-primary transition-colors duration-300">{vet.name}</h3>
                <span className="text-brand-primary text-[10px] uppercase tracking-[2px] font-bold mt-1 mb-2">{vet.crmv}</span>
                <p className="text-brand-text font-[600] text-[14px] mb-3">{vet.specialty}</p>
                <p className="text-[#6B6B6B] text-[14px] leading-[1.7] mb-6 flex-grow">{vet.bio}</p>
                
                {/* Social Links & Divider */}
                <div className="w-full border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                  <span className="text-brand-text/40 text-[12px] font-medium">Redes Sociais</span>
                  <div className="flex gap-4">
                    <a href="#" className="text-brand-text/75 hover:text-brand-primary hover:scale-110 transition-all"><Instagram className="w-[18px] h-[18px]" /></a>
                    <a href="#" className="text-brand-text/75 hover:text-brand-primary hover:scale-110 transition-all"><Facebook className="w-[18px] h-[18px]" /></a>
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


const Testimonials = () => {
  const reviews = [
    { name: "Mariana Silva", pet: "Bento", text: "A equipe salvou a vida do Bento após um trauma severo. O cuidado, a transparência e a estrutura são de primeiro mundo.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop" },
    { name: "Ricardo Oliveira", pet: "Luna", text: "Minha gata é super assustada, mas o atendimento Cat Friendly daqui fez toda a diferença. Ela ficou tranquila o tempo todo.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
    { name: "Ana Paula Costa", pet: "Thor", text: "Investigamos a alergia do Thor por anos sem sucesso. A dermatologista daqui resolveu em semanas. Só tenho a agradecer!", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" }
  ];

  return (
    <section id="depoimentos" className="py-20 px-6 bg-[#0D0D0D]">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-[56px] text-center">
          <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">PROVA SOCIAL</span>
          <h2 className="text-[32px] md:text-[44px] font-[800] text-white leading-[1.2]">
            A prova de nossa <span className="text-brand-primary italic">excelência</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-[#1A1A1A] rounded-[16px] p-[32px] relative">
              <div className="absolute top-6 right-8 text-[64px] font-serif leading-none text-brand-primary opacity-30">"</div>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-[18px] h-[18px] fill-brand-primary text-brand-primary" />)}
              </div>
              <p className="text-white/80 text-[15px] leading-[1.8] relative z-10 mb-[20px] min-h-[100px]">
                {r.text}
              </p>
              <div className="w-full h-[1px] bg-white/10 mb-[20px]"></div>
              <div className="flex items-center gap-3">
                <img src={r.img} alt={r.name} className="w-[44px] h-[44px] rounded-full object-cover" />
                <div>
                  <p className="text-white text-[14px] font-[600]">{r.name}</p>
                  <p className="text-[#6B6B6B] text-[13px]">Tutor do {r.pet}</p>
                </div>
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
    { q: "Quais são os horários de atendimento?", a: "Segunda a Sexta: 08:00 às 20:00. Sábado: 08:00 às 18:00. Plantão emergencial 24 horas todos os dias." },
    { q: "Preciso agendar consulta com antecedência?", a: "Recomendamos agendamento para consultas de rotina. Urgências são atendidas de imediato no plantão 24h." },
    { q: "Quais formas de pagamento são aceitas?", a: "Cartões de crédito (até 10x dependendo do tratamento), débito, PIX e dinheiro." },
    { q: "A clínica atende felinos em espaço separado?", a: "Sim, possuímos ambiente exclusivo e técnicas Cat Friendly para minimizar o estresse dos gatos." }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="mb-[56px] text-center">
        <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">DÚVIDAS FREQUENTES</span>
        <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
          Tudo o que você precisa <span className="text-brand-primary italic">saber.</span>
        </h2>
      </div>

      <div className="max-w-[800px] mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className={`border-b border-[#E0E0E0] ${activeIndex === i ? 'border-l-[3px] border-l-brand-primary' : ''}`}>
            <button 
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full py-[20px] px-[24px] flex justify-between items-center text-left"
            >
              <span className="font-[600] text-[16px] text-brand-text">{faq.q}</span>
              {activeIndex === i ? <X className="w-6 h-6 text-brand-primary shrink-0" /> : <Plus className="w-6 h-6 text-brand-primary shrink-0" />}
            </button>
            {activeIndex === i && (
              <div className="px-[24px] pb-[20px] pt-[12px] text-[#6B6B6B] text-[15px] leading-[1.7]">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Location = () => {
  return (
    <section className="section-padding bg-white pt-0">
      <div className="mb-[56px] text-center md:text-left">
        <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">COMO NOS ENCONTRAR</span>
        <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
          Venha nos <span className="text-brand-primary italic">Visitar</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-[40%_60%] gap-12">
        <div className="flex flex-col gap-[32px] justify-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6 text-brand-primary" />
              <h3 className="font-[700] text-[16px] text-brand-text">Nossa Localização</h3>
            </div>
            <p className="text-[#6B6B6B] text-[15px] pl-9">
              Av. Brigadeiro Faria Lima, 2000<br/>Itaim Bibi, São Paulo – SP
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-brand-primary" />
              <h3 className="font-[700] text-[16px] text-brand-text">Horário de Atendimento</h3>
            </div>
            <p className="text-[#6B6B6B] text-[15px] pl-9">
              Seg–Sex: 08:00 – 20:00<br/>
              Sáb: 08:00 – 18:00<br/>
              Emergência: 24 horas
            </p>
          </div>
          <div className="mt-4">
            <a href={WHATSAPP_URL} className="text-brand-primary font-[600] hover:underline flex items-center gap-2">
              Chamar no WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="w-full h-[400px] rounded-[16px] overflow-hidden shadow-minimal">
          <MapContainer center={[-23.5899, -46.6815]} zoom={15} style={{ height: "100%", width: "100%", zIndex: 0 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-23.5899, -46.6815]}>
              <Popup>DUNO Clínica Veterinária</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-[96px] px-[24px] bg-[#0D0D0D] text-center">
      <div className="max-w-[800px] mx-auto">
        <h2 className="text-[40px] md:text-[52px] font-[800] text-white leading-[1.2] mb-6">
          Garanta o melhor cuidado <br />
          para quem você <span className="text-brand-primary italic">ama.</span>
        </h2>
        <p className="text-white/60 text-[16px] max-w-[520px] mx-auto mb-10 leading-[1.7]">
          Nossa equipe de especialistas está pronta para receber o seu pet com tecnologia, segurança e carinho.
        </p>
        <a href={WHATSAPP_URL} className="inline-block bg-brand-primary hover:bg-[#D4580E] text-white px-[40px] py-[18px] rounded-[4px] font-[700] uppercase tracking-[1.5px] text-[13px] transition-colors">
          MARQUE UMA CONSULTA
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0D0D0D] pt-[96px] pb-[48px] px-[24px]">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-[48px]">
          <div>
            <div className="text-white font-bold text-2xl tracking-tight mb-4">DUNO</div>
            <p className="text-white/55 text-[14px] leading-[1.8] mb-6 max-w-[250px]">
              Clínica Veterinária de excelência. Tecnologia médica de ponta unida ao cuidado humanizado.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/50 hover:text-brand-primary transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
              <a href="#" className="text-white/50 hover:text-brand-primary transition-colors"><Facebook className="w-[18px] h-[18px]" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-[700] text-[13px] uppercase tracking-[1.5px] mb-6">NAVEGAÇÃO</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#home" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Início</a></li>
              <li><a href="#services" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Tratamentos</a></li>
              <li><a href="#cases" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Casos de Sucesso</a></li>
              <li><a href="#equipe" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Corpo Clínico</a></li>
              <li><a href="#depoimentos" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Depoimentos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-[700] text-[13px] uppercase tracking-[1.5px] mb-6">SERVIÇOS</h4>
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Clínica Geral</a></li>
              <li><a href="#" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Cirurgias</a></li>
              <li><a href="#" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Odontologia</a></li>
              <li><a href="#" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Exames Laboratoriais</a></li>
              <li><a href="#" className="text-white/55 hover:text-white text-[14px] leading-[2.2] transition-colors">Plantão 24h</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-[700] text-[13px] uppercase tracking-[1.5px] mb-6">CONTATO</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white/55 text-[14px] leading-[2.2]">(11) 99287-6219</li>
              <li className="text-white/55 text-[14px] leading-[2.2]">contato@dunovet.com.br</li>
              <li className="text-white/55 text-[14px] leading-[2.2] mt-2">
                Av. Brigadeiro Faria Lima, 2000<br/>Itaim Bibi, São Paulo - SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-[24px] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-[13px]">
            &copy; 2026 DUNO Clínica Veterinária. Todos os direitos reservados.
          </p>
          <p className="text-white/30 text-[13px]">
            Resp. Técnico: Dr. Carlos Eduardo CRMV-SP 12345
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-white min-h-screen">
    
      <ProgressBar />
      <Navbar />
      <Hero />
      <Services />
      <SuccessCases />
      <Infrastructure />
      <Team />
      <Testimonials />
      <FAQ />
      <Location />
      <CTASection />
      <Footer />
    </div>
  );
}
