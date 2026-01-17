import { useState } from "react";
import {
  Lightbulb,
  Search,
  Palette,
  Code,
  Rocket,
  Map,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { JourneyPhase } from "@/components/JourneyPhase";
import { ProgressBar } from "@/components/ProgressBar";
import { StoryColumn, Story } from "@/components/StoryColumn";
import { AddStoryModal } from "@/components/AddStoryModal";
import { Button } from "@/components/ui/button";

const phases = [
  {
    id: "idea",
    icon: Lightbulb,
    title: "Idea",
    description: "El nacimiento del concepto",
  },
  {
    id: "discovery",
    icon: Search,
    title: "Discovery",
    description: "Investigación y validación",
  },
  {
    id: "design",
    icon: Palette,
    title: "Design",
    description: "UX/UI y arquitectura",
  },
  {
    id: "development",
    icon: Code,
    title: "Development",
    description: "Construcción del producto",
  },
  {
    id: "delivery",
    icon: Rocket,
    title: "Delivery",
    description: "Lanzamiento y feedback",
  },
];

const initialStories: Record<string, Story[]> = {
  idea: [
    {
      id: "1",
      title: "Definir visión del producto",
      description: "Establecer el objetivo principal y propuesta de valor",
      type: "epic",
      points: 8,
    },
    {
      id: "2",
      title: "Identificar stakeholders",
      description: "Mapear a todos los interesados del proyecto",
      type: "story",
      points: 3,
    },
  ],
  discovery: [
    {
      id: "3",
      title: "Entrevistas con usuarios",
      description: "Realizar 10 entrevistas para validar hipótesis",
      type: "story",
      points: 5,
    },
    {
      id: "4",
      title: "Análisis de competencia",
      description: "Estudiar soluciones existentes en el mercado",
      type: "task",
      points: 3,
    },
  ],
  design: [
    {
      id: "5",
      title: "Crear wireframes",
      description: "Diseñar los flujos principales de la aplicación",
      type: "story",
      points: 5,
    },
  ],
  development: [],
  delivery: [],
};

const Index = () => {
  const [activePhase, setActivePhase] = useState("discovery");
  const [stories, setStories] = useState(initialStories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("");

  const handleAddStory = (phaseId: string) => {
    setSelectedPhase(phaseId);
    setIsModalOpen(true);
  };

  const handleCreateStory = (newStory: Omit<Story, "id">) => {
    const story: Story = {
      ...newStory,
      id: Date.now().toString(),
    };
    setStories((prev) => ({
      ...prev,
      [selectedPhase]: [...prev[selectedPhase], story],
    }));
  };

  // Calculate progress
  const totalStories = Object.values(stories).flat().length;
  const completedPhases = phases.filter(
    (_, index) => phases.findIndex((p) => p.id === activePhase) > index,
  ).length;
  const progress = Math.round((completedPhases / phases.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-game">
                <Map className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-primary">
                  Story Quest
                </h1>
                <p className="text-xs text-muted-foreground">
                  User Story Mapping Game
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Invitar equipo</span>
              </Button>
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Nuevo proyecto</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <section className="container mx-auto px-4 py-6">
        <ProgressBar
          progress={progress}
          level={2}
          xp={totalStories * 10}
          xpToNext={100}
        />
      </section>

      {/* Journey Timeline */}
      <section className="container mx-auto px-4 pb-6">
        <div className="bg-card rounded-2xl border-2 border-border p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-lg font-bold text-foreground">
              Journey del Producto
            </h2>
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              Fase {phases.findIndex((p) => p.id === activePhase) + 1} de{" "}
              {phases.length}
            </span>
          </div>

          <div className="flex items-center justify-between relative">
            {/* Connection line */}
            <div
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-done via-primary to-muted rounded-full -z-0"
              style={{
                background: `linear-gradient(to right, 
                     hsl(var(--done)) ${(completedPhases / phases.length) * 100}%, 
                     hsl(var(--primary)) ${(completedPhases / phases.length) * 100}%, 
                     hsl(var(--muted)) 100%)`,
              }}
            />

            {phases.map((phase, index) => (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className="relative z-10"
              >
                <JourneyPhase
                  icon={phase.icon}
                  title={phase.title}
                  description={phase.description}
                  phaseNumber={index + 1}
                  isActive={activePhase === phase.id}
                  isCompleted={
                    phases.findIndex((p) => p.id === activePhase) > index
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Story Mapping Board */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-foreground">Story Map</h2>
            <span className="text-sm text-muted-foreground">
              {totalStories} historias en total
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80"
            onClick={() => handleAddStory(activePhase)}
          >
            Añadir historia
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
          {phases.map((phase) => (
            <StoryColumn
              key={phase.id}
              title={phase.title}
              phase={phase.id}
              stories={stories[phase.id]}
              onAddStory={() => handleAddStory(phase.id)}
              className={
                activePhase === phase.id ? "ring-2 ring-primary/50" : ""
              }
            />
          ))}
        </div>
      </section>

      {/* Tips section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-game flex-shrink-0">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">
                Consejo del día
              </h3>
              <p className="text-muted-foreground text-sm">
                Las mejores User Stories siguen el patrón: "Como [rol], quiero
                [funcionalidad] para [beneficio]". ¡Asegúrate de que cada
                historia aporte valor al usuario!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add Story Modal */}
      <AddStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleCreateStory}
        phase={phases.find((p) => p.id === selectedPhase)?.title || ""}
      />
    </div>
  );
};

export default Index;
