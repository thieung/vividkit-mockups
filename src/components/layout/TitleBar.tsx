import { ChevronDown, Plus, Settings } from 'lucide-react';
import logoImage from '@/assets/logo.png';
import { useAppStore } from '@/stores/appStore';
import { ThemeToggle } from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TitleBar() {
  const { projects, activeProject, setActiveProject, setActiveTab, setNewProjectOpen } = useAppStore();
  
  const currentProject = projects.find(p => p.id === activeProject);
  
  return (
    <div className="h-12 bg-sidebar flex items-center px-4 border-b border-sidebar-border">
      {/* Window Controls (macOS style) */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
      </div>
      
      {/* Logo */}
      <div className="flex items-center gap-2 mr-4">
        <img src={logoImage} alt="VividKit" className="w-6 h-6 rounded" />
        <span className="text-sm font-semibold text-foreground hidden sm:block">VividKit</span>
      </div>
      
      {/* Project Switcher Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors text-sm font-medium">
          <span className="truncate max-w-[180px]">{currentProject?.name || 'Chọn project'}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 bg-popover border border-border shadow-lg z-50">
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Projects
          </div>
          {projects.map((project) => (
            <DropdownMenuItem
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={activeProject === project.id ? 'bg-accent' : ''}
            >
              <span className="truncate">{project.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setNewProjectOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setActiveTab('settings')}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
}
