import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Terminal,
  Download,
  ExternalLink,
  Copy,
  Check,
  Rocket,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface OnboardingCLISetupProps {
  onComplete: () => void;
  onSkip: () => void;
}

const InstallCard = ({ 
  name, 
  description, 
  installCmd, 
  repoUrl,
  icon
}: { 
  name: string; 
  description: string; 
  installCmd: string; 
  repoUrl: string;
  icon: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
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
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg border border-border p-3">
            <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
            <code className="text-sm text-foreground flex-1 font-mono truncate">{installCmd}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-3 shrink-0"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 text-xs">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function OnboardingCLISetup({ onComplete, onSkip }: OnboardingCLISetupProps) {
  const [step, setStep] = useState<'welcome' | 'install' | 'ready'>('welcome');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={onSkip}
      />
      
      {/* Content */}
      <Card className="relative z-10 w-full max-w-2xl border-primary/20 shadow-2xl overflow-hidden">
        {/* Header gradient */}
        <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        
        {/* Skip button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-foreground z-10"
          onClick={onSkip}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-8">
          {step === 'welcome' && (
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Chào mừng đến VividKit! 🎉
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Biến ý tưởng thành ứng dụng thực tế với sự hỗ trợ của AI. 
                  Trước tiên, hãy cài đặt các công cụ cần thiết.
                </p>
              </div>
              <Button size="lg" onClick={() => setStep('install')} className="px-8">
                Bắt đầu cài đặt
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}

          {step === 'install' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
                  <Download className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Cài đặt công cụ CLI
                </h2>
                <p className="text-muted-foreground">
                  Để sử dụng VividKit hiệu quả, bạn cần cài đặt 2 công cụ sau:
                </p>
              </div>

              <div className="space-y-4">
                <InstallCard 
                  name="Claudekit CLI"
                  description="Công cụ dòng lệnh để tương tác với Claude AI, giúp bạn tạo và quản lý các dự án."
                  installCmd="npm install -g claudekit-cli"
                  repoUrl="https://github.com/mrgoonie/claudekit-cli"
                  icon={<Terminal className="h-6 w-6" />}
                />
                <InstallCard 
                  name="CCS (Claude Context System)"
                  description="Hệ thống quản lý context cho Claude, giúp AI hiểu rõ hơn về dự án của bạn."
                  installCmd="npm install -g ccs"
                  repoUrl="https://github.com/kaitranntt/ccs"
                  icon={<Terminal className="h-6 w-6" />}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep('welcome')} className="flex-1">
                  Quay lại
                </Button>
                <Button onClick={() => setStep('ready')} className="flex-1">
                  Đã cài đặt xong
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  Mở Terminal và chạy các lệnh trên để cài đặt
                </p>
                <button 
                  onClick={onComplete}
                  className="text-xs text-primary hover:underline"
                >
                  Đã cài rồi? Bỏ qua bước này →
                </button>
              </div>
            </div>
          )}

          {step === 'ready' && (
            <div className="text-center space-y-6">
              <div className="inline-flex p-4 rounded-full bg-green-500/10 text-green-500">
                <Rocket className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-3">
                  Sẵn sàng bắt đầu! 🚀
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Tuyệt vời! Bạn đã cài đặt xong các công cụ cần thiết. 
                  Hãy bắt đầu tạo ứng dụng đầu tiên của bạn!
                </p>
              </div>
              <Button size="lg" onClick={onComplete} className="px-8">
                Bắt đầu sử dụng VividKit
                <Rocket className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {['welcome', 'install', 'ready'].map((s, i) => (
              <div 
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}