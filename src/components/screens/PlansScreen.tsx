import { Plus, Search, Filter, ArrowUpDown, GripVertical } from 'lucide-react';
import { useAppStore, Plan } from '@/stores/appStore';
import { cn } from '@/lib/utils';

const columns: { id: Plan['status']; label: string; icon: string }[] = [
  { id: 'draft', label: 'Draft', icon: '📝' },
  { id: 'in_progress', label: 'In Progress', icon: '🔄' },
  { id: 'review', label: 'Review', icon: '👁️' },
  { id: 'done', label: 'Done', icon: '✅' },
];

export function PlansScreen() {
  const { plans, setSelectedPlan, setActiveTab } = useAppStore();
  
  const getPlansForColumn = (status: Plan['status']) => 
    plans.filter(p => p.status === status);
  
  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan.id);
  };
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Plan
        </button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plans..."
              className="pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
          </div>
          <button className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Sort
          </button>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden">
        {columns.map((column) => {
          const columnPlans = getPlansForColumn(column.id);
          
          return (
            <div key={column.id} className="flex flex-col min-h-0">
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span>{column.icon}</span>
                <span className="font-medium text-sm">{column.label}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {columnPlans.length}
                </span>
              </div>
              
              {/* Cards */}
              <div className="flex-1 overflow-auto space-y-3 pr-1">
                {columnPlans.map((plan, index) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanClick(plan)}
                    className="glass-card p-4 cursor-pointer hover:border-primary/50 transition-all group animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Drag Handle */}
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                      <div className="flex-1 min-w-0">
                        {/* Title */}
                        <h3 className="font-medium text-sm mb-2 truncate">{plan.title}</h3>
                        
                        {/* Priority & Date */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full font-medium border",
                            plan.priority === 'P1' ? 'priority-high' :
                            plan.priority === 'P2' ? 'priority-medium' :
                            'priority-low'
                          )}>
                            {plan.priority}
                          </span>
                          <span className="text-xs text-muted-foreground">📅 {plan.date}</span>
                        </div>
                        
                        {/* Progress */}
                        {plan.status !== 'draft' && plan.status !== 'done' && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${plan.progress}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">{plan.progress}%</span>
                          </div>
                        )}
                        
                        {/* Provider */}
                        {plan.provider && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-claude" />
                            <span className="text-xs text-muted-foreground">Claude Pro</span>
                          </div>
                        )}
                        
                        {/* Done checkmark */}
                        {plan.status === 'done' && (
                          <div className="flex items-center justify-end mt-2">
                            <span className="text-green-400">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
