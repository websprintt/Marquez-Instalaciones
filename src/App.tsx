/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Zap, 
  Droplets, 
  Thermometer, 
  Waves, 
  CheckCircle2, 
  Star, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Menu, 
  X,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants & Types ---

// Base64 encoded values to prevent simple scraping
// Phone: 628716038 -> NjI4NzE2MDM4
// Email: javiermarquez.cr@gmail.com -> amF2aWVybWFycXVlei5jckBnbWFpbC5jb20=
const ENCODED_PHONE = "NjI4NzE2MDM4";
const ENCODED_EMAIL = "amF2aWVybWFycXVlei5jckBnbWFpbC5jb20=";
const ENCODED_WA_BASE = "aHR0cHM6Ly93YS5tZS8zNDYyODcxNjAzOD90ZXh0PQ=="; // https://wa.me/34628716038?text=

const messages = {
  general: "Hola, necesito asistencia técnica urgente de Márquez Instalaciones.",
  electricity: "Hola, tengo una avería eléctrica y necesito un técnico urgente.",
  plumbing: "Hola, tengo una fuga o problema de fontanería y necesito ayuda.",
  climate: "Hola, necesito asistencia con mi aire acondicionado o calefacción.",
  pools: "Hola, necesito mantenimiento o reparación para mi piscina.",
};

const openWhatsApp = (messageKey: keyof typeof messages = 'general') => {
  const text = encodeURIComponent(messages[messageKey]);
  const url = atob(ENCODED_WA_BASE) + text;
  window.open(url, '_blank', 'noopener,noreferrer');
};

const services = [
  {
    id: 'electricity',
    title: 'Electricidad',
    icon: <Zap className="w-8 h-8" />,
    items: ['Averías urgentes', 'Instalaciones completas', 'Cuadros eléctricos', 'Mantenimiento'],
    color: 'bg-yellow-500/10 text-yellow-600'
  },
  {
    id: 'plumbing',
    title: 'Fontanería',
    icon: <Droplets className="w-8 h-8" />,
    items: ['Fugas de agua', 'Reparaciones', 'Instalaciones sanitarias', 'Termos eléctricos'],
    color: 'bg-blue-500/10 text-blue-600'
  },
  {
    id: 'climate',
    title: 'Climatización',
    icon: <Thermometer className="w-8 h-8" />,
    items: ['Aire acondicionado', 'Sistemas de calefacción', 'Instalación y carga', 'Mantenimiento preventivo'],
    color: 'bg-cyan-500/10 text-cyan-600'
  },
  {
    id: 'pools',
    title: 'Piscinas',
    icon: <Waves className="w-8 h-8" />,
    items: ['Mantenimiento técnico', 'Sistemas de filtrado', 'Reparación de depuradoras', 'Tratamiento de aguas'],
    color: 'bg-emerald-500/10 text-emerald-600'
  }
];

const testimonials = [
  {
    name: "EDUARDO RUIZ",
    text: "Tuvimos un apagón repentino en casa en pleno sábado por la noche y nos atendieron inmediatamente. En menos de media hora estaban en casa y con el problema solucionado. Excelente trato y rapidez.",
    stars: 5,
    location: "Cliente de Google"
  },
  {
    name: "José Luis Amador",
    text: "Excelente servicio, nos quedamos sin luz de madrugada y después de no responder nuestro seguro lo llamamos y vino de inmediato resolviendo el problema.",
    stars: 5,
    location: "Local Guide"
  },
  {
    name: "Amalia Sevilla",
    text: "Después de que el seguro no cumpliera con nuestra cobertura de urgencia un domingo y tras 8 horas sin agua, Márquez acudió de inmediato para resolver la fuga.",
    stars: 5,
    location: "Local Guide"
  }
];

