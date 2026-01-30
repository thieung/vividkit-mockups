import { useState } from 'react';
import { 
  Sparkles, ChevronRight, Lightbulb, Palette, 
  Rocket, PlayCircle, MessageSquare, ArrowRight,
  Wrench, Upload, Zap, Target, Clock, TrendingUp,
  FileCode, GitCommit, Eye, Bug, RefreshCw, FolderOpen, RotateCcw,
  Save, Server
} from 'lucide-react';
import { useAppStore, TabId } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import { SplashScreen } from '@/components/features/SplashScreen';
import { OnboardingTour } from '@/components/features/OnboardingTour';
import { OnboardingCLISetup } from '@/components/features/OnboardingCLISetup';
import { QuickCookModal } from '@/components/features/QuickCookModal';
// Mock recent activity data
const getRecentActivity = () => [
  { id: 1, type: 'file', action: 'Modified', target: 'src/App.tsx', time: '2 phút trước', icon: FileCode },
  { id: 2, type: 'commit', action: 'Commit', target: 'Fix navigation bug', time: '15 phút trước', icon: GitCommit },
  { id: 3, type: 'deploy', action: 'Preview', target: 'v0.2.3 deployed', time: '1 giờ trước', icon: Eye },
  { id: 4, type: 'fix', action: 'Fixed', target: '3 linting errors', time: '2 giờ trước', icon: Bug },
];

interface SmartAction {
  id: string;
  tab: TabId;
  icon: React.ElementType;
  label: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  gradient: string;
}

const getSmartActions = (
  hasInterview: boolean,
  hasBrainstorm: boolean,
  hasProjects: boolean
): SmartAction[] => {
  const actions: SmartAction[] = [];
  
  // Primary recommendation based on state
  if (!hasInterview) {
    actions.push({
      id: 'interview',
      tab: 'wizard',
      icon: Lightbulb,
      label: 'Mô tả ý tưởng',
      description: 'Bắt đầu bằng cách trả lời vài câu hỏi để AI hiểu bạn muốn xây gì',
      reason: 'Bước đầu tiên để bắt đầu dự án',
      priority: 'high',
      gradient: 'from-amber-500 to-orange-500'
    });
  }
  
  if (hasInterview && !hasBrainstorm) {
    actions.push({
      id: 'brainstorm',
      tab: 'brainstorm',
      icon: MessageSquare,
      label: 'Xem đề xuất từ AI',
      description: 'AI đã phân tích ý tưởng của bạn và có một số đề xuất tính năng',
      reason: 'Đã có ý tưởng, tiếp tục phát triển',
      priority: 'high',
      gradient: 'from-purple-500 to-pink-500'
    });
  }
  
  if (hasInterview || hasBrainstorm) {
    actions.push({
      id: 'design',
      tab: 'design',
      icon: Palette,
      label: 'Upload thiết kế',
      description: 'Tải lên mockup, sketch hoặc ảnh tham khảo để AI hiểu style bạn muốn',
      reason: hasBrainstorm ? 'Đã có ý tưởng, cần thiết kế' : 'Có thể upload design song song',
      priority: hasBrainstorm ? 'high' : 'medium',
      gradient: 'from-blue-500 to-cyan-500'
    });
  }
  
  if (hasProjects) {
    actions.push({
      id: 'fix',
      tab: 'fix',
      icon: Wrench,
      label: 'Fix & Debug',
      description: 'AI phát hiện và sửa lỗi, tối ưu hiệu suất code của bạn',
      reason: 'Đang có dự án, có thể cần fix bug',
      priority: 'medium',
      gradient: 'from-green-500 to-emerald-500'
    });
    
    actions.push({
      id: 'publish',
      tab: 'save',
      icon: Rocket,
      label: 'Lưu & Publish',
      description: 'Save tiến độ và publish project lên web để chia sẻ',
      reason: 'Dự án đã sẵn sàng để xuất bản',
      priority: 'medium',
      gradient: 'from-rose-500 to-red-500'
    });
  }
  
  // Always available actions (lower priority)
  if (hasInterview) {
    actions.push({
      id: 'interview-edit',
      tab: 'wizard',
      icon: Lightbulb,
      label: 'Chỉnh sửa ý tưởng',
      description: 'Cập nhật hoặc mở rộng mô tả dự án của bạn',
      reason: 'Luôn có thể chỉnh sửa',
      priority: 'low',
      gradient: 'from-amber-500 to-orange-500'
    });
  }
  
  if (hasBrainstorm) {
    actions.push({
      id: 'brainstorm-more',
      tab: 'brainstorm',
      icon: MessageSquare,
      label: 'Brainstorm thêm',
      description: 'Tiếp tục thảo luận và phát triển ý tưởng mới',
      reason: 'Luôn có thể brainstorm thêm',
      priority: 'low',
      gradient: 'from-purple-500 to-pink-500'
    });
  }
  
  return actions;
};

