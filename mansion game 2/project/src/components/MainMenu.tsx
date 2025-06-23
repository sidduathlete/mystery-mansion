import React from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Users, Settings, LogOut, Crown, Target } from 'lucide-react';
import { User } from '../types';
import { firebaseService } from '../services/firebase';

interface MainMenuProps {
  user: User;
  onStartGame: () => void;
  onLogout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ user, onStartGame, onLogout }) => {
  const handleLogout = async () => {
    await firebaseService.signOut();
    onLogout();
  };

  const winRate = user.gamesPlayed > 0 ? Math.round((user.gamesWon / user.gamesPlayed) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
              Mystery Mansion
            </h1>
            <p className="text-gray-300 mt-2">Welcome back, Detective {user.username}!</p>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </motion.div>

        {/* User Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.highScore}</div>
            <div className="text-gray-400 text-sm">High Score</div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.gamesWon}</div>
            <div className="text-gray-400 text-sm">Cases Solved</div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <Trophy className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{user.gamesPlayed}</div>
            <div className="text-gray-400 text-sm">Total Games</div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 text-center">
            <div className="text-2xl font-bold text-white">{winRate}%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
        </motion.div>

        {/* Main Menu Options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* New Game */}
          <motion.button
            onClick={onStartGame}
            className="group relative p-8 bg-gradient-to-br from-purple-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Play className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:text-purple-300 transition-colors" />
              <h3 className="text-2xl font-bold text-white mb-2">New Mystery</h3>
              <p className="text-gray-300">Start a fresh investigation with new suspects and clues</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-red-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.button>

          {/* Multiplayer */}
          <motion.button
            onClick={onStartGame}
            className="group relative p-8 bg-gradient-to-br from-blue-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:text-blue-300 transition-colors" />
              <h3 className="text-2xl font-bold text-white mb-2">Multiplayer</h3>
              <p className="text-gray-300">Team up with a friend to solve mysteries together</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.button>
        </motion.div>

        {/* Recent Achievement */}
        {user.gamesWon > 0 && (
          <motion.div
            className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white mb-2">Detective Achievement</h3>
            <p className="text-yellow-300">
              {winRate >= 80 ? "Master Detective" : winRate >= 60 ? "Skilled Investigator" : "Aspiring Detective"}
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Keep solving cases to unlock more achievements!
            </p>
          </motion.div>
        )}

        {/* Tips for New Players */}
        {user.gamesPlayed === 0 && (
          <motion.div
            className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Detective Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">🔍 Investigation</h4>
                <p className="text-sm">Ask each suspect strategic questions. You have limited interactions!</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">📝 Take Notes</h4>
                <p className="text-sm">Use the clue notebook to track evidence and inconsistencies.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">🎯 Choose Wisely</h4>
                <p className="text-sm">Your final accusation is permanent. Make sure you have enough evidence!</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">⏱️ Time Matters</h4>
                <p className="text-sm">Faster solutions earn higher scores, but accuracy is most important.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MainMenu;