// --- Sub-components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  as = 'button',
  href,
  target,
  rel,
  isUrgent = false
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp',
  className?: string,
  onClick?: (e: React.MouseEvent) => void,
  as?: 'button' | 'a',
  href?: string,
  target?: string,
  rel?: string,
  isUrgent?: boolean
}) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 min-h-[44px] min-w-[44px] cursor-pointer";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-white text-slate-900 hover:bg-slate-100",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    whatsapp: "bg-[#25D366] text-white hover:bg-[#128C7E]"
  };

  // Security refinement for external links
  const targetRel = target === '_blank' ? 'noopener noreferrer' : rel;
  
  // Animation variants
  const urgentAnimation = isUrgent ? {
    boxShadow: [
      "0px 0px 0px rgba(228, 6, 19, 0)",
      variant === 'whatsapp' ? "0px 0px 15px rgba(37, 211, 102, 0.6)" : "0px 0px 15px rgba(228, 6, 19, 0.6)",
      "0px 0px 0px rgba(228, 6, 19, 0)"
    ]
  } : {};

  if (as === 'a') {
    return (
      <motion.a 
        href={href}
        target={target}
        rel={targetRel}
        aria-label={typeof children === 'string' ? children : undefined}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        animate={urgentAnimation}
        transition={isUrgent ? { boxShadow: { repeat: Infinity, duration: 2 } } : {}}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button 
      onClick={onClick}
      aria-label={typeof children === 'string' ? children : undefined}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      animate={urgentAnimation}
      transition={isUrgent ? { boxShadow: { repeat: Infinity, duration: 2 } } : {}}
    >
      {children}
    </motion.button>
  );
};

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12 lg:mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl mx-auto ${light ? 'text-slate-300' : 'text-slate-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Main Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWAClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    openWhatsApp('general');
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="https://raw.githubusercontent.com/websprintt/Marquez-Instalaciones/main/img/Logo.webp" 
            alt="Logo Márquez Instalaciones" 
            className="h-10 w-10 rounded-lg object-cover shadow-md"
          />
          <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Márquez <span className="text-primary tracking-normal">Instalaciones</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {['Inicio', 'Servicios', 'Testimonios', 'Contacto'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`hover:text-primary transition-colors ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
            >
              {item}
            </a>
          ))}
          <Button variant="whatsapp" className="px-5 py-2 text-sm" onClick={handleWAClick} aria-label="Contactar por WhatsApp">
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            WhatsApp
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className={`md:hidden p-2 flex items-center justify-center min-w-[44px] min-h-[44px] ${isScrolled ? 'text-slate-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {['Inicio', 'Servicios', 'Testimonios', 'Contacto'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-slate-600 font-medium py-3 px-2 hover:text-primary transition-colors min-h-[44px] flex items-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Button variant="primary" onClick={() => openWhatsApp('general')} aria-label="Contactar por WhatsApp">
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                WhatsApp Ahora
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
          alt="Electrician at work" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-light px-4 py-1 rounded-full text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Atención Urgente 24 Horas
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-white leading-tight mb-6">
            ¿Sin luz o con una <span className="text-primary">avería urgente?</span> Llegamos rápido.
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-lg leading-relaxed">
            Electricidad, fontanería, climatización y piscinas en Ciudad Real con servicio técnico especializado 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              as="a"
              href={`tel:${atob(ENCODED_PHONE)}`}
              variant="primary" 
              className="text-lg px-8 py-4" 
              aria-label="Llamar para urgencias"
              isUrgent={true}
            >
              <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
              Llamar ahora
            </Button>
            <Button 
              variant="whatsapp" 
              className="text-lg px-8 py-4" 
              onClick={() => openWhatsApp('general')}
              aria-label="Contactar por WhatsApp urgente"
              isUrgent={true}
            >
              <MessageCircle className="w-5 h-5 mr-3" aria-hidden="true" />
              WhatsApp urgente
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
            {[
              { icon: <Zap className="w-5 h-5" />, text: "Servicio 24h" },
              { icon: <ShieldCheck className="w-5 h-5" />, text: "Garantía " },
              { icon: <MapPin className="w-5 h-5" />, text: "Ciudad Real" },
              { icon: <TrendingUp className="w-5 h-5" />, text: "Profesionales" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-white/70">
                <span className="text-primary">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="hidden lg:block relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Customer" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-bold text-lg">+500 Clientes</p>
                <div className="flex text-yellow-400">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <p className="text-slate-300 italic text-sm">"Llevaba horas sin luz por una tormenta y Márquez llegó en 20 min. Solucionó el cuadro eléctrico rápido."</p>
                <p className="text-white font-bold mt-2 text-xs">— Roberto G.</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

const PainSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2070&auto=format&fit=crop" 
              alt="Técnico profesional de climatización reparando equipo" 
              className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">No esperes a mañana</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Las averías no esperan
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Cortes eléctricos inesperados, fugas de agua que inundan tu hogar, aire acondicionado averiado en plena ola de calor o problemas técnicos en tu piscina pueden convertirse en un problema serio en cuestión de minutos.
            </p>
            <p className="text-lg text-slate-900 font-semibold mb-8">
              En Márquez Instalaciones respondemos rápido para ayudarte cuando más lo necesitas. Tu tranquilidad es nuestra prioridad.
            </p>
            <div className="flex flex-col gap-4">
              {[
                "Atención prioritaria para urgencias",
                "Técnicos certificados y con experiencia",
                "Presupuesto honesto sin sorpresas"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-primary/10 p-1 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Nuestros Servicios" 
          subtitle="Soluciones integrales para edificios, viviendas y negocios. Más que averías, somos tu equipo técnico de confianza."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{service.title}</h3>
              <ul className="space-y-3 mb-8">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openWhatsApp(service.id as any)}
                className="inline-flex items-center text-primary font-bold text-sm hover:translate-x-2 transition-transform cursor-pointer"
              >
                Consultar ahora <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentiation = () => {
  const points = [
    { 
      title: "Atención 24 horas", 
      desc: "Disponibles los 365 días del año para cualquier emergencia urgente.",
      icon: <Clock className="w-10 h-10" />
    },
    { 
      title: "Respuesta rápida", 
      desc: "Minimizamos el tiempo de espera para que tu vida vuelva a la normalidad.",
      icon: <Zap className="w-10 h-10" />
    },
    { 
      title: "Trato cercano", 
      desc: "Somos profesionales con nombre y apellidos, transparencia total.",
      icon: <CheckCircle2 className="w-10 h-10" />
    },
    { 
      title: "Servicios integrales", 
      desc: "Un solo técnico para todas tus necesidades de mantenimiento.",
      icon: <Award className="w-10 h-10" />
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="lg:flex gap-16 items-center">
          <div className="lg:w-1/3 mb-16 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-6">
              ¿Por qué elegir <span className="text-primary italic">Márquez Instalaciones?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Hacemos que el mantenimiento de tu hogar o negocio sea sencillo, rápido y profesional.
            </p>
            <Button variant="primary" onClick={() => openWhatsApp('general')}>
              Habla con nosotros
            </Button>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
            {points.map((point, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors"
              >
                <div className="text-primary mb-4">{point.icon}</div>
                <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                <p className="text-slate-400">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle 
          title="Lo que dicen nuestros clientes" 
          subtitle="Nuestra mejor garantía es la satisfacción de quienes ya han confiado en nosotros. Servicio real con opiniones reales."
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl relative"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-slate-500 text-sm">{t.location}</p>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary font-bold text-2xl font-display">“</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
            <span className="font-bold">4.3/5 en Google My Business</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const [displayPhone, setDisplayPhone] = useState("");

  useEffect(() => {
    setDisplayPhone(atob(ENCODED_PHONE));
  }, []);

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `tel:${atob(ENCODED_PHONE)}`;
  };

  const handleWAClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openWhatsApp('general');
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      {/* Background with primary color */}
      <div className="absolute inset-0 bg-primary z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            ¿Necesitas ayuda urgente?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Estamos disponibles ahora mismo. Llama o escríbenos por WhatsApp para recibir asistencia técnica inmediata en Ciudad Real y alrededores.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={handlePhoneClick}
              aria-label={`Llamar al ${displayPhone}`}
              className="px-10 py-5 text-2xl"
              variant="secondary"
              isUrgent={true}
            >
              <Phone className="w-7 h-7 mr-3" aria-hidden="true" />
              Llamar ahora
            </Button>
            
            <Button 
              onClick={handleWAClick}
              aria-label="WhatsApp inmediato"
              className="px-10 py-5 text-2xl"
              variant="whatsapp"
              isUrgent={true}
            >
              <MessageCircle className="w-8 h-8 mr-3" aria-hidden="true" />
              WhatsApp Inmediato
            </Button>
          </div>
          
          <p className="mt-12 text-white/70 font-medium flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            Servicio profesional en Ciudad Real, Puertollano, Daimiel y provincia.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [email, setEmail] = useState("");
  
  useEffect(() => {
    setEmail(atob(ENCODED_EMAIL));
  }, []);

  return (
    <footer className="bg-slate-950 py-16 text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://raw.githubusercontent.com/websprintt/Marquez-Instalaciones/main/img/Logo.webp" 
                alt="Logo Márquez Instalaciones" 
                className="h-12 w-12 rounded-lg object-cover shadow-md"
              />
              <span className="font-display font-bold text-white text-xl">Márquez <span className="text-primary italic">Instalaciones</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Servicios urgentes de electricidad, fontanería, climatización y mantenimiento 24h en Ciudad Real. Profesionales de confianza a tu servicio.
            </p>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contacto Urgente</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">C. Azucena, 13003 <br />Ciudad Real</span>
              </div>
              <button 
                onClick={() => openWhatsApp('general')}
                className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer text-left group"
              >
                <div className="w-8 h-8 bg-[#25D366]/10 rounded-full flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="font-bold text-white">628 71 60 38</span>
              </button>
              <button 
                onClick={() => window.location.href = `mailto:${email}`}
                className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer text-left group"
              >
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                  <Thermometer className="w-4 h-4" />
                </div>
                <span className="text-sm break-all">{email || "Cargando..."}</span>
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
             <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navegación</h3>
             <ul className="space-y-3">
               <li><a href="#inicio" className="text-sm hover:text-white transition-colors">Inicio</a></li>
               <li><a href="#servicios" className="text-sm hover:text-white transition-colors">Servicios</a></li>
               <li><a href="#testimonios" className="text-sm hover:text-white transition-colors">Testimonios</a></li>
               <li><a href="#contacto" className="text-sm hover:text-white transition-colors">Contacto Urgente</a></li>
             </ul>
          </div>

          {/* Trust Elements */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Horario Servicio</h3>
            <div className="flex items-center gap-3 text-sm mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Disponible 24 Horas / 7 Días</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic">
              "Nos quedamos sin luz de madrugada y vino inmediatamente. Servicio impecable."
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Márquez Instalaciones. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <p className="font-semibold text-slate-400">Excelencia en Mantenimiento</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- App Root ---

export default function App() {
  return (
    <div className="font-sans text-slate-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <ServicesSection />
        <Differentiation />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      
      {/* Fast CTA Sticky Mobile */}
      <div className="md:hidden fixed bottom-6 left-0 w-full px-6 z-40">
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            className="flex-1 py-4 text-xs font-bold shadow-2xl" 
            onClick={() => openWhatsApp('general')}
            aria-label="Contactar por WhatsApp ahora"
            isUrgent={true}
          >
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            WHATSAPP
          </Button>
          <Button 
            variant="whatsapp" 
            className="flex-1 py-4 text-xs font-bold shadow-2xl" 
            onClick={() => openWhatsApp('general')}
            aria-label="WhatsApp urgente"
            isUrgent={true}
          >
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            URGENTE
          </Button>
        </div>
      </div>
    </div>
  );
}
