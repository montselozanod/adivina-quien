import React, { useState, useEffect } from 'react';
import { Users, Play, Settings, Trophy, Clock, RotateCcw } from 'lucide-react';

interface Character {
  name: string;
  image: string;
}

interface Team {
  name: string;
  score: number;
  color: string;
}

type GameState = 'setup' | 'playing' | 'round-end' | 'game-over';

const GuessWhoGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [teams, setTeams] = useState<Team[]>([
    { name: 'Equipo 1', score: 0, color: 'bg-blue-500' },
    { name: 'Equipo 2', score: 0, color: 'bg-red-500' }
  ]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<boolean>(false);
  const [roundsPlayed, setRoundsPlayed] = useState<number>(0);
  const [maxRounds, setMaxRounds] = useState<number>(5);

  const characters: Character[] = [
    { name: 'Albert Einstein', image: '' },
    { name: 'Frida Kahlo', image: '' },
    { name: 'Leonardo da Vinci', image: '' },
    { name: 'Marie Curie', image: '' },
    { name: 'Nelson Mandela', image: '' },
    { name: 'Cleopatra', image: '' },
    { name: 'Abraham Lincoln', image: '' },
    { name: 'Gandhi', image: '' },
    { name: 'William Shakespeare', image: '' },
    { name: 'Pablo Picasso', image: '' },
    { name: 'Mozart', image: '' },
    { name: 'Beethoven', image: '' },
    { name: 'Michael Jordan', image: '' },
    { name: 'Pelé', image: '' },
    { name: 'Muhammad Ali', image: '' },
    { name: 'Serena Williams', image: '' },
    { name: 'Steve Jobs', image: '' },
    { name: 'Bill Gates', image: '' },
    { name: 'Elon Musk', image: '' },
    { name: 'Mark Zuckerberg', image: '' },
    { name: 'Harry Potter', image: '' },
    { name: 'Spider-Man', image: '' },
    { name: 'Batman', image: '' },
    { name: 'Superman', image: '' },
    { name: 'Mickey Mouse', image: '' },
    { name: 'Mario Bros', image: '' },
    { name: 'Pikachu', image: '' },
    { name: 'Sonic', image: '' },
    { name: 'Cristiano Ronaldo', image: '' },
    { name: 'Lionel Messi', image: '' },
    { name: 'The Beatles', image: '' },
    { name: 'Elvis Presley', image: '' }
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      setGameState('round-end');
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const addTeam = (): void => {
    const colors = ['bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500'];
    const newTeam: Team = {
      name: `Equipo ${teams.length + 1}`,
      score: 0,
      color: colors[teams.length % colors.length]
    };
    setTeams([...teams, newTeam]);
  };

  const removeTeam = (index: number): void => {
    if (teams.length > 2) {
      setTeams(teams.filter((_, i) => i !== index));
    }
  };

  const updateTeamName = (index: number, name: string): void => {
    const newTeams = [...teams];
    newTeams[index].name = name;
    setTeams(newTeams);
  };

  const startGame = (): void => {
    setRoundsPlayed(0);
    setTeams(teams.map(t => ({ ...t, score: 0 })));
    startNewRound();
  };

  const startNewRound = (): void => {
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    setCurrentCharacter(randomCharacter);
    setTimeLeft(60);
    setGuessedCorrectly(false);
    setGameState('playing');
    setTimerActive(true);
  };

  const handleCorrectGuess = (): void => {
    setTimerActive(false);
    setGuessedCorrectly(true);
    const newTeams = [...teams];
    newTeams[currentTeamIndex].score += 1;
    setTeams(newTeams);
    setGameState('round-end');
  };

  const handleSkip = (): void => {
    setTimerActive(false);
    setGameState('round-end');
  };

  const nextTurn = (): void => {
    const nextTeam = (currentTeamIndex + 1) % teams.length;
    setCurrentTeamIndex(nextTeam);
    
    const newRoundsPlayed = nextTeam === 0 ? roundsPlayed + 1 : roundsPlayed;
    setRoundsPlayed(newRoundsPlayed);
    
    if (newRoundsPlayed >= maxRounds) {
      setGameState('game-over');
    } else {
      startNewRound();
    }
  };

  const resetGame = (): void => {
    setGameState('setup');
    setCurrentTeamIndex(0);
    setRoundsPlayed(0);
  };

  // Setup Screen
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="flex items-center justify-center mb-8">
              <Users className="w-12 h-12 text-purple-600 mr-4" />
              <h1 className="text-4xl font-bold text-gray-800">Adivina Quién</h1>
            </div>

            <div className="mb-8">
              <label className="block text-lg font-semibold mb-2 text-gray-700">
                Rondas totales:
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={maxRounds}
                onChange={(e) => setMaxRounds(parseInt(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Configurar Equipos</h2>
              {teams.map((team, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${team.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => updateTeamName(index, e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  />
                  {teams.length > 2 && (
                    <button
                      onClick={() => removeTeam(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              ))}
              {teams.length < 6 && (
                <button
                  onClick={addTeam}
                  className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  + Agregar Equipo
                </button>
              )}
            </div>

            <button
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition font-bold text-xl flex items-center justify-center"
            >
              <Play className="w-6 h-6 mr-2" />
              Comenzar Juego
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing Screen
  if (gameState === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className={`w-16 h-16 ${teams[currentTeamIndex].color} rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-2xl">{currentTeamIndex + 1}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Turno: {teams[currentTeamIndex].name}
                </h2>
              </div>
              <p className="text-gray-600">Ronda {Math.floor(roundsPlayed * teams.length / teams.length) + 1} de {maxRounds}</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 mb-8 text-center">
              <Clock className="w-16 h-16 mx-auto mb-4 text-white" />
              <div className="text-6xl font-bold text-white mb-2">{timeLeft}</div>
              <div className="text-white text-xl">segundos restantes</div>
            </div>

            <div className="bg-gray-100 rounded-xl p-8 mb-8 text-center">
              <p className="text-gray-600 mb-4 text-lg">Personaje a adivinar:</p>
              {currentCharacter?.image ? (
                <div className="mb-6">
                  <img 
                    src={currentCharacter.image} 
                    alt={currentCharacter.name}
                    className="w-48 h-48 object-cover rounded-xl mx-auto shadow-lg"
                  />
                </div>
              ) : (
                <div className="w-48 h-48 bg-gray-300 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-4xl">📷</span>
                </div>
              )}
              <h3 className="text-4xl font-bold text-gray-800">{currentCharacter?.name}</h3>
              <p className="text-gray-500 mt-4 italic">
                El resto del equipo da pistas, ¡un jugador adivina!
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCorrectGuess}
                className="flex-1 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-bold text-xl"
              >
                ✓ ¡Adivinó!
              </button>
              <button
                onClick={handleSkip}
                className="flex-1 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-bold text-xl"
              >
                ✗ Pasar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Round End Screen
  if (gameState === 'round-end') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className={`w-24 h-24 ${teams[currentTeamIndex].color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              {guessedCorrectly ? (
                <span className="text-white text-5xl">✓</span>
              ) : (
                <span className="text-white text-5xl">✗</span>
              )}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {guessedCorrectly ? '¡Correcto!' : 'Tiempo agotado'}
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              {teams[currentTeamIndex].name}
            </p>
            <p className="text-lg text-gray-500 mb-8">
              El personaje era: <span className="font-bold">{currentCharacter?.name}</span>
            </p>

            <div className="bg-gray-100 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Puntuación Actual</h3>
              <div className="space-y-3">
                {teams.map((team, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${team.color} rounded-full flex items-center justify-center text-white font-bold`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-800">{team.name}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{team.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={nextTurn}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition font-bold text-xl"
            >
              Siguiente Turno →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Over Screen
  if (gameState === 'game-over') {
    const winner = teams.reduce((max, team) => team.score > max.score ? team : max, teams[0]);
    const isTie = teams.filter(t => t.score === winner.score).length > 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <Trophy className="w-32 h-32 mx-auto mb-6 text-yellow-500" />
            
            <h2 className="text-4xl font-bold text-gray-800 mb-8">
              {isTie ? '¡Empate!' : '¡Ganador!'}
            </h2>

            {!isTie && (
              <div className="mb-8">
                <div className={`w-24 h-24 ${winner.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white text-4xl">👑</span>
                </div>
                <p className="text-3xl font-bold text-gray-800">{winner.name}</p>
                <p className="text-xl text-gray-600 mt-2">{winner.score} puntos</p>
              </div>
            )}

            <div className="bg-gray-100 rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Clasificación Final</h3>
              <div className="space-y-3">
                {[...teams].sort((a, b) => b.score - a.score).map((team, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-400 w-8">#{index + 1}</span>
                      <div className={`w-10 h-10 ${team.color} rounded-full flex items-center justify-center text-white font-bold`}>
                        {teams.indexOf(team) + 1}
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">{team.name}</span>
                    </div>
                    <span className="text-3xl font-bold text-gray-800">{team.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="flex-1 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition font-bold text-xl flex items-center justify-center"
              >
                <Settings className="w-6 h-6 mr-2" />
                Nueva Configuración
              </button>
              <button
                onClick={startGame}
                className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition font-bold text-xl flex items-center justify-center"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Jugar de Nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default GuessWhoGame;