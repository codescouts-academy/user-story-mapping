import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DroppableZone } from "@/components/game/DroppableZone";
import { DraggableCard } from "@/components/game/DraggableCard";
import {
  Home,
  Plus,
  Download,
  Trash2,
  Save,
  Rocket,
  Zap,
  Flag,
  GripVertical,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomCard {
  id: string;
  content: string;
  type: "activity" | "task" | "story";
  points: number;
}

interface PlacedCustomCard extends CustomCard {
  activityId: string;
  release: "mvp" | "release1" | "release2";
}

interface Activity {
  id: string;
  name: string;
}

const releases = [
  {
    id: "mvp" as const,
    label: "MVP",
    icon: <Rocket className="w-4 h-4" />,
    color: "text-game-valuable",
  },
  {
    id: "release1" as const,
    label: "Release 1",
    icon: <Zap className="w-4 h-4" />,
    color: "text-primary",
  },
  {
    id: "release2" as const,
    label: "Release 2",
    icon: <Flag className="w-4 h-4" />,
    color: "text-secondary",
  },
];

const FreeModePage: React.FC = () => {
  const navigate = useNavigate();
  const boardRef = useRef<HTMLDivElement>(null);

  const [projectName, setProjectName] = useState("Mi Proyecto");
  const [activities, setActivities] = useState<Activity[]>([
    { id: "act1", name: "Actividad 1" },
    { id: "act2", name: "Actividad 2" },
    { id: "act3", name: "Actividad 3" },
  ]);
  const [unplacedCards, setUnplacedCards] = useState<CustomCard[]>([]);
  const [placedCards, setPlacedCards] = useState<PlacedCustomCard[]>([]);
  const [activeCard, setActiveCard] = useState<CustomCard | null>(null);

  // New card form
  const [newCardContent, setNewCardContent] = useState("");
  const [newCardType, setNewCardType] = useState<"story" | "task">("story");
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  // New activity form
  const [newActivityName, setNewActivityName] = useState("");
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  const handleAddCard = () => {
    if (!newCardContent.trim()) return;

    const card: CustomCard = {
      id: `card-${Date.now()}`,
      content: newCardContent,
      type: newCardType,
      points: newCardType === "story" ? 10 : 5,
    };

    setUnplacedCards((prev) => [...prev, card]);
    setNewCardContent("");
    setIsAddCardOpen(false);
  };

  const handleAddActivity = () => {
    if (!newActivityName.trim()) return;

    const activity: Activity = {
      id: `act-${Date.now()}`,
      name: newActivityName,
    };

    setActivities((prev) => [...prev, activity]);
    setNewActivityName("");
    setIsAddActivityOpen(false);
  };

  const handleRemoveActivity = (activityId: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== activityId));
    // Return cards from this activity to bank
    const cardsToReturn = placedCards.filter(
      (c) => c.activityId === activityId,
    );
    setPlacedCards((prev) => prev.filter((c) => c.activityId !== activityId));
    setUnplacedCards((prev) => [
      ...prev,
      ...cardsToReturn.map((c) => ({
        id: c.id,
        content: c.content,
        type: c.type,
        points: c.points,
      })),
    ]);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const card = event.active.data.current?.card;
    if (card) setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over) return;

    const cardId = active.id as string;
    const isPlaced = active.data.current?.isPlaced;
    const dropData = over.data.current;

    if (dropData?.activityId && dropData?.release) {
      if (isPlaced) {
        // Move placed card
        setPlacedCards((prev) =>
          prev.map((c) =>
            c.id === cardId
              ? {
                  ...c,
                  activityId: dropData.activityId,
                  release: dropData.release,
                }
              : c,
          ),
        );
      } else {
        // Place new card
        const card = unplacedCards.find((c) => c.id === cardId);
        if (card) {
          setUnplacedCards((prev) => prev.filter((c) => c.id !== cardId));
          setPlacedCards((prev) => [
            ...prev,
            {
              ...card,
              activityId: dropData.activityId,
              release: dropData.release,
            },
          ]);
        }
      }
    }
  };

  const handleReturnCard = (cardId: string) => {
    const card = placedCards.find((c) => c.id === cardId);
    if (card) {
      setPlacedCards((prev) => prev.filter((c) => c.id !== cardId));
      setUnplacedCards((prev) => [
        ...prev,
        {
          id: card.id,
          content: card.content,
          type: card.type,
          points: card.points,
        },
      ]);
    }
  };

  const handleExportImage = async () => {
    if (!boardRef.current) return;

    try {
      const dataUrl = await toPng(boardRef.current, {
        backgroundColor: "#1a1a2e",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `${projectName.replace(/\s+/g, "-")}-story-map.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
    }
  };

  const getCardsForZone = (
    activityId: string,
    release: "mvp" | "release1" | "release2",
  ) => {
    return placedCards.filter(
      (c) => c.activityId === activityId && c.release === release,
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-primary/10"
          >
            <Home className="w-5 h-5" />
          </Button>

          <div>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-xl font-bold bg-transparent border-none h-auto p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Nombre del proyecto"
            />
            <p className="text-sm text-muted-foreground">
              Modo Libre - Crea tu propio Story Map
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Actividad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva Actividad</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Nombre de la actividad</Label>
                  <Input
                    value={newActivityName}
                    onChange={(e) => setNewActivityName(e.target.value)}
                    placeholder="Ej: Registrar usuario"
                  />
                </div>
                <Button onClick={handleAddActivity} className="w-full">
                  Añadir Actividad
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Historia
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nueva Historia de Usuario</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select
                    value={newCardType}
                    onValueChange={(v: "story" | "task") => setNewCardType(v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="story">Historia de Usuario</SelectItem>
                      <SelectItem value="task">Tarea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Contenido</Label>
                  <Textarea
                    value={newCardContent}
                    onChange={(e) => setNewCardContent(e.target.value)}
                    placeholder="Como usuario quiero... para..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddCard} className="w-full">
                  Añadir Historia
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            onClick={handleExportImage}
            className="gap-2 bg-gradient-to-r from-primary to-secondary"
          >
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </header>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
      >
        <div className="flex gap-6 h-[calc(100vh-120px)]">
          {/* Card Bank */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Banco de Historias</h3>
                <span className="ml-auto text-sm text-muted-foreground">
                  {unplacedCards.length}
                </span>
              </div>

              {unplacedCards.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground/30 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Añade historias con el botón "Historia"
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[calc(100%-60px)] overflow-y-auto pr-2">
                  {unplacedCards.map((card) => (
                    <DraggableCard key={card.id} card={card as any} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Board */}
          <div className="flex-1 overflow-x-auto" ref={boardRef}>
            <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 min-w-max">
              {/* Activities Header */}
              <div
                className="grid gap-4 mb-4"
                style={{
                  gridTemplateColumns: `repeat(${activities.length}, minmax(200px, 1fr))`,
                }}
              >
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-gradient-to-r from-game-epic/80 to-game-epic/60 rounded-lg p-3 relative group"
                  >
                    <Input
                      value={activity.name}
                      onChange={(e) =>
                        setActivities((prev) =>
                          prev.map((a) =>
                            a.id === activity.id
                              ? { ...a, name: e.target.value }
                              : a,
                          ),
                        )
                      }
                      className="bg-transparent border-none text-foreground font-bold text-sm uppercase tracking-wide text-center h-auto p-0 focus-visible:ring-0"
                    />
                    {activities.length > 1 && (
                      <button
                        onClick={() => handleRemoveActivity(activity.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive/80 text-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Release Rows */}
              {releases.map((release) => (
                <div key={release.id} className="mb-4">
                  <div
                    className={`flex items-center gap-2 mb-2 ${release.color}`}
                  >
                    {release.icon}
                    <span className="font-semibold text-sm">
                      {release.label}
                    </span>
                    <div className="flex-1 h-px bg-current opacity-30" />
                  </div>
                  <div
                    className="grid gap-4"
                    style={{
                      gridTemplateColumns: `repeat(${activities.length}, minmax(200px, 1fr))`,
                    }}
                  >
                    {activities.map((activity) => (
                      <DroppableZone
                        key={`${activity.id}-${release.id}`}
                        id={`${activity.id}-${release.id}`}
                        activityId={activity.id}
                        release={release.id}
                      >
                        {getCardsForZone(activity.id, release.id).map(
                          (card) => (
                            <DraggableCard
                              key={card.id}
                              card={card as any}
                              isPlaced
                              onRemove={() => handleReturnCard(card.id)}
                            />
                          ),
                        )}
                      </DroppableZone>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="opacity-90 rotate-3 scale-105">
              <DraggableCard card={activeCard as any} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default FreeModePage;
