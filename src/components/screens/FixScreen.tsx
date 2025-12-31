import { useState } from 'react';
import { AlertCircle, Sparkles, CheckCircle2, Loader2, Send, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

type FixStatus = 'idle' | 'investigating' | 'fixing' | 'done';

interface FixStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'done';
}

export function FixScreen() {
  const [problem, setProblem] = useState('');
  const [status, setStatus] = useState<FixStatus>('idle');
  const [steps, setSteps] = useState<FixStep[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!problem.trim()) return;
    
    setStatus('investigating');
    setResult(null);
    
    // Simulate AI investigation steps
    const investigationSteps: FixStep[] = [
      { id: '1', label: 'Understanding your problem...', status: 'active' },
      { id: '2', label: 'Checking for common issues...', status: 'pending' },
      { id: '3', label: 'Analyzing project files...', status: 'pending' },
      { id: '4', label: 'Finding the best solution...', status: 'pending' },
    ];
    
    setSteps(investigationSteps);
    
    // Simulate step progression
    for (let i = 0; i < investigationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx < i + 1 ? 'done' : idx === i + 1 ? 'active' : 'pending'
      })));
    }
    
    setStatus('fixing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('done');
    setResult("I've analyzed the issue and here's what I found:\n\n• The problem appears to be related to how the component handles state updates\n• I've identified a potential fix that should resolve this\n\nWould you like me to apply the fix automatically, or would you prefer to review the changes first?");
  };

  const handleReset = () => {
    setProblem('');
    setStatus('idle');
    setSteps([]);
    setResult(null);
  };

  const quickIssues = [
    "Something isn't showing correctly",
    "A button doesn't work",
    "The page looks broken",
    "I'm seeing an error message",
  ];

  return (
    <div className="h-full flex flex-col p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Help! Something's Wrong
        </h1>
        <p className="text-muted-foreground">
          Tell me what's not working and I'll investigate and fix it for you
        </p>
      </div>

      {status === 'idle' && (
        <>
          {/* Quick issue buttons */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              Quick picks:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickIssues.map((issue) => (
                <Button
                  key={issue}
                  variant="outline"
                  size="sm"
                  onClick={() => setProblem(issue)}
                  className="text-xs"
                >
                  {issue}
                </Button>
              ))}
            </div>
          </div>

          {/* Problem input */}
          <Card className="mb-4">
            <CardContent className="pt-4">
              <Textarea
                placeholder="Describe what's wrong... For example: 'The save button doesn't do anything when I click it' or 'The page shows a weird error'"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="min-h-[120px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
              />
            </CardContent>
          </Card>

          {/* Submit button */}
          <Button 
            onClick={handleSubmit} 
            disabled={!problem.trim()}
            size="lg"
            className="w-full gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Investigate & Fix
          </Button>
        </>
      )}

      {(status === 'investigating' || status === 'fixing') && (
        <Card className="flex-1">
          <CardContent className="pt-6">
            {/* Problem summary */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Your issue:</p>
              <p className="text-foreground">{problem}</p>
            </div>

            {/* Progress steps */}
            <div className="space-y-3">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-3">
                  {step.status === 'done' && (
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  )}
                  {step.status === 'active' && (
                    <Loader2 className="w-5 h-5 text-primary shrink-0 animate-spin" />
                  )}
                  {step.status === 'pending' && (
                    <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
                  )}
                  <span className={`text-sm ${
                    step.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
              
              {status === 'fixing' && (
                <div className="flex items-center gap-3 mt-4 pt-4 border-t">
                  <Loader2 className="w-5 h-5 text-primary shrink-0 animate-spin" />
                  <span className="text-sm text-foreground font-medium">
                    Applying the fix...
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {status === 'done' && result && (
        <Card className="flex-1">
          <CardContent className="pt-6">
            {/* Success header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Investigation Complete</h3>
                <p className="text-sm text-muted-foreground">Here's what I found</p>
              </div>
            </div>

            {/* Result */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6 whitespace-pre-wrap text-sm">
              {result}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button className="flex-1 gap-2">
                <Sparkles className="w-4 h-4" />
                Apply Fix
              </Button>
              <Button variant="outline" onClick={handleReset}>
                Report Another Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
