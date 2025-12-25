import { useState } from 'react';
import { BarChart3, Hash, DollarSign, TrendingUp, TrendingDown, Clock, ChefHat, Lightbulb, Code2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimeRange = 'today' | 'week' | 'month' | 'custom';

interface UsageRecord {
  time: string;
  command: string;
  provider: string;
  providerIcon: string;
  tokens: string;
  cost: string;
}

const usageData: UsageRecord[] = [
  { time: '10:30 AM', command: '/cook', provider: 'Claude', providerIcon: '🟣', tokens: '15.2k', cost: '$0.45' },
  { time: '10:15 AM', command: '/brainstorm', provider: 'Antigravity', providerIcon: '🔵', tokens: '8.5k', cost: '$0.25' },
  { time: '09:45 AM', command: '/code', provider: 'Claude', providerIcon: '🟣', tokens: '32.1k', cost: '$0.96' },
];

const chartData = [
  { day: 'M', value: 40 },
  { day: 'T', value: 65 },
  { day: 'W', value: 55 },
  { day: 'T', value: 80 },
  { day: 'F', value: 45 },
  { day: 'S', value: 70 },
  { day: 'S', value: 60 },
  { day: 'M', value: 75 },
  { day: 'T', value: 50 },
  { day: 'W', value: 85 },
];

const providerBreakdown = [
  { name: 'Claude', icon: '🟣', percent: 45, color: 'bg-claude' },
  { name: 'Antigravity', icon: '🔵', percent: 30, color: 'bg-antigravity' },
  { name: 'Gemini', icon: '💎', percent: 25, color: 'bg-gemini' },
];

export function UsageScreen() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[
            { id: 'today' as TimeRange, label: 'Today' },
            { id: 'week' as TimeRange, label: 'This Week' },
            { id: 'month' as TimeRange, label: 'This Month' },
            { id: 'custom' as TimeRange, label: 'Custom...' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                timeRange === range.id
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          Dec 2024
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: BarChart3, label: 'Requests', value: '1,234', change: '+12%', trend: 'up' },
          { icon: Hash, label: 'Tokens', value: '2.5M', change: '+8%', trend: 'up' },
          { icon: DollarSign, label: 'Cost', value: '$45.67', change: '-5%', trend: 'down' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Icon className="w-4 h-4" />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-semibold mb-1">{stat.value}</p>
              <div className={cn(
                "flex items-center gap-1 text-xs",
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              )}>
                {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change} vs last
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        {/* Usage Over Time */}
        <div className="col-span-2 glass-card p-4">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            📈 Usage Over Time
          </h2>
          <div className="h-40 flex items-end gap-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-primary/80 rounded-t transition-all hover:bg-primary"
                  style={{ height: `${item.value}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Provider Breakdown */}
        <div className="glass-card p-4">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            🍩 Provider Breakdown
          </h2>
          
          {/* Donut visualization (simplified) */}
          <div className="flex justify-center mb-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {providerBreakdown.reduce((acc, provider, index) => {
                  const offset = acc.offset;
                  const strokeDasharray = `${provider.percent * 2.51327} ${251.327 - provider.percent * 2.51327}`;
                  acc.elements.push(
                    <circle
                      key={provider.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      strokeWidth="20"
                      className={cn(
                        index === 0 ? 'stroke-claude' :
                        index === 1 ? 'stroke-antigravity' : 'stroke-gemini'
                      )}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={-offset * 2.51327}
                    />
                  );
                  acc.offset += provider.percent;
                  return acc;
                }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            {providerBreakdown.map((provider) => (
              <div key={provider.name} className="flex items-center gap-2 text-sm">
                <span>{provider.icon}</span>
                <span className="flex-1">{provider.name}</span>
                <span className="text-muted-foreground">{provider.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Activity Table */}
      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          📋 Recent Activity
        </h2>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Command</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Provider</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tokens</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cost</th>
              </tr>
            </thead>
            <tbody>
              {usageData.map((record, index) => (
                <tr 
                  key={index} 
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-3 text-sm text-muted-foreground">{record.time}</td>
                  <td className="py-3 text-sm font-mono">
                    <span className="flex items-center gap-2">
                      {record.command === '/cook' && <ChefHat className="w-4 h-4 text-orange-400" />}
                      {record.command === '/brainstorm' && <Lightbulb className="w-4 h-4 text-yellow-400" />}
                      {record.command === '/code' && <Code2 className="w-4 h-4 text-cyan-400" />}
                      {record.command}
                    </span>
                  </td>
                  <td className="py-3 text-sm">
                    <span className="flex items-center gap-2">
                      <span>{record.providerIcon}</span>
                      {record.provider}
                    </span>
                  </td>
                  <td className="py-3 text-sm">{record.tokens}</td>
                  <td className="py-3 text-sm">{record.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
