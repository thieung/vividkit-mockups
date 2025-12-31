import { useState, useRef } from 'react';
import { Upload, Image, X, Wand2, Check, Loader2, FileImage, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface UploadedDesign {
  id: string;
  file: File;
  preview: string;
  name: string;
}

type AnalysisStatus = 'idle' | 'analyzing' | 'complete';

interface AnalysisResult {
  components: string[];
  colors: string[];
  layout: string;
  suggestions: string[];
}

export function DesignUploadScreen() {
  const [designs, setDesigns] = useState<UploadedDesign[]>([]);
  const [notes, setNotes] = useState('');
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('idle');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    
    const newDesigns: UploadedDesign[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        newDesigns.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          file,
          preview,
          name: file.name,
        });
      }
    });
    
    setDesigns((prev) => [...prev, ...newDesigns]);
    setAnalysisStatus('idle');
    setAnalysisResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeDesign = (id: string) => {
    setDesigns((prev) => {
      const design = prev.find((d) => d.id === id);
      if (design) {
        URL.revokeObjectURL(design.preview);
      }
      return prev.filter((d) => d.id !== id);
    });
    if (designs.length === 1) {
      setAnalysisStatus('idle');
      setAnalysisResult(null);
    }
  };

  const analyzeDesigns = async () => {
    if (designs.length === 0) return;
    
    setAnalysisStatus('analyzing');
    
    // Simulated AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    setAnalysisResult({
      components: ['Navigation Bar', 'Hero Section', 'Feature Cards', 'Call-to-Action Button', 'Footer'],
      colors: ['#6366f1', '#f97316', '#10b981', '#1f2937', '#f3f4f6'],
      layout: 'Modern single-page layout with centered content and card-based sections',
      suggestions: [
        'Add responsive breakpoints for mobile',
        'Include hover states for interactive elements',
        'Consider adding a loading skeleton',
        'Add dark mode color variants',
      ],
    });
    
    setAnalysisStatus('complete');
  };

  const buildFromDesign = () => {
    // This would trigger the actual build process
    console.log('Building from design with notes:', notes);
  };

  return (
    <div className="h-full overflow-auto p-6 bg-background">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FileImage className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Design Upload</h1>
              <p className="text-muted-foreground">
                Upload screenshots or mockups and let AI build it for you
              </p>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <Card
          className={cn(
            "border-2 border-dashed transition-all cursor-pointer",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
              isDragging ? "bg-primary/20" : "bg-muted"
            )}>
              <Upload className={cn(
                "w-8 h-8 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {isDragging ? "Drop your designs here" : "Upload your design"}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Drag & drop images or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PNG, JPG, WEBP • Multiple files allowed
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </Card>

        {/* Uploaded Designs Preview */}
        {designs.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">
              Uploaded Designs ({designs.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {designs.map((design) => (
                <div
                  key={design.id}
                  className="relative group rounded-lg overflow-hidden border border-border bg-card"
                >
                  <img
                    src={design.preview}
                    alt={design.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="w-8 h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDesign(design.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="p-2 border-t border-border">
                    <p className="text-xs text-muted-foreground truncate">
                      {design.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Section */}
        {designs.length > 0 && (
          <Card className="p-4 space-y-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Additional Instructions (optional)
            </label>
            <Textarea
              placeholder="Tell us more about what you want... e.g., 'Make the buttons rounded' or 'Use a dark theme'"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </Card>
        )}

        {/* Analyze Button */}
        {designs.length > 0 && analysisStatus !== 'complete' && (
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={analyzeDesigns}
            disabled={analysisStatus === 'analyzing'}
          >
            {analysisStatus === 'analyzing' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing your design...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Analyze Design
              </>
            )}
          </Button>
        )}

        {/* Analysis Results */}
        {analysisStatus === 'complete' && analysisResult && (
          <div className="space-y-4">
            <Card className="p-5 space-y-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2 text-primary">
                <Check className="w-5 h-5" />
                <span className="font-medium">Analysis Complete</span>
              </div>
              
              <div className="space-y-4">
                {/* Detected Components */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Detected Components
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.components.map((component) => (
                      <span
                        key={component}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Palette */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Color Palette
                  </h4>
                  <div className="flex gap-2">
                    {analysisResult.colors.map((color) => (
                      <div
                        key={color}
                        className="w-10 h-10 rounded-lg border border-border shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Layout */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Layout Style
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {analysisResult.layout}
                  </p>
                </div>

                {/* Suggestions */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    AI Suggestions
                  </h4>
                  <ul className="space-y-1">
                    {analysisResult.suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Build Button */}
            <Button
              size="lg"
              className="w-full gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
              onClick={buildFromDesign}
            >
              <Wand2 className="w-5 h-5" />
              Build This Design
            </Button>
          </div>
        )}

        {/* Empty State Tips */}
        {designs.length === 0 && (
          <Card className="p-6 bg-muted/30">
            <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Image className="w-5 h-5 text-primary" />
              Tips for best results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Upload clear, high-resolution screenshots
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Include the full screen or section you want built
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Multiple views help (desktop, mobile, hover states)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Add notes about specific requirements or preferences
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
