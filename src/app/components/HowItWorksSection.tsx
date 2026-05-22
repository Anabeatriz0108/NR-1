import { motion } from 'motion/react';
import { LayoutDashboard, GraduationCap, BarChart3, ClipboardCheck, FileText, Bell } from 'lucide-react';

export function HowItWorksSection() {
  const features = [
    {
      icon: LayoutDashboard,
      title: 'Dashboard Inteligente',
      description: 'Visualize todos os indicadores de SST em tempo real com gráficos interativos e KPIs corporativos.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: GraduationCap,
      title: 'Gestão de Treinamentos',
      description: 'Controle capacitações obrigatórias, prazos de validade e certificados digitais de forma automatizada.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Indicadores SST',
      description: 'Monitore conformidade, riscos, auditorias e performance com métricas precisas e acionáveis.',
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: ClipboardCheck,
      title: 'Checklist NR-1',
      description: 'Avalie a conformidade da empresa com checklist inteligente e diagnóstico automático.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: FileText,
      title: 'Relatórios Automáticos',
      description: 'Gere documentos, PGR e relatórios de auditoria prontos para fiscalizações e certificações.',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Bell,
      title: 'Alertas e Notificações',
      description: 'Receba avisos automáticos sobre prazos, pendências e não conformidades antes que se tornem problemas.',
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-sm mb-6">
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300">PLATAFORMA COMPLETA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Como a <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">plataforma</span> funciona
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Solução completa e integrada para gestão de Segurança e Saúde no Trabalho
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all h-full flex flex-col">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed flex-1">
                  {feature.description}
                </p>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity -z-10`}
                  initial={false}
                />
              </div>

              {/* Number Badge */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold shadow-lg">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
