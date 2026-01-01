import { create } from 'zustand';

export type TabId = 'dashboard' | 'wizard' | 'concept' | 'chat' | 'brainstorm' | 'fix' | 'design' | 'plans' | 'sessions' | 'settings' | 'files' | 'git' | 'usage' | 'save';

export interface InterviewAnswer {
  questionId: string;
  text: string;
  selectedOptions: string[];
}

export type UserMode = 'simple' | 'advanced';

// Tabs visible in Simple mode (non-tech users) - AI Interview is the main entry point
export const SIMPLE_MODE_TABS: TabId[] = ['dashboard', 'wizard', 'brainstorm', 'fix', 'design', 'save', 'plans', 'settings'];

// All tabs visible in Advanced mode (developers) - Both AI Interview and direct Chat
export const ADVANCED_MODE_TABS: TabId[] = ['dashboard', 'wizard', 'chat', 'brainstorm', 'plans', 'sessions', 'files', 'git', 'usage', 'settings'];

export interface Project {
  id: string;
  name: string;
  path: string;
  isActive?: boolean;
}

export interface Plan {
  id: string;
  title: string;
  status: 'draft' | 'in_progress' | 'review' | 'done';
  priority: 'P1' | 'P2' | 'P3';
  progress: number;
  date: string;
  provider?: string;
}

export interface Session {
  id: string;
  provider: 'claude' | 'antigravity' | 'gemini' | 'copilot' | 'glm' | 'openrouter';
  status: 'idle' | 'running' | 'paused' | 'completed';
  cost: number;
  tokens: number;
  output: string[];
  progress: number;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  provider?: string;
  timestamp: string;
  toolCalls?: { name: string; status: 'running' | 'done'; file?: string }[];
}

export interface ActivityItem {
  id: string;
  type: 'completed' | 'updated' | 'responded' | 'brainstorm';
  message: string;
  timestamp: string;
}

export interface BrainstormAnnotation {
  id: string;
  content: string;
  createdAt: string;
}

export interface BrainstormReport {
  id: string;
  title: string;
  content: string;
  status: 'new' | 'refining' | 'ready' | 'converted';
  tags: string[];
  annotations: BrainstormAnnotation[];
  createdAt: string;
}

interface AppState {
  // User Mode
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  
  // Navigation
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  
  // Command Palette
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  
  // Keyboard Shortcuts Modal
  isShortcutsModalOpen: boolean;
  openShortcutsModal: () => void;
  closeShortcutsModal: () => void;
  toggleShortcutsModal: () => void;
  
  // Onboarding Tour
  hasCompletedOnboarding: boolean;
  setOnboardingComplete: (complete: boolean) => void;
  
  // Projects
  projects: Project[];
  activeProject: string | null;
  setActiveProject: (id: string) => void;
  
  // Plans
  plans: Plan[];
  selectedPlan: string | null;
  setSelectedPlan: (id: string | null) => void;
  
  // Sessions
  sessions: Session[];
  addSession: (provider: Session['provider']) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  
  // Chat
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  
  // Activity
  recentActivity: ActivityItem[];
  
  // Brainstorm
  brainstormReports: BrainstormReport[];
  selectedBrainstorm: string | null;
  setSelectedBrainstorm: (id: string | null) => void;
  addBrainstormReport: (report: Omit<BrainstormReport, 'id' | 'createdAt'>) => void;
  updateBrainstormReport: (id: string, updates: Partial<BrainstormReport>) => void;
  deleteBrainstormReport: (id: string) => void;
  
  // Interview
  interviewAnswers: InterviewAnswer[] | null;
  setInterviewAnswers: (answers: InterviewAnswer[]) => void;
  
  // Modals
  isNewProjectOpen: boolean;
  setNewProjectOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User Mode
  userMode: 'simple',
  setUserMode: (mode) => set({ userMode: mode }),
  
