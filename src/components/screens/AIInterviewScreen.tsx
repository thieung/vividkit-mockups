import { useState } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, MessageCircle, Target, Users, Palette, CheckCircle2, Loader2, Lightbulb } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo.png';

interface InterviewQuestion {
  id: string;
  question: string;
  placeholder: string;
  icon: React.ElementType;
  options?: string[];
}

const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'idea',
    question: 'Bạn muốn xây dựng gì?',
    placeholder: 'Mô tả ý tưởng của bạn... Ví dụ: "Một app quản lý công việc với tính năng nhắc nhở"',
    icon: Lightbulb,
  },
  {
    id: 'goal',
    question: 'Mục tiêu chính của sản phẩm này là gì?',
    placeholder: 'Ví dụ: "Giúp người dùng quản lý thời gian hiệu quả hơn"',
    icon: Target,
    options: ['Giải quyết vấn đề cá nhân', 'Kinh doanh / Startup', 'Portfolio / Demo', 'Học hỏi / Thử nghiệm'],
  },
  {
    id: 'users',
    question: 'Ai sẽ sử dụng sản phẩm này?',
    placeholder: 'Mô tả đối tượng người dùng mục tiêu...',
    icon: Users,
    options: ['Chính mình', 'Bạn bè / Gia đình', 'Khách hàng tiềm năng', 'Cộng đồng rộng'],
  },
  {
    id: 'features',
    question: 'Tính năng quan trọng nhất cần có?',
    placeholder: 'Liệt kê 2-3 tính năng cốt lõi...',
    icon: MessageCircle,
    options: ['Đăng nhập / Tài khoản', 'Lưu trữ dữ liệu', 'Thông báo / Nhắc nhở', 'Thanh toán', 'Chia sẻ / Social'],
  },
  {
    id: 'style',
    question: 'Bạn thích phong cách thiết kế như thế nào?',
    placeholder: 'Mô tả phong cách hoặc reference...',
    icon: Palette,
    options: ['Tối giản / Minimal', 'Hiện đại / Colorful', 'Chuyên nghiệp / Corporate', 'Vui nhộn / Playful'],
  },
];

interface Answer {
  questionId: string;
  text: string;
  selectedOptions: string[];
}

export function AIInterviewScreen() {
  const { setActiveTab, addMessage, userMode } = useAppStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    interviewQuestions.map(q => ({ questionId: q.id, text: '', selectedOptions: [] }))
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = interviewQuestions[currentStep];
  const currentAnswer = answers[currentStep];
  const totalSteps = interviewQuestions.length;

  const updateAnswer = (text: string) => {
    setAnswers(prev => prev.map((a, i) => 
      i === currentStep ? { ...a, text } : a
    ));
  };

  const toggleOption = (option: string) => {
    setAnswers(prev => prev.map((a, i) => {
      if (i !== currentStep) return a;
      const hasOption = a.selectedOptions.includes(option);
      return {
        ...a,
        selectedOptions: hasOption 
          ? a.selectedOptions.filter(o => o !== option)
          : [...a.selectedOptions, option]
      };
    }));
  };

  const canProceed = currentAnswer.text.length > 0 || currentAnswer.selectedOptions.length > 0;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    }
  };

  const handleStartBuilding = async () => {
    setIsProcessing(true);
    
    // Build context from answers
    const context = answers.map((a, i) => {
      const q = interviewQuestions[i];
      const response = [a.text, ...a.selectedOptions].filter(Boolean).join(', ');
      return `**${q.question}**\n${response}`;
    }).join('\n\n');

    // Add to chat as user message
    addMessage({
      role: 'user',
      content: `Tôi muốn xây dựng một sản phẩm với các thông tin sau:\n\n${context}`,
    });

    // Simulate AI processing
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: `Tuyệt vời! Tôi đã hiểu ý tưởng của bạn. Dựa trên thông tin bạn cung cấp, tôi sẽ giúp bạn:\n\n1. **Phân tích yêu cầu** - Xác định các tính năng cần thiết\n2. **Tạo wireframe** - Phác thảo giao diện cơ bản\n3. **Bắt đầu code** - Xây dựng từng phần theo thứ tự ưu tiên\n\nBạn sẵn sàng bắt đầu chưa? Tôi sẽ hỏi thêm một vài câu hỏi chi tiết trong quá trình build.`,
        provider: 'AI Assistant',
        toolCalls: [
          { name: 'Analyze Requirements', status: 'done' },
          { name: 'Generate Plan', status: 'done' },
        ],
      });
      
      setActiveTab('chat');
    }, 1500);
  };

  const renderSummary = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Xác nhận thông tin</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Kiểm tra lại trước khi AI bắt đầu phân tích
        </p>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
        {answers.map((answer, i) => {
          const q = interviewQuestions[i];
          const Icon = q.icon;
          const hasContent = answer.text || answer.selectedOptions.length > 0;
          
          return (
            <div 
              key={q.id} 
              className={cn(
                "glass-card p-4 transition-opacity",
                !hasContent && "opacity-50"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{q.question}</span>
              </div>
              <div className="pl-6">
                {answer.text && (
                  <p className="text-sm text-muted-foreground">{answer.text}</p>
                )}
                {answer.selectedOptions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {answer.selectedOptions.map(opt => (
                      <span key={opt} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {opt}
                      </span>
                    ))}
                  </div>
                )}
                {!hasContent && (
                  <p className="text-sm text-muted-foreground italic">Chưa trả lời</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card p-4 border-primary/30 bg-primary/5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">AI sẽ làm gì tiếp theo?</p>
            <ul className="text-xs text-muted-foreground mt-2 space-y-1">
              <li>• Phân tích yêu cầu và đề xuất cấu trúc</li>
              <li>• Hỏi thêm chi tiết nếu cần</li>
              <li>• Bắt đầu xây dựng từng phần</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestion = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <currentQuestion.icon className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-medium">{currentQuestion.question}</h2>
        {currentStep === 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Đừng lo nếu chưa rõ ràng - AI sẽ giúp bạn làm rõ
          </p>
        )}
      </div>

      {/* Text Input */}
      <textarea
        value={currentAnswer.text}
        onChange={(e) => updateAnswer(e.target.value)}
        placeholder={currentQuestion.placeholder}
        className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {/* Quick Options */}
      {currentQuestion.options && (
        <div>
          <p className="text-xs text-muted-foreground mb-3">Hoặc chọn nhanh:</p>
          <div className="flex flex-wrap gap-2">
            {currentQuestion.options.map(option => {
              const isSelected = currentAnswer.selectedOptions.includes(option);
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all",
                    isSelected 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Hint */}
      {currentStep > 0 && userMode === 'simple' && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-300">
            {currentStep === 1 && "Mục tiêu rõ ràng giúp AI đưa ra gợi ý phù hợp hơn"}
            {currentStep === 2 && "Hiểu người dùng giúp thiết kế UX tốt hơn"}
            {currentStep === 3 && "Tập trung vào 2-3 tính năng cốt lõi cho MVP"}
            {currentStep === 4 && "Bạn có thể skip nếu muốn AI tự đề xuất"}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center justify-center animate-fade-in px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <img src={logoImage} alt="VividKit" className="w-10 h-10 rounded-lg" />
        <span className="text-2xl font-semibold gradient-text">VividKit</span>
      </div>
      
      <h1 className="text-lg font-medium mb-2 text-muted-foreground">
        {showSummary ? 'Xem lại & Bắt đầu' : 'AI Interview'}
      </h1>
      
      {/* Progress */}
      {!showSummary && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">
            Câu hỏi {currentStep + 1} / {totalSteps}
          </span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="flex items-center gap-1.5 mb-8 w-full max-w-md">
        {interviewQuestions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 rounded-full flex-1 transition-all",
              i < currentStep ? "bg-primary" : 
              i === currentStep && !showSummary ? "bg-primary animate-pulse" : 
              showSummary ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="glass-card p-6 max-w-xl w-full">
        {showSummary ? renderSummary() : renderQuestion()}
      </div>
      
      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 && !showSummary}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại
        </button>
        
        {showSummary ? (
          <button
            onClick={handleStartBuilding}
            disabled={isProcessing}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Bắt đầu xây dựng
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
              canProceed 
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {currentStep === totalSteps - 1 ? 'Xem tổng quan' : 'Tiếp tục'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Skip hint */}
      {!showSummary && currentStep > 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Có thể bỏ qua nếu chưa chắc chắn
        </p>
      )}
    </div>
  );
}