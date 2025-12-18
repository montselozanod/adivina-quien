import { GameEvent } from './types';

// ============================================
// EVENTOS Y FAMILIAS CON PERSONAJES ESPECIALES
// ============================================
// Cada evento/familia tiene sus propios personajes que NO se mezclan con otros eventos
// Puedes agregar tantas familias o eventos como necesites

export const gameEvents: GameEvent[] = [
  // ----------------------------------------
  // FAMILIA 1: Ejemplo - Familia García
  // ----------------------------------------
  {
    id: 'luma',
    name: 'Posada Luma',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Personajes especiales de Luma',
    characters: [
       { name: 'Oscar Palomo', image: 'URL_DE_LA_FOTO', category: 'especiales' },
       { name: 'Juan Carlos de Alba', image: 'URL_DE_LA_FOTO', category: 'especiales' },
       { name: 'Sebastian Barniol', image: 'URL_DE_LA_FOTO', category: 'especiales' },
    ]
  },

  // ----------------------------------------
  // FAMILIA 2: Ejemplo - Familia López  
  // ----------------------------------------
  {
    id: 'familia-dieck',
    name: 'Familia Dieck',
    emoji: '👪',
    description: 'Personajes especiales de la Familia Dieck',
    characters: [
      // Agrega aquí los miembros de la familia con sus fotos
      // { name: 'Abuelo Pedro', image: 'URL_DE_LA_FOTO', category: 'especiales' },
      // { name: 'Tía Carmen', image: 'URL_DE_LA_FOTO', category: 'especiales' },
    ]
  },

  // ----------------------------------------
  // FAMILIA 3: Ejemplo - Familia Martínez
  // ----------------------------------------
  {
    id: 'familia-hugler',
    name: 'Familia Hugler',
    emoji: '🏠',
    description: 'Personajes especiales de la Familia Hugler',
    characters: [
      // Agrega aquí los miembros de la familia con sus fotos
      // { name: 'Abuela Lupe', image: 'URL_DE_LA_FOTO', category: 'especiales' },
    ]
  },
];

// Obtener un evento por su ID
export const getEventById = (eventId: string): GameEvent | undefined => {
  return gameEvents.find(event => event.id === eventId);
};

// Obtener lista de eventos disponibles (que tienen al menos 1 personaje)
export const getAvailableEvents = (): GameEvent[] => {
  return gameEvents.filter(event => event.characters.length > 0);
};

// Obtener todos los eventos (incluso vacíos, para mostrar en configuración)
export const getAllEvents = (): GameEvent[] => {
  return gameEvents;
};