export function SimpleDashboard() {
  const { setActiveTab, plans, interviewAnswers, brainstormReports, setSelectedPlan } = useAppStore();
  const [showTestSplash, setShowTestSplash] = useState(false);
  const [showTestOnboarding, setShowTestOnboarding] = useState(false);
  const [showTestCLISetup, setShowTestCLISetup] = useState(false);
  const [showQuickCookModal, setShowQuickCookModal] = useState(false);

  const handleQuickCook = (feature: string) => {
    // Generate command: /cook {feature} --auto
    const command = `/cook ${feature} --auto`;
    console.log('Quick Cook command:', command);
    // TODO: Navigate to execution screen or trigger CCS
    // For now, navigate to chat with the command
    setActiveTab('chat');
  };
  
  const activePlans = plans.filter(p => p.status === 'in_progress' || p.status === 'review');
  const hasProjects = activePlans.length > 0;
  const hasInterview = interviewAnswers && interviewAnswers.length > 0;
  const hasBrainstorm = brainstormReports.length > 0;
  
  const smartActions = getSmartActions(hasInterview, hasBrainstorm, hasProjects);
  const primaryAction = smartActions.find(a => a.priority === 'high') || smartActions[0];
  const otherActions = smartActions.filter(a => a !== primaryAction);

  // Test splash + onboarding flow
  if (showTestSplash) {
    return <SplashScreen onComplete={() => {
      setShowTestSplash(false);
      setShowTestOnboarding(true);
    }} />;
  }
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-8">
      {/* Hero Section - Current Focus */}
      <div className="glass-card p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {!hasInterview ? 'Chào mừng! 👋' : hasProjects ? 'Dự án đang tiến triển!' : 'Tiếp tục nào!'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {!hasInterview 
                  ? 'Bắt đầu mô tả ý tưởng để AI giúp bạn xây dựng'
                  : hasProjects 
                    ? `Bạn có ${activePlans.length} dự án đang thực hiện`
                    : 'AI đã sẵn sàng giúp bạn tiếp tục'}
              </p>
            </div>
          </div>
          
          {/* Primary Smart Action - Big CTA */}
          {primaryAction && (
            <button
              onClick={() => setActiveTab(primaryAction.tab)}
              className="w-full p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border-2 border-primary/30 hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-lg",
                  primaryAction.gradient
                )}>
                  <primaryAction.icon className="w-7 h-7" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      Đề xuất cho bạn
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{primaryAction.label}</h3>
                  <p className="text-sm text-muted-foreground">{primaryAction.description}</p>
                </div>
                
                <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform">
                  <PlayCircle className="w-5 h-5" />
                  <span className="hidden sm:block">Bắt đầu</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Smart Actions Grid */}
      {otherActions.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Bạn cũng có thể
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherActions.slice(0, 6).map((action) => {
              const Icon = action.icon;
              
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveTab(action.tab)}
                  className={cn(
                    "p-4 rounded-xl text-left transition-all hover:scale-[1.02] group",
                    action.priority === 'high' 
                      ? "bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20" 
                      : "bg-secondary/50 hover:bg-secondary border border-transparent"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                      `bg-gradient-to-br ${action.gradient} text-white`
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-0.5 truncate">{action.label}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions Grid - 2x2 Layout */}
      {hasProjects && (
        <div className="glass-card p-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Hành động nhanh
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Fix & Debug */}
            <button
              onClick={() => setActiveTab('fix')}
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">Fix & Debug</h3>
                  <p className="text-xs text-muted-foreground">Sửa lỗi tự động</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </div>
            </button>

            {/* Save Points */}
            <button
              onClick={() => setActiveTab('save')}
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <Save className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">Save Points</h3>
                  <p className="text-xs text-muted-foreground">Lưu & Publish</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </div>
            </button>

            {/* Dev Server */}
            <button
              onClick={() => setActiveTab('files')}
              className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                  <Server className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">Dev Server</h3>
                  <p className="text-xs text-muted-foreground">Quản lý files</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </div>
            </button>

            {/* Quick Cook */}
            <button
              onClick={() => setShowQuickCookModal(true)}
              className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">Quick Cook</h3>
                  <p className="text-xs text-muted-foreground">Thêm tính năng nhanh</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Recent Activity Feed - When has projects */}
      {hasProjects && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" />
              Hoạt động gần đây
            </h2>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Hôm nay
            </button>
          </div>
          
          <div className="space-y-3">
            {getRecentActivity().map((activity) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-all"
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    activity.type === 'file' && "bg-blue-500/20 text-blue-400",
                    activity.type === 'commit' && "bg-green-500/20 text-green-400",
                    activity.type === 'deploy' && "bg-purple-500/20 text-purple-400",
                    activity.type === 'fix' && "bg-orange-500/20 text-orange-400"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{activity.action}</span>
                      <span className="text-sm font-medium truncate">{activity.target}</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Projects */}
      {hasProjects && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Dự án đang thực hiện
            </h2>
            <button 
              onClick={() => setActiveTab('plans')}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activePlans.slice(0, 4).map((plan) => (
              <button
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan.id);
                  setActiveTab('plans');
                }}
                className="p-4 bg-secondary/50 rounded-xl text-left hover:bg-secondary transition-all hover:scale-[1.01] group"
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

      {/* Quick Tips */}
      <div className="glass-card p-5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            💡
          </div>
          <div>
            <h3 className="font-medium mb-1">Mẹo sử dụng</h3>
            <p className="text-sm text-muted-foreground">
              {!hasInterview 
                ? 'Bắt đầu với "Mô tả ý tưởng" - trả lời vài câu hỏi đơn giản và AI sẽ hiểu bạn muốn xây dựng gì.'
                : hasBrainstorm
                  ? 'Bạn có thể quay lại bất kỳ bước nào. Không nhất thiết phải theo thứ tự!'
                  : 'AI đã ghi nhận ý tưởng của bạn. Tiếp tục Brainstorm hoặc upload Design để bắt đầu xây dựng.'}
            </p>
          </div>
          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </div>
      </div>

      {/* Dev: Test Onboarding Flow */}
      <div className="glass-card p-4 border-dashed border-2 border-orange-500/30 bg-orange-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h3 className="font-medium text-sm">🧪 Dev: Test Onboarding</h3>
              <p className="text-xs text-muted-foreground">Replay Welcome + Tour flow</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowTestCLISetup(true)}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg text-sm font-medium transition-all"
            >
              CLI Setup
            </button>
            <button
              onClick={() => setShowTestSplash(true)}
              className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded-lg text-sm font-medium transition-all"
            >
              Full Flow
            </button>
          </div>
        </div>
      </div>

      {/* Onboarding Tour Overlay */}
      {showTestOnboarding && (
        <OnboardingTour 
          onComplete={() => setShowTestOnboarding(false)}
          onSkip={() => setShowTestOnboarding(false)}
        />
      )}

      {/* CLI Setup Overlay */}
      {showTestCLISetup && (
        <OnboardingCLISetup 
          onComplete={() => setShowTestCLISetup(false)}
          onSkip={() => setShowTestCLISetup(false)}
        />
      )}

      {/* Quick Cook Modal */}
      <QuickCookModal
        open={showQuickCookModal}
        onOpenChange={setShowQuickCookModal}
        onCook={handleQuickCook}
      />
    </div>
  );
}