import { Sparkles, ChevronRight, Lightbulb, Palette, Code2, Rocket, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';

interface ProjectPhase {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'upcoming';
}

const projectPhases: ProjectPhase[] = [
  { id: 'idea', label: 'Mô tả ý tưởng', description: 'Trả lời các câu hỏi về sản phẩm', icon: Lightbulb, status: 'current' },
  { id: 'design', label: 'Xem concept', description: 'AI đề xuất tính năng & giao diện', icon: Palette, status: 'upcoming' },
  { id: 'build', label: 'Xây dựng', description: 'AI code từng phần một', icon: Code2, status: 'upcoming' },
  { id: 'launch', label: 'Hoàn thành', description: 'Review và publish', icon: Rocket, status: 'upcoming' },
];

interface NextStep {
  id: string;
  title: string;
  description: string;
  action: string;
  actionLabel: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ElementType;
}

const nextSteps: NextStep[] = [
  {
    id: 'start-interview',
    title: 'Bắt đầu với AI Interview',
    description: 'Trả lời vài câu hỏi để AI hiểu ý tưởng của bạn',
    action: 'wizard',
    actionLabel: 'Bắt đầu ngay',
    priority: 'high',
    icon: Sparkles,
  },
  {
    id: 'view-plans',
    title: 'Xem các dự án của bạn',
    description: 'Theo dõi tiến độ các dự án đang thực hiện',
    action: 'plans',
    actionLabel: 'Xem dự án',
    priority: 'medium',
    icon: CheckCircle2,
  },
];

export function SimpleDashboard() {
  const { setActiveTab, plans } = useAppStore();
  
  const activePlans = plans.filter(p => p.status === 'in_progress' || p.status === 'review');
  const hasProjects = activePlans.length > 0;
  
  // Calculate overall progress
  const currentPhaseIndex = hasProjects ? 2 : 0; // If has projects, at build phase
  const overallProgress = hasProjects ? 50 : 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="glass-card p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">
            Chào mừng đến <span className="gradient-text">VividKit</span>!
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            {hasProjects 
              ? 'Bạn đang có dự án trong tiến trình. Hãy tiếp tục hoặc bắt đầu dự án mới!'
              : 'Biến ý tưởng thành sản phẩm chỉ với vài câu hỏi. AI sẽ hướng dẫn bạn từng bước.'}
          </p>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            🎯 Tiến độ dự án
          </h2>
          <span className="text-xs text-muted-foreground">{overallProgress}% hoàn thành</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        
        {/* Phases */}
        <div className="grid grid-cols-4 gap-2">
          {projectPhases.map((phase, index) => {
            const Icon = phase.icon;
            const isCurrent = index === currentPhaseIndex;
            const isCompleted = index < currentPhaseIndex;
            const isUpcoming = index > currentPhaseIndex;
            
            return (
              <div 
                key={phase.id}
                className={cn(
                  "relative p-4 rounded-xl text-center transition-all",
                  isCurrent && "bg-primary/10 border-2 border-primary/30",
                  isCompleted && "bg-green-500/10",
                  isUpcoming && "opacity-50"
                )}
              >
                {/* Connector line */}
                {index < projectPhases.length - 1 && (
                  <div className={cn(
                    "absolute top-1/2 -right-1 w-2 h-0.5",
                    isCompleted ? "bg-green-500" : "bg-muted"
                  )} />
                )}
                
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2",
                  isCurrent && "bg-primary text-primary-foreground",
                  isCompleted && "bg-green-500 text-white",
                  isUpcoming && "bg-muted"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <PlayCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                <p className={cn(
                  "text-sm font-medium mb-1",
                  isCurrent && "text-primary"
                )}>
                  {phase.label}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {phase.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
          ✨ Bước tiếp theo
        </h2>
        
        <div className="space-y-3">
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            const isFirst = index === 0;
            
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.action as any)}
                className={cn(
                  "w-full p-4 rounded-xl text-left transition-all hover:scale-[1.01] group",
                  isFirst 
                    ? "bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary/30 hover:border-primary/50" 
                    : "bg-secondary/50 hover:bg-secondary"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                    isFirst ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{step.title}</h3>
                      {isFirst && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                          Khuyến nghị
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    isFirst ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {step.actionLabel}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Projects (if any) */}
      {hasProjects && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              📋 Dự án đang thực hiện
            </h2>
            <button 
              onClick={() => setActiveTab('plans')}
              className="text-xs text-primary hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          
          <div className="space-y-3">
            {activePlans.slice(0, 3).map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  useAppStore.getState().setSelectedPlan(plan.id);
                  setActiveTab('plans');
                }}
                className="w-full p-4 bg-secondary/50 rounded-xl text-left hover:bg-secondary transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{plan.title}</span>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    plan.status === 'in_progress' && "bg-blue-500/20 text-blue-400",
                    plan.status === 'review' && "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {plan.status === 'in_progress' ? 'Đang build' : 'Đang review'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{plan.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tips for beginners */}
      <div className="glass-card p-5 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="font-medium mb-1">Mẹo cho người mới</h3>
            <p className="text-sm text-muted-foreground">
              Bắt đầu với ý tưởng đơn giản trước. AI sẽ hỏi thêm chi tiết nếu cần. 
              Bạn không cần biết code - chỉ cần mô tả những gì bạn muốn xây dựng!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}