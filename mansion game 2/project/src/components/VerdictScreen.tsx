import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, Target } from 'lucide-react';
import { Suspect } from '../types';

interface VerdictScreenProps {
  isCorrect: boolean;
  accusedSuspect: Suspect;
  actualKiller: Suspect;
  score: number;
  cluesFound: number;
  timeElapsed: number;
  onPlayAgain: () => void;
}

const VerdictScreen: React.FC<VerdictScreenProps> = ({
  isCorrect,
  accusedSuspect,
  actualKiller,
  score,
  cluesFound,
  timeElapsed,
  onPlayAgain
}) => {
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      isCorrect 
        ? 'from-green-900 via-emerald-900 to-black' 
        : 'from-red-900 via-gray-900 to-black'
    } flex items-center justify-center p-6`}>
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Result Icon */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {isCorrect ? (
            <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          ) : (
            <XCircle className="w-24 h-24 text-red-400 mx-auto" />
          )}
        </motion.div>

        {/* Verdict Title */}
        <motion.h1
          className={`text-5xl md:text-6xl font-bold mb-6 ${
            isCorrect ? 'text-green-400' : 'text-red-400'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {isCorrect ? 'Case Solved!' : 'Case Unsolved'}
        </motion.h1>

        {/* Verdict Message */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {isCorrect ? (
            <div>
              <p className="text-2xl text-white mb-4">
                Excellent detective work! You correctly identified the killer.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-4xl">{actualKiller.avatar}</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">{actualKiller.name}</h3>
                  <p className="text-red-300">{actualKiller.role}</p>
                </div>
              </div>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-red-300 mb-2">Killer's Confession:</h4>
                <p className="text-gray-300 italic">
                  "Yes... it was me. {actualKiller.motive} I couldn't let them destroy everything I worked for. 
                  The poison was quick - they didn't suffer. But I never meant for it to come to this..."
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-2xl text-white mb-4">
                The real killer has escaped justice...
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold text-red-300 mb-2">You Accused:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{accusedSuspect.avatar}</div>
                    <div>
                      <p className="text-white font-medium">{accusedSuspect.name}</p>
                      <p className="text-gray-300 text-sm">{accusedSuspect.role}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-green-300 mb-2">The Real Killer:</h4>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{actualKiller.avatar}</div>
                    <div>
                      <p className="text-white font-medium">{actualKiller.name}</p>
                      <p className="text-gray-300 text-sm">{actualKiller.role}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-yellow-300 mb-2">What You Missed:</h4>
                <p className="text-gray-300">
                  The key evidence was in {actualKiller.name}'s behavior and contradictions in their alibi. 
                  {actualKiller.motive} Pay closer attention to inconsistencies next time!
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Score and Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-gray-400 text-sm">Final Score</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{cluesFound}</div>
            <div className="text-gray-400 text-sm">Clues Found</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
            <div className="text-gray-400 text-sm">Time Taken</div>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="text-2xl font-bold text-white">
              {isCorrect ? 'A+' : score >= 70 ? 'B' : score >= 50 ? 'C' : 'D'}
            </div>
            <div className="text-gray-400 text-sm">Grade</div>
          </div>
        </motion.div>

        {/* Performance Feedback */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Detective Performance Review</h3>
          <div className="text-gray-300 space-y-2">
            {score >= 90 && <p>🏆 Outstanding detective work! You found most clues and solved the case efficiently.</p>}
            {score >= 70 && score < 90 && <p>🎯 Good investigation skills. You gathered solid evidence and made logical deductions.</p>}
            {score >= 50 && score < 70 && <p>📝 Decent detective work, but you missed some crucial evidence. Keep practicing!</p>}
            {score < 50 && <p>🔍 This case was challenging. Review the clues more carefully next time.</p>}
            
            <p>
              You found {cluesFound} out of {actualKiller.clues.length} possible clues for the killer. 
              {isCorrect ? ' Your deductive reasoning was spot on!' : ' Try to gather more evidence before making accusations.'}
            </p>
          </div>
        </motion.div>

        {/* Play Again Button */}
        <motion.button
          onClick={onPlayAgain}
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center space-x-3">
            <RotateCcw className="w-6 h-6" />
            <span>Solve Another Mystery</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity -z-10"></div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default VerdictScreen;