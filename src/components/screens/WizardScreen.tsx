import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Code2, Lightbulb, ClipboardList, HelpCircle } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo.png';

type Step = 1 | 2 | 3;

interface TaskOption {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const taskOptions: TaskOption[] = [
  { id: 'code', icon: Code2, title: 'Write or modify code', description: 'Create features, fix bugs, refactor' },
  { id: 'explore', icon: Lightbulb, title: 'Explore ideas or approaches', description: 'Brainstorm solutions, compare options' },
  { id: 'execute', icon: ClipboardList, title: 'Execute a plan', description: 'Implement from existing plan.md' },
  { id: 'unsure', icon: HelpCircle, title: "I'm not sure", description: 'Help me figure out what I need' },
];

export function WizardScreen() {
  const { setActiveTab } = useAppStore();
  const [step, setStep] = useState<Step>(1);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  
  const handleNext = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as Step);
    } else {
      setActiveTab('chat');
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as Step);
    }
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-center animate-fade-in">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <img src={logoImage} alt="VividKit" className="w-10 h-10 rounded-lg" />
        <span className="text-2xl font-semibold gradient-text">VividKit</span>
      </div>
      
      <h1 className="text-xl font-medium mb-8">Decision Wizard</h1>
      
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-sm text-muted-foreground">Step {step} of 3: Task Type</span>
      </div>
      
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              s === step ? "bg-primary w-6" : s < step ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="glass-card p-8 max-w-2xl w-full">
        <h2 className="text-lg font-medium text-center mb-6">
          What type of task do you want to accomplish?
        </h2>
        
        <div className="space-y-3">
          {taskOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedTask === option.id;
            
            return (
              <button
                key={option.id}
                onClick={() => setSelectedTask(option.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left",
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )} />
                <div className="flex-1">
                  <p className="font-medium text-sm">{option.title}</p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                {isSelected && <Check className="w-5 h-5 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedTask && step === 2}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
