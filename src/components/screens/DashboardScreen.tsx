import { ChefHat, Lightbulb, Code2, CheckCircle2, FileText, Bot, Sparkles } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';

export function DashboardScreen() {
  const { setActiveTab, plans, recentActivity } = useAppStore();
  
  const activePlans = plans.filter(p => p.status === 'in_progress');
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="glass-card p-6 text-center">
        <h1 className="text-2xl font-semibold mb-2">
          👋 Welcome back, <span className="gradient-text">Developer</span>!
        </h1>
        <p className="text-muted-foreground">What would you like to do?</p>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: ChefHat, label: '/cook', description: 'Quick task execution', color: 'text-orange-400', bgColor: 'bg-orange-400/10', borderColor: 'border-orange-400/30' },
          { icon: Lightbulb, label: '/brainstorm', description: 'Generate ideas', color: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/30' },
          { icon: Code2, label: '/code', description: 'Implement from plan', color: 'text-cyan-400', bgColor: 'bg-cyan-400/10', borderColor: 'border-cyan-400/30' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => setActiveTab('chat')}
              className={`glass-card p-5 text-left hover:scale-[1.02] transition-all group border ${action.borderColor}`}
            >
              <div className={`w-10 h-10 rounded-lg ${action.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${action.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-1 font-mono">{action.label}</h3>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </button>
          );
        })}
      </div>
      
      {/* Active Plans & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Plans */}
        <div className="glass-card p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            Active Plans
          </h2>
          <div className="space-y-3">
            {activePlans.length > 0 ? activePlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  useAppStore.getState().setSelectedPlan(plan.id);
                  setActiveTab('plans');
                }}
                className="w-full p-3 bg-secondary/50 rounded-lg text-left hover:bg-secondary transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm truncate">{plan.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    plan.priority === 'P1' ? 'priority-high border' :
                    plan.priority === 'P2' ? 'priority-medium border' :
                    'priority-low border'
                  }`}>
                    {plan.priority}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{plan.progress}%</span>
                </div>
              </button>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No active plans</p>
            )}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="glass-card p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Recent Activity
          </h2>
          <div className="space-y-2">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  activity.type === 'completed' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'updated' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'responded' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {activity.type === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {activity.type === 'updated' && <FileText className="w-3.5 h-3.5" />}
                  {activity.type === 'responded' && <Bot className="w-3.5 h-3.5" />}
                  {activity.type === 'brainstorm' && <Lightbulb className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm flex-1">{activity.message}</span>
                <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
