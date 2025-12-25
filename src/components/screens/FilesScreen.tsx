import { useState } from 'react';
import { Folder, File, Search, Plus, FolderOpen, Copy, Grid3X3, List, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  items?: number;
}

interface FolderItem {
  name: string;
  children?: FolderItem[];
  expanded?: boolean;
}

const folderTree: FolderItem[] = [
  { 
    name: 'src', 
    expanded: true,
    children: [
      { 
        name: 'components', 
        expanded: true,
        children: [
          { name: 'auth', expanded: true },
          { name: 'ui' },
        ]
      },
      { name: 'hooks' },
      { name: 'utils' },
    ]
  },
  { name: 'public' },
  { name: 'tests' },
];

const files: FileItem[] = [
  { name: 'Login.tsx', type: 'file', size: '2.3 KB' },
  { name: 'Register.tsx', type: 'file', size: '1.8 KB' },
  { name: 'AuthProvider.tsx', type: 'file', size: '3.1 KB' },
  { name: 'useAuth.ts', type: 'file', size: '1.2 KB' },
  { name: 'types.ts', type: 'file', size: '0.8 KB' },
  { name: '__tests__', type: 'folder', items: 3 },
];

export function FilesScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const renderFolder = (folder: FolderItem, depth: number = 0) => (
    <div key={folder.name} style={{ paddingLeft: `${depth * 12}px` }}>
      <button className="flex items-center gap-2 py-1.5 px-2 w-full text-left text-sm hover:bg-secondary/50 rounded-md transition-colors">
        <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform", folder.expanded && "rotate-90")} />
        <Folder className="w-4 h-4 text-primary" />
        <span className={folder.expanded ? 'text-foreground' : 'text-muted-foreground'}>{folder.name}</span>
      </button>
      {folder.expanded && folder.children?.map(child => renderFolder(child, depth + 1))}
    </div>
  );
  
  return (
    <div className="h-full flex animate-fade-in">
      {/* Sidebar */}
      <div className="w-56 border-r border-border pr-4 flex flex-col">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Folder className="w-3.5 h-3.5" />
          Folders
        </h3>
        <div className="flex-1 overflow-auto">
          {folderTree.map(folder => renderFolder(folder))}
        </div>
        
        <div className="pt-4 border-t border-border mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 pl-6 flex flex-col">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-sm">
            <Folder className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">src</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">components</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">auth</span>
          </div>
        </div>
        
        {/* Files Grid/List */}
        <div className={cn(
          "flex-1 overflow-auto",
          viewMode === 'grid' ? "grid grid-cols-4 gap-3 content-start" : "space-y-1"
        )}>
          {files.map((file, index) => (
            <button
              key={file.name}
              onClick={() => setSelectedFile(file.name)}
              className={cn(
                "text-left transition-all animate-fade-in",
                viewMode === 'grid' 
                  ? "glass-card p-4 hover:border-primary/50" 
                  : "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50",
                selectedFile === file.name && "border-primary bg-primary/5"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {viewMode === 'grid' ? (
                <>
                  <div className="flex justify-center mb-3">
                    {file.type === 'folder' ? (
                      <Folder className="w-10 h-10 text-primary" />
                    ) : (
                      <File className="w-10 h-10 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.type === 'folder' ? `${file.items} items` : file.size}
                  </p>
                </>
              ) : (
                <>
                  {file.type === 'folder' ? (
                    <Folder className="w-5 h-5 text-primary" />
                  ) : (
                    <File className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="text-sm flex-1">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {file.type === 'folder' ? `${file.items} items` : file.size}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-4">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New
            </button>
            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Open
            </button>
            <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Copy Path
            </button>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'grid' ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'list' ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
