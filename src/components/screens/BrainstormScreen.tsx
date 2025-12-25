import { useState } from 'react';
import { Plus, Search, FileText, Edit3, Lightbulb, ArrowRight, Trash2, MessageSquare, Tag, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore, BrainstormReport } from '@/stores/appStore';
import { Textarea } from '@/components/ui/textarea';

export function BrainstormScreen() {
  const { brainstormReports, selectedBrainstorm, setSelectedBrainstorm, updateBrainstormReport, deleteBrainstormReport, setActiveTab } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
  
  const filteredReports = brainstormReports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedReport = brainstormReports.find(r => r.id === selectedBrainstorm);
  
  const handleAddAnnotation = (reportId: string) => {
    if (!noteContent.trim()) return;
    
    const report = brainstormReports.find(r => r.id === reportId);
    if (report) {
      updateBrainstormReport(reportId, {
        annotations: [...report.annotations, {
          id: String(Date.now()),
          content: noteContent,
          createdAt: new Date().toISOString(),
        }]
      });
      setNoteContent('');
      setEditingNote(null);
    }
  };
  
  const handleConvertToPlan = (report: BrainstormReport) => {
    updateBrainstormReport(report.id, { status: 'converted' });
    setActiveTab('plans');
  };
  
  const handleRefine = (reportId: string) => {
    updateBrainstormReport(reportId, { status: 'refining' });
  };
  
  return (
    <div className="h-full flex gap-6 animate-fade-in">
      {/* Left Panel - Report List */}
      <div className="w-80 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Brainstorm Reports
          </h2>
          <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        {/* Report List */}
        <div className="flex-1 overflow-auto space-y-2">
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              onClick={() => setSelectedBrainstorm(report.id)}
              className={cn(
                "glass-card p-4 cursor-pointer transition-all animate-fade-in",
                selectedBrainstorm === report.id
                  ? "border-primary/50 bg-primary/5"
                  : "hover:border-primary/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  report.status === 'new' ? "bg-blue-500/10 text-blue-400" :
                  report.status === 'refining' ? "bg-amber-500/10 text-amber-400" :
                  report.status === 'ready' ? "bg-green-500/10 text-green-400" :
                  "bg-muted text-muted-foreground"
                )}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{report.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.content}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      report.status === 'new' ? "bg-blue-500/10 text-blue-400" :
                      report.status === 'refining' ? "bg-amber-500/10 text-amber-400" :
                      report.status === 'ready' ? "bg-green-500/10 text-green-400" :
                      "bg-muted text-muted-foreground"
                    )}>
                      {report.status}
                    </span>
                    {report.annotations.length > 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {report.annotations.length}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredReports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No brainstorm reports found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right Panel - Report Detail */}
      <div className="flex-1 flex flex-col min-h-0">
        {selectedReport ? (
          <>
            {/* Report Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    selectedReport.status === 'new' ? "bg-blue-500/10 text-blue-400" :
                    selectedReport.status === 'refining' ? "bg-amber-500/10 text-amber-400" :
                    selectedReport.status === 'ready' ? "bg-green-500/10 text-green-400" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {selectedReport.status}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(selectedReport.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-xl font-semibold">{selectedReport.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                {selectedReport.status !== 'converted' && (
                  <>
                    <button
                      onClick={() => handleRefine(selectedReport.id)}
                      className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Refine
                    </button>
                    <button
                      onClick={() => handleConvertToPlan(selectedReport)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      Convert to Plan
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    deleteBrainstormReport(selectedReport.id);
                    setSelectedBrainstorm(null);
                  }}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Tags */}
            {selectedReport.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {selectedReport.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-muted rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Content */}
            <div className="glass-card p-6 mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Report Content
              </h3>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {selectedReport.content}
              </div>
            </div>
            
            {/* Annotations */}
            <div className="flex-1 min-h-0 flex flex-col">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Annotations & Notes
                <span className="text-xs text-muted-foreground">({selectedReport.annotations.length})</span>
              </h3>
              
              <div className="flex-1 overflow-auto space-y-3 mb-4">
                {selectedReport.annotations.map((annotation, index) => (
                  <div
                    key={annotation.id}
                    className="glass-card p-4 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <p className="text-sm">{annotation.content}</p>
                    <span className="text-xs text-muted-foreground mt-2 block">
                      {new Date(annotation.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))}
                
                {selectedReport.annotations.length === 0 && !editingNote && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No annotations yet. Add your thoughts to refine this brainstorm.
                  </p>
                )}
              </div>
              
              {/* Add Annotation */}
              <div className="glass-card p-4">
                <Textarea
                  placeholder="Add an annotation or note..."
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="min-h-[80px] mb-3"
                />
                <button
                  onClick={() => handleAddAnnotation(selectedReport.id)}
                  disabled={!noteContent.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Note
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Select a Brainstorm Report</p>
              <p className="text-sm">Choose a report from the list to view, annotate, and refine it</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
