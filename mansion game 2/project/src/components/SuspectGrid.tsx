import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Lock, CheckCircle } from 'lucide-react';
import { Suspect } from '../types';

interface SuspectGridProps {
  suspects: Suspect[];
  onSelectSuspect: (suspect: Suspect) => void;
}

const SuspectGrid: React.FC<SuspectGridProps> = ({ suspects, onSelectSuspect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Suspect</h2>
          <p className="text-xl text-gray-300">
            Five suspects. One killer. Each person can only be questioned 5 times.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suspects.map((suspect, index) => (
            <motion.div
              key={suspect.id}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
                {/* Avatar and Status */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{suspect.avatar}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{suspect.name}</h3>
                  <p className="text-purple-300 font-medium">{suspect.role}</p>
                  
                  {/* Interaction Status */}
                  <div className="flex items-center justify-center mt-3 space-x-2">
                    {suspect.interactionCount >= suspect.maxInteractions ? (
                      <div className="flex items-center space-x-1 text-red-400">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Exhausted</span>
                      </div>
                    ) : suspect.interactionCount > 0 ? (
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{suspect.interactionCount}/{suspect.maxInteractions}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Background Info */}
                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Background</h4>
                    <p className="text-gray-300 text-sm">{suspect.background}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Last Seen</h4>
                    <p className="text-gray-300 text-sm">{suspect.lastSeen}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Possible Motive</h4>
                    <p className="text-red-300 text-sm">{suspect.motive}</p>
                  </div>
                </div>

                {/* Interrogate Button */}
                <motion.button
                  onClick={() => onSelectSuspect(suspect)}
                  disabled={suspect.interactionCount >= suspect.maxInteractions}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    suspect.interactionCount >= suspect.maxInteractions
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-red-600 text-white hover:from-purple-700 hover:to-red-700 shadow-lg hover:shadow-purple-500/25'
                  }`}
                  whileHover={suspect.interactionCount < suspect.maxInteractions ? { scale: 1.02 } : {}}
                  whileTap={suspect.interactionCount < suspect.maxInteractions ? { scale: 0.98 } : {}}
                >
                  {suspect.interactionCount >= suspect.maxInteractions ? 'No More Questions' : 'Interrogate'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
            View Clue Notebook
          </button>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors">
            Make Accusation
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SuspectGrid;