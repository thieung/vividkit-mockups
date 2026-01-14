import { useState } from 'react';
import { useAppStore, Plan, PlanPhase } from '@/stores/appStore';
import { 
  Plus, 
  Search, 
  GripVertical, 
  Check, 
  Clock, 
  FileText, 
  Eye,
  Sparkles,
  Zap,
  ArrowRight,
  MoreHorizontal,
  Link2,
  BarChart3,
  ChevronDown,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const columns = [
  { id: 'draft', label: 'Ideas', icon: FileText, color: 'text-muted-foreground' },
  { id: 'in_progress', label: 'Building', icon: Zap, color: 'text-amber-500' },
  { id: 'review', label: 'Testing', icon: Eye, color: 'text-blue-500' },
  { id: 'done', label: 'Complete', icon: Check, color: 'text-emerald-500' },
];

const complexityConfig = {
  fast: { label: '⚡ Fast', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  medium: { label: '⚡⚡ Medium', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  complex: { label: '⚡⚡⚡ Complex', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  ultra: { label: '⚡⚡⚡⚡ Ultra', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

const priorityConfig = {
  P1: { label: 'High', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  P2: { label: 'Medium', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  P3: { label: 'Low', color: 'bg-muted text-muted-foreground border-border' },
};

export function PlansScreen() {
  const { plans, setSelectedPlan } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedPlan, setDraggedPlan] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [showGantt, setShowGantt] = useState(true);

  const getPlansForColumn = (status: Plan['status']) => {
    return plans
      .filter(p => p.status === status)
      .filter(p => searchQuery === '' || p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan.id);
  };

  const handleDragStart = (e: React.DragEvent, planId: string) => {
    setDraggedPlan(planId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    // In real app, this would update the plan status
    console.log(`Moving plan ${draggedPlan} to ${columnId}`);
    setDraggedPlan(null);
    setDragOverColumn(null);
  };

  const getDependencyPlan = (depId: string) => {
    return plans.find(p => p.id === depId);
  };

  // Get status color for Gantt bars
  const getStatusColor = (status: Plan['status']) => {
    switch (status) {
      case 'draft': return 'bg-muted-foreground/30';
      case 'in_progress': return 'bg-amber-500';
      case 'review': return 'bg-blue-500';
      case 'done': return 'bg-emerald-500';
      default: return 'bg-muted';
    }
  };

  // Calculate Gantt bar width based on progress
  const getGanttWidth = (plan: Plan) => {
    if (plan.status === 'done') return 100;
    if (plan.status === 'draft') return 15;
    return Math.max(20, plan.progress);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Plans Board</h1>
            <p className="text-sm text-muted-foreground">Drag cards to move between stages</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                className="pl-9 w-64 bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Plan
            </Button>
          </div>
        </div>
      </div>

      {/* Gantt Timeline Section */}
      <div className="flex-shrink-0 border-b border-border">
        <button
          onClick={() => setShowGantt(!showGantt)}
          className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Timeline View</span>
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              {plans.length} plans
            </Badge>
          </div>
          {showGantt ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        
        {showGantt && (
          <div className="px-4 pb-4">
            {/* Gantt Header */}
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              <div className="w-40 flex-shrink-0">Plan</div>
              <div className="flex-1 flex items-center justify-between">
                <span>Progress</span>
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/30"></span> Ideas</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Building</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Testing</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Complete</span>
                </div>
              </div>
            </div>

            {/* Gantt Rows */}
            <div className="space-y-2">
              {plans.slice(0, 6).map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => handlePlanClick(plan)}
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  {/* Plan Name */}
                  <div className="w-40 flex-shrink-0 flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {plan.title.slice(0, 18)}{plan.title.length > 18 ? '...' : ''}
                    </span>
                  </div>
                  
                  {/* Gantt Bar Container */}
                  <div className="flex-1 h-6 bg-muted/30 rounded-md relative overflow-hidden">
                    {/* Main Progress Bar */}
                    <div 
                      className={cn(
                        "absolute left-0 top-0 h-full rounded-md transition-all duration-500",
                        getStatusColor(plan.status),
                        "group-hover:brightness-110"
                      )}
                      style={{ width: `${getGanttWidth(plan)}%` }}
                    >
                      {/* Phase markers inside bar */}
                      {plan.phases && plan.phases.length > 0 && (
                        <div className="absolute inset-0 flex items-center">
                          {plan.phases.map((phase, idx) => (
                            <div
                              key={phase.id}
                              className={cn(
                                "flex-1 h-full border-r border-white/20 last:border-r-0 flex items-center justify-center",
                                phase.status === 'done' && "bg-white/20",
                                phase.status === 'active' && "bg-white/10 animate-pulse"
                              )}
                              title={`${phase.name}: ${phase.status}`}
                            >
                              {phase.status === 'done' && (
                                <Check className="w-3 h-3 text-white/80" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Progress percentage */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
                      {plan.progress}%
                    </span>
                  </div>
                  
                  {/* Priority Badge */}
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs flex-shrink-0", priorityConfig[plan.priority].color)}
                  >
                    {plan.priority}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Show more if needed */}
            {plans.length > 6 && (
              <div className="mt-3 text-center">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  +{plans.length - 6} more plans
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column) => {
            const columnPlans = getPlansForColumn(column.id as Plan['status']);
            const Icon = column.icon;
            
            return (
              <div
                key={column.id}
                className={cn(
                  "flex flex-col w-80 bg-muted/30 rounded-xl border border-border/50 transition-all duration-200",
                  dragOverColumn === column.id && "ring-2 ring-primary/50 bg-primary/5"
                )}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("w-4 h-4", column.color)} />
                    <span className="font-medium text-foreground">{column.label}</span>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      {columnPlans.length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                  {columnPlans.map((plan) => (
                    <div
                      key={plan.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, plan.id)}
                      onClick={() => handlePlanClick(plan)}
                      className={cn(
                        "group bg-card border border-border rounded-lg p-3 cursor-pointer transition-all duration-200",
                        "hover:border-primary/50 hover:shadow-md hover:shadow-primary/5",
                        draggedPlan === plan.id && "opacity-50 scale-95"
                      )}
                    >
                      {/* Drag Handle + Title */}
                      <div className="flex items-start gap-2 mb-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground/50 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground text-sm leading-tight line-clamp-2">
                            {plan.title}
                          </h3>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", priorityConfig[plan.priority].color)}
                        >
                          {priorityConfig[plan.priority].label}
                        </Badge>
                        {plan.complexity && (
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", complexityConfig[plan.complexity].color)}
                          >
                            {complexityConfig[plan.complexity].label}
                          </Badge>
                        )}
                      </div>

                      {/* Phase Progress */}
                      {plan.phases && plan.status !== 'draft' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                            <span>Phases</span>
                            <span>{plan.phases.filter(p => p.status === 'done').length}/{plan.phases.length}</span>
                          </div>
                          <div className="flex gap-1">
                            {plan.phases.map((phase) => (
                              <div
                                key={phase.id}
                                className={cn(
                                  "flex-1 h-1.5 rounded-full transition-colors",
                                  phase.status === 'done' && "bg-emerald-500",
                                  phase.status === 'active' && "bg-amber-500 animate-pulse",
                                  phase.status === 'pending' && "bg-muted"
                                )}
                                title={phase.name}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between mt-1">
                            {plan.phases.map((phase) => (
                              <span 
                                key={phase.id} 
                                className={cn(
                                  "text-[10px]",
                                  phase.status === 'active' ? "text-amber-500 font-medium" : "text-muted-foreground"
                                )}
                              >
                                {phase.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Dependencies */}
                      {plan.dependencies && plan.dependencies.length > 0 && (
                        <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
                          <Link2 className="w-3 h-3" />
                          <span>Depends on:</span>
                          {plan.dependencies.map((depId) => {
                            const dep = getDependencyPlan(depId);
                            return dep ? (
                              <Badge 
                                key={depId} 
                                variant="outline" 
                                className="text-xs py-0 px-1.5 bg-muted/50"
                              >
                                {dep.title.slice(0, 15)}...
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      )}

                      {/* Progress Bar (for in-progress items) */}
                      {plan.status !== 'draft' && plan.status !== 'done' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <Progress value={plan.progress} className="h-1.5" />
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{plan.date}</span>
                        </div>
                        
                        {plan.provider && (
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-primary" />
                            <span className="text-xs text-muted-foreground">{plan.provider}</span>
                          </div>
                        )}
                        
                        {plan.status === 'done' && (
                          <div className="flex items-center gap-1 text-emerald-500">
                            <Check className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Done</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Empty State */}
                  {columnPlans.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                        <Icon className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">No plans here</p>
                      <p className="text-xs text-muted-foreground/70">Drag a card or create new</p>
                    </div>
                  )}
                </div>

                {/* Add Card Button */}
                <div className="p-2 border-t border-border/50">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                    Add plan
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex-shrink-0 p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI Plan
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <FileText className="w-3.5 h-3.5" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowRight className="w-3.5 h-3.5" />
            Quick Start
          </Button>
        </div>
      </div>
    </div>
  );
}
