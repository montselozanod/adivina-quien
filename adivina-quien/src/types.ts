export type Category = 
  | 'all'           // Todas las categorías (Random)
  | 'deportistas'   // Deportistas
  | 'musicos'       // Músicos y cantantes
  | 'actores'       // Actores y actrices
  | 'historicos'    // Personajes históricos
  | 'animados'      // Personajes animados/ficticios
  | 'politicos'     // Políticos
  | 'empresarios'   // Empresarios y tecnología
  | 'especiales';   // Personajes especiales del evento/familia

export interface Character {
  name: string;
  image: string;
  category: Category;
}

// Evento o Familia con personajes especiales
export interface GameEvent {
  id: string;
  name: string;
  emoji: string;
  description: string;
  characters: Character[];
}

export interface Team {
  name: string;
  score: number;
  color: string;
}

export type GameState = 'setup' | 'playing' | 'round-end' | 'game-over';