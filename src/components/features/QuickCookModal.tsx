import { useState } from 'react';
import { Zap, X, Rocket, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface QuickCookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCook: (feature: string) => void;
}

export function QuickCookModal({ open, onOpenChange, onCook }: QuickCookModalProps) {
  const [featureDescription, setFeatureDescription] = useState('');
  const [error, setError] = useState('');

  const handleCook = () => {
    if (!featureDescription.trim()) {
      setError('Vui lòng mô tả tính năng bạn muốn thêm');
      return;
    }
    setError('');
    onCook(featureDescription.trim());
    setFeatureDescription('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setFeatureDescription('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span>Quick Cook</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Description input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Mô tả tính năng bạn muốn thêm:
            </label>
            <Textarea
              value={featureDescription}
              onChange={(e) => {
                setFeatureDescription(e.target.value);
                if (error) setError('');
              }}
              placeholder="Ví dụ: Thêm dark mode toggle, button ở header, lưu preference vào localStorage..."
              className={cn(
                "min-h-[100px] resize-none",
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          {/* Info text */}
          <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
            <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Sẽ sử dụng <code className="px-1 py-0.5 bg-muted rounded text-foreground">/cook --auto</code> mode
              <br />
              <span className="text-muted-foreground/80">(skip review gates, auto-approve)</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCook}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Cook ngay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
