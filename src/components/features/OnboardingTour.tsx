import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  MessageSquare, 
  Lightbulb, 
  Paintbrush, 
  Wrench, 
  Rocket,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Download,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
  content?: React.ReactNode;
}

const InstallStep = ({ 
  name, 
  description, 
  installCmd, 
  repoUrl 
}: { 
  name: string; 
  description: string; 
  installCmd: string; 
  repoUrl: string;
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-foreground">{name}</h4>
        <a 
          href={repoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          GitHub <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <p className="text-xs text-muted-foreground mb-3">{description}</p>
      <div className="flex items-center gap-2 bg-background rounded-md border border-border p-2">
        <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
        <code className="text-xs text-foreground flex-1 font-mono">{installCmd}</code>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 shrink-0"
          onClick={handleCopy}
        >
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
    </div>
  );
};

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Chào mừng đến VividKit! 🎉',
    description: 'VividKit giúp bạn biến ý tưởng thành ứng dụng thực tế với sự hỗ trợ của AI. Trước tiên, hãy cài đặt các công cụ cần thiết!',
    icon: <Sparkles className="h-8 w-8" />,
  },
  {
    id: 'install-tools',
    title: 'Cài đặt công cụ CLI',
    description: 'Để sử dụng VividKit hiệu quả, bạn cần cài đặt 2 công cụ sau:',
    icon: <Download className="h-8 w-8" />,
    content: (
      <div className="space-y-3 mt-4">
        <InstallStep 
          name="Claudekit CLI"
          description="Công cụ dòng lệnh để tương tác với Claude AI"
          installCmd="npm install -g claudekit-cli"
          repoUrl="https://github.com/mrgoonie/claudekit-cli"
        />
        <InstallStep 
          name="CCS (Claude Context System)"
          description="Hệ thống quản lý context cho Claude"
          installCmd="npm install -g ccs"
          repoUrl="https://github.com/kaitranntt/ccs"
        />
      </div>
    ),
  },
  {
    id: 'interview',
    title: 'Bước 1: Phỏng vấn AI',
    description: 'AI sẽ hỏi bạn một số câu hỏi để hiểu rõ ý tưởng của bạn. Đừng lo, chỉ cần trả lời tự nhiên thôi!',
    icon: <MessageSquare className="h-8 w-8" />,
    highlight: 'wizard',
  },
  {
    id: 'brainstorm',
    title: 'Bước 2: Brainstorm',
    description: 'Cùng AI phát triển và mở rộng ý tưởng. Thêm tính năng, điều chỉnh concept để hoàn thiện hơn.',
    icon: <Lightbulb className="h-8 w-8" />,
    highlight: 'brainstorm',
  },
  {
    id: 'design',
    title: 'Bước 3: Thiết kế',
    description: 'Upload mockup hoặc để AI tạo design cho bạn. Xem trước và điều chỉnh giao diện theo ý muốn.',
    icon: <Paintbrush className="h-8 w-8" />,
    highlight: 'design',
  },
  {
    id: 'fix',
    title: 'Bước 4: Chỉnh sửa',
    description: 'Phát hiện lỗi? Muốn thay đổi? AI sẽ giúp bạn fix và cải thiện ứng dụng nhanh chóng.',
    icon: <Wrench className="h-8 w-8" />,
    highlight: 'fix',
  },
  {
    id: 'publish',
    title: 'Bước 5: Xuất bản',
    description: 'Khi đã hài lòng, xuất bản ứng dụng của bạn lên web để mọi người có thể sử dụng!',
    icon: <Rocket className="h-8 w-8" />,
    highlight: 'save',
  },
  {
    id: 'complete',
    title: 'Sẵn sàng bắt đầu! 🚀',
    description: 'Bạn đã hiểu cách sử dụng VividKit. Hãy bắt đầu với bước đầu tiên - Phỏng vấn AI nhé!',
    icon: <CheckCircle2 className="h-8 w-8" />,
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const step = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 150);
  };

  const handlePrev = () => {
    if (isFirstStep) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 150);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') onSkip();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onSkip}
      />
      
      {/* Tour Card */}
      <Card className={`relative z-10 w-full max-w-md mx-4 border-primary/20 shadow-2xl transition-all duration-300 ${
        isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        {/* Skip button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="pt-8 pb-6">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {currentStep + 1} / {tourSteps.length}
            </p>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              {step.icon}
            </div>
          </div>

          {/* Content */}
          <div className={`space-y-3 mb-6 ${step.content ? 'text-left' : 'text-center'}`}>
            <h3 className={`text-xl font-semibold text-foreground ${step.content ? '' : 'text-center'}`}>
              {step.title}
            </h3>
            <p className={`text-muted-foreground text-sm leading-relaxed ${step.content ? '' : 'text-center'}`}>
              {step.description}
            </p>
            {step.content}
          </div>

          {/* Step indicators */}
          <div className="flex justify-center gap-1.5 mb-6">
            {tourSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all duration-200 ${
                  index === currentStep 
                    ? 'w-6 bg-primary' 
                    : index < currentStep 
                      ? 'w-2 bg-primary/50' 
                      : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            {!isFirstStep && (
              <Button
                variant="outline"
                onClick={handlePrev}
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            )}
            <Button
              onClick={handleNext}
              className={isFirstStep ? 'w-full' : 'flex-1'}
            >
              {isLastStep ? (
                <>
                  Bắt đầu ngay
                  <Rocket className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  Tiếp theo
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Keyboard hint */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Dùng phím ← → để điều hướng, ESC để bỏ qua
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
