import { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Layout, 
  User, 
  List, 
  Settings,
  Loader2,
  Check,
  Edit3,
  Zap
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo.png';

interface WireframeSection {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

interface ConceptData {
  appName: string;
  tagline: string;
  colorScheme: string;
  sections: WireframeSection[];
  features: string[];
}

export function ConceptPreviewScreen() {
  const { setActiveTab, addMessage, interviewAnswers } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(true);
  const [conceptData, setConceptData] = useState<ConceptData | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  // Generate concept based on interview answers
  useEffect(() => {
    const timer = setTimeout(() => {
      // Parse interview answers to generate concept
      const idea = interviewAnswers?.find(a => a.questionId === 'idea');
      const style = interviewAnswers?.find(a => a.questionId === 'style');
      const features = interviewAnswers?.find(a => a.questionId === 'features');
      
      const appName = idea?.text?.split(' ').slice(0, 2).join('') || 'MyApp';
      const selectedStyle = style?.selectedOptions?.[0] || 'Hiện đại / Colorful';
      
      const colorScheme = selectedStyle.includes('Tối giản') ? 'minimal' :
                         selectedStyle.includes('Chuyên nghiệp') ? 'corporate' :
                         selectedStyle.includes('Vui nhộn') ? 'playful' : 'modern';

      const generatedSections: WireframeSection[] = [
        { id: 'header', name: 'Header / Navigation', icon: Layout, description: 'Logo, menu chính, và user actions' },
        { id: 'hero', name: 'Hero Section', icon: Zap, description: 'Banner chính với CTA nổi bật' },
        { id: 'features', name: 'Features List', icon: List, description: 'Hiển thị các tính năng chính' },
        { id: 'profile', name: 'User Profile', icon: User, description: 'Quản lý thông tin người dùng' },
        { id: 'settings', name: 'Settings', icon: Settings, description: 'Cài đặt và preferences' },
      ];

      // Add features based on interview
      const selectedFeatures = features?.selectedOptions || [];
      if (selectedFeatures.includes('Đăng nhập / Tài khoản')) {
        generatedSections.splice(1, 0, { 
          id: 'auth', 
          name: 'Login / Signup', 
          icon: User, 
          description: 'Đăng nhập và đăng ký tài khoản' 
        });
      }

      setConceptData({
        appName: appName.charAt(0).toUpperCase() + appName.slice(1),
        tagline: idea?.text?.slice(0, 50) || 'App description here',
        colorScheme,
        sections: generatedSections,
        features: selectedFeatures,
      });
      
      setIsGenerating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [interviewAnswers]);

  const handleStartBuilding = () => {
    // Build context from interview answers
    const context = interviewAnswers?.map((a) => {
      const response = [a.text, ...a.selectedOptions].filter(Boolean).join(', ');
      return `• ${a.questionId}: ${response}`;
    }).join('\n') || '';

    addMessage({
      role: 'user',
      content: `Tôi đã xem concept và muốn bắt đầu xây dựng:\n\n${context}\n\nHãy bắt đầu với layout cơ bản.`,
    });

    addMessage({
      role: 'assistant',
      content: `Tuyệt vời! Tôi sẽ bắt đầu xây dựng **${conceptData?.appName}** theo concept đã preview.\n\n**Bước 1:** Tạo cấu trúc layout cơ bản\n**Bước 2:** Thêm các components chính\n**Bước 3:** Style theo phong cách đã chọn\n\nĐang bắt đầu...`,
      provider: 'AI Assistant',
      toolCalls: [
        { name: 'Create Layout', status: 'done' },
        { name: 'Generate Components', status: 'running' },
      ],
    });

    setActiveTab('chat');
  };

  const handleEdit = () => {
    setActiveTab('wizard');
  };

  if (isGenerating) {
    return (
      <div className="h-full flex flex-col items-center justify-center animate-fade-in px-4">
        <div className="flex items-center gap-2 mb-8">
          <img src={logoImage} alt="VividKit" className="w-10 h-10 rounded-lg" />
          <span className="text-2xl font-semibold gradient-text">VividKit</span>
        </div>
        
        <div className="glass-card p-8 max-w-md w-full text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <h2 className="text-lg font-semibold mb-2">Đang tạo Concept...</h2>
          <p className="text-sm text-muted-foreground">
            AI đang phân tích ý tưởng và tạo wireframe cho bạn
          </p>
          
          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-green-500" />
              <span>Phân tích yêu cầu</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span>Tạo wireframe layout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-50">
              <div className="w-4 h-4 rounded-full border border-muted-foreground" />
              <span>Đề xuất màu sắc & style</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="VividKit" className="w-8 h-8 rounded-lg" />
          <div>
            <h1 className="text-lg font-semibold">Concept Preview</h1>
            <p className="text-xs text-muted-foreground">Xem trước ý tưởng của bạn</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-4 h-4" />
            Chỉnh sửa
          </button>
          <button
            onClick={handleStartBuilding}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Bắt đầu Build
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Sections List */}
        <div className="w-64 border-r border-border p-4 overflow-auto">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Các màn hình
          </h3>
          <div className="space-y-1">
            {conceptData?.sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  className={cn(
                    "w-full px-3 py-2 rounded-lg text-left text-sm transition-colors flex items-center gap-2",
                    activeSection === index
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {section.name}
                </button>
              );
            })}
          </div>

          {/* Features */}
          {conceptData?.features && conceptData.features.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Tính năng
              </h3>
              <div className="space-y-2">
                {conceptData.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check className="w-3 h-3 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 p-6 overflow-auto bg-muted/30">
          {/* App Info Card */}
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl",
                conceptData?.colorScheme === 'minimal' ? "bg-slate-800" :
                conceptData?.colorScheme === 'corporate' ? "bg-blue-600" :
                conceptData?.colorScheme === 'playful' ? "bg-gradient-to-br from-pink-500 to-orange-400" :
                "bg-gradient-to-br from-primary to-purple-600"
              )}>
                {conceptData?.appName.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{conceptData?.appName}</h2>
                <p className="text-sm text-muted-foreground">{conceptData?.tagline}</p>
              </div>
            </div>
          </div>

          {/* Wireframe Preview */}
          <div className="glass-card overflow-hidden">
            <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-muted-foreground ml-2">
                {conceptData?.sections[activeSection]?.name}
              </span>
            </div>
            
            {/* Wireframe Content */}
            <div className="p-6 min-h-[400px] bg-background">
              {conceptData?.sections[activeSection]?.id === 'header' && (
                <WireframeHeader colorScheme={conceptData.colorScheme} appName={conceptData.appName} />
              )}
              {conceptData?.sections[activeSection]?.id === 'hero' && (
                <WireframeHero colorScheme={conceptData.colorScheme} />
              )}
              {conceptData?.sections[activeSection]?.id === 'features' && (
                <WireframeFeatures colorScheme={conceptData.colorScheme} />
              )}
              {conceptData?.sections[activeSection]?.id === 'auth' && (
                <WireframeAuth colorScheme={conceptData.colorScheme} />
              )}
              {conceptData?.sections[activeSection]?.id === 'profile' && (
                <WireframeProfile colorScheme={conceptData.colorScheme} />
              )}
              {conceptData?.sections[activeSection]?.id === 'settings' && (
                <WireframeSettings colorScheme={conceptData.colorScheme} />
              )}
            </div>
          </div>

          {/* Section Description */}
          <div className="mt-4 p-4 glass-card border-primary/20 bg-primary/5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  {conceptData?.sections[activeSection]?.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {conceptData?.sections[activeSection]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wireframe Components
function WireframeHeader({ colorScheme, appName }: { colorScheme: string; appName: string }) {
  return (
    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-muted-foreground/20" />
          <div className="w-20 h-4 rounded bg-muted-foreground/20" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-3 rounded bg-muted-foreground/15" />
          <div className="w-12 h-3 rounded bg-muted-foreground/15" />
          <div className="w-12 h-3 rounded bg-muted-foreground/15" />
          <div className="w-20 h-8 rounded bg-primary/30" />
        </div>
      </div>
    </div>
  );
}

function WireframeHero({ colorScheme }: { colorScheme: string }) {
  return (
    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
      <div className="w-3/4 h-8 rounded bg-muted-foreground/20 mx-auto mb-4" />
      <div className="w-1/2 h-4 rounded bg-muted-foreground/15 mx-auto mb-6" />
      <div className="flex justify-center gap-4">
        <div className="w-32 h-10 rounded-lg bg-primary/40" />
        <div className="w-32 h-10 rounded-lg border-2 border-muted-foreground/30" />
      </div>
      <div className="mt-8 w-full h-48 rounded-lg bg-muted-foreground/10 flex items-center justify-center">
        <Layout className="w-12 h-12 text-muted-foreground/30" />
      </div>
    </div>
  );
}

function WireframeFeatures({ colorScheme }: { colorScheme: string }) {
  return (
    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
      <div className="w-40 h-6 rounded bg-muted-foreground/20 mx-auto mb-6" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg border border-muted-foreground/20 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 mx-auto mb-3" />
            <div className="w-20 h-4 rounded bg-muted-foreground/20 mx-auto mb-2" />
            <div className="w-full h-3 rounded bg-muted-foreground/10" />
            <div className="w-3/4 h-3 rounded bg-muted-foreground/10 mx-auto mt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WireframeAuth({ colorScheme }: { colorScheme: string }) {
  return (
    <div className="max-w-sm mx-auto border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
      <div className="w-16 h-16 rounded-full bg-muted-foreground/20 mx-auto mb-4" />
      <div className="w-24 h-5 rounded bg-muted-foreground/20 mx-auto mb-6" />
      <div className="space-y-4">
        <div className="w-full h-10 rounded-lg bg-muted-foreground/10" />
        <div className="w-full h-10 rounded-lg bg-muted-foreground/10" />
        <div className="w-full h-10 rounded-lg bg-primary/40" />
      </div>
      <div className="mt-4 flex items-center gap-2 justify-center">
        <div className="h-px flex-1 bg-muted-foreground/20" />
        <span className="text-xs text-muted-foreground">hoặc</span>
        <div className="h-px flex-1 bg-muted-foreground/20" />
      </div>
      <div className="mt-4 flex gap-2 justify-center">
        <div className="w-10 h-10 rounded-lg border border-muted-foreground/30" />
        <div className="w-10 h-10 rounded-lg border border-muted-foreground/30" />
      </div>
    </div>
  );
}

function WireframeProfile({ colorScheme }: { colorScheme: string }) {
  return (
    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-muted-foreground/20" />
        <div className="flex-1">
          <div className="w-32 h-6 rounded bg-muted-foreground/20 mb-2" />
          <div className="w-48 h-4 rounded bg-muted-foreground/15 mb-4" />
          <div className="flex gap-2">
            <div className="w-20 h-8 rounded bg-primary/30" />
            <div className="w-20 h-8 rounded border border-muted-foreground/30" />
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-lg bg-muted-foreground/10 text-center">
            <div className="w-8 h-8 rounded bg-muted-foreground/20 mx-auto mb-2" />
            <div className="w-12 h-3 rounded bg-muted-foreground/15 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function WireframeSettings({ colorScheme }: { colorScheme: string }) {
  return (
    <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6">
      <div className="w-24 h-5 rounded bg-muted-foreground/20 mb-6" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted-foreground/5 border border-muted-foreground/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-muted-foreground/15" />
              <div>
                <div className="w-24 h-4 rounded bg-muted-foreground/20 mb-1" />
                <div className="w-32 h-3 rounded bg-muted-foreground/10" />
              </div>
            </div>
            <div className="w-10 h-5 rounded-full bg-muted-foreground/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
