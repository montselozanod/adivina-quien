import React, { useState, useEffect, useMemo } from 'react';
import { Users, Play, Settings, Trophy, Clock, RotateCcw, Grid, X, Star } from 'lucide-react';
import { Team, GameState, Character, Category } from './types';
import { getCharactersByCategories, categoryNames, availableCategories } from './Characters';
import { getAllEvents, getEventById } from './GameEvents';
import { getProxiedImageUrl, needsCrossOrigin } from './utils/imageProxy';

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
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['all']);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [usedCharacters, setUsedCharacters] = useState<Set<string>>(new Set());

  // Obtener todos los eventos disponibles
  const allEvents = getAllEvents();

  // Personajes filtrados por categorías seleccionadas + personajes del evento
  const filteredCharacters = useMemo(() => {
    let chars = getCharactersByCategories(selectedCategories);
    
    // Si hay un evento seleccionado, agregar sus personajes especiales
    if (selectedEventId) {
      const event = getEventById(selectedEventId);
      if (event && event.characters.length > 0) {
        chars = [...chars, ...event.characters];
      }
    }
    
    return chars;
  }, [selectedCategories, selectedEventId]);

  // Función para toggle de categoría
  const toggleCategory = (category: Category) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
      return;
    }
    
    setSelectedCategories(prev => {
      // Si 'all' está seleccionado, quitarlo y agregar la nueva categoría
      if (prev.includes('all')) {
        return [category];
      }
      
      // Si la categoría ya está, quitarla
      if (prev.includes(category)) {
        const newCategories = prev.filter(c => c !== category);
        // Si no quedan categorías, volver a 'all'
        return newCategories.length === 0 ? ['all'] : newCategories;
      }
      
      // Agregar la categoría
      return [...prev, category];
    });
  };

  // Verificar si una categoría está seleccionada
  const isCategorySelected = (category: Category): boolean => {
    if (category === 'all') {
      return selectedCategories.includes('all');
    }
    return selectedCategories.includes(category);
  };

  // Referencia al AudioContext para reutilizarlo
  const audioContextRef = React.useRef<AudioContext | null>(null);

  // Función para reproducir el sonido de tick
  const playTickSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const audioContext = audioContextRef.current;
      
      // Reanudar si está suspendido (política de autoplay del navegador)
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Sonido urgente para los últimos 5 segundos
      oscillator.frequency.value = 1200;
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      
      oscillator.type = 'square';
      
      // Envelope corto y seco
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      
      // Reproducir
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.05);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  // Audio effect para el sonido de tick-tock en los últimos 5 segundos
  useEffect(() => {
    // Solo reproducir sonido en los últimos 5 segundos
    if (timerActive && timeLeft > 0 && timeLeft <= 5) {
      playTickSound();
    }
  }, [timerActive, timeLeft]);

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
    setUsedCharacters(new Set()); // Limpiar personajes usados al iniciar nuevo juego
    startNewRound(new Set()); // Pasar set vacío para la primera ronda
  };

  const startNewRound = (usedSet?: Set<string>): void => {
    const currentUsed = usedSet ?? usedCharacters;
    
    // Filtrar personajes que no han sido usados
    const availableCharacters = filteredCharacters.filter(
      char => !currentUsed.has(char.name)
    );
    
    // Si no hay personajes disponibles, reiniciar la lista
    if (availableCharacters.length === 0) {
      setUsedCharacters(new Set());
      const randomCharacter = filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
      setCurrentCharacter(randomCharacter);
      setUsedCharacters(new Set([randomCharacter.name]));
    } else {
      const randomCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      setCurrentCharacter(randomCharacter);
      setUsedCharacters(prev => {
        const newSet = new Set(Array.from(prev));
        newSet.add(randomCharacter.name);
        return newSet;
      });
    }
    
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
              <h1 className="text-4xl font-bold text-black">
                <span className="text-red-500 text-5xl">¿</span>Adivina Quién<span className="text-red-500 text-5xl">?</span>
              </h1>
            </div>

            {/* Botón de Galería */}
            <div className="mb-8">
              <button
                onClick={() => setShowGallery(true)}
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition font-semibold flex items-center justify-center"
              >
                <Grid className="w-5 h-5 mr-2" />
                Ver todos los personajes ({filteredCharacters.length})
              </button>
            </div>

            {/* Selector de Evento/Familia */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-3 text-gray-700 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Evento / Familia especial:
              </label>
              <p className="text-xs text-gray-500 mb-2">Agrega personajes especiales de una familia o evento</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedEventId(null)}
                  className={`py-3 px-4 rounded-lg font-medium transition text-sm ${
                    selectedEventId === null
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🚫 Ninguno
                </button>
                {allEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`py-3 px-4 rounded-lg font-medium transition text-sm ${
                      selectedEventId === event.id
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {event.emoji} {event.name}
                    {event.characters.length > 0 && (
                      <span className="ml-1 text-xs">({event.characters.length})</span>
                    )}
                  </button>
                ))}
              </div>
              {selectedEventId && (
                <p className="text-sm text-yellow-600 mt-2 text-center">
                  ⭐ {getEventById(selectedEventId)?.characters.length || 0} personajes especiales serán agregados
                </p>
              )}
            </div>

            {/* Selector de Categorías (múltiple) */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                Categorías de personajes:
              </label>
              <p className="text-xs text-gray-500 mb-2">Selecciona una o más categorías</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`py-3 px-4 rounded-lg font-medium transition text-sm flex items-center justify-center ${
                      isCategorySelected(category)
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isCategorySelected(category) && category !== 'all' && (
                      <span className="mr-1">✓</span>
                    )}
                    {categoryNames[category]}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {filteredCharacters.length} personajes disponibles
              </p>
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

        {/* Modal de Galería */}
        {showGallery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Galería de Personajes</h2>
                  <p className="text-sm text-gray-500">
                    {selectedCategories.includes('all') 
                      ? categoryNames['all'] 
                      : selectedCategories.map(c => categoryNames[c]).join(', ')
                    } - {filteredCharacters.length} personajes
                  </p>
                </div>
                <button
                  onClick={() => setShowGallery(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCharacters.map((character, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square mb-2 overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={getProxiedImageUrl(character.image)}
                          alt={character.name}
                          crossOrigin={needsCrossOrigin(character.image) ? "anonymous" : undefined}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23ddd"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999">?</text></svg>';
                          }}
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
                        {character.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={() => setShowGallery(false)}
                  className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
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
                    src={getProxiedImageUrl(currentCharacter.image)} 
                    alt={currentCharacter.name}
                    crossOrigin={needsCrossOrigin(currentCharacter.image) ? "anonymous" : undefined}
                    className="w-80 h-80 object-contain rounded-xl mx-auto shadow-lg"
                    onError={(e) => {
                      console.error('Error loading image:', currentCharacter.image);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="w-80 h-80 bg-gray-300 rounded-xl mx-auto mb-6 flex items-center justify-center">
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