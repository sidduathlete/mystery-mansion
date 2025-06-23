import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Users, Clock, Target } from 'lucide-react';
import { Difficulty } from '../types';

interface DifficultySelectionProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const DifficultySelection: React.FC<DifficultySelectionProps> = ({ onSelectDifficulty, onBack }) => {
  const difficulties = [
    {
      id: 'easy' as Difficulty,
      name: 'Novice Detective',
      description: 'Perfect for beginners',
      icon: '🔍',
      features: [
        '3 suspects to interrogate',
        '6 questions per suspect',
        'Clear motives and alibis',
        'Obvious clues and evidence',
        'Generous time bonus'
      ],
      color: 'from-green-600 to-emerald-600',
      borderColor: 'border-green-500/30',
      difficulty: 1
    },
    {
      id: 'medium' as Difficulty,
      name: 'Experienced Investigator',
      description: 'Balanced challenge',
      icon: '🕵️',
      features: [
        '4 suspects to interrogate',
        '5 questions per suspect',
        'Mixed clues and red herrings',
        'Some deceptive alibis',
        'Standard time bonus'
      ],
      color: 'from-yellow-600 to-orange-600',
      borderColor: 'border-yellow-500/30',
      difficulty: 2
    },
    {
      id: 'hard' as Difficulty,
      name: 'Master Detective',
      description: 'For seasoned sleuths',
      icon: '🎯',
      features: [
        '5 suspects to interrogate',
        '4 questions per suspect',
        'Complex motives and lies',
        'Multiple red herrings',
        'Minimal time bonus'
      ],
      color: 'from-red-600 to-purple-600',
      borderColor: 'border-red-500/30',
      difficulty: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
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
            <h2 className="text-4xl font-bold text-white mb-2">Choose Your Challenge</h2>
            <p className="text-gray-300">Select the difficulty that matches your detective skills</p>
          </div>

          <div className="w-20"></div>
        </motion.div>

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {difficulties.map((diff, index) => (
            <motion.div
              key={diff.id}
              className={`group relative cursor-pointer`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectDifficulty(diff.id)}
            >
              <div className={`bg-black/40 backdrop-blur-sm rounded-2xl p-8 border ${diff.borderColor} hover:border-opacity-70 transition-all duration-300 h-full`}>
                {/* Difficulty Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{diff.icon}</div>
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < diff.difficulty ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">{diff.name}</h3>
                <p className="text-gray-300 mb-6">{diff.description}</p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {diff.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <div className={`w-full py-3 bg-gradient-to-r ${diff.color} rounded-lg text-white font-semibold text-center transition-all group-hover:shadow-lg`}>
                  Select Difficulty
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${diff.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div
          className="mt-12 bg-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-400" />
            Scoring System
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">🎯 Accuracy Bonus</h4>
              <p className="text-sm">+50 points for correctly identifying the killer</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">🔍 Clue Bonus</h4>
              <p className="text-sm">+10 points for each important clue discovered</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-300 mb-2">⏱️ Speed Bonus</h4>
              <p className="text-sm">Bonus points for solving the case quickly</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DifficultySelection;