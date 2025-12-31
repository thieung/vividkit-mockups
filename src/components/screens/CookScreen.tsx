import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { 
  ChefHat, Send, Sparkles, Zap, CheckCircle2, Circle, 
  Loader2, MessageSquare, Search, FileText, Code, TestTube,
  GitBranch, BookOpen, ArrowRight, ToggleLeft, ToggleRight,
  Lightbulb, HelpCircle, Play, Pause, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type CookPhase = 'idle' | 'questions' | 'research' | 'planning' | 'building' | 'testing' | 'review' | 'done';

interface CookStep {
  id: CookPhase;
  label: string;
  icon: React.ElementType;
  description: string;
}

const cookSteps: CookStep[] = [
  { id: 'questions', label: 'Questions', icon: HelpCircle, description: 'Understanding your needs' },
  { id: 'research', label: 'Research', icon: Search, description: 'Finding best approach' },
  { id: 'planning', label: 'Plan', icon: FileText, description: 'Creating action plan' },
  { id: 'building', label: 'Build', icon: Code, description: 'Writing the code' },
  { id: 'testing', label: 'Test', icon: TestTube, description: 'Making sure it works' },
  { id: 'review', label: 'Review', icon: BookOpen, description: 'Final checks' },
  { id: 'done', label: 'Done', icon: CheckCircle2, description: 'Ready to use!' },
];

interface Message {
  id: string;
  role: 'user' | 'ai' | 'system';
  content: string;
  type?: 'question' | 'answer' | 'status' | 'suggestion';
  options?: string[];
}

export function CookScreen() {
  const { setActiveTab } = useAppStore();
  const [input, setInput] = useState('');
  const [autoMode, setAutoMode] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<CookPhase>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hey! 👋 I'm your AI builder. Tell me what feature you want to create, and I'll cook it up for you!",
      type: 'status'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...message, id: Date.now().toString() }]);
  };

  const simulateCooking = async (feature: string) => {
    setIsProcessing(true);
    
    // Phase 1: Questions
    setCurrentPhase('questions');
    await new Promise(r => setTimeout(r, 1000));
    
    if (!autoMode) {
      addMessage({
        role: 'ai',
        content: 'Let me understand better what you need:',
        type: 'question',
        options: [
          'Keep it simple - just the basics',
          'Add some nice animations',
          'Make it fully featured'
        ]
      });
      setIsProcessing(false);
      return; // Wait for user response in interactive mode
    }

    // Auto mode: continue through all phases
    addMessage({
      role: 'system',
      content: '🔍 Understanding your request...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 1500));

    // Phase 2: Research
    setCurrentPhase('research');
    addMessage({
      role: 'system',
      content: '📚 Researching best practices...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 2000));

    // Phase 3: Planning
    setCurrentPhase('planning');
    addMessage({
      role: 'ai',
      content: `Here's my plan for "${feature}":\n\n✅ Create component structure\n✅ Add styling and animations\n✅ Connect to data store\n✅ Add error handling`,
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 2000));

    // Phase 4: Building
    setCurrentPhase('building');
    addMessage({
      role: 'system',
      content: '🔨 Building your feature...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 3000));

    // Phase 5: Testing
    setCurrentPhase('testing');
    addMessage({
      role: 'system',
      content: '🧪 Running tests...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 1500));

    // Phase 6: Review
    setCurrentPhase('review');
    addMessage({
      role: 'system',
      content: '📋 Reviewing code quality...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 1000));

    // Phase 7: Done
    setCurrentPhase('done');
    addMessage({
      role: 'ai',
      content: `🎉 Your feature "${feature}" is ready!\n\nI've created:\n• New component with responsive design\n• Connected to your data store\n• Added smooth animations\n\nWant to see it in action or make changes?`,
      type: 'status'
    });

    setIsProcessing(false);
  };

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;
    
    addMessage({
      role: 'user',
      content: input,
      type: 'answer'
    });

    const userInput = input;
    setInput('');
    
    if (currentPhase === 'idle') {
      simulateCooking(userInput);
    } else if (currentPhase === 'questions' && !autoMode) {
      // Continue after answering question
      setIsProcessing(true);
      continueFromQuestions(userInput);
    }
  };

  const continueFromQuestions = async (answer: string) => {
    addMessage({
      role: 'system',
      content: `Got it! Going with "${answer}"`,
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 1000));

    // Continue through remaining phases
    setCurrentPhase('research');
    addMessage({
      role: 'system',
      content: '📚 Researching best approach...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 2000));

    setCurrentPhase('planning');
    addMessage({
      role: 'ai',
      content: 'Here\'s what I\'ll build:\n\n✅ Core functionality\n✅ Clean UI design\n✅ Smooth interactions',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 1500));

    setCurrentPhase('building');
    addMessage({
      role: 'system',
      content: '🔨 Building your feature...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 2500));

    setCurrentPhase('testing');
    addMessage({
      role: 'system',
      content: '🧪 Testing everything...',
      type: 'status'
    });
    await new Promise(r => setTimeout(r, 1500));

    setCurrentPhase('review');
    await new Promise(r => setTimeout(r, 1000));

    setCurrentPhase('done');
    addMessage({
      role: 'ai',
      content: '🎉 Done! Your feature is ready. Check the preview!',
      type: 'status'
    });

    setIsProcessing(false);
  };

  const handleOptionClick = (option: string) => {
    setInput(option);
    handleSend();
  };

  const handleReset = () => {
    setCurrentPhase('idle');
    setIsProcessing(false);
    setMessages([{
      id: '1',
      role: 'ai',
      content: "Hey! 👋 I'm your AI builder. Tell me what feature you want to create, and I'll cook it up for you!",
      type: 'status'
    }]);
  };

  const getPhaseIndex = (phase: CookPhase) => {
    if (phase === 'idle') return -1;
    return cookSteps.findIndex(s => s.id === phase);
  };

  const currentIndex = getPhaseIndex(currentPhase);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border/50 bg-card/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Cook Mode</h1>
              <p className="text-xs text-muted-foreground">Describe it → I build it</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Auto Mode Toggle */}
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                autoMode 
                  ? "bg-primary/20 text-primary border border-primary/30" 
                  : "bg-muted text-muted-foreground border border-border"
              )}
            >
              {autoMode ? <Zap className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
              {autoMode ? 'Auto Mode' : 'Interactive'}
            </button>

            {currentPhase !== 'idle' && (
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Start Over
              </Button>
            )}
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {cookSteps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentIndex;
            const isComplete = index < currentIndex;
            const isPending = index > currentIndex;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all text-xs",
                    isActive && "bg-primary/20 text-primary",
                    isComplete && "bg-green-500/20 text-green-500",
                    isPending && "bg-muted/50 text-muted-foreground"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isActive && isProcessing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <StepIcon className="w-3.5 h-3.5" />
                  )}
                  <span className="font-medium whitespace-nowrap">{step.label}</span>
                </div>
                {index < cookSteps.length - 1 && (
                  <ArrowRight className={cn(
                    "w-3 h-3 mx-1",
                    isComplete ? "text-green-500" : "text-muted-foreground/30"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === 'user' && "bg-primary text-primary-foreground",
                message.role === 'ai' && "bg-card border border-border",
                message.role === 'system' && "bg-muted/50 border border-border/50 text-muted-foreground text-sm"
              )}
            >
              {message.role === 'ai' && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">AI Builder</span>
                </div>
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
              
              {/* Option Buttons */}
              {message.options && currentPhase === 'questions' && !isProcessing && (
                <div className="mt-3 space-y-2">
                  {message.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-background/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all text-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 border-t border-border/50 bg-card/30">
        {/* Quick Suggestions */}
        {currentPhase === 'idle' && (
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setInput('Add a user profile page with avatar and settings')}
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              User Profile
            </Badge>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setInput('Create a dashboard with charts and stats')}
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Dashboard
            </Badge>
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={() => setInput('Add a contact form with email validation')}
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Contact Form
            </Badge>
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              currentPhase === 'idle' 
                ? "Describe the feature you want to build..." 
                : currentPhase === 'questions'
                ? "Type your answer or click an option above..."
                : "Add more details or instructions..."
            }
            className="min-h-[60px] max-h-[120px] resize-none bg-background"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isProcessing}
            className="h-auto px-4"
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          {autoMode 
            ? "🚀 Auto Mode: I'll make decisions for you and build fast!"
            : "💬 Interactive: I'll ask questions to understand exactly what you need"
          }
        </p>
      </div>
    </div>
  );
}
