import { useState } from 'react';
import { ArrowLeft, Calendar, Tag, FileText, Play, Check, Sparkles, BarChart3, Zap, MessageSquare, Edit3, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';

type Tab = 'overview' | 'phases' | 'decisions' | 'raw';

interface Phase {
  id: number;
  title: string;
  file: string;
  done: boolean;
}

export function PlanDetailScreen() {
  const { setSelectedPlan, selectedPlan, plans } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [phases, setPhases] = useState<Phase[]>([
    { id: 1, title: 'Update TOC Component', file: 'phase-01-update-toc.md', done: true },
    { id: 2, title: 'Integrate into Layout', file: 'phase-02-integrate.md', done: false },
  ]);
  const [successCriteria, setSuccessCriteria] = useState([
    { id: 1, text: 'TOC visible on lg+ screens', done: true },
    { id: 2, text: 'Sticky on scroll', done: true },
    { id: 3, text: 'Glassmorphism styling', done: false },
    { id: 4, text: 'State persisted in localStorage', done: false },
  ]);
  const [refineText, setRefineText] = useState('');
  
  const plan = plans.find(p => p.id === selectedPlan);
  const completedPhases = phases.filter(p => p.done).length;
  const progress = Math.round((completedPhases / phases.length) * 100);
  
  const togglePhase = (id: number) => {
    setPhases(phases.map(p => p.id === id ? { ...p, done: !p.done } : p));
  };
  
  const toggleCriteria = (id: number) => {
    setSuccessCriteria(criteria => 
      criteria.map(c => c.id === id ? { ...c, done: !c.done } : c)
    );
  };
  
  if (!plan) return null;
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => setSelectedPlan(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Plans / {plan.title}
        </button>
        
        <h1 className="text-2xl font-semibold mb-2">{plan.title}</h1>
        
        <div className="flex items-center gap-4 text-sm">
          <span className={cn(
            "px-2 py-1 rounded-full border text-xs font-medium",
            plan.status === 'draft' ? 'bg-muted text-muted-foreground' :
            plan.status === 'in_progress' ? 'bg-primary/20 text-primary border-primary/30' :
            plan.status === 'review' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
            'bg-green-500/20 text-green-400 border-green-500/30'
          )}>
            📍 {plan.status.replace('_', ' ').charAt(0).toUpperCase() + plan.status.slice(1).replace('_', ' ')}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {plan.date}
          </span>
          <span className="text-muted-foreground font-mono text-xs">[251211-1220-guides-toc]</span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-6 min-h-0 overflow-hidden">
        {/* Left Column */}
        <div className="col-span-2 flex flex-col min-h-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-border pb-2">
            {[
              { id: 'overview' as Tab, label: 'Overview' },
              { id: 'phases' as Tab, label: `Phases (${phases.length})` },
              { id: 'decisions' as Tab, label: 'Decisions' },
              { id: 'raw' as Tab, label: 'Raw MD' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="flex-1 overflow-auto space-y-6">
            {/* Overview */}
            <div className="glass-card p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Overview
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Add collapsible TOC to all Guides pages. TOC floated right, sticky on scroll. 
                Uses glassmorphism styling consistent with the rest of the site.
              </p>
            </div>
            
            {/* Current State */}
            <div className="glass-card p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                Current State
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>TableOfContents.astro: Shows xl only</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>GuidesLayout.astro: 2-column layout</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>glass-card classes available</span>
                </li>
              </ul>
            </div>
            
            {/* Phases */}
            <div className="glass-card p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                🔄 Implementation Phases
              </h3>
              <div className="space-y-3">
                {phases.map((phase) => (
                  <div
                    key={phase.id}
                    className={cn(
                      "p-3 rounded-lg border transition-all",
                      phase.done 
                        ? "bg-green-500/5 border-green-500/30" 
                        : "bg-secondary/50 border-border"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          onClick={() => togglePhase(phase.id)}
                          className={cn(
                            "w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors",
                            phase.done 
                              ? "bg-green-500 border-green-500" 
                              : "border-muted-foreground hover:border-primary"
                          )}
                        >
                          {phase.done && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <p className={cn("text-sm font-medium", phase.done && "line-through text-muted-foreground")}>
                            Phase {phase.id}: {phase.title}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">{phase.file}</p>
                        </div>
                      </div>
                      {!phase.done && (
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            /code
                          </button>
                          <button
                            onClick={() => togglePhase(phase.id)}
                            className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-xs hover:bg-secondary/80 transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark Done
                          </button>
                        </div>
                      )}
                      {phase.done && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Done
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technical Decisions */}
            <div className="glass-card p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                🔧 Technical Decisions
              </h3>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary">①</span>
                  <span>Collapse state: localStorage persistence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">②</span>
                  <span>Mobile: Hidden by default + toggle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">③</span>
                  <span>Styling: Use glass-card class</span>
                </li>
              </ol>
            </div>
            
            {/* Success Criteria */}
            <div className="glass-card p-4">
              <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                ✅ Success Criteria
              </h3>
              <div className="space-y-2">
                {successCriteria.map((criteria) => (
                  <div
                    key={criteria.id}
                    onClick={() => toggleCriteria(criteria.id)}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                      criteria.done 
                        ? "bg-green-500 border-green-500" 
                        : "border-muted-foreground group-hover:border-primary"
                    )}>
                      {criteria.done && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className={cn(
                      "text-sm transition-colors",
                      criteria.done ? "text-muted-foreground line-through" : "text-foreground"
                    )}>
                      {criteria.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-4 overflow-auto">
          {/* AI Refine */}
          <div className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              Refine with AI
            </h3>
            <textarea
              value={refineText}
              onChange={(e) => setRefineText(e.target.value)}
              placeholder="Can you add a phase for mobile styling?"
              className="w-full p-3 bg-input border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {['Add testing', 'Simplify'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setRefineText(suggestion)}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs hover:bg-secondary/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <button className="w-full mt-3 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Refine Plan
            </button>
          </div>
          
          {/* Progress */}
          <div className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              Progress
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{completedPhases} of {phases.length} phases</span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold">{phases.length}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="p-2 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold">{completedPhases}</p>
                  <p className="text-xs text-muted-foreground">Done</p>
                </div>
                <div className="p-2 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold">2</p>
                  <p className="text-xs text-muted-foreground">Files</p>
                </div>
                <div className="p-2 bg-secondary/50 rounded-lg">
                  <p className="text-lg font-semibold">5</p>
                  <p className="text-xs text-muted-foreground">Decisions</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <Zap className="w-4 h-4 text-yellow-400" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                Continue Implementation
              </button>
              <button className="w-full px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
                <Check className="w-4 h-4" />
                Mark All Complete
              </button>
              <button className="w-full px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Discuss in Chat
              </button>
              <button className="w-full px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Edit Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
