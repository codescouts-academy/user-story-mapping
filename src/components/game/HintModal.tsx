import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface HintModalProps {
  isOpen: boolean;
  hint: string;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ isOpen, hint, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-game-valuable/30">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-game-valuable">
            <div className="w-10 h-10 rounded-full bg-game-valuable/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            Pista del Mentor
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-game-valuable/10 border border-game-valuable/30 rounded-lg p-4">
            <p className="text-foreground leading-relaxed">{hint}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline">
            ¡Entendido!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
