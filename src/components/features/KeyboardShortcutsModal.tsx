import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

interface KeyboardShortcutsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
}

interface ShortcutGroup {
  title: string;
  shortcuts: ShortcutItem[];
}

const shortcutGroups: ShortcutGroup[] = [
  {
    title: 'General',
    shortcuts: [
      { keys: ['⌘', 'K'], description: 'Open command palette' },
      { keys: ['?'], description: 'Show keyboard shortcuts' },
      { keys: ['Esc'], description: 'Close modal / Cancel' },
    ],
  },
  {
    title: 'Navigation',
    shortcuts: [
      { keys: ['⌘', '1'], description: 'Go to Dashboard' },
      { keys: ['⌘', '2'], description: 'Go to Wizard' },
      { keys: ['⌘', '3'], description: 'Go to Chat' },
      { keys: ['⌘', '4'], description: 'Go to Plans' },
      { keys: ['⌘', '5'], description: 'Go to Sessions' },
    ],
  },
  {
    title: 'Actions',
    shortcuts: [
      { keys: ['⌘', 'N'], description: 'New project' },
      { keys: ['⌘', 'S'], description: 'Save current file' },
      { keys: ['⌘', 'Shift', 'P'], description: 'Toggle command palette' },
    ],
  },
  {
    title: 'Editor',
    shortcuts: [
      { keys: ['⌘', 'Enter'], description: 'Send message' },
      { keys: ['⌘', '/'], description: 'Toggle comment' },
      { keys: ['⌘', 'D'], description: 'Select next occurrence' },
    ],
  },
];

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-medium font-mono rounded bg-muted border border-border text-muted-foreground">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsModal({ open, onOpenChange }: KeyboardShortcutsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {shortcutGroups.map((group, groupIndex) => (
            <div key={group.title}>
              {groupIndex > 0 && <Separator className="mb-4" />}
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <KeyboardKey key={keyIndex}>{key}</KeyboardKey>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Press <KeyboardKey>?</KeyboardKey> anytime to show this guide
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
