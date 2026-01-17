import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Map, 
  GraduationCap, 
  Gamepad2, 
  Sparkles,
  Users,
  Rocket,
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Tutorial Guiado',
      description: '3 niveles progresivos para aprender User Story Mapping paso a paso'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: 'Modo Libre',
      description: 'Crea tu propio Story Map desde cero con tarjetas personalizadas'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Sistema de Puntos',
      description: 'Gana puntos por colocar correctamente las historias de usuario'
    },
  ];

  const steps = [
    { num: 1, title: 'Actividades', desc: 'Define las acciones principales del usuario en el eje horizontal' },
    { num: 2, title: 'Historias', desc: 'Organiza las historias de usuario bajo cada actividad' },
    { num: 3, title: 'Releases', desc: 'Prioriza y agrupa en MVP, Release 1, Release 2...' },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Aprende jugando</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              Story Quest
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Domina el arte del <span className="text-primary font-semibold">User Story Mapping</span> a través 
            de un juego interactivo diseñado para equipos de desarrollo
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/tutorial')}
              className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6 shadow-xl shadow-primary/30"
            >
              <GraduationCap className="w-5 h-5" />
              Comenzar Tutorial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/free-mode')}
              className="gap-2 border-2 border-accent text-accent hover:bg-accent/10 text-lg px-8 py-6"
            >
              <Gamepad2 className="w-5 h-5" />
              Jugar Libremente
            </Button>
          </div>
        </header>

        {/* What is User Story Mapping */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">¿Qué es User Story Mapping?</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              El <strong className="text-foreground">User Story Mapping</strong> es una técnica visual que ayuda 
              a los equipos a entender el viaje completo del usuario con un producto. Organiza las historias 
              de usuario en un mapa bidimensional donde:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {steps.map((step) => (
                <div 
                  key={step.num}
                  className="relative bg-muted/30 rounded-xl p-4 border border-border/30"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                    {step.num}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 mt-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Características del <span className="text-primary">Juego</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-6 hover:border-primary/50 hover:bg-card/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Map className="w-5 h-5 text-primary" />
            <span className="font-semibold">Story Quest</span>
          </div>
          <p className="text-sm">
            Diseñado para equipos ágiles que quieren dominar el User Story Mapping
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
