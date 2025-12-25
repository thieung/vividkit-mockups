import { useEffect, useState, useMemo } from 'react';
import { Command, Search, ChefHat, Lightbulb, Code2, ClipboardList, FolderOpen, FileSearch, Clock } from 'lucide-react';
import { useAppStore, TabId } from '@/stores/appStore';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  shortcut?: string;
  category: string;
  action: () => void;
}

export function CommandPalette() {
  const { isCommandPaletteOpen, closeCommandPalette, setActiveTab } = useAppStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const commands: CommandItem[] = useMemo(() => [
    { id: 'cook', label: '/cook', icon: ChefHat, shortcut: '⌘⇧C', category: 'Commands', action: () => { setActiveTab('chat'); closeCommandPalette(); } },
    { id: 'brainstorm', label: '/brainstorm', icon: Lightbulb, shortcut: '⌘⇧B', category: 'Commands', action: () => { setActiveTab('chat'); closeCommandPalette(); } },
    { id: 'code', label: '/code', icon: Code2, shortcut: '⌘⇧D', category: 'Commands', action: () => { setActiveTab('chat'); closeCommandPalette(); } },
    { id: 'plan', label: '/plan', icon: ClipboardList, shortcut: '⌘⇧P', category: 'Commands', action: () => { setActiveTab('plans'); closeCommandPalette(); } },
    { id: 'open-file', label: 'Open file...', icon: FolderOpen, shortcut: '⌘O', category: 'Files', action: () => { setActiveTab('files'); closeCommandPalette(); } },
    { id: 'search-files', label: 'Search in files', icon: FileSearch, shortcut: '⌘⇧F', category: 'Files', action: () => { setActiveTab('files'); closeCommandPalette(); } },
    { id: 'recent-cook', label: '/cook add authentication', icon: Clock, category: 'Recent', action: () => { setActiveTab('chat'); closeCommandPalette(); } },
    { id: 'recent-brainstorm', label: '/brainstorm optimize performance', icon: Clock, category: 'Recent', action: () => { setActiveTab('chat'); closeCommandPalette(); } },
  ], [setActiveTab, closeCommandPalette]);
  
  const filteredCommands = useMemo(() => {
    if (!search) return commands;
    const lower = search.toLowerCase();
    return commands.filter(cmd => 
      cmd.label.toLowerCase().includes(lower) || 
      cmd.category.toLowerCase().includes(lower)
    );
  }, [search, commands]);
  
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach(cmd => {
      if (!groups[cmd.category]) groups[cmd.category] = [];
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);
  
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);
  
  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;
      
      if (e.key === 'Escape') {
        closeCommandPalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, closeCommandPalette, filteredCommands, selectedIndex]);
  
  if (!isCommandPaletteOpen) return null;
  
  let currentIndex = -1;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={closeCommandPalette}
      />
      
      {/* Palette */}
      <div className="relative w-full max-w-xl glass-card shadow-2xl animate-scale-in overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs bg-muted rounded text-muted-foreground font-mono">⌘K</kbd>
        </div>
        
        {/* Commands */}
        <div className="max-h-80 overflow-auto py-2">
          {Object.entries(groupedCommands).map(([category, items]) => (
            <div key={category}>
              <div className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                {category === 'Commands' && '🚀'}
                {category === 'Files' && '📁'}
                {category === 'Recent' && '⏱️'}
                {category}
              </div>
              {items.map((cmd) => {
                currentIndex++;
                const isSelected = currentIndex === selectedIndex;
                const Icon = cmd.icon;
                
                return (
                  <button
                    key={cmd.id}
                    onClick={cmd.action}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                      isSelected ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    )}
                  >
                    {isSelected && <span className="text-primary">▶</span>}
                    <Icon className={cn("w-4 h-4", !isSelected && "ml-5")} />
                    <span className="flex-1 text-left">{cmd.label}</span>
                    {cmd.shortcut && (
                      <kbd className="px-2 py-0.5 text-xs bg-muted rounded font-mono">{cmd.shortcut}</kbd>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-muted-foreground">
          <span><kbd className="px-1 py-0.5 bg-muted rounded">↑↓</kbd> Navigate</span>
          <span><kbd className="px-1 py-0.5 bg-muted rounded">↵</kbd> Select</span>
          <span><kbd className="px-1 py-0.5 bg-muted rounded">esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
