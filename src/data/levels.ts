export interface StoryCard {
  id: string;
  content: string;
  type: 'activity' | 'task' | 'story';
  correctActivity?: string;
  correctRelease?: 'mvp' | 'release1' | 'release2';
  points: number;
}

export interface Activity {
  id: string;
  name: string;
  order: number;
}

export interface Level {
  id: number;
  name: string;
  description: string;
  projectName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  activities: Activity[];
  cards: StoryCard[];
  explanation: string;
  tips: string[];
}

export const levels: Level[] = [
  {
    id: 1,
    name: "Nivel 1: App de Lista de Tareas",
    description: "Organiza las historias de usuario para una aplicación simple de gestión de tareas.",
    projectName: "TaskMaster",
    difficulty: 'easy',
    activities: [
      { id: 'act1', name: 'Crear tarea', order: 1 },
      { id: 'act2', name: 'Organizar tareas', order: 2 },
      { id: 'act3', name: 'Completar tarea', order: 3 },
    ],
    cards: [
      { id: 'card1', content: 'Como usuario quiero crear una nueva tarea para registrar mis pendientes', type: 'story', correctActivity: 'act1', correctRelease: 'mvp', points: 10 },
      { id: 'card2', content: 'Como usuario quiero añadir una fecha límite para no olvidar mis compromisos', type: 'story', correctActivity: 'act1', correctRelease: 'release1', points: 10 },
      { id: 'card3', content: 'Como usuario quiero añadir una descripción detallada para tener más contexto', type: 'story', correctActivity: 'act1', correctRelease: 'release1', points: 10 },
      { id: 'card4', content: 'Como usuario quiero ver todas mis tareas para tener una visión general', type: 'story', correctActivity: 'act2', correctRelease: 'mvp', points: 10 },
      { id: 'card5', content: 'Como usuario quiero categorizar por prioridad para saber qué hacer primero', type: 'story', correctActivity: 'act2', correctRelease: 'release1', points: 10 },
      { id: 'card6', content: 'Como usuario quiero filtrar tareas por estado para encontrarlas fácilmente', type: 'story', correctActivity: 'act2', correctRelease: 'release2', points: 10 },
      { id: 'card7', content: 'Como usuario quiero marcar una tarea como completada para ver mi progreso', type: 'story', correctActivity: 'act3', correctRelease: 'mvp', points: 10 },
      { id: 'card8', content: 'Como usuario quiero archivar tareas completadas para mantener limpia mi lista', type: 'story', correctActivity: 'act3', correctRelease: 'release2', points: 10 },
    ],
    explanation: '¡Excelente trabajo! Has organizado correctamente el flujo de una app de tareas. Observa cómo el MVP incluye solo las funciones esenciales: crear, ver y completar tareas. Las mejoras como fechas, prioridades y filtros se añaden en releases posteriores.',
    tips: [
      'El MVP debe permitir el flujo completo más básico',
      'Las tareas de crear y visualizar suelen ser las primeras',
      'Funciones avanzadas como filtros van en releases posteriores'
    ]
  },
  {
    id: 2,
    name: "Nivel 2: E-commerce Básico",
    description: "Crea el story map para una tienda online sencilla.",
    projectName: "ShopSimple",
    difficulty: 'medium',
    activities: [
      { id: 'act1', name: 'Explorar productos', order: 1 },
      { id: 'act2', name: 'Gestionar carrito', order: 2 },
      { id: 'act3', name: 'Realizar compra', order: 3 },
      { id: 'act4', name: 'Seguir pedido', order: 4 },
    ],
    cards: [
      { id: 'card1', content: 'Como comprador quiero ver el catálogo de productos para descubrir lo que hay disponible', type: 'story', correctActivity: 'act1', correctRelease: 'mvp', points: 15 },
      { id: 'card2', content: 'Como comprador quiero buscar productos por nombre para encontrar lo que necesito rápidamente', type: 'story', correctActivity: 'act1', correctRelease: 'release1', points: 15 },
      { id: 'card3', content: 'Como comprador quiero filtrar por categoría para explorar productos similares', type: 'story', correctActivity: 'act1', correctRelease: 'release1', points: 15 },
      { id: 'card4', content: 'Como comprador quiero ver reseñas de productos para tomar mejores decisiones', type: 'story', correctActivity: 'act1', correctRelease: 'release2', points: 15 },
      { id: 'card5', content: 'Como comprador quiero añadir productos al carrito para comprar varios items', type: 'story', correctActivity: 'act2', correctRelease: 'mvp', points: 15 },
      { id: 'card6', content: 'Como comprador quiero modificar cantidades en el carrito para ajustar mi pedido', type: 'story', correctActivity: 'act2', correctRelease: 'mvp', points: 15 },
      { id: 'card7', content: 'Como comprador quiero guardar productos para después para decidir más tarde', type: 'story', correctActivity: 'act2', correctRelease: 'release2', points: 15 },
      { id: 'card8', content: 'Como comprador quiero pagar con tarjeta para completar mi compra', type: 'story', correctActivity: 'act3', correctRelease: 'mvp', points: 15 },
      { id: 'card9', content: 'Como comprador quiero pagar con PayPal para tener más opciones de pago', type: 'story', correctActivity: 'act3', correctRelease: 'release1', points: 15 },
      { id: 'card10', content: 'Como comprador quiero aplicar cupones de descuento para ahorrar dinero', type: 'story', correctActivity: 'act3', correctRelease: 'release2', points: 15 },
      { id: 'card11', content: 'Como comprador quiero ver el estado de mi pedido para saber cuándo llegará', type: 'story', correctActivity: 'act4', correctRelease: 'mvp', points: 15 },
      { id: 'card12', content: 'Como comprador quiero recibir notificaciones de envío para estar informado', type: 'story', correctActivity: 'act4', correctRelease: 'release1', points: 15 },
    ],
    explanation: '¡Muy bien! Has creado un e-commerce bien estructurado. El MVP cubre el flujo completo de compra: explorar → añadir al carrito → pagar → ver estado. Funciones como búsqueda, múltiples pagos y reseñas mejoran la experiencia en releases posteriores.',
    tips: [
      'Un e-commerce MVP necesita: ver productos, carrito y pago',
      'Búsqueda y filtros mejoran UX pero no son críticos para MVP',
      'Siempre incluye una forma de pago en el MVP'
    ]
  },
  {
    id: 3,
    name: "Nivel 3: Red Social",
    description: "Diseña el story map para una red social completa.",
    projectName: "ConnectHub",
    difficulty: 'hard',
    activities: [
      { id: 'act1', name: 'Gestionar perfil', order: 1 },
      { id: 'act2', name: 'Conectar con otros', order: 2 },
      { id: 'act3', name: 'Publicar contenido', order: 3 },
      { id: 'act4', name: 'Interactuar', order: 4 },
      { id: 'act5', name: 'Descubrir', order: 5 },
    ],
    cards: [
      { id: 'card1', content: 'Como usuario quiero crear mi perfil para tener presencia en la red', type: 'story', correctActivity: 'act1', correctRelease: 'mvp', points: 20 },
      { id: 'card2', content: 'Como usuario quiero editar mi información para mantenerla actualizada', type: 'story', correctActivity: 'act1', correctRelease: 'mvp', points: 20 },
      { id: 'card3', content: 'Como usuario quiero subir foto de perfil para que me reconozcan', type: 'story', correctActivity: 'act1', correctRelease: 'release1', points: 20 },
      { id: 'card4', content: 'Como usuario quiero configurar privacidad para controlar quién ve mi info', type: 'story', correctActivity: 'act1', correctRelease: 'release2', points: 20 },
      { id: 'card5', content: 'Como usuario quiero enviar solicitud de amistad para conectar con otros', type: 'story', correctActivity: 'act2', correctRelease: 'mvp', points: 20 },
      { id: 'card6', content: 'Como usuario quiero aceptar o rechazar solicitudes para gestionar mis conexiones', type: 'story', correctActivity: 'act2', correctRelease: 'mvp', points: 20 },
      { id: 'card7', content: 'Como usuario quiero bloquear usuarios para protegerme de acoso', type: 'story', correctActivity: 'act2', correctRelease: 'release1', points: 20 },
      { id: 'card8', content: 'Como usuario quiero crear publicaciones de texto para compartir ideas', type: 'story', correctActivity: 'act3', correctRelease: 'mvp', points: 20 },
      { id: 'card9', content: 'Como usuario quiero subir fotos para compartir momentos', type: 'story', correctActivity: 'act3', correctRelease: 'release1', points: 20 },
      { id: 'card10', content: 'Como usuario quiero crear stories temporales para contenido efímero', type: 'story', correctActivity: 'act3', correctRelease: 'release2', points: 20 },
      { id: 'card11', content: 'Como usuario quiero dar like a publicaciones para mostrar aprecio', type: 'story', correctActivity: 'act4', correctRelease: 'mvp', points: 20 },
      { id: 'card12', content: 'Como usuario quiero comentar publicaciones para participar en conversaciones', type: 'story', correctActivity: 'act4', correctRelease: 'mvp', points: 20 },
      { id: 'card13', content: 'Como usuario quiero compartir publicaciones para difundir contenido', type: 'story', correctActivity: 'act4', correctRelease: 'release1', points: 20 },
      { id: 'card14', content: 'Como usuario quiero ver un feed de actividad para estar al día', type: 'story', correctActivity: 'act5', correctRelease: 'mvp', points: 20 },
      { id: 'card15', content: 'Como usuario quiero buscar personas para encontrar amigos', type: 'story', correctActivity: 'act5', correctRelease: 'release1', points: 20 },
      { id: 'card16', content: 'Como usuario quiero recibir sugerencias de amigos para expandir mi red', type: 'story', correctActivity: 'act5', correctRelease: 'release2', points: 20 },
    ],
    explanation: '¡Impresionante! Has dominado un proyecto complejo. Una red social MVP necesita: crear perfil, conectar, publicar, interactuar y descubrir contenido. Funciones avanzadas como stories, privacidad y sugerencias mejoran la experiencia pero no son críticas inicialmente.',
    tips: [
      'Las redes sociales necesitan un flujo social completo desde el MVP',
      'La interacción básica (likes, comentarios) es fundamental',
      'Funciones de privacidad y seguridad pueden esperar al release 1'
    ]
  }
];

export const getReleaseLabel = (release: 'mvp' | 'release1' | 'release2'): string => {
  switch (release) {
    case 'mvp': return 'MVP';
    case 'release1': return 'Release 1';
    case 'release2': return 'Release 2';
  }
};

export const getCardTypeColor = (type: 'activity' | 'task' | 'story'): string => {
  switch (type) {
    case 'activity': return 'bg-game-epic';
    case 'task': return 'bg-game-task';
    case 'story': return 'bg-game-story';
  }
};
