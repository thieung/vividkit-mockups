import { useState } from 'react';
import { Send, Bot, User, Wrench, Check, Loader2, Info, DollarSign, Hash } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';

export function ChatScreen() {
  const { messages, addMessage, sessions } = useAppStore();
  const [input, setInput] = useState('');
  
  const activeSession = sessions.find(s => s.status === 'running');
  
  const handleSend = () => {
    if (!input.trim()) return;
    addMessage({ role: 'user', content: input });
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      addMessage({
        role: 'assistant',
        content: "I understand you want to " + input.toLowerCase() + ". Let me analyze the best approach for this...",
        provider: 'Claude Pro',
        toolCalls: [
          { name: 'Analyze codebase', status: 'done', file: 'src/' },
        ],
      });
    }, 1000);
  };
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Messages */}
      <div className="flex-1 overflow-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={cn(
              "glass-card p-4 max-w-4xl animate-fade-in",
              message.role === 'user' ? 'ml-auto' : ''
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {message.role === 'user' ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium">You</span>
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-claude/20 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-claude" />
                    </div>
                    <span className="text-sm font-medium text-claude">{message.provider}</span>
                  </>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{message.timestamp}</span>
            </div>
            
            {/* Content */}
            <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
            
            {/* Tool Calls */}
            {message.toolCalls && message.toolCalls.length > 0 && (
              <div className="mt-3 space-y-2">
                {message.toolCalls.map((tool, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg text-sm">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{tool.name}</span>
                    {tool.file && <span className="text-muted-foreground font-mono text-xs">{tool.file}</span>}
                    <div className="ml-auto">
                      {tool.status === 'done' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Bottom Section */}
      <div className="space-y-3">
        {/* Agent Activity & Session Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Agent Activity */}
          <div className="glass-card p-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <Bot className="w-3.5 h-3.5" />
              Agent Activity
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">├─</span>
                <span>Agent 1: Reading files...</span>
                <Loader2 className="w-3 h-3 animate-spin text-primary ml-auto" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">├─</span>
                <span>Agent 2: Analyzing code...</span>
                <Loader2 className="w-3 h-3 animate-spin text-primary ml-auto" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>└─</span>
                <span>Agent 3: Idle</span>
                <span className="ml-auto">─</span>
              </div>
            </div>
          </div>
          
          {/* Session Info */}
          <div className="glass-card p-3">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" />
              Session Info
            </h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-claude" />
                <span>Claude Pro</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                <span>${activeSession?.cost.toFixed(2) || '0.45'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{activeSession?.tokens.toLocaleString() || '12,500'} tokens</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Input */}
        <div className="glass-card p-3 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Send
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
