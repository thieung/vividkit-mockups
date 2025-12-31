import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/stores/appStore';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { SimpleDashboard } from '@/components/screens/SimpleDashboard';
import { ChatScreen } from '@/components/screens/ChatScreen';
import { BrainstormScreen } from '@/components/screens/BrainstormScreen';
import { PlansScreen } from '@/components/screens/PlansScreen';
import { PlanDetailScreen } from '@/components/screens/PlanDetailScreen';
import { SessionsScreen } from '@/components/screens/SessionsScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { FilesScreen } from '@/components/screens/FilesScreen';
import { GitScreen } from '@/components/screens/GitScreen';
import { UsageScreen } from '@/components/screens/UsageScreen';
import { WizardScreen } from '@/components/screens/WizardScreen';
import { AIInterviewScreen } from '@/components/screens/AIInterviewScreen';
import { ConceptPreviewScreen } from '@/components/screens/ConceptPreviewScreen';
import { CookScreen } from '@/components/screens/CookScreen';
import { FixScreen } from '@/components/screens/FixScreen';
import { SplashScreen } from '@/components/features/SplashScreen';

const Index = () => {
  const { activeTab, selectedPlan, userMode } = useAppStore();
  const [showSplash, setShowSplash] = useState(true);
  
  const renderScreen = () => {
    if (activeTab === 'plans' && selectedPlan) {
      return <PlanDetailScreen />;
    }
    
    switch (activeTab) {
      case 'dashboard': return userMode === 'simple' ? <SimpleDashboard /> : <DashboardScreen />;
      case 'wizard': return userMode === 'simple' ? <AIInterviewScreen /> : <WizardScreen />;
      case 'concept': return <ConceptPreviewScreen />;
      case 'chat': return userMode === 'simple' ? <CookScreen /> : <ChatScreen />;
      case 'brainstorm': return <BrainstormScreen />;
      case 'fix': return <FixScreen />;
      case 'plans': return <PlansScreen />;
      case 'sessions': return <SessionsScreen />;
      case 'settings': return <SettingsScreen />;
      case 'files': return <FilesScreen />;
      case 'git': return <GitScreen />;
      case 'usage': return <UsageScreen />;
      default: return <DashboardScreen />;
    }
  };
  
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }
  
  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
};

export default Index;
