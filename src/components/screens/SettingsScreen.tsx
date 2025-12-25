import { useState } from 'react';
import { Plus, Check, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'general' | 'providers' | 'routing' | 'api-keys' | 'appearance';

interface Provider {
  id: string;
  icon: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  costPerMToken: string;
}

interface RoutingRule {
  id: string;
  taskType: string;
  taskIcon: string;
  preferred: string;
  preferredIcon: string;
  fallback: string;
  fallbackIcon: string;
}

const providers: Provider[] = [
  { id: 'claude', icon: '🟣', name: 'Claude', status: 'online', costPerMToken: '$15/1M' },
  { id: 'antigravity', icon: '🔵', name: 'Antigravity', status: 'online', costPerMToken: '$12/1M' },
  { id: 'gemini', icon: '💎', name: 'Gemini', status: 'online', costPerMToken: '$7/1M' },
  { id: 'copilot', icon: '🐙', name: 'Copilot', status: 'degraded', costPerMToken: 'Free tier' },
];

const routingRules: RoutingRule[] = [
  { id: '1', taskType: 'Code Generation', taskIcon: '💻', preferred: 'Claude Pro', preferredIcon: '🟣', fallback: 'Antigravity', fallbackIcon: '🔵' },
  { id: '2', taskType: 'Quick Questions', taskIcon: '💬', preferred: 'Gemini Flash', preferredIcon: '💎', fallback: 'Claude', fallbackIcon: '🟣' },
  { id: '3', taskType: 'Complex Analysis', taskIcon: '📊', preferred: 'Claude Opus', preferredIcon: '🟣', fallback: 'Gemini Pro', fallbackIcon: '💎' },
  { id: '4', taskType: 'Documentation', taskIcon: '📝', preferred: 'Gemini', preferredIcon: '💎', fallback: 'Claude', fallbackIcon: '🟣' },
];

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('routing');
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [costWarn, setCostWarn] = useState(true);
  const [hardLimit, setHardLimit] = useState(false);
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border pb-2">
        {[
          { id: 'general' as Tab, label: 'General' },
          { id: 'providers' as Tab, label: 'Providers' },
          { id: 'routing' as Tab, label: 'Routing' },
          { id: 'api-keys' as Tab, label: 'API Keys' },
          { id: 'appearance' as Tab, label: 'Appearance' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-auto space-y-6">
        {/* Provider Status */}
        <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            🔌 Provider Status
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {providers.map((provider) => (
              <div key={provider.id} className="glass-card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{provider.icon}</span>
                  <span className="font-medium text-sm">{provider.name}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    provider.status === 'online' ? 'status-online' :
                    provider.status === 'degraded' ? 'status-degraded' :
                    'status-offline'
                  )} />
                  <span className={cn(
                    "text-xs capitalize",
                    provider.status === 'online' ? 'text-green-400' :
                    provider.status === 'degraded' ? 'text-yellow-400' :
                    'text-red-400'
                  )}>
                    {provider.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{provider.costPerMToken}</p>
              </div>
            ))}
          </div>
        </div>
        
        <hr className="border-border" />
        
        {/* Task-Based Routing */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              🎯 Task-Based Routing
            </h2>
            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Rule
            </button>
          </div>
          
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Task Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Model</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Fallback</th>
                </tr>
              </thead>
              <tbody>
                {routingRules.map((rule, index) => (
                  <tr key={rule.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>{rule.taskIcon}</span>
                        {rule.taskType}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>{rule.preferredIcon}</span>
                        {rule.preferred}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span>{rule.fallbackIcon}</span>
                        {rule.fallback}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <hr className="border-border" />
        
        {/* Cost Optimization */}
        <div>
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            💰 Cost Optimization
          </h2>
          <div className="glass-card p-4 space-y-3">
            {[
              { id: 'auto-switch', label: 'Auto-switch to cheaper model for simple tasks', checked: autoSwitch, onChange: setAutoSwitch },
              { id: 'cost-warn', label: 'Warn when estimated cost > $5', checked: costWarn, onChange: setCostWarn },
              { id: 'hard-limit', label: 'Hard limit at $10/day', checked: hardLimit, onChange: setHardLimit },
            ].map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => option.onChange(!option.checked)}
              >
                <div className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                  option.checked 
                    ? "bg-primary border-primary" 
                    : "border-muted-foreground group-hover:border-primary"
                )}>
                  {option.checked && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
        <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
