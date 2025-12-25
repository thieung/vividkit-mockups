import { ReactNode, useEffect } from 'react';
import { TitleBar } from './TitleBar';
import { Sidebar } from './Sidebar';
import { TabNavigation } from './TabNavigation';
import { CommandPalette } from '@/components/features/CommandPalette';
import { NewProjectModal } from '@/components/features/NewProjectModal';
import { useAppStore } from '@/stores/appStore';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { toggleCommandPalette } = useAppStore();
  
  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette]);
  
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
    </div>
  );
}
