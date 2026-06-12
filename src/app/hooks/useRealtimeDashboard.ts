import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

type KpiId = 'compliance' | 'companies' | 'training' | 'pending';
type IndicatorId = 'compliance-rate' | 'training-done' | 'risk-management' | 'internal-audits';

export type DashboardKpi = {
  id: KpiId;
  icon: 'check' | 'briefcase' | 'graduation' | 'alert';
  label: string;
  value: string;
  trend: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
};

export type DashboardIndicator = {
  id: IndicatorId;
  icon: 'trending' | 'graduation' | 'shield' | 'clipboard';
  title: string;
  description: string;
  value: string;
  color: 'green' | 'blue' | 'purple' | 'cyan';
};

export type DashboardLinePoint = {
  id: string;
  month: string;
  conformidade: number;
  treinamentos: number;
};

export type DashboardRadarPoint = {
  id: string;
  subject: string;
  A: number;
  fullMark: number;
};

export type DashboardRisk = {
  id: string;
  risk: string;
  level: 'Baixo' | 'Medio' | 'Alto' | 'Critico';
  color: 'green' | 'yellow' | 'orange' | 'red';
};

export type DashboardAlert = {
  id: string;
  title: string;
  severity: 'info' | 'warning' | 'critical';
  createdAt: string;
};

export type DashboardEmployeeSummary = {
  active: number;
  trained: number;
  pendingTraining: number;
};

export type DashboardChecklistSummary = {
  completed: number;
  total: number;
  score: number;
};

export type DashboardRealtimeState = {
  kpis: DashboardKpi[];
  indicators: DashboardIndicator[];
  lineData: DashboardLinePoint[];
  radarData: DashboardRadarPoint[];
  risks: DashboardRisk[];
  alerts: DashboardAlert[];
  employees: DashboardEmployeeSummary;
  checklist: DashboardChecklistSummary;
  reports: {
    generated: number;
    pending: number;
  };
  operational: {
    openActions: number;
    overdueActions: number;
    syncedUsers: number;
  };
  updatedAt: string;
};

type RealtimeEnvelope =
  | { type: 'dashboard.snapshot'; payload: DashboardRealtimeState }
  | { type: 'dashboard.patch'; payload: Partial<DashboardRealtimeState> }
  | { type: 'indicator.updated'; payload: Partial<DashboardRealtimeState> }
  | { type: 'alert.created'; payload: DashboardAlert };

const CACHE_KEY = 'nr1.dashboard.realtime.cache';
const CHANNEL_NAME = 'nr1-dashboard-realtime';

const initialDashboardState: DashboardRealtimeState = {
  kpis: [
    { id: 'compliance', icon: 'check', label: 'Conformidade', value: '95%', trend: '+5%', color: 'green' },
    { id: 'companies', icon: 'briefcase', label: 'Empresas', value: '847', trend: '+23', color: 'blue' },
    { id: 'training', icon: 'graduation', label: 'Treinamentos', value: '1.2K', trend: '+12%', color: 'purple' },
    { id: 'pending', icon: 'alert', label: 'Pendencias', value: '23', trend: '-8', color: 'orange' },
  ],
  indicators: [
    {
      id: 'compliance-rate',
      icon: 'trending',
      title: 'Taxa de Conformidade',
      description: 'Percentual de adequacao as normas regulamentadoras e procedimentos internos de SST.',
      value: '95%',
      color: 'green',
    },
    {
      id: 'training-done',
      icon: 'graduation',
      title: 'Treinamentos Realizados',
      description: 'Capacitacoes concluidas incluindo NR-1, uso de EPIs e procedimentos de seguranca.',
      value: '1.247',
      color: 'blue',
    },
    {
      id: 'risk-management',
      icon: 'shield',
      title: 'Gestao de Riscos',
      description: 'Riscos identificados, avaliados e com medidas de controle implementadas.',
      value: '342',
      color: 'purple',
    },
    {
      id: 'internal-audits',
      icon: 'clipboard',
      title: 'Auditorias Internas',
      description: 'Inspecoes periodicas realizadas para garantir conformidade continua.',
      value: '48',
      color: 'cyan',
    },
  ],
  radarData: [
    { id: 'conformidade', subject: 'Conformidade', A: 95, fullMark: 100 },
    { id: 'treinamentos', subject: 'Treinamentos', A: 88, fullMark: 100 },
    { id: 'gestao', subject: 'Gestao de Riscos', A: 92, fullMark: 100 },
    { id: 'auditorias', subject: 'Auditorias', A: 85, fullMark: 100 },
    { id: 'prevencao', subject: 'Prevencao', A: 90, fullMark: 100 },
  ],
  lineData: [
    { id: 'jan', month: 'Jan', conformidade: 75, treinamentos: 65 },
    { id: 'fev', month: 'Fev', conformidade: 78, treinamentos: 70 },
    { id: 'mar', month: 'Mar', conformidade: 82, treinamentos: 75 },
    { id: 'abr', month: 'Abr', conformidade: 85, treinamentos: 80 },
    { id: 'mai', month: 'Mai', conformidade: 90, treinamentos: 85 },
    { id: 'jun', month: 'Jun', conformidade: 95, treinamentos: 88 },
  ],
  risks: [
    { id: 'ergonomic', risk: 'Ergonomico', level: 'Baixo', color: 'green' },
    { id: 'chemical', risk: 'Quimico', level: 'Medio', color: 'yellow' },
    { id: 'physical', risk: 'Fisico', level: 'Baixo', color: 'green' },
  ],
  alerts: [],
  employees: {
    active: 847,
    trained: 1247,
    pendingTraining: 23,
  },
  checklist: {
    completed: 376,
    total: 420,
    score: 95,
  },
  reports: {
    generated: 48,
    pending: 6,
  },
  operational: {
    openActions: 23,
    overdueActions: 8,
    syncedUsers: 12,
  },
  updatedAt: new Date().toISOString(),
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const readCachedState = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? ({ ...initialDashboardState, ...JSON.parse(cached) } as DashboardRealtimeState) : initialDashboardState;
  } catch {
    return initialDashboardState;
  }
};

