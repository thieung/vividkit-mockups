import { Diamond, FolderOpen, Plus, Settings, ChevronRight } from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { projects, activeProject, setActiveProject, setActiveTab, setNewProjectOpen } = useAppStore();
  
  return (
    <div className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Diamond className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">VividKit</span>
        </div>
      </div>
      
      {/* Projects */}
      <div className="flex-1 overflow-auto py-4">
        <div className="px-3 mb-2">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <FolderOpen className="w-3.5 h-3.5" />
            Projects
          </div>
        </div>
        
        <div className="space-y-0.5 px-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                activeProject === project.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <ChevronRight className={cn(
                "w-3.5 h-3.5 transition-transform",
                activeProject === project.id && "rotate-90"
              )} />
              <span className="truncate">{project.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom Actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => setNewProjectOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  );
}