  // Navigation
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab, selectedPlan: null }),
  
  // Command Palette
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  
  // Keyboard Shortcuts Modal
  isShortcutsModalOpen: false,
  openShortcutsModal: () => set({ isShortcutsModalOpen: true }),
  closeShortcutsModal: () => set({ isShortcutsModalOpen: false }),
  toggleShortcutsModal: () => set((state) => ({ isShortcutsModalOpen: !state.isShortcutsModalOpen })),
  
  // Onboarding Tour
  hasCompletedOnboarding: localStorage.getItem('vividkit-onboarding-complete') === 'true',
  setOnboardingComplete: (complete) => {
    localStorage.setItem('vividkit-onboarding-complete', String(complete));
    set({ hasCompletedOnboarding: complete });
  },
  
  // Projects
  projects: [
    { id: '1', name: 'auth-app', path: '~/projects/auth-app', isActive: true },
    { id: '2', name: 'vividkit', path: '~/projects/vividkit' },
    { id: '3', name: 'my-proj', path: '~/projects/my-proj' },
  ],
  activeProject: '1',
  setActiveProject: (id) => set((state) => ({
    activeProject: id,
    projects: state.projects.map(p => ({ ...p, isActive: p.id === id }))
  })),
  
  // Plans
  plans: [
    { id: '1', title: 'Auth System Implementation', status: 'in_progress', priority: 'P1', progress: 65, date: 'Dec 24', provider: 'claude' },
    { id: '2', title: 'Collapsible TOC for Guides', status: 'draft', priority: 'P2', progress: 0, date: 'Dec 11' },
    { id: '3', title: 'Mobile Layout Refactor', status: 'draft', priority: 'P3', progress: 0, date: 'Dec 15' },
    { id: '4', title: 'Dark Mode Support', status: 'review', priority: 'P2', progress: 90, date: 'Dec 20' },
    { id: '5', title: 'API Endpoints', status: 'done', priority: 'P1', progress: 100, date: 'Dec 18' },
    { id: '6', title: 'DB Migration', status: 'done', priority: 'P2', progress: 100, date: 'Dec 16' },
    { id: '7', title: 'Cache Layer', status: 'done', priority: 'P3', progress: 100, date: 'Dec 14' },
  ],
  selectedPlan: null,
  setSelectedPlan: (id) => set({ selectedPlan: id }),
  
  // Sessions
  sessions: [
    { id: '1', provider: 'claude', status: 'running', cost: 1.25, tokens: 25300, output: ['Analyzing codebase...', 'Found 15 files to modify', 'Creating implementation plan...'], progress: 60 },
    { id: '2', provider: 'antigravity', status: 'running', cost: 0.85, tokens: 18200, output: ['Reading documentation...', 'Generating summary...'], progress: 40 },
    { id: '3', provider: 'gemini', status: 'idle', cost: 0, tokens: 0, output: ['Ready to start...'], progress: 0 },
  ],
  addSession: (provider) => set((state) => ({
    sessions: [...state.sessions, {
      id: String(state.sessions.length + 1),
      provider,
      status: 'idle',
      cost: 0,
      tokens: 0,
      output: ['Ready to start...'],
      progress: 0,
    }]
  })),
  updateSession: (id, updates) => set((state) => ({
    sessions: state.sessions.map(s => s.id === id ? { ...s, ...updates } : s)
  })),
  
  // Chat
  messages: [
    {
      id: '1',
      role: 'user',
      content: 'Can you help me implement authentication for my app?',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      role: 'assistant',
      content: "I'll help you implement authentication. Let me analyze your codebase and suggest the best approach...\n\nBased on your project structure, I recommend using better-auth with OAuth2 support. This will give you:",
      provider: 'Claude Pro',
      timestamp: '10:30 AM',
      toolCalls: [
        { name: 'Read File', status: 'done', file: 'src/auth/config.ts' },
      ],
    },
  ],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: String(state.messages.length + 1),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }]
  })),
  
  // Activity
  recentActivity: [
    { id: '1', type: 'completed', message: 'Completed /cook', timestamp: '2m ago' },
    { id: '2', type: 'updated', message: 'Updated plan.md', timestamp: '5m ago' },
    { id: '3', type: 'responded', message: 'Claude responded', timestamp: '8m ago' },
    { id: '4', type: 'brainstorm', message: 'New brainstorm', timestamp: '15m ago' },
  ],
  
  // Brainstorm
  brainstormReports: [
    {
      id: '1',
      title: 'Authentication System Ideas',
      content: 'Exploring different approaches for user authentication:\n\n1. OAuth2 with social providers (Google, GitHub)\n2. Magic link authentication for passwordless login\n3. Traditional email/password with 2FA support\n4. WebAuthn for biometric authentication\n\nConsiderations:\n- User experience vs security trade-offs\n- Mobile-first approach needed\n- Session management strategy',
      status: 'ready',
      tags: ['auth', 'security', 'UX'],
      annotations: [
        { id: '1', content: 'Prefer OAuth2 for initial MVP - simpler implementation', createdAt: '2024-12-24T10:00:00Z' },
      ],
      createdAt: '2024-12-23T09:00:00Z',
    },
    {
      id: '2',
      title: 'Dashboard Component Architecture',
      content: 'Breaking down the dashboard into reusable components:\n\n- MetricCard: displays KPIs with trend indicators\n- ActivityFeed: real-time updates stream\n- QuickActions: frequently used actions grid\n- RecentItems: last accessed documents/projects\n\nState management: Consider using Zustand for local state, React Query for server state.',
      status: 'refining',
      tags: ['architecture', 'components'],
      annotations: [],
      createdAt: '2024-12-22T14:30:00Z',
    },
    {
      id: '3',
      title: 'API Rate Limiting Strategy',
      content: 'Need to implement rate limiting for public APIs:\n\n- Token bucket algorithm for flexibility\n- Redis for distributed rate limiting\n- Different tiers: free (100 req/min), pro (1000 req/min)\n- Graceful degradation when limits hit',
      status: 'new',
      tags: ['API', 'performance'],
      annotations: [],
      createdAt: '2024-12-24T08:00:00Z',
    },
  ],
  selectedBrainstorm: null,
  setSelectedBrainstorm: (id) => set({ selectedBrainstorm: id }),
  addBrainstormReport: (report) => set((state) => ({
    brainstormReports: [{
      ...report,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    }, ...state.brainstormReports]
  })),
  updateBrainstormReport: (id, updates) => set((state) => ({
    brainstormReports: state.brainstormReports.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
  deleteBrainstormReport: (id) => set((state) => ({
    brainstormReports: state.brainstormReports.filter(r => r.id !== id),
    selectedBrainstorm: state.selectedBrainstorm === id ? null : state.selectedBrainstorm,
  })),
  
  // Interview
  interviewAnswers: null,
  setInterviewAnswers: (answers) => set({ interviewAnswers: answers }),
  
  // Modals
  isNewProjectOpen: false,
  setNewProjectOpen: (open) => set({ isNewProjectOpen: open }),
}));
