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
  Menu
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
          <div className="text-white font-bold text-2xl tracking-tight cursor-pointer">
            DUNO
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0D0D0D] z-[10000] flex flex-col p-6">
          <div className="flex justify-between items-center mb-12">
            <div className="text-white font-bold text-2xl">DUNO</div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-brand-primary p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-6">
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
          <div key={index} className="flex flex-col group cursor-pointer">
            <img src={service.image} alt={service.title} className="w-full h-[200px] object-cover rounded-[12px]" />
            <h3 className="font-[600] text-[16px] text-brand-text mt-[12px]">{service.title}</h3>
            <p className="text-[#6B6B6B] text-[14px] mt-1 mb-3 line-clamp-2 leading-[1.7] flex-1">{service.desc}</p>
            <a href={WHATSAPP_URL} className="text-brand-primary font-[600] text-[14px] group-hover:underline">Saiba Mais &rarr;</a>
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
    <section id="cases" className="section-padding bg-[#F7F7F7]">
      <div className="mb-[56px] text-center md:text-left">
        <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">GALERIA DE EXCELÊNCIA</span>
        <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
          Transformações <span className="text-brand-primary italic">Reais</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        {cases.map((c, i) => (
          <div key={i} className="flex flex-col">
            <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden mb-[16px]">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-black/60 text-white rounded-[4px] px-[10px] py-[4px] text-[11px] uppercase font-bold tracking-wide">
                ANTES / DEPOIS
              </div>
            </div>
            <h3 className="font-[700] text-[20px] text-brand-text mb-2">{c.name}</h3>
            <p className="text-[#6B6B6B] text-[14px] leading-[1.7] mb-6 line-clamp-3">{c.desc}</p>
            <a href={WHATSAPP_URL} className="inline-block text-center border-2 border-brand-text text-brand-text px-[24px] py-[12px] rounded-[4px] font-[600] text-[13px] uppercase tracking-wide transition-colors hover:bg-brand-primary hover:border-brand-primary hover:text-white self-start">
              VEJA ESTE CASO &rarr;
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

const Infrastructure = () => {
  return (
    <section className="section-padding bg-[#111111]">
      <div className="grid lg:grid-cols-[55%_45%] gap-12 items-center">
        <div>
          <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">A CLÍNICA</span>
          <h2 className="text-[32px] md:text-[40px] font-[800] text-white leading-[1.2] mb-6">
            Tecnologia de ponta. <span className="text-brand-primary italic">Conforto</span><br/>
            <span className="text-brand-primary italic">absoluto.</span>
          </h2>
          <p className="text-white/65 text-[16px] leading-[1.7] max-w-[460px] mb-10">
            Mais do que tratar, nosso objetivo é garantir a melhor experiência para você e a recuperação mais rápida e segura para o seu pet.
          </p>

          <div className="space-y-6 mb-12">
            {[
              { label: "Primeiro Cirurgião 3D", value: "98%" },
              { label: "Atendimento Acolhedor", value: "100%" },
              { label: "Monitoramento Hospitalar", value: "96%" },
              { label: "Área Espaçosa e Moderna", value: "99%" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-brand-primary" />
                  <span className="text-white text-[14px] font-medium">{item.label}</span>
                </div>
                <div className="w-full h-[3px] bg-white/15 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary rounded-full" style={{ width: item.value }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center rounded">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">DUNO</p>
              <p className="text-white/40 text-[11px] uppercase tracking-widest">Clínica Veterinária</p>
            </div>
          </div>
        </div>

        <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden">
          <img src="/imagem/veterinario_2.webp" alt="Infraestrutura" className="w-full h-full object-cover" />
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
    <section id="equipe" className="section-padding bg-white">
      <div className="mb-[56px] text-center">
        <span className="uppercase text-brand-primary tracking-[3px] text-[11px] font-bold mb-4 block">NOSSA EQUIPE</span>
        <h2 className="text-[32px] md:text-[44px] font-[800] text-brand-text leading-[1.2]">
          Mentes brilhantes por trás de <span className="text-brand-primary italic">vidas</span><br/>
          <span className="text-brand-primary italic">saudáveis.</span>
        </h2>
        <p className="text-[#6B6B6B] text-[16px] mt-4 max-w-[600px] mx-auto leading-[1.7]">
          Especialistas renomados que tratam seu animal com a seriedade da medicina avançada e o carinho que ele merece.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((vet, i) => (
          <div key={i} className="flex flex-col items-center">
            <img 
              src={vet.img} 
              alt={vet.name} 
              className="w-[140px] h-[140px] rounded-full object-cover object-top border-[4px] border-[#F7F7F7] shadow-[0_0_0_2px_#E8671A] mb-[16px]"
            />
            <h3 className="font-[700] text-[18px] text-brand-text">{vet.name}</h3>
            <p className="text-brand-primary text-[11px] uppercase tracking-[2px] font-bold mt-1 mb-1">{vet.crmv}</p>
            <p className="text-[#6B6B6B] text-[14px] mb-3">{vet.specialty}</p>
            <p className="text-[#6B6B6B] text-[14px] text-center max-w-[280px] leading-[1.7] mb-4">{vet.bio}</p>
            <div className="flex gap-3">
              <a href="#" className="text-brand-text hover:text-brand-primary transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
              <a href="#" className="text-brand-text hover:text-brand-primary transition-colors"><Facebook className="w-[18px] h-[18px]" /></a>
            </div>
          </div>
        ))}
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
    <section id="depoimentos" className="section-padding bg-[#111111]">
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

        <div className="w-full h-[380px] rounded-[16px] overflow-hidden shadow-minimal">
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
