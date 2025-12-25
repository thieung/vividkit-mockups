import { LayoutDashboard, Wand2, MessageSquare, Lightbulb, ClipboardList, Layers, Settings, FolderOpen, GitBranch, BarChart3 } from 'lucide-react';
import { useAppStore, TabId } from '@/stores/appStore';
import { cn } from '@/lib/utils';

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'wizard', label: 'Wizard', icon: Wand2 },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'brainstorm', label: 'Brainstorm', icon: Lightbulb },
  { id: 'plans', label: 'Plans', icon: ClipboardList },
  { id: 'sessions', label: 'Sessions', icon: Layers },
  { id: 'files', label: 'Files', icon: FolderOpen },
  { id: 'git', label: 'Git', icon: GitBranch },
  { id: 'usage', label: 'Usage', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function TabNavigation() {
  const { activeTab, setActiveTab } = useAppStore();
  
  return (
    <div className="h-11 bg-card/50 border-b border-border flex items-center px-4 gap-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              isActive
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
