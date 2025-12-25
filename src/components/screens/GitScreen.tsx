import { useState } from 'react';
import { GitBranch, Check, Plus, Minus, FileEdit, FileQuestion, Sparkles, Clock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GitFile {
  path: string;
  status: 'modified' | 'added' | 'untracked';
  staged: boolean;
}

interface Commit {
  hash: string;
  message: string;
  author: string;
  time: string;
}

export function GitScreen() {
  const [files, setFiles] = useState<GitFile[]>([
    { path: 'src/auth/Login.tsx', status: 'modified', staged: true },
    { path: 'src/auth/types.ts', status: 'added', staged: true },
    { path: 'package.json', status: 'modified', staged: true },
    { path: 'src/utils/helpers.ts', status: 'modified', staged: false },
    { path: '.env.local', status: 'untracked', staged: false },
  ]);
  
  const [commitMessage, setCommitMessage] = useState('feat(auth): add login component with OAuth2 support');
  
  const commits: Commit[] = [
    { hash: 'a1b2c3d', message: 'fix(ui): button hover state', author: 'John Doe', time: '2 hours ago' },
    { hash: 'd4e5f6g', message: 'feat: add dashboard', author: 'Jane Smith', time: '5 hours ago' },
    { hash: 'h7i8j9k', message: 'chore: update deps', author: 'John Doe', time: '1 day ago' },
  ];
  
  const stagedFiles = files.filter(f => f.staged);
  const unstagedFiles = files.filter(f => !f.staged);
  
  const toggleStage = (path: string) => {
    setFiles(files.map(f => f.path === path ? { ...f, staged: !f.staged } : f));
  };
  
  const stageAll = () => setFiles(files.map(f => ({ ...f, staged: true })));
  const unstageAll = () => setFiles(files.map(f => ({ ...f, staged: false })));
  
  const getStatusIcon = (status: GitFile['status']) => {
    switch (status) {
      case 'modified': return <FileEdit className="w-4 h-4 text-yellow-400" />;
      case 'added': return <Plus className="w-4 h-4 text-green-400" />;
      case 'untracked': return <FileQuestion className="w-4 h-4 text-muted-foreground" />;
    }
  };
  
  const getStatusLabel = (status: GitFile['status']) => {
    switch (status) {
      case 'modified': return 'M';
      case 'added': return 'A';
      case 'untracked': return '?';
    }
  };
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Git Operations</h1>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm">
          <GitBranch className="w-4 h-4 text-primary" />
          <span className="font-mono">main</span>
        </div>
      </div>
      
      {/* Staging Area */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Staged */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              Staged ({stagedFiles.length})
            </h2>
            <button
              onClick={unstageAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Minus className="w-3 h-3" />
              Unstage All
            </button>
          </div>
          <div className="space-y-1">
            {stagedFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => toggleStage(file.path)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary/50 transition-colors text-sm"
              >
                <div className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center",
                  "bg-green-500 border-green-500"
                )}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className={cn(
                  "text-xs font-mono px-1 rounded",
                  file.status === 'modified' ? 'text-yellow-400' :
                  file.status === 'added' ? 'text-green-400' : 'text-muted-foreground'
                )}>
                  {getStatusLabel(file.status)}
                </span>
                <span className="font-mono text-xs truncate">{file.path}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Unstaged */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-muted-foreground" />
              Unstaged ({unstagedFiles.length})
            </h2>
            <button
              onClick={stageAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Stage All
            </button>
          </div>
          <div className="space-y-1">
            {unstagedFiles.map((file) => (
              <button
                key={file.path}
                onClick={() => toggleStage(file.path)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-secondary/50 transition-colors text-sm"
              >
                <div className="w-5 h-5 rounded border border-muted-foreground" />
                <span className={cn(
                  "text-xs font-mono px-1 rounded",
                  file.status === 'modified' ? 'text-yellow-400' :
                  file.status === 'added' ? 'text-green-400' : 'text-muted-foreground'
                )}>
                  {getStatusLabel(file.status)}
                </span>
                <span className="font-mono text-xs truncate">{file.path}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Commit Message */}
      <div className="glass-card p-4 mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          💬 Commit Message
        </h2>
        <input
          type="text"
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary mb-3"
        />
        <div className="flex items-center justify-between">
          <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Generate
          </button>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Check className="w-4 h-4" />
              Commit & Push
            </button>
          </div>
        </div>
      </div>
      
      {/* Recent Commits */}
      <div className="flex-1 glass-card p-4 overflow-hidden flex flex-col">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          📜 Recent Commits
        </h2>
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <tbody>
              {commits.map((commit, index) => (
                <tr
                  key={commit.hash}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-3 pr-4">
                    <span className="font-mono text-xs text-primary">{commit.hash}</span>
                  </td>
                  <td className="py-3 pr-4 text-sm">{commit.message}</td>
                  <td className="py-3 pr-4 text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    {commit.author}
                  </td>
                  <td className="py-3 text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    {commit.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
