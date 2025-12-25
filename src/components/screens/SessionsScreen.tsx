import { Plus, Pause, Square, Copy, Play, Loader2 } from 'lucide-react';
import { useAppStore, Session } from '@/stores/appStore';
import { cn } from '@/lib/utils';

const providers: { id: Session['provider']; icon: string; name: string; color: string }[] = [
  { id: 'claude', icon: '🟣', name: 'Claude Pro', color: 'claude' },
  { id: 'antigravity', icon: '🔵', name: 'Antigravity', color: 'antigravity' },
  { id: 'gemini', icon: '💎', name: 'Gemini', color: 'gemini' },
  { id: 'copilot', icon: '🐙', name: 'Copilot', color: 'copilot' },
  { id: 'glm', icon: '🔴', name: 'GLM', color: 'glm' },
  { id: 'openrouter', icon: '🌐', name: 'OpenRouter', color: 'openrouter' },
];

export function SessionsScreen() {
  const { sessions, addSession, updateSession } = useAppStore();
  
  const totalCost = sessions.reduce((sum, s) => sum + s.cost, 0);
  
  const getProvider = (id: Session['provider']) => providers.find(p => p.id === id)!;
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => addSession('claude')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Session
        </button>
        
        <div className="text-sm text-muted-foreground">
          Total Cost: <span className="text-foreground font-semibold">${totalCost.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sessions.map((session, index) => {
          const provider = getProvider(session.provider);
          
          return (
            <div
              key={session.id}
              className="glass-card overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{provider.icon}</span>
                  <span className="font-medium text-sm">Session {session.id}: {provider.name}</span>
                </div>
                <div className={cn(
                  "flex items-center gap-1.5 text-xs px-2 py-1 rounded-full",
                  session.status === 'running' ? 'bg-primary/20 text-primary' :
                  session.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                  session.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  'bg-muted text-muted-foreground'
                )}>
                  {session.status === 'running' && (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Running
                    </>
                  )}
                  {session.status === 'idle' && 'Idle'}
                  {session.status === 'paused' && 'Paused'}
                  {session.status === 'completed' && 'Completed'}
                </div>
              </div>
              
              {/* Progress */}
              {session.status === 'running' && (
                <div className="h-1 bg-muted">
                  <div 
                    className="h-full bg-primary animate-progress"
                    style={{ 
                      width: `${session.progress}%`,
                      background: 'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--primary)) 100%)',
                    }}
                  />
                </div>
              )}
              
              {/* Output */}
              <div className="p-4 h-32 overflow-auto font-mono text-xs text-muted-foreground bg-background/50">
                {session.output.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-primary select-none">{'>'}</span>
                    <span>{line}</span>
                    {session.status === 'running' && i === session.output.length - 1 && (
                      <Loader2 className="w-3 h-3 animate-spin text-primary" />
                    )}
                  </div>
                ))}
                {session.status === 'running' && (
                  <div className="flex gap-2 mt-1">
                    <span className="text-primary select-none">{'>'}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-primary animate-typing" />
                      <div className="w-1 h-3 bg-primary animate-typing-delay-1" />
                      <div className="w-1 h-3 bg-primary animate-typing-delay-2" />
                    </div>
                    <span className="ml-2">{session.progress}%</span>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="px-4 py-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>💰 ${session.cost.toFixed(2)}</span>
                  <span>🔢 {session.tokens.toLocaleString()} tokens</span>
                </div>
                <div className="flex gap-1">
                  {session.status === 'idle' ? (
                    <button
                      onClick={() => updateSession(session.id, { status: 'running', progress: 10 })}
                      className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                      title="Start"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  ) : session.status === 'running' ? (
                    <>
                      <button
                        onClick={() => updateSession(session.id, { status: 'paused' })}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        title="Pause"
                      >
                        <Pause className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateSession(session.id, { status: 'idle', progress: 0 })}
                        className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                        title="Stop"
                      >
                        <Square className="w-4 h-4" />
                      </button>
                    </>
                  ) : null}
                  <button
                    className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                    title="Copy output"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* New Session Card */}
        <div className="glass-card p-4 border-dashed">
          <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Start New Session
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => addSession(provider.id)}
                className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm"
              >
                <span>{provider.icon}</span>
                <span>{provider.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
