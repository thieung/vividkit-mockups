import { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, FileText, Play, Check, Sparkles, BarChart3, Zap, MessageSquare, Edit3, ExternalLink, Link2 } from 'lucide-react';
import { useAppStore, Plan, PlanPhase } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

type Tab = 'overview' | 'phases' | 'decisions' | 'raw';

const complexityConfig = {
  fast: { label: '⚡ Fast', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  medium: { label: '⚡⚡ Medium', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  complex: { label: '⚡⚡⚡ Complex', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  ultra: { label: '⚡⚡⚡⚡ Ultra', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

const priorityConfig = {
  P1: { label: 'High Priority', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  P2: { label: 'Medium Priority', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  P3: { label: 'Low Priority', color: 'bg-muted text-muted-foreground border-border' },
};

export function PlanDetailScreen() {
  const { setSelectedPlan, selectedPlan, plans } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [refineText, setRefineText] = useState('');
  
  const plan = plans.find(p => p.id === selectedPlan);
  
  // Local state for toggling phases and criteria (in real app, this would update the store)
  const [localPhases, setLocalPhases] = useState<PlanPhase[]>([]);
  const [localCriteria, setLocalCriteria] = useState<{ id: string; text: string; done: boolean }[]>([]);
  
  // Initialize local state from plan when plan changes
  useMemo(() => {
    if (plan?.phases) {
      setLocalPhases(plan.phases);
    }
    if (plan?.successCriteria) {
      setLocalCriteria(plan.successCriteria);
    }
  }, [plan?.id]);
  
  const phases = plan?.phases || localPhases;
  const successCriteria = plan?.successCriteria || localCriteria;
  
  const completedPhases = phases.filter(p => p.status === 'done').length;
  const progress = phases.length > 0 ? Math.round((completedPhases / phases.length) * 100) : plan?.progress || 0;
  
  const togglePhase = (id: string) => {
    setLocalPhases(prev => prev.map(p => 
      p.id === id ? { ...p, status: p.status === 'done' ? 'pending' : 'done' } : p
    ));
  };
  
  const toggleCriteria = (id: string) => {
    setLocalCriteria(prev => 
      prev.map(c => c.id === id ? { ...c, done: !c.done } : c)
    );
  };
  
  // Get dependency plans
  const getDependencyPlan = (depId: string) => plans.find(p => p.id === depId);
  
  if (!plan) return null;
  
  return (
    <div className="h-full flex flex-col animate-fade-in p-6 overflow-auto">
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <button
          onClick={() => setSelectedPlan(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans Board
        </button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{plan.title}</h1>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Badge 
                variant="outline" 
                className={cn(
                  "text-xs",
                  plan.status === 'draft' ? 'bg-muted text-muted-foreground' :
                  plan.status === 'in_progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                  plan.status === 'review' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                )}
              >
                {plan.status === 'in_progress' ? 'In Progress' : 
                 plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
              </Badge>
              
              <Badge variant="outline" className={cn("text-xs", priorityConfig[plan.priority].color)}>
                {priorityConfig[plan.priority].label}
              </Badge>
              
              {plan.complexity && (
                <Badge variant="outline" className={cn("text-xs", complexityConfig[plan.complexity].color)}>
                  {complexityConfig[plan.complexity].label}
                </Badge>
              )}
              
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {plan.date}
              </span>
              
              {plan.provider && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {plan.provider}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Play className="w-4 h-4" />
              Run Plan
            </Button>
          </div>
        </div>
        
        {/* Dependencies */}
        {plan.dependencies && plan.dependencies.length > 0 && (
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <Link2 className="w-4 h-4" />
            <span>Depends on:</span>
            {plan.dependencies.map((depId) => {
              const dep = getDependencyPlan(depId);
              return dep ? (
                <Badge 
                  key={depId} 
                  variant="outline" 
                  className="text-xs cursor-pointer hover:bg-secondary"
                  onClick={() => setSelectedPlan(depId)}
                >
                  {dep.title}
                </Badge>
              ) : null;
            })}
          </div>
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 border-b border-border pb-2 flex-shrink-0">
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
          <div className="flex-1 overflow-auto space-y-4">
            {activeTab === 'overview' && (
              <>
                {/* Description */}
                {plan.description && (
                  <div className="glass-card p-4">
                    <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      Description
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                )}
                
                {/* Phases Preview */}
                {phases.length > 0 && (
                  <div className="glass-card p-4">
                    <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                      🔄 Implementation Phases
                    </h3>
                    <div className="flex gap-1 mb-2">
                      {phases.map((phase) => (
                        <div
                          key={phase.id}
                          className={cn(
                            "flex-1 h-2 rounded-full transition-colors",
                            phase.status === 'done' && "bg-emerald-500",
                            phase.status === 'active' && "bg-amber-500 animate-pulse",
                            phase.status === 'pending' && "bg-muted"
                          )}
                          title={phase.name}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between">
                      {phases.map((phase) => (
                        <span 
                          key={phase.id} 
                          className={cn(
                            "text-xs",
                            phase.status === 'active' ? "text-amber-500 font-medium" : 
                            phase.status === 'done' ? "text-emerald-500" : "text-muted-foreground"
                          )}
                        >
                          {phase.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Success Criteria */}
                {successCriteria.length > 0 && (
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
                              ? "bg-emerald-500 border-emerald-500" 
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
                )}
              </>
            )}
            
            {activeTab === 'phases' && (
              <div className="glass-card p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium mb-4">
                  🔄 Implementation Phases
                </h3>
                {phases.length > 0 ? (
                  <div className="space-y-3">
                    {phases.map((phase, index) => (
                      <div
                        key={phase.id}
                        className={cn(
                          "p-3 rounded-lg border transition-all",
                          phase.status === 'done' 
                            ? "bg-emerald-500/5 border-emerald-500/30" 
                            : phase.status === 'active'
                            ? "bg-amber-500/5 border-amber-500/30"
                            : "bg-secondary/50 border-border"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              onClick={() => togglePhase(phase.id)}
                              className={cn(
                                "w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-colors",
                                phase.status === 'done' 
                                  ? "bg-emerald-500 border-emerald-500" 
                                  : "border-muted-foreground hover:border-primary"
                              )}
                            >
                              {phase.status === 'done' && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <p className={cn("text-sm font-medium", phase.status === 'done' && "line-through text-muted-foreground")}>
                                Phase {index + 1}: {phase.name}
                              </p>
                              {phase.file && (
                                <p className="text-xs text-muted-foreground font-mono">{phase.file}</p>
                              )}
                            </div>
                          </div>
                          
                          {phase.status === 'active' && (
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                              In Progress
                            </Badge>
                          )}
                          
                          {phase.status === 'done' && (
                            <span className="text-xs text-emerald-500 flex items-center gap-1">
                              <Check className="w-3 h-3" />
                              Done
                            </span>
                          )}
                          
                          {phase.status === 'pending' && (
                            <Button variant="outline" size="sm" className="gap-1.5">
                              <Play className="w-3 h-3" />
                              Start
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No phases defined for this plan.</p>
                )}
              </div>
            )}
            
            {activeTab === 'decisions' && (
              <div className="glass-card p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                  🔧 Technical Decisions
                </h3>
                {plan.technicalDecisions && plan.technicalDecisions.length > 0 ? (
                  <ol className="text-sm text-muted-foreground space-y-2">
                    {plan.technicalDecisions.map((decision, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">①</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-muted-foreground">No technical decisions documented yet.</p>
                )}
              </div>
            )}
            
            {activeTab === 'raw' && (
              <div className="glass-card p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                  📄 Raw Markdown
                </h3>
                <pre className="text-xs text-muted-foreground font-mono bg-muted/50 p-4 rounded-lg overflow-auto">
{`# ${plan.title}

Status: ${plan.status}
Priority: ${plan.priority}
Progress: ${plan.progress}%
${plan.description ? `\n## Description\n${plan.description}` : ''}
${phases.length > 0 ? `\n## Phases\n${phases.map((p, i) => `${i + 1}. [${p.status === 'done' ? 'x' : ' '}] ${p.name}`).join('\n')}` : ''}
${plan.technicalDecisions?.length ? `\n## Technical Decisions\n${plan.technicalDecisions.map((d, i) => `${i + 1}. ${d}`).join('\n')}` : ''}
${successCriteria.length > 0 ? `\n## Success Criteria\n${successCriteria.map(c => `- [${c.done ? 'x' : ' '}] ${c.text}`).join('\n')}` : ''}`}
                </pre>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* AI Refine */}
          <div className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              Refine with AI
            </h3>
            <textarea
              value={refineText}
              onChange={(e) => setRefineText(e.target.value)}
              placeholder="Can you add a phase for testing?"
              className="w-full p-3 bg-input border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {['Add testing', 'Simplify', 'Add docs'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setRefineText(suggestion)}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs hover:bg-secondary/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <Button className="w-full mt-3 gap-2">
              <Sparkles className="w-4 h-4" />
              Refine Plan
            </Button>
          </div>
          
          {/* Progress Stats */}
          <div className="glass-card p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              Progress Stats
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="text-lg font-semibold">{phases.length}</p>
                <p className="text-xs text-muted-foreground">Phases</p>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="text-lg font-semibold">{completedPhases}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="text-lg font-semibold">{successCriteria.filter(c => c.done).length}/{successCriteria.length}</p>
                <p className="text-xs text-muted-foreground">Criteria</p>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg text-center">
                <p className="text-lg font-semibold">{plan.technicalDecisions?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Decisions</p>
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
              <Button className="w-full justify-start gap-2">
                <Play className="w-4 h-4" />
                Continue Implementation
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Check className="w-4 h-4" />
                Mark All Complete
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <MessageSquare className="w-4 h-4" />
                Discuss in Chat
              </Button>
              <Button variant="secondary" className="w-full justify-start gap-2">
                <Edit3 className="w-4 h-4" />
                Edit Plan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}