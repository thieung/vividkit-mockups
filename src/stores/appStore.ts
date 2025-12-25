import { create } from 'zustand';

export type TabId = 'dashboard' | 'wizard' | 'chat' | 'plans' | 'sessions' | 'settings' | 'files' | 'git' | 'usage';

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

interface AppState {
  // Navigation
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  
  // Command Palette
  isCommandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  
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
  
  // Modals
  isNewProjectOpen: boolean;
  setNewProjectOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab, selectedPlan: null }),
  
  // Command Palette
  isCommandPaletteOpen: false,
  openCommandPalette: () => set({ isCommandPaletteOpen: true }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  
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
  
  // Modals
  isNewProjectOpen: false,
  setNewProjectOpen: (open) => set({ isNewProjectOpen: open }),
}));
