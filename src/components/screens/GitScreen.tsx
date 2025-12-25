import { useState } from 'react';
import { GitBranch, Check, Plus, Minus, ArrowDown, ArrowUp, RefreshCw, FileEdit, Send, GitPullRequest, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GitFile {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'renamed';
  staged: boolean;
  linesAdded?: number;
  linesRemoved?: number;
}

interface Commit {
  hash: string;
  message: string;
  time: string;
}

export function GitScreen() {
  const [files, setFiles] = useState<GitFile[]>([
    { path: 'auth/login.tsx', status: 'added', staged: true, linesAdded: 124 },
    { path: 'utils/api.ts', status: 'modified', staged: true, linesAdded: 45, linesRemoved: 12 },
    { path: 'types/auth.ts', status: 'added', staged: true, linesAdded: 38 },
    { path: 'components/Header.tsx', status: 'modified', staged: false, linesAdded: 8, linesRemoved: 3 },
    { path: 'old-auth.ts', status: 'deleted', staged: false, linesRemoved: 156 },
  ]);
  
  const [commitMessage, setCommitMessage] = useState(`feat(auth): implement login functionality

- Add login component with OAuth2 support
- Create auth utility functions
- Define auth TypeScript types`);

  const [selectedFile, setSelectedFile] = useState<string>('auth/login.tsx');
  
  const commits: Commit[] = [
    { hash: 'a3f2b1c', message: 'refactor: improve API error handling', time: '2h ago' },
    { hash: '8d4e2f1', message: 'feat: add user profile page', time: '5h ago' },
    { hash: '1c7b3a9', message: 'fix: resolve type errors in components', time: 'Yesterday' },
  ];
  
  const stagedFiles = files.filter(f => f.staged);
  const unstagedFiles = files.filter(f => !f.staged);
  
  const toggleStage = (path: string) => {
    setFiles(files.map(f => f.path === path ? { ...f, staged: !f.staged } : f));
  };
  
  const getStatusColor = (status: GitFile['status']) => {
    switch (status) {
      case 'modified': return 'bg-warning';
      case 'added': return 'bg-success';
      case 'deleted': return 'bg-destructive';
      case 'renamed': return 'bg-info';
    }
  };
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-card/50 border-b border-border/50 mb-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-bold flex items-center gap-2">
            🔀 Git Operations
          </h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/15 border border-accent/30 rounded-lg text-sm font-medium text-accent">
            <span>🌿</span>
            <span>feature/auth-system</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_hsl(var(--success))]" />
            Synced with origin
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <ArrowDown className="w-3.5 h-3.5" />
            Pull
          </Button>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <ArrowUp className="w-3.5 h-3.5" />
            Push
          </Button>
          <Button size="sm" className="gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            Sync
          </Button>
        </div>
      </div>
      
      {/* Main Content - Two Column Layout */}
      <div className="flex-1 grid grid-cols-[300px_1fr] min-h-0">
        {/* Left Panel - Changes */}
        <div className="bg-secondary/30 border-r border-border/50 p-4 overflow-auto">
          {/* Staged Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                ✅ Staged
                <span className="px-1.5 py-0.5 bg-muted rounded text-[11px]">{stagedFiles.length}</span>
              </span>
            </div>
            <div className="space-y-1">
              {stagedFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => {
                    setSelectedFile(file.path);
                    toggleStage(file.path);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-sm",
                    "bg-card/50 hover:bg-card/80",
                    selectedFile === file.path && "bg-accent/15 border border-accent/30"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-sm", getStatusColor(file.status))} />
                  <span className="flex-1 font-mono text-xs truncate text-left">{file.path}</span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {file.linesAdded && <span className="text-success">+{file.linesAdded}</span>}
                    {file.linesRemoved && <span className="text-destructive ml-1">-{file.linesRemoved}</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Unstaged Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                📝 Changes
                <span className="px-1.5 py-0.5 bg-muted rounded text-[11px]">{unstagedFiles.length}</span>
              </span>
            </div>
            <div className="space-y-1">
              {unstagedFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => {
                    setSelectedFile(file.path);
                    toggleStage(file.path);
                  }}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-sm",
                    "bg-card/50 hover:bg-card/80",
                    selectedFile === file.path && "bg-accent/15 border border-accent/30"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-sm", getStatusColor(file.status))} />
                  <span className="flex-1 font-mono text-xs truncate text-left">{file.path}</span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {file.linesAdded && <span className="text-success">+{file.linesAdded}</span>}
                    {file.linesRemoved && <span className="text-destructive ml-1">-{file.linesRemoved}</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Panel - Actions */}
        <div className="p-6 overflow-auto">
          {/* Git Actions Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <button className="group p-6 bg-card/50 border border-border/50 rounded-xl text-center transition-all hover:border-border hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_4px_20px_hsl(var(--accent)/0.2)]">
              <div className="text-3xl mb-3">📝</div>
              <div className="text-sm font-semibold mb-1">Commit</div>
              <div className="text-xs text-muted-foreground font-mono">/git:cm</div>
            </button>
            <button className="group p-6 bg-card/50 border border-border/50 rounded-xl text-center transition-all hover:border-border hover:-translate-y-0.5">
              <div className="text-3xl mb-3">🚀</div>
              <div className="text-sm font-semibold mb-1">Commit & Push</div>
              <div className="text-xs text-muted-foreground font-mono">/git:cp</div>
            </button>
            <button className="group p-6 bg-card/50 border border-border/50 rounded-xl text-center transition-all hover:border-border hover:-translate-y-0.5">
              <div className="text-3xl mb-3">🔃</div>
              <div className="text-sm font-semibold mb-1">Create PR</div>
              <div className="text-xs text-muted-foreground font-mono">/git:pr</div>
            </button>
          </div>
          
          {/* Commit Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Commit Message</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-accent/15 rounded text-[11px] text-accent">
                <Sparkles className="w-3 h-3" />
                AI Generated
              </span>
            </div>
            <textarea
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Enter commit message..."
              className="w-full px-4 py-3.5 bg-secondary border border-border rounded-lg text-sm font-sans resize-none min-h-[100px] focus:outline-none focus:border-accent transition-colors"
            />
            <div className="flex items-center gap-3 mt-3">
              <Button variant="secondary" size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Regenerate
              </Button>
              <Button size="sm" className="gap-1.5">
                <Check className="w-3.5 h-3.5" />
                Commit Staged
              </Button>
            </div>
          </div>
          
          {/* Recent Commits */}
          <div className="bg-card/50 border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 text-sm font-semibold">
              📜 Recent Commits
            </div>
            <div>
              {commits.map((commit, index) => (
                <div
                  key={commit.hash}
                  className={cn(
                    "flex items-center gap-3 px-5 py-3 transition-colors hover:bg-card/80",
                    index !== commits.length - 1 && "border-b border-border/50"
                  )}
                >
                  <span className="font-mono text-xs text-accent bg-accent/15 px-2 py-0.5 rounded">
                    {commit.hash}
                  </span>
                  <span className="flex-1 text-sm truncate">{commit.message}</span>
                  <span className="text-[11px] text-muted-foreground">{commit.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
