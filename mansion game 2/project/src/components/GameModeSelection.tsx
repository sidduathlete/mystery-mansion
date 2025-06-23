import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Users, Zap, MessageCircle } from 'lucide-react';
import { GameMode } from '../types';

interface GameModeSelectionProps {
  onSelectGameMode: (mode: GameMode) => void;
  onBack: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelectGameMode, onBack }) => {
  const gameModes = [
    {
      id: 'solo' as GameMode,
      name: 'Solo Investigation',
      description: 'Solve the mystery on your own',
      icon: User,
      features: [
        'Play at your own pace',
        'Full control over questioning',
        'Personal score tracking',
        'Perfect for learning the game'
      ],
      color: 'from-purple-600 to-blue-600',
      borderColor: 'border-purple-500/30'
    },
    {
      id: 'multiplayer' as GameMode,
      name: 'Detective Partners',
      description: 'Team up with a friend',
      icon: Users,
      features: [
        'Take turns questioning suspects',
        'Discuss clues and theories',
        'Shared clue notebook',
        'Must agree on final accusation'
      ],
      color: 'from-green-600 to-teal-600',
      borderColor: 'border-green-500/30'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-gray-700/50 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Choose Game Mode</h2>
            <p className="text-gray-300">How would you like to investigate?</p>
          </div>

          <div className="w-20"></div>
        </motion.div>

        {/* Game Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {gameModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectGameMode(mode.id)}
            >
              <div className={`bg-black/40 backdrop-blur-sm rounded-2xl p-8 border ${mode.borderColor} hover:border-opacity-70 transition-all duration-300 h-full`}>
                {/* Icon */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${mode.color} rounded-2xl flex items-center justify-center mb-4`}>
                    <mode.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{mode.name}</h3>
                  <p className="text-gray-300">{mode.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {mode.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <div className={`w-full py-3 bg-gradient-to-r ${mode.color} rounded-lg text-white font-semibold text-center transition-all group-hover:shadow-lg`}>
                  Select Mode
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${mode.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Multiplayer Info */}
        <motion.div
          className="bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2 text-blue-400" />
            Multiplayer Rules
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">🔄 Turn System</h4>
              <p className="text-sm">Players alternate asking questions to suspects. Each player gets equal opportunities to investigate.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">🤝 Collaboration</h4>
              <p className="text-sm">Share the clue notebook and discuss your theories. Both players must agree on the final accusation.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">🏆 Shared Victory</h4>
              <p className="text-sm">Success or failure is shared. Work together to achieve the highest possible score.</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">💬 Communication</h4>
              <p className="text-sm">Use the built-in chat to coordinate your investigation strategy with your partner.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameModeSelection;