import { 
  Sparkles, ChevronRight, Lightbulb, Palette, Code2, Rocket, 
  CheckCircle2, PlayCircle, MessageSquare, Save, ArrowRight,
  Wrench, Upload, BookOpen, Zap
} from 'lucide-react';
import { useAppStore, TabId } from '@/stores/appStore';
import { cn } from '@/lib/utils';

interface WorkflowStep {
  id: string;
  tab: TabId;
  label: string;
  description: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'upcoming';
  actionLabel: string;
  color: string;
}

const getWorkflowSteps = (hasProjects: boolean, currentPhase: number): WorkflowStep[] => [
  { 
    id: 'interview', 
    tab: 'wizard',
    label: 'Mô tả ý tưởng', 
    description: 'Trả lời câu hỏi để AI hiểu bạn muốn gì',
    icon: Lightbulb, 
    status: currentPhase > 0 ? 'completed' : currentPhase === 0 ? 'current' : 'upcoming',
    actionLabel: 'Bắt đầu',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'brainstorm', 
    tab: 'brainstorm',
    label: 'Brainstorm', 
    description: 'AI đề xuất tính năng & ý tưởng',
    icon: MessageSquare, 
    status: currentPhase > 1 ? 'completed' : currentPhase === 1 ? 'current' : 'upcoming',
    actionLabel: 'Xem ý tưởng',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'design', 
    tab: 'design',
    label: 'Upload thiết kế', 
    description: 'Upload mockup hoặc ảnh tham khảo',
    icon: Palette, 
    status: currentPhase > 2 ? 'completed' : currentPhase === 2 ? 'current' : 'upcoming',
    actionLabel: 'Upload',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'fix', 
    tab: 'fix',
    label: 'Fix & Debug', 
    description: 'AI sửa lỗi và tối ưu code',
    icon: Wrench, 
    status: currentPhase > 3 ? 'completed' : currentPhase === 3 ? 'current' : 'upcoming',
    actionLabel: 'Fix ngay',
    color: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'publish', 
    tab: 'save',
    label: 'Lưu & Publish', 
    description: 'Save progress và publish lên web',
    icon: Rocket, 
    status: currentPhase >= 4 ? 'completed' : 'upcoming',
    actionLabel: 'Publish',
    color: 'from-rose-500 to-red-500'
  },
];

interface QuickAction {
  id: string;
  tab: TabId;
  icon: React.ElementType;
  label: string;
  description: string;
  gradient: string;
}

const quickActions: QuickAction[] = [
  { 
    id: 'wizard', 
    tab: 'wizard', 
    icon: Sparkles, 
    label: 'AI Interview', 
    description: 'Mô tả ý tưởng của bạn',
    gradient: 'from-primary to-primary/60'
  },
  { 
    id: 'brainstorm', 
    tab: 'brainstorm', 
    icon: Lightbulb, 
    label: 'Brainstorm', 
    description: 'Phát triển ý tưởng',
    gradient: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'design', 
    tab: 'design', 
    icon: Upload, 
    label: 'Upload Design', 
    description: 'Tải lên mockup',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'fix', 
    tab: 'fix', 
    icon: Wrench, 
    label: 'Fix & Debug', 
    description: 'Sửa lỗi nhanh',
    gradient: 'from-green-500 to-emerald-500'
  },
  { 
    id: 'plans', 
    tab: 'plans', 
    icon: BookOpen, 
    label: 'Kế hoạch', 
    description: 'Quản lý dự án',
    gradient: 'from-orange-500 to-amber-500'
  },
  { 
    id: 'save', 
    tab: 'save', 
    icon: Rocket, 
    label: 'Publish', 
    description: 'Lưu & xuất bản',
    gradient: 'from-rose-500 to-red-500'
  },
];

export function SimpleDashboard() {
  const { setActiveTab, plans, interviewAnswers, brainstormReports } = useAppStore();
  
  const activePlans = plans.filter(p => p.status === 'in_progress' || p.status === 'review');
  const hasProjects = activePlans.length > 0;
  const hasInterview = interviewAnswers && interviewAnswers.length > 0;
  const hasBrainstorm = brainstormReports.length > 0;
  
  // Calculate current phase based on user progress
  const getCurrentPhase = () => {
    if (!hasInterview) return 0;
    if (!hasBrainstorm) return 1;
    if (!hasProjects) return 2;
    return 3;
  };
  
  const currentPhase = getCurrentPhase();
  const workflowSteps = getWorkflowSteps(hasProjects, currentPhase);
  const overallProgress = Math.round((currentPhase / 4) * 100);

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-8">
      {/* Hero Section */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                <Zap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  Xin chào! 👋
                </h1>
                <p className="text-muted-foreground text-sm">
                  Bạn đang ở bước {currentPhase + 1}/5 trong workflow
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground max-w-lg">
              {!hasInterview 
                ? 'Bắt đầu bằng cách mô tả ý tưởng của bạn. AI sẽ hướng dẫn bạn từng bước.'
                : hasProjects 
                  ? 'Tuyệt vời! Bạn đang có dự án trong tiến trình. Tiếp tục hoặc khám phá thêm.'
                  : 'Tiếp tục phát triển ý tưởng hoặc upload thiết kế để bắt đầu xây dựng.'}
            </p>
          </div>
          
          {/* CTA Button */}
          <button
            onClick={() => setActiveTab(workflowSteps[currentPhase]?.tab || 'wizard')}
            className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            {workflowSteps[currentPhase]?.actionLabel || 'Bắt đầu'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Workflow Steps - Visual Pipeline */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Workflow của bạn
          </h2>
          <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">
            {overallProgress}% hoàn thành
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full transition-all duration-700"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const isCurrent = step.status === 'current';
            const isCompleted = step.status === 'completed';
            const isUpcoming = step.status === 'upcoming';
            
            return (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.tab)}
                className={cn(
                  "relative p-4 rounded-xl text-left transition-all group",
                  isCurrent && "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40 shadow-lg shadow-primary/10",
                  isCompleted && "bg-green-500/10 border border-green-500/30 hover:bg-green-500/15",
                  isUpcoming && "bg-muted/50 opacity-60 hover:opacity-80 hover:bg-muted"
                )}
              >
                {/* Connector line */}
                {index < workflowSteps.length - 1 && (
                  <div className={cn(
                    "hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 z-10",
                    isCompleted ? "bg-green-500" : "bg-border"
                  )} />
                )}
                
                {/* Step number badge */}
                <div className={cn(
                  "absolute -top-2 -left-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center",
                  isCurrent && "bg-primary text-primary-foreground",
                  isCompleted && "bg-green-500 text-white",
                  isUpcoming && "bg-muted-foreground/30 text-muted-foreground"
                )}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                </div>
                
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                  isCurrent && `bg-gradient-to-br ${step.color} text-white`,
                  isCompleted && "bg-green-500/20 text-green-500",
                  isUpcoming && "bg-muted text-muted-foreground"
                )}>
                  {isCurrent ? (
                    <PlayCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                
                <h3 className={cn(
                  "font-medium text-sm mb-1",
                  isCurrent && "text-primary"
                )}>
                  {step.label}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {step.description}
                </p>
                
                {isCurrent && (
                  <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                    {step.actionLabel}
                    <ChevronRight className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Đi đâu làm gì?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isCurrentStep = workflowSteps[currentPhase]?.tab === action.tab;
            
            return (
              <button
                key={action.id}
                onClick={() => setActiveTab(action.tab)}
                className={cn(
                  "relative p-4 rounded-xl text-center transition-all hover:scale-105 group",
                  isCurrentStep 
                    ? "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40" 
                    : "bg-secondary/50 hover:bg-secondary border border-transparent"
                )}
              >
                {isCurrentStep && (
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] rounded-full font-medium">
                    Tiếp theo
                  </span>
                )}
                
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 transition-all",
                  `bg-gradient-to-br ${action.gradient} text-white shadow-lg`,
                  isCurrentStep && "shadow-primary/30"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-medium text-sm mb-0.5">{action.label}</h3>
                <p className="text-[10px] text-muted-foreground">{action.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Projects */}
      {hasProjects && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              📋 Dự án đang thực hiện
            </h2>
            <button 
              onClick={() => setActiveTab('plans')}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activePlans.slice(0, 3).map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  useAppStore.getState().setSelectedPlan(plan.id);
                  setActiveTab('plans');
                }}
                className="p-4 bg-secondary/50 rounded-xl text-left hover:bg-secondary transition-all hover:scale-[1.02] group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium truncate pr-2">{plan.title}</span>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full flex-shrink-0",
                    plan.status === 'in_progress' && "bg-blue-500/20 text-blue-400",
                    plan.status === 'review' && "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {plan.status === 'in_progress' ? 'Đang build' : 'Review'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">{plan.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              💡
            </div>
            <div>
              <h3 className="font-medium mb-1">Mẹo cho người mới</h3>
              <p className="text-sm text-muted-foreground">
                Bắt đầu với <strong>AI Interview</strong> để mô tả ý tưởng. Sau đó xem <strong>Brainstorm</strong> để AI đề xuất tính năng.
              </p>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-5 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              🎯
            </div>
            <div>
              <h3 className="font-medium mb-1">Workflow đề xuất</h3>
              <p className="text-sm text-muted-foreground">
                Interview → Brainstorm → Design → Fix → Publish. Làm theo thứ tự để có kết quả tốt nhất!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
