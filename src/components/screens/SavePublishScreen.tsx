import { useState } from 'react';
import { Save, Upload, CheckCircle2, Clock, Sparkles, Globe, Shield, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface SavePoint {
  id: string;
  title: string;
  time: string;
  auto: boolean;
}

export function SavePublishScreen() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>('5 minutes ago');
  const [isPublished, setIsPublished] = useState(true);
  const [publishedUrl] = useState('myapp.lovable.app');
  
  const [savePoints] = useState<SavePoint[]>([
    { id: '1', title: 'Added login page', time: '5 min ago', auto: false },
    { id: '2', title: 'Auto-save', time: '12 min ago', auto: true },
    { id: '3', title: 'Updated homepage design', time: '1 hour ago', auto: false },
    { id: '4', title: 'Auto-save', time: '2 hours ago', auto: true },
    { id: '5', title: 'Initial setup', time: 'Yesterday', auto: false },
  ]);
  
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    setLastSaved('Just now');
    toast({
      title: "Progress saved!",
      description: "Your changes have been saved safely.",
    });
  };
  
  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate publish
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsPublishing(false);
    setIsPublished(true);
    toast({
      title: "App published!",
      description: "Your app is now live at " + publishedUrl,
    });
  };
  
  const handleRestore = (savePoint: SavePoint) => {
    toast({
      title: "Restored!",
      description: `Restored to "${savePoint.title}"`,
    });
  };
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-card/50 border-b border-border/50">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold flex items-center gap-2">
            💾 Save & Publish
          </h1>
          {lastSaved && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              Last saved {lastSaved}
            </div>
          )}
        </div>
        {isPublished && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-success/15 border border-success/30 rounded-lg text-sm font-medium text-success">
            <Globe className="w-3.5 h-3.5" />
            Live at {publishedUrl}
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Big Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
          {/* Save Progress */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={cn(
              "group relative p-8 bg-card border-2 border-border rounded-2xl text-center transition-all",
              "hover:border-accent hover:shadow-[0_8px_30px_hsl(var(--accent)/0.15)]",
              "hover:-translate-y-1 active:translate-y-0",
              isSaving && "opacity-70 pointer-events-none"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className={cn(
                "w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center",
                "bg-accent/10 text-accent",
                "group-hover:scale-110 transition-transform"
              )}>
                {isSaving ? (
                  <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                ) : (
                  <Save className="w-10 h-10" />
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">
                {isSaving ? 'Saving...' : 'Save Progress'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Save your work so you never lose changes
              </p>
            </div>
          </button>
          
          {/* Publish */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={cn(
              "group relative p-8 bg-card border-2 border-border rounded-2xl text-center transition-all",
              "hover:border-success hover:shadow-[0_8px_30px_hsl(var(--success)/0.15)]",
              "hover:-translate-y-1 active:translate-y-0",
              isPublishing && "opacity-70 pointer-events-none"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className={cn(
                "w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center",
                "bg-success/10 text-success",
                "group-hover:scale-110 transition-transform"
              )}>
                {isPublishing ? (
                  <div className="w-8 h-8 border-2 border-success/30 border-t-success rounded-full animate-spin" />
                ) : (
                  <Upload className="w-10 h-10" />
                )}
              </div>
              <h2 className="text-xl font-bold mb-2">
                {isPublishing ? 'Publishing...' : 'Publish to Web'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Make your app live for everyone to see
              </p>
            </div>
          </button>
        </div>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="p-4 bg-card/50 border border-border/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-semibold">Auto-Save</div>
                <div className="text-xs text-success">Enabled</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-card/50 border border-border/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="text-sm font-semibold">Backup</div>
                <div className="text-xs text-success">All changes backed up</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-card/50 border border-border/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <History className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="text-sm font-semibold">History</div>
                <div className="text-xs text-muted-foreground">{savePoints.length} save points</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Save History */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 border border-border/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
              <span className="text-sm font-semibold flex items-center gap-2">
                <History className="w-4 h-4" />
                Recent Save Points
              </span>
              <span className="text-xs text-muted-foreground">
                Click to restore
              </span>
            </div>
            <div className="divide-y divide-border/50">
              {savePoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => handleRestore(point)}
                  className={cn(
                    "w-full flex items-center gap-4 px-5 py-4 transition-colors text-left",
                    "hover:bg-card/80 group"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    point.auto 
                      ? "bg-muted text-muted-foreground" 
                      : "bg-accent/10 text-accent"
                  )}>
                    {point.auto ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {point.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {point.time}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  >
                    Restore
                  </Button>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
