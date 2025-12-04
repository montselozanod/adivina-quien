export type Category = 
  | 'all'           // Todas las categorías (Random)
  | 'deportistas'   // Deportistas
  | 'musicos'       // Músicos y cantantes
  | 'actores'       // Actores y actrices
  | 'historicos'    // Personajes históricos
  | 'animados'      // Personajes animados/ficticios
  | 'politicos'     // Políticos
  | 'empresarios';  // Empresarios y tecnología

export interface Character {
  name: string;
  image: string;
  category: Category;
}

export interface Team {
  name: string;
  score: number;
  color: string;
}

export type GameState = 'setup' | 'playing' | 'round-end' | 'game-over';