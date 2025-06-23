import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, AlertTriangle, Gavel, Eye, Zap } from "lucide-react";
import { Suspect } from "../types";

interface AccusationScreenProps {
  suspects: Suspect[];
  onBack: () => void;
  onMakeAccusation: (suspectId: string) => void;
}

const AccusationScreen: React.FC<AccusationScreenProps> = ({
  suspects,
  onBack,
  onMakeAccusation,
}) => {
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showInterrogativeEffect, setShowInterrogativeEffect] = useState(false);
  const [clickedSuspect, setClickedSuspect] = useState<string | null>(null);

  const handleAccuse = () => {
    if (selectedSuspect) {
      setShowConfirmation(true);
    }
  };

  const confirmAccusation = () => {
    if (selectedSuspect) {
      onMakeAccusation(selectedSuspect);
    }
  };

  if (showConfirmation) {
    const accused = suspects.find((s) => s.id === selectedSuspect);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-6">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-red-500/50">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Final Accusation
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              You are about to accuse{" "}
              <span className="text-red-400 font-bold">{accused?.name}</span> of
              murder.
            </p>
            <p className="text-gray-400 mb-8">
              This decision is final. Are you certain you have enough evidence?
            </p>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
              >
                Reconsider
              </button>
              <button
                onClick={confirmAccusation}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg text-white font-medium transition-all"
              >
                Make Accusation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6">
      <div className="max-w-6xl mx-auto">
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
              <Gavel className="w-8 h-8" />
              <span>Make Your Accusation</span>
            </h2>
            <p className="text-gray-300">
              Choose who you believe is the killer
            </p>
          </div>

          <div className="w-20"></div>
        </motion.div>

        {/* Warning */}
        <motion.div
          className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center space-x-2 text-red-300">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">
              Warning: This decision is final. Choose carefully.
            </span>
          </div>
        </motion.div>

        {/* Suspect Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {suspects.map((suspect, index) => (
            <motion.div
              key={suspect.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedSuspect === suspect.id
                  ? "ring-2 ring-red-500 ring-offset-2 ring-offset-gray-900"
                  : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedSuspect(suspect.id)}
            >
              <div
                className={`bg-black/40 backdrop-blur-sm rounded-2xl p-6 border transition-all ${
                  selectedSuspect === suspect.id
                    ? "border-red-500/50 bg-red-900/20"
                    : "border-gray-700/50 hover:border-purple-500/50"
                }`}
              >
                <div className="text-center mb-4">
                  <div className="text-5xl mb-3">{suspect.avatar}</div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {suspect.name}
                  </h3>
                  <p className="text-purple-300 font-medium">{suspect.role}</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Motive: </span>
                    <span className="text-red-300">{suspect.motive}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Alibi: </span>
                    <span className="text-gray-300">{suspect.alibi}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Questions Asked: </span>
                    <span className="text-yellow-300">
                      {suspect.interactionCount}/{suspect.maxInteractions}
                    </span>
                  </div>
                </div>

                {selectedSuspect === suspect.id && (
                  <motion.div
                    className="mt-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="text-red-300 font-medium">
                      Selected for Accusation
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Accuse Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button
            onClick={handleAccuse}
            disabled={!selectedSuspect}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white font-bold text-lg shadow-2xl hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center space-x-2">
              <Gavel className="w-6 h-6" />
              <span>Accuse the Killer</span>
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AccusationScreen;
