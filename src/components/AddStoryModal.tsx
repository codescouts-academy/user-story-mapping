import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, BookOpen, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (story: {
    title: string;
    description: string;
    type: "epic" | "story" | "task";
    points?: number;
  }) => void;
  phase: string;
}

const storyTypes = [
  {
    id: "epic" as const,
    label: "Epic",
    icon: Sparkles,
    description: "Gran objetivo del producto",
  },
  {
    id: "story" as const,
    label: "User Story",
    icon: BookOpen,
    description: "Funcionalidad para el usuario",
  },
  {
    id: "task" as const,
    label: "Task",
    icon: CheckSquare,
    description: "Tarea técnica específica",
  },
];

export const AddStoryModal = ({
  isOpen,
  onClose,
  onAdd,
  phase,
}: AddStoryModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"epic" | "story" | "task">("story");
  const [points, setPoints] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      description,
      type,
      points: points > 0 ? points : undefined,
    });

    setTitle("");
    setDescription("");
    setType("story");
    setPoints(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-2 border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nueva Historia
          </DialogTitle>
          <DialogDescription>
            Añade una nueva historia a la fase: <span className="font-semibold text-foreground">{phase}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Type selector */}
          <div className="space-y-2">
            <Label>Tipo de historia</Label>
            <div className="grid grid-cols-3 gap-3">
              {storyTypes.map((storyType) => (
                <button
                  key={storyType.id}
                  type="button"
                  onClick={() => setType(storyType.id)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-center group",
                    type === storyType.id
                      ? `border-${storyType.id} bg-${storyType.id}/10`
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <storyType.icon
                    className={cn(
                      "w-6 h-6 mx-auto mb-2 transition-colors",
                      type === storyType.id
                        ? `text-${storyType.id}`
                        : "text-muted-foreground group-hover:text-primary"
                    )}
                  />
                  <p className="font-semibold text-sm">{storyType.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {storyType.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Como usuario quiero..."
              className="border-2 focus:border-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el valor que aporta..."
              className="border-2 focus:border-primary min-h-[100px]"
            />
          </div>

          {/* Points */}
          <div className="space-y-2">
            <Label htmlFor="points">Puntos de historia (opcional)</Label>
            <Input
              id="points"
              type="number"
              min={0}
              max={100}
              value={points || ""}
              onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
              placeholder="0"
              className="border-2 focus:border-primary w-24"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Añadir Historia
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