const mergeState = (current: DashboardRealtimeState, patch: Partial<DashboardRealtimeState>): DashboardRealtimeState => ({
  ...current,
  ...patch,
  employees: { ...current.employees, ...patch.employees },
  checklist: { ...current.checklist, ...patch.checklist },
  reports: { ...current.reports, ...patch.reports },
  operational: { ...current.operational, ...patch.operational },
  updatedAt: patch.updatedAt ?? new Date().toISOString(),
});

const nextDemoState = (current: DashboardRealtimeState): DashboardRealtimeState => {
  const compliance = clamp(Number.parseInt(current.kpis[0].value, 10) + (Math.random() > 0.5 ? 1 : -1), 88, 99);
  const training = clamp(current.lineData[current.lineData.length - 1].treinamentos + (Math.random() > 0.35 ? 1 : -1), 82, 98);
  const pending = clamp(Number.parseInt(current.kpis[3].value, 10) + (Math.random() > 0.65 ? 1 : -1), 12, 35);
  const companies = Number.parseInt(current.kpis[1].value, 10) + (Math.random() > 0.75 ? 1 : 0);
  const reportsGenerated = current.reports.generated + (Math.random() > 0.82 ? 1 : 0);
  const criticalAlert = pending > 30 && Math.random() > 0.55;

  const alerts = criticalAlert
    ? [
        {
          id: crypto.randomUUID(),
          title: 'Pendencias criticas de NR-1 atualizadas',
          severity: 'critical' as const,
          createdAt: new Date().toISOString(),
        },
        ...current.alerts,
      ].slice(0, 5)
    : current.alerts;

  return {
    ...current,
    kpis: [
      { ...current.kpis[0], value: `${compliance}%`, trend: `${compliance >= 95 ? '+' : ''}${compliance - 90}%` },
      { ...current.kpis[1], value: String(companies), trend: `+${Math.max(1, companies - 824)}` },
      { ...current.kpis[2], value: `${(training / 73).toFixed(1)}K`, trend: `+${Math.max(1, training - 76)}%` },
      { ...current.kpis[3], value: String(pending), trend: `${pending <= 23 ? '-' : '+'}${Math.abs(pending - 31)}` },
    ],
    indicators: current.indicators.map((indicator) => {
      if (indicator.id === 'compliance-rate') return { ...indicator, value: `${compliance}%` };
      if (indicator.id === 'training-done') return { ...indicator, value: String(Math.round(training * 13.12)).replace(/\B(?=(\d{3})+(?!\d))/g, '.') };
      if (indicator.id === 'internal-audits') return { ...indicator, value: String(reportsGenerated) };
      return indicator;
    }),
    radarData: current.radarData.map((point) => {
      if (point.id === 'conformidade') return { ...point, A: compliance };
      if (point.id === 'treinamentos') return { ...point, A: training };
      return { ...point, A: clamp(point.A + (Math.random() > 0.55 ? 1 : -1), 80, 98) };
    }),
    lineData: current.lineData.map((point, index, items) =>
      index === items.length - 1 ? { ...point, conformidade: compliance, treinamentos: training } : point,
    ),
    risks: current.risks.map((risk) =>
      risk.id === 'chemical' && pending > 28 ? { ...risk, level: 'Alto', color: 'orange' } : risk.id === 'chemical' ? { ...risk, level: 'Medio', color: 'yellow' } : risk,
    ),
    alerts,
    employees: {
      active: companies,
      trained: Math.round(training * 13.12),
      pendingTraining: pending,
    },
    checklist: {
      completed: Math.round((compliance / 100) * current.checklist.total),
      total: current.checklist.total,
      score: compliance,
    },
    reports: {
      generated: reportsGenerated,
      pending: current.reports.pending,
    },
    operational: {
      openActions: pending,
      overdueActions: clamp(Math.round(pending / 3), 3, 14),
      syncedUsers: clamp(current.operational.syncedUsers + (Math.random() > 0.5 ? 1 : -1), 8, 28),
    },
    updatedAt: new Date().toISOString(),
  };
};

