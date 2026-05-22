import { motion } from 'motion/react';
import { Building2, TrendingUp, Award, Users } from 'lucide-react';

export function SocialProofSection() {
  const stats = [
    {
      icon: Building2,
      number: '847+',
      label: 'Empresas Ativas',
      description: 'Utilizando a plataforma diariamente',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      number: '95%',
      label: 'Conformidade Média',
      description: 'Índice de adequação à NR-1',
      color: 'green'
    },
    {
      icon: Award,
      number: '1.2K+',
      label: 'Treinamentos Realizados',
      description: 'Capacitações concluídas este mês',
      color: 'purple'
    },
    {
      icon: Users,
      number: '12K+',
      label: 'Colaboradores Protegidos',
      description: 'Trabalhadores com gestão ativa de SST',
      color: 'cyan'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Mendes',
      role: 'Gerente de SST',
      company: 'Indústria ABC',
      text: 'A plataforma transformou nossa gestão de segurança. Reduzimos acidentes em 60% e alcançamos 100% de conformidade.',
      avatar: 'CM'
    },
    {
      name: 'Ana Silva',
      role: 'Coordenadora de RH',
      company: 'TechCorp Brasil',
      text: 'Automatizamos todos os treinamentos obrigatórios. O dashboard facilita muito as auditorias e a tomada de decisão.',
      avatar: 'AS'
    },
    {
      name: 'Roberto Santos',
      role: 'Diretor Operacional',
      company: 'LogistiX Solutions',
      text: 'Implementação rápida e interface intuitiva. Nosso time adotou sem resistência e os resultados apareceram em semanas.',
      avatar: 'RS'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/10 to-blue-950/20"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/30 backdrop-blur-sm mb-6">
            <Award className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">RESULTADOS COMPROVADOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Mais de <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">800 empresas</span> confiam
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Organizações de diversos setores alcançam conformidade total e reduzem riscos com nossa plataforma
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/50 transition-all hover:shadow-xl hover:shadow-blue-500/20 text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/10 border border-${stat.color}-400/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
              </div>
              <div className={`text-4xl font-bold bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-300 bg-clip-text text-transparent mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm font-bold text-gray-200 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">O que nossos clientes dizem</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-400/30 transition-all hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-3 italic">"{testimonial.text}"</p>
              <div className="text-xs text-blue-400 font-medium">{testimonial.company}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
