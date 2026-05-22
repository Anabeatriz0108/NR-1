import { useEffect, useState } from 'react';
import {
  Shield,
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Award,
  Target,
  Menu,
  X,
  ArrowRight,
  Briefcase,
  ClipboardCheck,
  BookOpen,
  Activity,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Import new components
import { DashboardMockup } from './components/DashboardMockup';
import { ProblemsSection } from './components/ProblemsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SocialProofSection } from './components/SocialProofSection';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { VoiceAssistant } from './components/VoiceAssistant';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Checklist states
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', company: '', email: '', phone: '' });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      setScrollY(scrollPosition);

      const sections = ['inicio', 'sobre', 'blog', 'dashboard', 'indicadores', 'beneficios', 'contato'];
      const adjustedPosition = scrollPosition + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (adjustedPosition >= offsetTop && adjustedPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const radarData = [
    { id: 'conformidade', subject: 'Conformidade', A: 95, fullMark: 100 },
    { id: 'treinamentos', subject: 'Treinamentos', A: 88, fullMark: 100 },
    { id: 'gestao', subject: 'Gestão de Riscos', A: 92, fullMark: 100 },
    { id: 'auditorias', subject: 'Auditorias', A: 85, fullMark: 100 },
    { id: 'prevencao', subject: 'Prevenção', A: 90, fullMark: 100 },
  ];

  const lineData = [
    { id: 'jan', month: 'Jan', conformidade: 75, treinamentos: 65 },
    { id: 'fev', month: 'Fev', conformidade: 78, treinamentos: 70 },
    { id: 'mar', month: 'Mar', conformidade: 82, treinamentos: 75 },
    { id: 'abr', month: 'Abr', conformidade: 85, treinamentos: 80 },
    { id: 'mai', month: 'Mai', conformidade: 90, treinamentos: 85 },
    { id: 'jun', month: 'Jun', conformidade: 95, treinamentos: 88 },
  ];

  const checklistQuestions = [
    { id: 0, question: 'Sua empresa possui PGR (Programa de Gerenciamento de Riscos) implementado?', category: 'Documentação' },
    { id: 1, question: 'Os treinamentos obrigatórios da NR-1 estão atualizados?', category: 'Treinamento' },
    { id: 2, question: 'Existe gerenciamento de riscos ocupacionais formalizado?', category: 'Gestão' },
    { id: 3, question: 'Os colaboradores recebem capacitação periódica em SST?', category: 'Treinamento' },
    { id: 4, question: 'A empresa realiza auditorias internas de segurança?', category: 'Auditoria' },
    { id: 5, question: 'Há documentação de SST organizada e acessível?', category: 'Documentação' },
    { id: 6, question: 'Os riscos ocupacionais são monitorados continuamente?', category: 'Gestão' },
    { id: 7, question: 'Existe plano de ação preventivo documentado?', category: 'Prevenção' },
  ];

  const calculateScore = () => {
    const totalQuestions = checklistQuestions.length;
    const positiveAnswers = Object.values(answers).filter(Boolean).length;
    return Math.round((positiveAnswers / totalQuestions) * 100);
  };

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { level: 'Excelente', color: 'green', message: 'Sua empresa está em alto nível de conformidade!' };
    if (score >= 70) return { level: 'Bom', color: 'blue', message: 'Boa gestão, mas há pontos de melhoria.' };
    if (score >= 50) return { level: 'Regular', color: 'yellow', message: 'Atenção! Necessário melhorias urgentes.' };
    return { level: 'Crítico', color: 'red', message: 'Situação crítica! Ação imediata necessária.' };
  };

  const handleAnswer = (answer: boolean) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < checklistQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowLeadForm(true), 500);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLeadForm(false);
    setShowResults(true);
  };

  const resetChecklist = () => {
    setIsChecklistOpen(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowLeadForm(false);
    setShowResults(false);
    setLeadData({ name: '', company: '', email: '', phone: '' });
  };

  const score = calculateScore();
  const scoreLevel = getScoreLevel(score);
  const scoreRadarData = [
    { id: 'doc', subject: 'Documentação', score: Object.entries(answers).filter(([k, v]) => v && [0, 5].includes(Number(k))).length / 2 * 100 },
    { id: 'train', subject: 'Treinamento', score: Object.entries(answers).filter(([k, v]) => v && [1, 3].includes(Number(k))).length / 2 * 100 },
    { id: 'gest', subject: 'Gestão', score: Object.entries(answers).filter(([k, v]) => v && [2, 6].includes(Number(k))).length / 2 * 100 },
    { id: 'audit', subject: 'Auditoria', score: Object.entries(answers).filter(([k, v]) => v && [4].includes(Number(k))).length / 1 * 100 },
    { id: 'prev', subject: 'Prevenção', score: Object.entries(answers).filter(([k, v]) => v && [7].includes(Number(k))).length / 1 * 100 },
  ];

  return (
    <AccessibilityProvider>
      {/* Skip to Main Content */}
      <a href="#main-content" className="skip-to-main">
        Pular para o conteúdo principal
      </a>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden" id="main-content">
      {/* Header */}
      <header
        role="banner"
        aria-label="Cabeçalho principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-2xl bg-slate-950/90 border-b border-blue-500/30 shadow-xl shadow-blue-500/5'
            : 'backdrop-blur-xl bg-slate-950/60 border-b border-blue-500/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-2" role="img" aria-label="Logo Portal NR-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                Portal NR-1
              </span>
            </div>

            <nav role="navigation" aria-label="Navegação principal" className="hidden lg:flex items-center gap-6">
              {['inicio', 'sobre', 'blog', 'dashboard', 'indicadores', 'beneficios', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  aria-current={activeSection === item ? 'page' : undefined}
                  aria-label={`Navegar para ${item === 'inicio' ? 'início' : item === 'sobre' ? 'sobre a NR-1' : item === 'beneficios' ? 'benefícios' : item}`}
                  className={`capitalize transition-all relative group ${
                    activeSection === item
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item === 'inicio' ? 'Início' : item === 'sobre' ? 'Sobre a NR-1' : item === 'beneficios' ? 'Benefícios' : item}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all ${
                      activeSection === item ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('dashboard')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Acessar Sistema</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </motion.button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden backdrop-blur-xl bg-slate-950/95 border-t border-blue-500/20"
          >
            <div className="px-4 py-4 space-y-3">
              {['inicio', 'sobre', 'blog', 'dashboard', 'indicadores', 'beneficios', 'contato'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 rounded-lg capitalize hover:bg-white/10 transition-colors"
                >
                  {item === 'inicio' ? 'Início' : item === 'sobre' ? 'Sobre a NR-1' : item === 'beneficios' ? 'Benefícios' : item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('dashboard')}
                className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/50"
              >
                Acessar Sistema
              </button>
              <button
                onClick={() => {
                  setIsChecklistOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Avaliar Minha Empresa
              </button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" role="main" aria-label="Seção principal - Hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-1/4 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-blue-400/20 blur-sm"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-1/3 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-400/20 blur-sm"
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 backdrop-blur-xl mb-6 shadow-lg shadow-blue-500/10"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-lg shadow-blue-400/50"></div>
                <span className="text-sm text-blue-300 font-medium">PLATAFORMA CORPORATIVA NR-1</span>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1]">
                Gestão Inteligente da{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent inline-block">
                  NR-1
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-200 mb-4 leading-relaxed font-medium">
                Centralize treinamentos, indicadores, avaliações e riscos ocupacionais em uma única plataforma corporativa.
              </p>

              <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed">
                Reduza riscos, aumente a conformidade e modernize a gestão de SST da sua empresa com tecnologia enterprise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('dashboard')}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-500/40 hover:shadow-blue-400/60 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <Zap className="w-5 h-5 relative z-10" />
                  <span className="font-bold relative z-10">Ver Dashboard</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('sobre')}
                  className="group px-8 py-4 rounded-xl border-2 border-blue-400/40 hover:border-blue-400 backdrop-blur-xl bg-blue-500/5 hover:bg-blue-500/10 transition-all shadow-lg hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-bold">Conhecer a NR-1</span>
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChecklistOpen(true)}
                className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all shadow-xl shadow-purple-500/40 hover:shadow-purple-400/60 flex items-center justify-center gap-3 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles className="w-5 h-5 animate-pulse relative z-10" />
                <span className="font-bold relative z-10">Avaliar Minha Empresa Gratuitamente</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-4 mt-8 text-sm text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Resultado imediato</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Dashboard Mockup */}
            <DashboardMockup />
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <ProblemsSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Social Proof */}
      <SocialProofSection />

      {/* Sobre a NR-1 */}
      <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Sobre a <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">NR-1</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              A Norma Regulamentadora nº 1 estabelece disposições gerais sobre Segurança e Saúde no Trabalho, incluindo o Gerenciamento de Riscos Ocupacionais (GRO) e o Programa de Gerenciamento de Riscos (PGR).
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'O que é a NR-1',
                description: 'Norma Regulamentadora que estabelece diretrizes gerais de Segurança e Saúde no Trabalho, aplicável a todos os empregadores e trabalhadores.',
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                icon: Target,
                title: 'GRO - Gerenciamento de Riscos',
                description: 'Sistema de gestão que identifica perigos, avalia e controla riscos ocupacionais, garantindo ambientes de trabalho seguros.',
                gradient: 'from-purple-500 to-purple-600'
              },
              {
                icon: FileText,
                title: 'PGR - Programa de Gerenciamento',
                description: 'Documento que consolida as ações de prevenção, controles e planos de ação para gestão de riscos ocupacionais da empresa.',
                gradient: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: GraduationCap,
                title: 'Capacitação',
                description: 'Treinamentos obrigatórios para conscientização sobre riscos, procedimentos de segurança e uso correto de EPIs.',
                gradient: 'from-green-500 to-green-600'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all hover:transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog NR-1 */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/10 to-slate-950"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 backdrop-blur-sm mb-6">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">CONTEÚDO ESPECIALIZADO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Blog <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">NR-1</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Conteúdos educativos sobre segurança do trabalho, conformidade e gestão de riscos ocupacionais
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'O que mudou na NR-1 recentemente',
                image: 'https://images.unsplash.com/photo-1769490314439-dc41e69258ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3MDA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                summary: 'Entenda as principais mudanças na Norma Regulamentadora 1, incluindo novos requisitos para GRO e PGR, prazos de implementação e impactos para empresas de diferentes portes.',
                category: 'Atualização'
              },
              {
                title: 'Entendendo o GRO na prática',
                image: 'https://images.unsplash.com/photo-1776875479148-e51ea920282c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb3Jwb3JhdGUlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3MDA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                summary: 'O Gerenciamento de Riscos Ocupacionais é fundamental para ambientes seguros. Aprenda a identificar perigos, avaliar riscos e implementar medidas de controle eficazes.',
                category: 'Gestão'
              },
              {
                title: 'Capacitação e treinamentos obrigatórios',
                image: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb3Jwb3JhdGUlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3MDA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                summary: 'Conheça os treinamentos exigidos pela NR-1, periodicidade, conteúdo programático e como estruturar um programa de capacitação completo para sua equipe.',
                category: 'Treinamento'
              },
              {
                title: 'Gerenciamento eficaz de riscos ocupacionais',
                image: 'https://images.unsplash.com/photo-1737574994780-e31827afaed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxjb3Jwb3JhdGUlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3MDA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                summary: 'Estratégias comprovadas para identificar, avaliar e mitigar riscos no ambiente de trabalho. Utilize ferramentas modernas e metodologias que garantem conformidade.',
                category: 'Prevenção'
              },
              {
                title: 'Segurança ocupacional: cultura de prevenção',
                image: 'https://images.unsplash.com/photo-1776875097847-49bd9bcf1eca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3MDA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                summary: 'Construir uma cultura de segurança sólida reduz acidentes e aumenta a produtividade. Descubra como engajar colaboradores e lideranças nessa transformação.',
                category: 'Cultura'
              },
              {
                title: 'Conformidade empresarial: evite multas',
                image: 'https://images.unsplash.com/photo-1769490314439-dc41e69258ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb3Jwb3JhdGUlMjBkYXNoYm9hcmQlMjB0ZWNobm9sb2d5JTIwYmx1ZSUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzg3MDA5ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
                summary: 'Manter-se em conformidade com a NR-1 evita penalidades e processos trabalhistas. Veja um checklist completo de requisitos e prazos de adequação.',
                category: 'Compliance'
              }
            ].map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-sm text-white shadow-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3">{article.summary}</p>
                  <button className="flex items-center gap-2 text-blue-400 hover:gap-3 transition-all font-medium group/btn">
                    <span>Ler mais</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Dashboard <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Corporativo</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Visualize indicadores em tempo real e tome decisões baseadas em dados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { icon: CheckCircle, label: 'Conformidade', value: '95%', trend: '+5%', color: 'green' },
              { icon: Briefcase, label: 'Empresas', value: '847', trend: '+23', color: 'blue' },
              { icon: GraduationCap, label: 'Treinamentos', value: '1.2K', trend: '+12%', color: 'purple' },
              { icon: AlertTriangle, label: 'Pendências', value: '23', trend: '-8', color: 'orange' }
            ].map((kpi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${kpi.color}-500 to-${kpi.color}-600 flex items-center justify-center shadow-lg`}>
                    <kpi.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm ${kpi.trend.startsWith('+') ? 'text-green-400' : 'text-orange-400'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-400">{kpi.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                Evolução de Indicadores
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="id" stroke="#9ca3af" tickFormatter={(value) => lineData.find(d => d.id === value)?.month || value} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)'
                    }}
                    labelFormatter={(value) => lineData.find(d => d.id === value)?.month || value}
                  />
                  <Legend />
                  <Line key="conformidade-line" type="monotone" dataKey="conformidade" stroke="#3b82f6" strokeWidth={3} name="Conformidade %" />
                  <Line key="treinamentos-line" type="monotone" dataKey="treinamentos" stroke="#a855f7" strokeWidth={3} name="Treinamentos %" />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                Radar de Conformidade
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="id" stroke="#9ca3af" tickFormatter={(value) => radarData.find(d => d.id === value)?.subject || value} />
                  <PolarRadiusAxis stroke="#9ca3af" />
                  <Radar key="performance-radar" name="Performance" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Indicadores */}
      <section id="indicadores" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Indicadores <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Corporativos</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Métricas essenciais para gestão eficaz de segurança do trabalho
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: TrendingUp,
                title: 'Taxa de Conformidade',
                description: 'Percentual de adequação às normas regulamentadoras e procedimentos internos de SST.',
                value: '95%',
                color: 'green'
              },
              {
                icon: GraduationCap,
                title: 'Treinamentos Realizados',
                description: 'Capacitações concluídas incluindo NR-1, uso de EPIs e procedimentos de segurança.',
                value: '1.247',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Gestão de Riscos',
                description: 'Riscos identificados, avaliados e com medidas de controle implementadas.',
                value: '342',
                color: 'purple'
              },
              {
                icon: ClipboardCheck,
                title: 'Auditorias Internas',
                description: 'Inspeções periódicas realizadas para garantir conformidade contínua.',
                value: '48',
                color: 'cyan'
              }
            ].map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${indicator.color}-500 to-${indicator.color}-600 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <indicator.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {indicator.value}
                </div>
                <h3 className="text-lg font-bold mb-3">{indicator.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{indicator.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950/30 via-blue-950/30 to-cyan-950/30"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-blue-400/30 shadow-2xl shadow-blue-500/20 relative overflow-hidden group hover:border-blue-400/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
                <span className="text-sm text-purple-200 font-medium">AVALIAÇÃO GRATUITA</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Sua empresa está em{' '}
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  conformidade?
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Responda 8 perguntas rápidas e descubra o nível de conformidade da sua empresa com a NR-1. Receba um diagnóstico completo com score personalizado e recomendações exclusivas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Avaliação em 3 minutos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Resultado imediato</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>100% gratuito</span>
                </div>
              </div>

              <button
                onClick={() => setIsChecklistOpen(true)}
                className="group px-10 py-5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all shadow-2xl shadow-purple-500/40 hover:shadow-purple-400/60 transform hover:scale-105 inline-flex items-center gap-3 text-lg font-bold relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles className="w-6 h-6 animate-pulse relative z-10" />
                <span className="relative z-10">Iniciar Avaliação Gratuita</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 backdrop-blur-sm mb-6">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">VANTAGENS COMPETITIVAS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Benefícios da <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Plataforma</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Transforme a gestão de SST com tecnologia enterprise e inteligência corporativa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Redução de Acidentes',
                description: 'Identificação proativa de riscos e implementação de medidas preventivas reduzem acidentes de trabalho em até 70%.',
              },
              {
                icon: CheckCircle,
                title: 'Conformidade Legal',
                description: 'Mantenha-se sempre em conformidade com NRs e legislação trabalhista, evitando multas e processos.',
              },
              {
                icon: BookOpen,
                title: 'Organização Digital',
                description: 'Centralize documentos, treinamentos e registros em uma plataforma segura e acessível.',
              },
              {
                icon: TrendingUp,
                title: 'Tomada de Decisão',
                description: 'Dashboards e relatórios em tempo real fornecem insights para decisões estratégicas baseadas em dados.',
              },
              {
                icon: Award,
                title: 'Prevenção de Riscos',
                description: 'Sistema inteligente de GRO identifica, avalia e controla riscos antes que se tornem problemas.',
              },
              {
                icon: Activity,
                title: 'Produtividade Corporativa',
                description: 'Ambientes seguros aumentam a produtividade, reduzem afastamentos e melhoram o clima organizacional.',
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all hover:shadow-xl hover:shadow-blue-500/20 hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/50 transition-shadow">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-purple-950/40 to-cyan-950/40"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg1OSwgMTMwLCAyNDYsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-400/30 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-sm text-green-300 font-medium">AVALIAÇÃO GRATUITA</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Faça agora uma avaliação{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                gratuita
              </span>
              {' '}da sua empresa
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Descubra em 3 minutos o nível de conformidade da sua empresa com a NR-1. Receba um diagnóstico completo com recomendações personalizadas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChecklistOpen(true)}
                className="group px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 transition-all shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 flex items-center gap-3 text-lg font-bold relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Sparkles className="w-6 h-6 animate-pulse relative z-10" />
                <span className="relative z-10">Começar Avaliação Gratuita</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform relative z-10" />
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Resultado em 3 minutos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Diagnóstico completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Recomendações personalizadas</span>
              </div>
            </div>
          </motion.div>

          {/* Glow Effects */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950/20"></div>
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Fale com Nossa <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Equipe</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Agende uma demonstração gratuita e descubra como nossa plataforma pode transformar a gestão de SST da sua empresa.
            </p>
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-400/50 transform hover:scale-105">
              Solicitar Demonstração
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10"
          >
            <form className="space-y-6" aria-label="Formulário de contato">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm mb-2 text-gray-300">Nome Completo</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Seu nome"
                    aria-label="Nome completo"
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm mb-2 text-gray-300">E-mail Corporativo</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    aria-label="E-mail corporativo"
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2 text-gray-300">Empresa</label>
                  <input
                    type="text"
                    placeholder="Nome da empresa"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-gray-300">Telefone</label>
                  <input
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-300">Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="Como podemos ajudar?"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-400/50 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Enviar Mensagem
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Button */}
      {!isChecklistOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsChecklistOpen(true)}
          className="group fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/70 transform hover:scale-110 transition-all flex items-center gap-2 text-sm sm:text-base font-bold"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span className="hidden sm:inline">Avaliar Empresa</span>
          <span className="sm:hidden">Avaliar</span>
        </motion.button>
      )}

      {/* Checklist Modal */}
      <AnimatePresence>
        {isChecklistOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
            onClick={(e) => {
              if (e.target === e.currentTarget && !showLeadForm && !showResults) {
                resetChecklist();
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-3xl backdrop-blur-2xl bg-gradient-to-br from-slate-900/95 to-blue-950/95 border border-blue-400/30 shadow-2xl shadow-blue-500/20"
            >
              {!showLeadForm && !showResults && (
                <button
                  onClick={resetChecklist}
                  className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>
              )}

              {/* Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                    <ClipboardCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Checklist de Conformidade NR-1</h3>
                    <p className="text-gray-400">Avaliação rápida da sua empresa</p>
                  </div>
                </div>

                {!showLeadForm && !showResults && (
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Progresso</span>
                      <span>{Object.keys(answers).length} de {checklistQuestions.length}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(Object.keys(answers).length / checklistQuestions.length) * 100}%` }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Questions */}
              {!showLeadForm && !showResults && (
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
                          {checklistQuestions[currentQuestion].category}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-bold mb-2">
                          Pergunta {currentQuestion + 1} de {checklistQuestions.length}
                        </h4>
                        <p className="text-lg text-gray-300 leading-relaxed">
                          {checklistQuestions[currentQuestion].question}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-8">
                        <button
                          onClick={() => handleAnswer(true)}
                          className="group p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-400/30 hover:border-green-400 hover:from-green-500/30 hover:to-green-600/20 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/30"
                        >
                          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <span className="text-lg font-bold block">Sim</span>
                        </button>

                        <button
                          onClick={() => handleAnswer(false)}
                          className="group p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-400/30 hover:border-red-400 hover:from-red-500/30 hover:to-red-600/20 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/30"
                        >
                          <X className="w-12 h-12 text-red-400 mx-auto mb-3" />
                          <span className="text-lg font-bold block">Não</span>
                        </button>
                      </div>

                      {currentQuestion > 0 && (
                        <button
                          onClick={() => setCurrentQuestion(currentQuestion - 1)}
                          className="mt-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Voltar
                        </button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Lead Form */}
              {showLeadForm && !showResults && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8"
                >
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-500/50">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold mb-3">
                      Seu diagnóstico NR-1 foi gerado com sucesso!
                    </h4>
                    <p className="text-lg text-gray-300">
                      Cadastre-se para desbloquear o resultado completo da análise da sua empresa
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="max-w-xl mx-auto space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-300">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          value={leadData.name}
                          onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                          placeholder="Seu nome"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-gray-300">Empresa *</label>
                        <input
                          type="text"
                          required
                          value={leadData.company}
                          onChange={(e) => setLeadData({ ...leadData, company: e.target.value })}
                          placeholder="Nome da empresa"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2 text-gray-300">E-mail Corporativo *</label>
                        <input
                          type="email"
                          required
                          value={leadData.email}
                          onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                          placeholder="seu@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2 text-gray-300">Telefone *</label>
                        <input
                          type="tel"
                          required
                          value={leadData.phone}
                          onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-400/50 transform hover:scale-105 flex items-center justify-center gap-2 text-lg font-bold"
                    >
                      Ver Meu Resultado
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Results */}
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8"
                >
                  <div className="text-center mb-8">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br from-${scoreLevel.color}-500 to-${scoreLevel.color}-600 flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-${scoreLevel.color}-500/50`}>
                      <span className="text-3xl font-bold">{score}%</span>
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-bold mb-2">
                      Nível de Conformidade: <span className={`text-${scoreLevel.color}-400`}>{scoreLevel.level}</span>
                    </h4>
                    <p className="text-lg text-gray-300">{scoreLevel.message}</p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10">
                      <h5 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-400" />
                        Análise por Categoria
                      </h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={scoreRadarData}>
                          <PolarGrid stroke="rgba(255,255,255,0.1)" />
                          <PolarAngleAxis dataKey="id" stroke="#9ca3af" style={{ fontSize: '12px' }} tickFormatter={(value) => scoreRadarData.find(d => d.id === value)?.subject || value} />
                          <PolarRadiusAxis stroke="#9ca3af" />
                          <Radar key="score-radar" name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10">
                        <h5 className="text-lg font-bold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          Pontos Fortes
                        </h5>
                        <ul className="space-y-2 text-sm text-gray-300">
                          {Object.entries(answers)
                            .filter(([_, value]) => value)
                            .slice(0, 3)
                            .map(([key]) => (
                              <li key={key} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{checklistQuestions[Number(key)].category}</span>
                              </li>
                            ))}
                        </ul>
                      </div>

                      <div className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10">
                        <h5 className="text-lg font-bold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-orange-400" />
                          Pontos de Atenção
                        </h5>
                        <ul className="space-y-2 text-sm text-gray-300">
                          {Object.entries(answers)
                            .filter(([_, value]) => !value)
                            .slice(0, 3)
                            .map(([key]) => (
                              <li key={key} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                                <span>{checklistQuestions[Number(key)].category}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-6">
                    <h5 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      Próximos Passos para 100% de Conformidade
                    </h5>
                    <ul className="space-y-3 text-sm text-gray-200">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <span>Implementar PGR completo com identificação e avaliação de todos os riscos ocupacionais</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <span>Estabelecer calendário de treinamentos obrigatórios com registro digital</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <span>Criar sistema de monitoramento contínuo de riscos e indicadores de SST</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <span>Agendar auditorias internas trimestrais para garantir conformidade contínua</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => {
                        resetChecklist();
                        scrollToSection('contato');
                      }}
                      className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-400/50 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Falar com Especialista
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={resetChecklist}
                      className="flex-1 px-8 py-4 rounded-xl border-2 border-white/10 hover:border-blue-400 backdrop-blur-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                    >
                      Nova Avaliação
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility Components */}
      <AccessibilityPanel />
      <VoiceAssistant />

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 backdrop-blur-xl bg-slate-950/80">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-shadow">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent block">
                  Portal NR-1
                </span>
                <span className="text-xs text-gray-500">Plataforma Corporativa SST</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Suporte</a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 Portal NR-1
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </AccessibilityProvider>
  );
}
