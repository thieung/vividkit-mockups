import { useState } from 'react';
import { Plus, Check, Save, X, Sun, Moon, Monitor, Key, Eye, EyeOff, Trash2, Copy, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type Tab = 'general' | 'providers' | 'routing' | 'api-keys' | 'appearance';

interface Provider {
  id: string;
  icon: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  costPerMToken: string;
  enabled: boolean;
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

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

const initialProviders: Provider[] = [
  { id: 'claude', icon: '🟣', name: 'Claude', status: 'online', costPerMToken: '$15/1M', enabled: true },
  { id: 'antigravity', icon: '🔵', name: 'Antigravity', status: 'online', costPerMToken: '$12/1M', enabled: true },
  { id: 'gemini', icon: '💎', name: 'Gemini', status: 'online', costPerMToken: '$7/1M', enabled: true },
  { id: 'copilot', icon: '🐙', name: 'Copilot', status: 'degraded', costPerMToken: 'Free tier', enabled: false },
];

const routingRules: RoutingRule[] = [
  { id: '1', taskType: 'Code Generation', taskIcon: '💻', preferred: 'Claude Pro', preferredIcon: '🟣', fallback: 'Antigravity', fallbackIcon: '🔵' },
  { id: '2', taskType: 'Quick Questions', taskIcon: '💬', preferred: 'Gemini Flash', preferredIcon: '💎', fallback: 'Claude', fallbackIcon: '🟣' },
  { id: '3', taskType: 'Complex Analysis', taskIcon: '📊', preferred: 'Claude Opus', preferredIcon: '🟣', fallback: 'Gemini Pro', fallbackIcon: '💎' },
  { id: '4', taskType: 'Documentation', taskIcon: '📝', preferred: 'Gemini', preferredIcon: '💎', fallback: 'Claude', fallbackIcon: '🟣' },
];

const initialApiKeys: ApiKey[] = [
  { id: '1', name: 'Production API Key', key: 'sk-prod-xxxx-xxxx-xxxx-xxxx', createdAt: '2024-01-15', lastUsed: '2 hours ago' },
  { id: '2', name: 'Development Key', key: 'sk-dev-yyyy-yyyy-yyyy-yyyy', createdAt: '2024-02-20', lastUsed: '5 days ago' },
  { id: '3', name: 'Testing Key', key: 'sk-test-zzzz-zzzz-zzzz-zzzz', createdAt: '2024-03-01', lastUsed: 'Never' },
];

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [costWarn, setCostWarn] = useState(true);
  const [hardLimit, setHardLimit] = useState(false);
  const [providers, setProviders] = useState(initialProviders);
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  
  // General settings
  const [projectName, setProjectName] = useState('My AI Project');
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  
  // Appearance settings
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark');
  const [fontSize, setFontSize] = useState(14);
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  
  const toggleProvider = (id: string) => {
    setProviders(prev => prev.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };
  
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  
  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: 'API Key Copied', description: 'Key copied to clipboard' });
  };
  
  const deleteKey = (id: string) => {
    if (confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(prev => prev.filter(k => k.id !== id));
      toast({ title: 'API Key Deleted' });
    }
  };
  
  const renderGeneralTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          ⚙️ Project Settings
        </h2>
        <div className="glass-card p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Default Workspace</label>
            <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Personal</option>
              <option>Team</option>
              <option>Enterprise</option>
            </select>
          </div>
        </div>
      </div>
      
      <hr className="border-border" />
      
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          🔔 Preferences
        </h2>
        <div className="glass-card p-4 space-y-3">
          {[
            { id: 'auto-save', label: 'Auto-save changes', checked: autoSave, onChange: setAutoSave },
            { id: 'notifications', label: 'Enable notifications', checked: notifications, onChange: setNotifications },
            { id: 'analytics', label: 'Share usage analytics', checked: analytics, onChange: setAnalytics },
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
      
      <hr className="border-border" />
      
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          🗑️ Danger Zone
        </h2>
        <div className="glass-card p-4 border-destructive/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Project</p>
              <p className="text-xs text-muted-foreground">This action cannot be undone</p>
            </div>
            <button className="px-3 py-1.5 bg-destructive text-destructive-foreground rounded-lg text-sm hover:bg-destructive/90 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderProvidersTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          🔌 Provider Status
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {providers.map((provider) => (
            <div key={provider.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{provider.icon}</span>
                  <span className="font-medium text-sm">{provider.name}</span>
                </div>
                <button
                  onClick={() => toggleProvider(provider.id)}
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    provider.enabled ? "bg-primary" : "bg-muted"
                  )}
                >
                  <div className={cn(
                    "absolute w-4 h-4 bg-white rounded-full top-1 transition-all",
                    provider.enabled ? "left-5" : "left-1"
                  )} />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  provider.status === 'online' ? 'bg-green-500' :
                  provider.status === 'degraded' ? 'bg-yellow-500' :
                  'bg-red-500'
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
      
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          ➕ Add Provider
        </h2>
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground mb-3">Connect additional AI providers to expand your options.</p>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Provider
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderRoutingTab = () => (
    <div className="space-y-6">
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
              {routingRules.map((rule) => (
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
  );
  
  const renderApiKeysTab = () => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <Key className="w-4 h-4" />
            API Keys
          </h2>
          <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create New Key
          </button>
        </div>
        
        <div className="space-y-3">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{apiKey.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-1.5 hover:bg-secondary rounded transition-colors"
                  >
                    {visibleKeys.has(apiKey.id) ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => copyKey(apiKey.key)}
                    className="p-1.5 hover:bg-secondary rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => deleteKey(apiKey.id)}
                    className="p-1.5 hover:bg-secondary rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="font-mono text-xs bg-secondary/50 px-3 py-2 rounded mb-2">
                {visibleKeys.has(apiKey.id) ? apiKey.key : '••••••••••••••••••••••••'}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Created: {apiKey.createdAt}</span>
                <span>Last used: {apiKey.lastUsed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <hr className="border-border" />
      
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Rotate Keys
        </h2>
        <div className="glass-card p-4">
          <p className="text-sm text-muted-foreground mb-3">
            Rotating your API keys will invalidate all existing keys and generate new ones.
          </p>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors">
            Rotate All Keys
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          🎨 Theme
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light' as const, label: 'Light', icon: Sun },
            { id: 'dark' as const, label: 'Dark', icon: Moon },
            { id: 'system' as const, label: 'System', icon: Monitor },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
              className={cn(
                "glass-card p-4 flex flex-col items-center gap-2 transition-all",
                theme === option.id && "border-primary bg-primary/10"
              )}
            >
              <option.icon className={cn(
                "w-6 h-6",
                theme === option.id ? "text-primary" : "text-muted-foreground"
              )} />
              <span className="text-sm">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <hr className="border-border" />
      
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          📝 Typography
        </h2>
        <div className="glass-card p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm">Font Size</label>
              <span className="text-sm text-muted-foreground">{fontSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="20"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>
      </div>
      
      <hr className="border-border" />
      
      <div>
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          ⚡ Interface
        </h2>
        <div className="glass-card p-4 space-y-3">
          {[
            { id: 'compact', label: 'Compact mode', checked: compactMode, onChange: setCompactMode },
            { id: 'animations', label: 'Enable animations', checked: animationsEnabled, onChange: setAnimationsEnabled },
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
  );
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralTab();
      case 'providers':
        return renderProvidersTab();
      case 'routing':
        return renderRoutingTab();
      case 'api-keys':
        return renderApiKeysTab();
      case 'appearance':
        return renderAppearanceTab();
      default:
        return null;
    }
  };
  
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
      <div className="flex-1 overflow-auto">
        {renderTabContent()}
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
