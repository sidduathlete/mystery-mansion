import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginScreen from './components/LoginScreen';
import MainMenu from './components/MainMenu';
import DifficultySelection from './components/DifficultySelection';
import GameModeSelection from './components/GameModeSelection';
import GameIntro from './components/GameIntro';
import SuspectGrid from './components/SuspectGrid';
import InterrogationRoom from './components/InterrogationRoom';
import ClueNotebook from './components/ClueNotebook';
import AccusationScreen from './components/AccusationScreen';
import VerdictScreen from './components/VerdictScreen';
import MultiplayerInterface from './components/MultiplayerInterface';
import { GameState, User, Difficulty, GameMode } from './types';
import { createGame, calculateScore, switchPlayer, updateSuspectInteraction, generateSuspectResponse } from './gameLogic';
import { firebaseService } from './services/firebase';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'login',
    user: null,
    gameMode: null,
    difficulty: null,
    story: null,
    suspects: [],
    currentSuspect: null,
    cluesFound: [],
    playerAccusation: null,
    gameScore: 0,
    gameStartTime: 0,
    currentPlayer: 1,
    player1Accusation: null,
    player2Accusation: null,
    totalQuestions: 0,
    maxQuestions: 0
  });

  const [showClueNotebook, setShowClueNotebook] = useState(false);

  // Check for existing user on app load
  useEffect(() => {
    const existingUser = firebaseService.getCurrentUser();
    if (existingUser) {
      setGameState(prev => ({
        ...prev,
        phase: 'menu',
        user: existingUser
      }));
    }
  }, []);

  const handleLogin = (user: User) => {
    setGameState(prev => ({
      ...prev,
      phase: 'menu',
      user
    }));
  };

  const handleLogout = () => {
    setGameState({
      phase: 'login',
      user: null,
      gameMode: null,
      difficulty: null,
      story: null,
      suspects: [],
      currentSuspect: null,
      cluesFound: [],
      playerAccusation: null,
      gameScore: 0,
      gameStartTime: 0,
      currentPlayer: 1,
      player1Accusation: null,
      player2Accusation: null,
      totalQuestions: 0,
      maxQuestions: 0
    });
  };

  const startNewGame = () => {
    setGameState(prev => ({
      ...prev,
      phase: 'difficulty'
    }));
  };

  const selectDifficulty = (difficulty: Difficulty) => {
    setGameState(prev => ({
      ...prev,
      difficulty,
      phase: 'gameMode'
    }));
  };

  const selectGameMode = (gameMode: GameMode) => {
    const { story, suspects } = createGame(gameState.difficulty!);
    const maxQuestions = suspects.reduce((sum, s) => sum + s.maxInteractions, 0);
    
    setGameState(prev => ({
      ...prev,
      gameMode,
      story,
      suspects,
      phase: 'investigation',
      gameStartTime: Date.now(),
      maxQuestions,
      totalQuestions: 0,
      currentPlayer: 1
    }));
    setShowClueNotebook(false);
  };

  const selectSuspect = (suspect: any) => {
    setGameState(prev => ({
      ...prev,
      currentSuspect: suspect
    }));
  };

  const backToSuspectGrid = () => {
    setGameState(prev => ({
      ...prev,
      currentSuspect: null
    }));
  };

  const handleClueFound = (clue: string) => {
    setGameState(prev => ({
      ...prev,
      cluesFound: [...prev.cluesFound, clue]
    }));
  };

  const handleInteractionComplete = (updatedSuspect: any, response: string) => {
    setGameState(prev => {
      const newSuspects = prev.suspects.map(s => 
        s.id === updatedSuspect.id ? updatedSuspect : s
      );
      
      return {
        ...prev,
        suspects: newSuspects,
        currentSuspect: updatedSuspect,
        totalQuestions: prev.totalQuestions + 1,
        currentPlayer: prev.gameMode === 'multiplayer' ? switchPlayer(prev.currentPlayer) : prev.currentPlayer
      };
    });
  };

  const handleSwitchTurn = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayer: switchPlayer(prev.currentPlayer),
      currentSuspect: null
    }));
  };

  const makeAccusation = (suspectId: string) => {
    if (gameState.gameMode === 'solo') {
      const score = calculateScore(gameState);
      const isCorrect = gameState.suspects.find(s => s.id === suspectId)?.isKiller || false;
      
      // Update user stats
      if (gameState.user) {
        firebaseService.updateUserScore(gameState.user.id, score, isCorrect);
      }
      
      setGameState(prev => ({
        ...prev,
        phase: 'verdict',
        playerAccusation: suspectId,
        gameScore: score
      }));
    } else {
      // Multiplayer accusation handling
      if (gameState.currentPlayer === 1) {
        setGameState(prev => ({
          ...prev,
          player1Accusation: suspectId,
          currentPlayer: 2
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          player2Accusation: suspectId
        }));
        
        // Check if both players have made accusations
        setTimeout(() => {
          const finalAccusation = gameState.player1Accusation === suspectId ? suspectId : null;
          const score = calculateScore(gameState);
          const isCorrect = gameState.suspects.find(s => s.id === finalAccusation)?.isKiller || false;
          
          if (gameState.user) {
            firebaseService.updateUserScore(gameState.user.id, score, isCorrect);
          }
          
          setGameState(prev => ({
            ...prev,
            phase: 'verdict',
            playerAccusation: finalAccusation,
            gameScore: score
          }));
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      phase: 'menu',
      gameMode: null,
      difficulty: null,
      story: null,
      suspects: [],
      currentSuspect: null,
      cluesFound: [],
      playerAccusation: null,
      gameScore: 0,
      gameStartTime: 0,
      currentPlayer: 1,
      player1Accusation: null,
      player2Accusation: null,
      totalQuestions: 0,
      maxQuestions: 0
    }));
    setShowClueNotebook(false);
  };

  // Show clue notebook
  if (showClueNotebook && gameState.phase === 'investigation') {
    return (
      <ClueNotebook
        clues={gameState.cluesFound}
        suspects={gameState.suspects}
        onBack={() => setShowClueNotebook(false)}
      />
    );
  }

  const renderGameContent = () => {
    return (
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {gameState.phase === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoginScreen onLogin={handleLogin} />
            </motion.div>
          )}

          {gameState.phase === 'menu' && gameState.user && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MainMenu
                user={gameState.user}
                onStartGame={startNewGame}
                onLogout={handleLogout}
              />
            </motion.div>
          )}

          {gameState.phase === 'difficulty' && (
            <motion.div
              key="difficulty"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <DifficultySelection
                onSelectDifficulty={selectDifficulty}
                onBack={() => setGameState(prev => ({ ...prev, phase: 'menu' }))}
              />
            </motion.div>
          )}

          {gameState.phase === 'gameMode' && (
            <motion.div
              key="gameMode"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <GameModeSelection
                onSelectGameMode={selectGameMode}
                onBack={() => setGameState(prev => ({ ...prev, phase: 'difficulty' }))}
              />
            </motion.div>
          )}

          {gameState.phase === 'investigation' && !gameState.currentSuspect && (
            <motion.div
              key="suspects"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <SuspectGrid
                  suspects={gameState.suspects}
                  onSelectSuspect={selectSuspect}
                />
                
                {/* Floating Action Buttons */}
                <div className="fixed bottom-6 right-6 space-y-4">
                  <button
                    onClick={() => setShowClueNotebook(true)}
                    className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full text-white shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center"
                    title="View Clue Notebook"
                  >
                    📔
                  </button>
                  <button
                    onClick={() => setGameState(prev => ({ ...prev, phase: 'accusation' }))}
                    className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center"
                    title="Make Accusation"
                  >
                    ⚖️
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {gameState.phase === 'investigation' && gameState.currentSuspect && (
            <motion.div
              key="interrogation"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <InterrogationRoom
                suspect={gameState.currentSuspect}
                onBack={backToSuspectGrid}
                onClueFound={handleClueFound}
                onInteractionComplete={handleInteractionComplete}
              />
            </motion.div>
          )}

          {gameState.phase === 'accusation' && (
            <motion.div
              key="accusation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <AccusationScreen
                suspects={gameState.suspects}
                onBack={() => setGameState(prev => ({ ...prev, phase: 'investigation' }))}
                onMakeAccusation={makeAccusation}
              />
            </motion.div>
          )}

          {gameState.phase === 'verdict' && gameState.playerAccusation && (
            <motion.div
              key="verdict"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <VerdictScreen
                isCorrect={gameState.suspects.find(s => s.id === gameState.playerAccusation)?.isKiller || false}
                accusedSuspect={gameState.suspects.find(s => s.id === gameState.playerAccusation)!}
                actualKiller={gameState.suspects.find(s => s.isKiller)!}
                score={gameState.gameScore}
                cluesFound={gameState.cluesFound.length}
                timeElapsed={Date.now() - gameState.gameStartTime}
                onPlayAgain={resetGame}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Wrap multiplayer games in the multiplayer interface
  if (gameState.gameMode === 'multiplayer' && (gameState.phase === 'investigation' || gameState.phase === 'accusation')) {
    return (
      <MultiplayerInterface
        currentPlayer={gameState.currentPlayer}
        onSwitchTurn={handleSwitchTurn}
      >
        {renderGameContent()}
      </MultiplayerInterface>
    );
  }

  return renderGameContent();
}

export default App;