export function useRealtimeDashboard() {
  const [data, setData] = useState<DashboardRealtimeState>(() => readCachedState());
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(true);
  const [lastEventLabel, setLastEventLabel] = useState('Sincronizando');
  const channelRef = useRef<BroadcastChannel | null>(null);
  const tabIdRef = useRef(crypto.randomUUID());

  const websocketUrl = useMemo(() => import.meta.env.VITE_NR1_REALTIME_URL as string | undefined, []);

  useEffect(() => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    channelRef.current?.postMessage({ source: tabIdRef.current, data });
  }, [data]);

  useEffect(() => {
    const channel = 'BroadcastChannel' in window ? new BroadcastChannel(CHANNEL_NAME) : null;
    channelRef.current = channel;
    if (channel) {
      channel.onmessage = (event) => {
        if (event.data?.source === tabIdRef.current) return;
        setData(event.data.data);
        setLastEventLabel('Atualizado agora');
        setIsSyncing(false);
      };
    }

    return () => {
      channel?.close();
      channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    setIsSyncing(true);

    if (!websocketUrl) {
      setIsConnected(true);
      setIsSyncing(false);
      const timer = window.setInterval(() => {
        setData((current) => {
          const next = nextDemoState(current);
          setLastEventLabel('Atualizado agora');
          if (next.alerts[0] && next.alerts[0].id !== current.alerts[0]?.id) {
            toast.warning(next.alerts[0].title, { description: 'Dashboard sincronizado automaticamente.' });
          } else {
            toast.success('Dashboard atualizado automaticamente', { description: 'Indicadores NR-1 sincronizados.' });
          }
          return next;
        });
      }, 7000);

      return () => window.clearInterval(timer);
    }

    const socket = new WebSocket(websocketUrl);

    socket.addEventListener('open', () => {
      setIsConnected(true);
      setIsSyncing(false);
      setLastEventLabel('Online');
      socket.send(JSON.stringify({ type: 'dashboard.subscribe', topics: ['indicators', 'risks', 'reports', 'alerts', 'employees', 'checklist', 'operational'] }));
    });

    socket.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data) as RealtimeEnvelope;
        setData((current) => {
          if (message.type === 'dashboard.snapshot') return mergeState(current, message.payload);
          if (message.type === 'alert.created') return mergeState(current, { alerts: [message.payload, ...current.alerts].slice(0, 5) });
          return mergeState(current, message.payload);
        });
        setLastEventLabel('Atualizado agora');
        setIsSyncing(false);
        if (message.type === 'alert.created') {
          toast.warning(message.payload.title, { description: 'Alerta critico sincronizado em tempo real.' });
        } else {
          toast.success('Dashboard atualizado automaticamente', { description: 'Dados sincronizados sem recarregar a pagina.' });
        }
      } catch {
        setLastEventLabel('Evento ignorado');
      }
    });

    socket.addEventListener('close', () => {
      setIsConnected(false);
      setIsSyncing(false);
      setLastEventLabel('Reconectando');
    });

    socket.addEventListener('error', () => {
      setIsConnected(false);
      setIsSyncing(false);
      setLastEventLabel('Offline');
    });

    return () => socket.close();
  }, [websocketUrl]);

  return {
    data,
    isConnected,
    isSyncing,
    lastEventLabel,
  };
}
