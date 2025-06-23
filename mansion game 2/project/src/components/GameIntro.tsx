import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, Users, Play } from 'lucide-react';

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro: React.FC<GameIntroProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Atmospheric background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Lightning effect */}
      <motion.div
        className="absolute inset-0 bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Title */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-red-400 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
              Mystery Mansion
            </h1>
            <p className="text-2xl text-gray-300 italic">
              "Every lie tells a story. Can you solve the truth?"
            </p>
          </motion.div>

          {/* Story Introduction */}
          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="text-lg text-gray-200 leading-relaxed space-y-4">
              <p className="text-red-300 font-semibold">
                🌩️ A thunderstorm shakes the windows. The maid screams. A body lies in the library...
              </p>
              <p>
                It was supposed to be just another evening at Ashworth Manor. Thunder cracked across the sky. 
                A scream echoed through the halls. And Lord Reginald Ashworth was found... dead.
              </p>
              <p>
                The storm has trapped everyone inside. Five suspects remain, each with secrets to hide. 
                One of them is a killer.
              </p>
              <p className="text-yellow-300 font-semibold">
                Welcome, Detective. Can you solve the mystery before the killer strikes again?
              </p>
            </div>
          </motion.div>

          {/* Game Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">5 Unique Suspects</h3>
              <p className="text-gray-300 text-sm">Each with their own motives, alibis, and secrets</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <Eye className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">AI-Powered Investigation</h3>
              <p className="text-gray-300 text-sm">Dynamic conversations that adapt to your questions</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Random Killer</h3>
              <p className="text-gray-300 text-sm">Every game is different - replay for new mysteries</p>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            onClick={onStartGame}
            className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl text-white font-semibold text-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center space-x-3">
              <Play className="w-6 h-6" />
              <span>Begin Investigation</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
          </motion.button>

          {/* Atmospheric text */}
          <motion.p
            className="mt-6 text-gray-400 text-sm italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            The truth lies in their words... Who will you speak to first?
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default GameIntro;