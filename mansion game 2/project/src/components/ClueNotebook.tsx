import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface ClueNotebookProps {
  clues: string[];
  suspects: any[];
  onBack: () => void;
}

const ClueNotebook: React.FC<ClueNotebookProps> = ({ clues, suspects, onBack }) => {
  const organizedClues = suspects.map(suspect => ({
    ...suspect,
    foundClues: clues.filter(clue => suspect.clues.includes(clue))
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
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
            <h2 className="text-3xl font-bold text-white flex items-center justify-center space-x-2">
              <BookOpen className="w-8 h-8" />
              <span>Detective's Notebook</span>
            </h2>
            <p className="text-gray-300">Evidence collected: {clues.length} clues</p>
          </div>

          <div className="w-20"></div>
        </motion.div>

        {/* Clues by Suspect */}
        <div className="space-y-6">
          {organizedClues.map((suspect, index) => (
            <motion.div
              key={suspect.id}
              className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-3xl">{suspect.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{suspect.name}</h3>
                  <p className="text-purple-300">{suspect.role}</p>
                </div>
                <div className="ml-auto">
                  {suspect.interactionCount >= suspect.maxInteractions ? (
                    <div className="flex items-center space-x-1 text-red-400">
                      <XCircle className="w-5 h-5" />
                      <span className="text-sm">Exhausted</span>
                    </div>
                  ) : suspect.interactionCount > 0 ? (
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{suspect.interactionCount}/{suspect.maxInteractions}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm">Available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Suspect's Clues */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Evidence Found:</h4>
                {suspect.foundClues.length > 0 ? (
                  <ul className="space-y-2">
                    {suspect.foundClues.map((clue: string, clueIndex: number) => (
                      <li key={clueIndex} className="flex items-start space-x-2 text-gray-300">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{clue}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">No evidence found yet</p>
                )}
              </div>

              {/* Alibi */}
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Claimed Alibi:</h4>
                <p className="text-gray-300 text-sm">{suspect.alibi}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-purple-900/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Investigation Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-300">{clues.length}</div>
              <div className="text-gray-400 text-sm">Clues Found</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-300">
                {suspects.filter(s => s.interactionCount > 0).length}
              </div>
              <div className="text-gray-400 text-sm">Suspects Questioned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-300">
                {suspects.filter(s => s.interactionCount >= s.maxInteractions).length}
              </div>
              <div className="text-gray-400 text-sm">Leads Exhausted</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClueNotebook;