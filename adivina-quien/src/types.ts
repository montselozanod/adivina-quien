export interface Character {
  name: string;
  image: string;
}

export interface Team {
  name: string;
  score: number;
  color: string;
}

export type GameState = 'setup' | 'playing' | 'round-end' | 'game-over';