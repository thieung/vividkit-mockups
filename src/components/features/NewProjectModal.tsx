import { useState } from 'react';
import { X, Zap, FolderOpen, Link, Check } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';

type Tab = 'quick-start' | 'open-folder' | 'clone-repo';
type Template = 'empty' | 'react' | 'nextjs' | 'nodejs' | 'python' | 'tauri';

const templates: { id: Template; icon: string; label: string }[] = [
  { id: 'empty', icon: '⚡', label: 'Empty' },
  { id: 'react', icon: '⚛️', label: 'React' },
  { id: 'nextjs', icon: '🔺', label: 'Next.js' },
  { id: 'nodejs', icon: '🟢', label: 'Node.js' },
  { id: 'python', icon: '🐍', label: 'Python' },
  { id: 'tauri', icon: '🦀', label: 'Tauri' },
];

export function NewProjectModal() {
  const { isNewProjectOpen, setNewProjectOpen } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('quick-start');
  const [projectName, setProjectName] = useState('my-awesome-project');
  const [location, setLocation] = useState('~/projects/personal');
  const [selectedTemplate, setSelectedTemplate] = useState<Template>('empty');
  const [initGit, setInitGit] = useState(true);
  const [addClaudeKit, setAddClaudeKit] = useState(true);
  const [openNewWindow, setOpenNewWindow] = useState(false);
  
  if (!isNewProjectOpen) return null;
  
  const command = `/bootstrap --name ${projectName} --template ${selectedTemplate}${initGit ? ' --git' : ''}${addClaudeKit ? ' --claudekit' : ''}`;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => setNewProjectOpen(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg glass-card shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-primary" />
            New Project
          </h2>
          <button
            onClick={() => setNewProjectOpen(false)}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-border">
          {[
            { id: 'quick-start' as Tab, icon: Zap, label: 'Quick Start' },
            { id: 'open-folder' as Tab, icon: FolderOpen, label: 'Open Folder' },
            { id: 'clone-repo' as Tab, icon: Link, label: 'Clone Repo' },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          {/* Location */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Location</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Browse
              </button>
            </div>
          </div>
          
          {/* Templates */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Template</label>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border transition-all",
                    selectedTemplate === template.id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border hover:border-muted-foreground text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-2xl">{template.icon}</span>
                  <span className="text-xs font-medium">{template.label}</span>
                  {selectedTemplate === template.id && (
                    <Check className="w-3 h-3 text-primary absolute top-1 right-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Options */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">Options</label>
            {[
              { id: 'git', label: 'Initialize Git repository', checked: initGit, onChange: setInitGit },
              { id: 'claudekit', label: 'Add ClaudeKit configuration', checked: addClaudeKit, onChange: setAddClaudeKit },
              { id: 'window', label: 'Open in new window', checked: openNewWindow, onChange: setOpenNewWindow },
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => option.onChange(!option.checked)}
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    option.checked
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {option.checked && <Check className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
          
          {/* Command Preview */}
          <div className="p-3 bg-muted rounded-lg font-mono text-xs text-muted-foreground overflow-x-auto">
            {command}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            <kbd className="px-1 py-0.5 bg-muted rounded">esc</kbd> Cancel
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setNewProjectOpen(false)}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setNewProjectOpen(false)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
