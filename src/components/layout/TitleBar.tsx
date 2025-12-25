import logoImage from '@/assets/logo.png';

export function TitleBar() {
  return (
    <div className="h-10 bg-sidebar flex items-center px-4 border-b border-sidebar-border">
      {/* Window Controls (macOS style) */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
      </div>
      
      {/* Title */}
      <div className="flex-1 flex items-center justify-center">
        <img src={logoImage} alt="VividKit" className="w-5 h-5 rounded mr-2" />
        <span className="text-sm font-medium text-foreground/80">VividKit Desktop</span>
      </div>
      
      {/* Spacer for symmetry */}
      <div className="w-16" />
    </div>
  );
}
