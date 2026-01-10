import { ReactNode, useEffect } from 'react';
import { TitleBar } from './TitleBar';
import { Sidebar } from './Sidebar';
import { TabNavigation } from './TabNavigation';
import { CommandPalette } from '@/components/features/CommandPalette';
import { NewProjectModal } from '@/components/features/NewProjectModal';
import { KeyboardShortcutsModal } from '@/components/features/KeyboardShortcutsModal';
import { useAppStore } from '@/stores/appStore';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { 
    toggleCommandPalette, 
    isShortcutsModalOpen, 
    openShortcutsModal, 
    closeShortcutsModal 
  } = useAppStore();
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      
      // Shortcuts modal: ? key (when not in input)
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        openShortcutsModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette, openShortcutsModal]);
  
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <TitleBar />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <TabNavigation />
          
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
      
      <CommandPalette />
      <NewProjectModal />
      <KeyboardShortcutsModal open={isShortcutsModalOpen} onOpenChange={closeShortcutsModal} />
    </div>
  );
}
