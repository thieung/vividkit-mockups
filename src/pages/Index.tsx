import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/stores/appStore';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { ChatScreen } from '@/components/screens/ChatScreen';
import { PlansScreen } from '@/components/screens/PlansScreen';
import { PlanDetailScreen } from '@/components/screens/PlanDetailScreen';
import { SessionsScreen } from '@/components/screens/SessionsScreen';
import { SettingsScreen } from '@/components/screens/SettingsScreen';
import { FilesScreen } from '@/components/screens/FilesScreen';
import { GitScreen } from '@/components/screens/GitScreen';
import { UsageScreen } from '@/components/screens/UsageScreen';
import { WizardScreen } from '@/components/screens/WizardScreen';

const Index = () => {
  const { activeTab, selectedPlan } = useAppStore();
  
  const renderScreen = () => {
    if (activeTab === 'plans' && selectedPlan) {
      return <PlanDetailScreen />;
    }
    
    switch (activeTab) {
      case 'dashboard': return <DashboardScreen />;
      case 'wizard': return <WizardScreen />;
      case 'chat': return <ChatScreen />;
      case 'plans': return <PlansScreen />;
      case 'sessions': return <SessionsScreen />;
      case 'settings': return <SettingsScreen />;
      case 'files': return <FilesScreen />;
      case 'git': return <GitScreen />;
      case 'usage': return <UsageScreen />;
      default: return <DashboardScreen />;
    }
  };
  
  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
};

export default Index;
