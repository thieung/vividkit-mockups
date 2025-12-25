import { useEffect, useState } from 'react';
import logoImage from '@/assets/logo.png';

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number;
}

export function SplashScreen({ onComplete, minDuration = 1500 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, minDuration);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, minDuration + 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, minDuration]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="relative">
          <img 
            src={logoImage} 
            alt="VividKit" 
            className="h-20 w-20 animate-pulse-glow"
          />
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full -z-10" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            VividKit
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-Powered Development
          </p>
        </div>

        <div className="flex gap-1 mt-4">
          <span className="h-2 w-2 rounded-full bg-primary animate-typing-1" />
          <span className="h-2 w-2 rounded-full bg-primary animate-typing-2" />
          <span className="h-2 w-2 rounded-full bg-primary animate-typing-3" />
        </div>
      </div>
    </div>
  );
}
