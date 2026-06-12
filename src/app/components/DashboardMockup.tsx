import { motion } from 'motion/react';
import { TrendingUp, Users, CheckCircle, AlertTriangle, Activity, BarChart3 } from 'lucide-react';
import type { DashboardRealtimeState } from '../hooks/useRealtimeDashboard';

type DashboardMockupProps = {
  data: DashboardRealtimeState;
  isConnected: boolean;
  isSyncing: boolean;
  lastEventLabel: string;
};

export function DashboardMockup({ data, isConnected, isSyncing, lastEventLabel }: DashboardMockupProps) {
  const complianceKpi = data.kpis.find((kpi) => kpi.id === 'compliance') ?? data.kpis[0];
  const companiesKpi = data.kpis.find((kpi) => kpi.id === 'companies') ?? data.kpis[1];
  const trainingKpi = data.kpis.find((kpi) => kpi.id === 'training') ?? data.kpis[2];
  const sparkline = data.lineData.map((point) => Math.max(2, Math.round(point.conformidade / 10)));
  const trainingBars = data.lineData.map((point) => point.treinamentos);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Main Container */}
      <div className="relative rounded-2xl overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-400/20 shadow-2xl shadow-blue-500/20">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 backdrop-blur-sm bg-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
              </div>
              <span className="ml-4 text-xs text-gray-400 font-mono">portal-nr1.app/dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></div>
              <span className="text-xs text-gray-400">{isConnected ? 'Online' : 'Reconectando'}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6 space-y-4">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-xs text-green-400">{complianceKpi.trend}</span>
              </div>
              <motion.div key={complianceKpi.value} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-green-400">
                {complianceKpi.value}
              </motion.div>
              <div className="text-xs text-gray-400 mt-1">Conformidade</div>
              {/* Mini Sparkline */}
              <div className="flex items-end gap-0.5 mt-2 h-6">
                {sparkline.map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height * 10}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex-1 bg-green-400/60 rounded-sm"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-xs text-blue-400">{companiesKpi.trend}</span>
              </div>
              <motion.div key={companiesKpi.value} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-blue-400">
                {companiesKpi.value}
              </motion.div>
              <div className="text-xs text-gray-400 mt-1">Empresas Ativas</div>
              {/* Progress Bar */}
              <div className="mt-2 h-1.5 bg-blue-950/50 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, Math.round((data.employees.active / 1000) * 100))}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-400/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-medium text-gray-300">Treinamentos Realizados</span>
              </div>
              <span className="text-xs text-purple-400">{trainingKpi.trend} mes</span>
            </div>

            {/* Animated Chart Bars */}
            <div className="flex items-end justify-between gap-2 h-24">
              {trainingBars.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ y: ["100%", "-100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent"
                    />
                  </motion.div>
                  <div className="w-1 h-1 rounded-full bg-purple-400/50"></div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-2 text-[10px] text-gray-500">
              {data.lineData.map((point) => (
                <span key={point.id}>{point.month}</span>
              ))}
            </div>
          </motion.div>

          {/* Risk Map / Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-400/20 backdrop-blur-sm space-y-2"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-medium text-gray-300">Mapa de Riscos</span>
              </div>
              <BarChart3 className="w-4 h-4 text-cyan-400/60" />
            </div>

            {/* Risk Items */}
            {data.risks.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${item.color}-400`}></div>
                  <span className="text-xs text-gray-300">{item.risk}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${item.color}-500/20 text-${item.color}-400 border border-${item.color}-400/30`}>
                  {item.level}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/5"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-gray-400">{isSyncing ? 'Sincronizando' : lastEventLabel}</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 h-1 rounded-full bg-blue-400"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glow Effects */}
      <div className="absolute -z-10 top-1/4 -right-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 -left-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-xl border border-blue-400/30 shadow-xl shadow-blue-500/30"
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -left-4 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-cyan-500/30 backdrop-blur-xl border border-purple-400/30 shadow-xl shadow-purple-500/30"
      />
    </motion.div>
  );
}
