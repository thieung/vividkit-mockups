import { useState, useRef, useEffect } from 'react';
import { 
  Lightbulb, Send, Sparkles, BookmarkPlus, MessageCircle, 
  ChevronRight, Trash2, Clock, Tag, FileText, Plus, Search,
  Brain, Zap, ArrowRight, Check, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore, BrainstormReport } from '@/stores/appStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface BrainstormMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  savedAsInsight?: boolean;
}

const STARTER_PROMPTS = [
  { icon: Zap, text: "What's a unique feature I could add?", color: "text-amber-400" },
  { icon: Brain, text: "Help me think through this problem...", color: "text-purple-400" },
  { icon: Lightbulb, text: "I need creative ideas for...", color: "text-blue-400" },
  { icon: Sparkles, text: "How could I improve...", color: "text-emerald-400" },
];

const AI_RESPONSES = [
  "That's an interesting angle! Here are some thoughts:\n\n**Option 1:** Consider a modular approach where each feature can be independently enabled. This gives users control while keeping the core experience clean.\n\n**Option 2:** You could implement a progressive disclosure pattern - start simple and reveal advanced options as users become more comfortable.\n\n**What aspect would you like to explore deeper?**",
  "Great question! Let me break this down:\n\n🎯 **Core Problem:** Understanding what users actually need vs what they say they want.\n\n💡 **Insight:** Often the best solutions come from observing behavior, not just asking questions.\n\n🚀 **Suggestion:** Start with a minimal prototype and iterate based on real usage data.\n\n**Would you like me to elaborate on any of these points?**",
  "I love this direction! Here's my thinking:\n\n1. **Start with the 'why'** - What problem are we really solving?\n2. **Consider the edge cases** - What happens when things go wrong?\n3. **Think about scale** - Will this work with 10x the users?\n\n**Some creative variations:**\n- What if we flipped the usual approach?\n- Could we combine two existing patterns in a new way?\n- What would the ideal solution look like with no constraints?\n\n**Which thread interests you most?**",
];

