import { motion } from 'motion/react';
import { AlertTriangle, DollarSign, Clock, TrendingDown, FileX, Brain } from 'lucide-react';

export function ProblemsSection() {
  const problems = [
    {
      icon: AlertTriangle,
      title: 'Riscos Ocupacionais',
      description: 'Acidentes de trabalho não identificados e controlados comprometem a segurança dos colaboradores.',
      color: 'red'
    },
    {
      icon: DollarSign,
      title: 'Multas Trabalhistas',
      description: 'Não conformidade com NRs resulta em penalidades de até R$ 6.708,08 por irregularidade.',
      color: 'orange'
    },
    {
      icon: Clock,
      title: 'Treinamentos Vencidos',
      description: 'Capacitações desatualizadas expõem a empresa a riscos legais e operacionais.',
      color: 'yellow'
    },
    {
      icon: TrendingDown,
      title: 'Baixa Conformidade',
      description: 'Gestão inadequada de SST reduz produtividade e aumenta afastamentos.',
      color: 'blue'
    },
    {
      icon: FileX,
      title: 'Gestão Descentralizada',
      description: 'Documentos dispersos dificultam auditorias e comprometem a rastreabilidade.',
      color: 'purple'
    },
    {
      icon: Brain,
      title: 'Riscos Psicossociais',
      description: 'Falta de monitoramento de saúde mental impacta clima organizacional e resultados.',
      color: 'cyan'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-red-950/10 to-slate-950"></div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-400/30 backdrop-blur-sm mb-6">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">DESAFIOS CRÍTICOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Problemas que a <span className="bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">NR-1</span> resolve
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Empresas sem gestão adequada de SST enfrentam riscos severos que impactam resultados e compliance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-red-400/30 transition-all hover:shadow-xl hover:shadow-red-500/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${problem.color}-500/20 to-${problem.color}-600/10 border border-${problem.color}-400/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <problem.icon className={`w-6 h-6 text-${problem.color}-400`} />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-red-300 transition-colors">{problem.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
