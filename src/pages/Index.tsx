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
import { DesignUploadScreen } from '@/components/screens/DesignUploadScreen';
import { SavePublishScreen } from '@/components/screens/SavePublishScreen';
import { SplashScreen } from '@/components/features/SplashScreen';
import { OnboardingTour } from '@/components/features/OnboardingTour';

const Index = () => {
  const { activeTab, selectedPlan, userMode, hasCompletedOnboarding, setOnboardingComplete, setActiveTab } = useAppStore();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(!hasCompletedOnboarding);
  
  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
    setShowOnboarding(false);
    // Navigate to AI Interview after onboarding
    setActiveTab('wizard');
  };

  const handleOnboardingSkip = () => {
    setOnboardingComplete(true);
    setShowOnboarding(false);
  };
  
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
      case 'design': return <DesignUploadScreen />;
      case 'save': return <SavePublishScreen />;
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
    <>
      <AppLayout>
        {renderScreen()}
      </AppLayout>
      {showOnboarding && (
        <OnboardingTour 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
      )}
    </>
  );
};

export default Index;