export function BrainstormScreen() {
  const { 
    brainstormReports, 
    addBrainstormReport,
    selectedBrainstorm, 
    setSelectedBrainstorm, 
    updateBrainstormReport, 
    deleteBrainstormReport, 
    setActiveTab 
  } = useAppStore();
  
  const [messages, setMessages] = useState<BrainstormMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [savingInsight, setSavingInsight] = useState<string | null>(null);
  const [insightTitle, setInsightTitle] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const filteredReports = brainstormReports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage: BrainstormMessage = {
      id: String(Date.now()),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: BrainstormMessage = {
        id: String(Date.now() + 1),
        role: 'ai',
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleStarterClick = (prompt: string) => {
    setInput(prompt);
  };

  const handleSaveInsight = (message: BrainstormMessage) => {
    if (!insightTitle.trim()) return;
    
    addBrainstormReport({
      title: insightTitle,
      content: message.content,
      status: 'new',
      tags: [],
      annotations: [],
    });
    
    setMessages(prev => prev.map(m => 
      m.id === message.id ? { ...m, savedAsInsight: true } : m
    ));
    setSavingInsight(null);
    setInsightTitle('');
  };

  const handleConvertToPlan = (report: BrainstormReport) => {
    updateBrainstormReport(report.id, { status: 'converted' });
    setActiveTab('plans');
  };

  return (
    <div className="h-full flex animate-fade-in">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">AI Brainstorm</h1>
              <p className="text-xs text-muted-foreground">Explore ideas conversationally</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              {brainstormReports.length} saved insights
            </Badge>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showSidebar ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6 py-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-xl mx-auto">
              <div className="p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl mb-6">
                <Lightbulb className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">What would you like to explore?</h2>
              <p className="text-muted-foreground text-center mb-8">
                I'm here to help you brainstorm ideas, solve problems, and think through challenges.
                Save any insights to your collection.
              </p>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                {STARTER_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleStarterClick(prompt.text)}
                    className="glass-card p-4 text-left hover:border-primary/50 transition-all group"
                  >
                    <prompt.icon className={cn("w-5 h-5 mb-2", prompt.color)} />
                    <span className="text-sm group-hover:text-foreground transition-colors">
                      {prompt.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={cn(
                    "animate-fade-in",
                    message.role === 'user' ? "flex justify-end" : ""
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {message.role === 'user' ? (
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">{message.timestamp}</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex-shrink-0">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="glass-card p-4 rounded-2xl rounded-tl-md">
                            <div className="prose prose-sm prose-invert max-w-none">
                              {message.content.split('\n').map((line, i) => (
                                <p key={i} className={cn(
                                  "text-sm leading-relaxed",
                                  line.startsWith('**') ? "font-semibold" : ""
                                )}>
                                  {line}
                                </p>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground mt-2 block">{message.timestamp}</span>
                          </div>
                          
                          {/* Save Insight Action */}
                          {!message.savedAsInsight && (
                            <div className="mt-2">
                              {savingInsight === message.id ? (
                                <div className="flex items-center gap-2 animate-fade-in">
                                  <input
                                    type="text"
                                    placeholder="Name this insight..."
                                    value={insightTitle}
                                    onChange={(e) => setInsightTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveInsight(message)}
                                    className="flex-1 px-3 py-1.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => handleSaveInsight(message)}
                                    className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => { setSavingInsight(null); setInsightTitle(''); }}
                                    className="p-1.5 text-muted-foreground hover:text-foreground"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setSavingInsight(message.id)}
                                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  <BookmarkPlus className="w-3.5 h-3.5" />
                                  Save as insight
                                </button>
                              )}
                            </div>
                          )}
                          
                          {message.savedAsInsight && (
                            <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
                              <Check className="w-3.5 h-3.5" />
                              Saved to insights
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3 animate-fade-in">
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="glass-card px-4 py-3 rounded-2xl rounded-tl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-2 flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="What's on your mind? Let's brainstorm..."
                className="min-h-[44px] max-h-32 border-0 bg-transparent resize-none focus-visible:ring-0"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>

      {/* Saved Insights Sidebar */}
      {showSidebar && (
        <div className="w-80 border-l border-border flex flex-col animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold flex items-center gap-2">
                <BookmarkPlus className="w-4 h-4 text-primary" />
                Saved Insights
              </h2>
              <span className="text-xs text-muted-foreground">{brainstormReports.length}</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {filteredReports.map((report, index) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedBrainstorm(selectedBrainstorm === report.id ? null : report.id)}
                  className={cn(
                    "glass-card p-3 cursor-pointer transition-all animate-fade-in",
                    selectedBrainstorm === report.id
                      ? "border-primary/50 bg-primary/5"
                      : "hover:border-primary/30"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-sm line-clamp-1">{report.title}</h3>
                    <Badge 
                      variant="secondary" 
                      className={cn(
                        "text-[10px] flex-shrink-0",
                        report.status === 'new' ? "bg-blue-500/10 text-blue-400" :
                        report.status === 'refining' ? "bg-amber-500/10 text-amber-400" :
                        report.status === 'ready' ? "bg-green-500/10 text-green-400" :
                        "bg-muted text-muted-foreground"
                      )}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{report.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                    {report.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        {report.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-muted rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expanded View */}
                  {selectedBrainstorm === report.id && (
                    <div className="mt-3 pt-3 border-t border-border animate-fade-in">
                      <div className="flex gap-2">
                        {report.status !== 'converted' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConvertToPlan(report);
                            }}
                            className="flex-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                          >
                            <ArrowRight className="w-3 h-3" />
                            To Plan
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBrainstormReport(report.id);
                          }}
                          className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredReports.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No insights saved yet</p>
                  <p className="text-xs mt-1">Save AI responses as insights</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
