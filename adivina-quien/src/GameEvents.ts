import { GameEvent } from './types';

// ============================================
// EVENTOS Y FAMILIAS CON PERSONAJES ESPECIALES
// ============================================
// Cada evento/familia tiene sus propios personajes que NO se mezclan con otros eventos
// Puedes agregar tantas familias o eventos como necesites

export const gameEvents: GameEvent[] = [
  {
    id: 'luma',
    name: 'Posada Luma',
    emoji: '👨‍👩‍👧‍👦',
    description: 'Personajes especiales de Luma',
    characters: [
       { name: 'Oscar Palomo', image: '/images/Lumat/oscar.png', category: 'especiales' },
       { name: 'Juan Carlos de Alba', image: '/images/Lumat/juan.png', category: 'especiales' },
       { name: 'Sebastian Barniol', image: '/images/Lumat/sebastian.png', category: 'especiales' },
       { name: 'Walter Trejo', image: '/images/Lumat/4. Walter Trejo.png', category: 'especiales' },
       { name: 'Ingrid Santoyo', image: '/images/Lumat/5 ingrid Santoyo.png', category: 'especiales' },
       { name: 'Jocelyn Tamez', image: '/images/Lumat/6. jocelyn tamez.png', category: 'especiales' },
       { name: 'Nahomi Alba', image: '/images/Lumat/7. nahomi alba.png', category: 'especiales' },
       { name: 'Hector Daniel Rodriguez', image: '/images/Lumat/8. Hector daniel rrodriguez.png', category: 'especiales' },
       { name: 'Luis Edgar Valdez', image: '/images/Lumat/9. luis edgar valdez.png', category: 'especiales' },
       { name: 'Ronaldo Alonso Reyes', image: '/images/Lumat/10. ronaldo alonso reyes.png', category: 'especiales' },
       { name: 'Natanael', image: '/images/Lumat/11. natanael.png', category: 'especiales' },
       { name: 'Raul Vazquez', image: '/images/Lumat/12. raul vazquez.png', category: 'especiales' },
       { name: 'Sam Dieck', image: '/images/Lumat/13. sam Dieck.png', category: 'especiales' },
       { name: 'Adrian Leal', image: '/images/Lumat/14. adrian leal.png', category: 'especiales' },
       { name: 'Daniel Rodriguez', image: '/images/Lumat/15. daniel rodriguez (CONTA).png', category: 'especiales' },
       { name: 'Claudia Rodriguez', image: '/images/Lumat/16. claudia rodriguez.png', category: 'especiales' },
       { name: 'Sra. Lucero', image: '/images/Lumat/17. sra lucero.png', category: 'especiales' },
    ]
  },
  {
    id: 'familia-dieck',
    name: 'Familia Dieck',
    emoji: '👪',
    description: 'Personajes especiales de la Familia Dieck',
    characters: [
      { name: 'Bush', image: '/images/Dieck/1. bush.png', category: 'especiales' },
      { name: 'Abuelito Chano', image: '/images/Dieck/2. abuelito chano.png', category: 'especiales' },
      { name: 'Alex Porras', image: '/images/Dieck/3. alex porras.png', category: 'especiales' },
      { name: 'El Tío Momo', image: '/images/Dieck/4. el tio momo.png', category: 'especiales' },
      { name: 'Padre Pedro', image: '/images/Dieck/5. padre pedro.png', category: 'especiales' },
      { name: 'Rachid Assad', image: '/images/Dieck/6. rachid assad.png', category: 'especiales' },
      { name: 'Samantha', image: '/images/Dieck/7. samantha.png', category: 'especiales' },
    ]
  },
  {
    id: 'familia-hugler',
    name: 'Familia Hugler',
    emoji: '🏠',
    description: 'Personajes especiales de la Familia Hugler',
    characters: [
      { name: 'Arturo Hugler I', image: '/images/Hugler/1. Arturo Hugler I.png', category: 'especiales' },
      { name: 'Das Muchacho', image: '/images/Hugler/2. das muchacho.png', category: 'especiales' },
      { name: 'Paula Gauger', image: '/images/Hugler/3. paula Gauger.png', category: 'especiales' },
      { name: 'Cornelia Hugler', image: '/images/Hugler/4. cornelia hugler.png', category: 'especiales' },
      { name: 'Carlos Quintanilla', image: '/images/Hugler/5. Carlos Quintanilla.png', category: 'especiales' },
      { name: 'Josefina Quintanilla', image: '/images/Hugler/6. Josefina Quintanilla.png', category: 'especiales' },
      { name: 'Mina', image: '/images/Hugler/7. mina.png', category: 'especiales' },
      { name: 'Ale Quintanilla', image: '/images/Hugler/8. Ale Quintanilla.png', category: 'especiales' },
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
