import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  BookOpen,
  AlertTriangle,
  Eye,
  Brain,
} from "lucide-react";
import { Suspect } from "../types";
import { generateSuspectResponse } from "../gameLogic";

interface InterrogationRoomProps {
  suspect: Suspect;
  onBack: () => void;
  onClueFound: (clue: string) => void;
  onInteractionComplete: (suspect: Suspect, response: string) => void;
}

const InterrogationRoom: React.FC<InterrogationRoomProps> = ({
  suspect,
  onBack,
  onClueFound,
  onInteractionComplete,
}) => {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState<
    Array<{ type: "question" | "response"; text: string }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showInterrogativeEffect, setShowInterrogativeEffect] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim() || suspect.interactionCount >= suspect.maxInteractions)
      return;

    const newQuestion = question.trim();
    setQuestion("");

    // Show intense interrogative effect before asking
    setShowInterrogativeEffect(true);

    // Dramatic pause before proceeding
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setShowInterrogativeEffect(false);
    setIsTyping(true);

    // Add question to conversation
    setConversation((prev) => [
      ...prev,
      { type: "question", text: newQuestion },
    ]);

    // Simulate AI thinking time with more suspense
    await new Promise((resolve) => setTimeout(resolve, 2200));

    // Generate response
    const response = generateSuspectResponse(
      suspect,
      newQuestion,
      suspect.interactionCount + 1,
    );

    // Add response to conversation
    setConversation((prev) => [...prev, { type: "response", text: response }]);

    // Update suspect interaction count
    const updatedSuspect = {
      ...suspect,
      interactionCount: suspect.interactionCount + 1,
      responses: [...suspect.responses, response],
    };

    // Check for clues in the response
    const clueFound = suspect.clues[suspect.interactionCount];
    if (clueFound) {
      onClueFound(clueFound);
    }

    onInteractionComplete(updatedSuspect, response);
    setIsTyping(false);
  };

  const suggestedQuestions = [
    "Where were you when the murder occurred?",
    "What was your relationship with the victim?",
    "Did you have any reason to want them dead?",
    "Can anyone verify your alibi?",
    "What do you know about the other suspects?",
  ];

  // Interrogative overlay for questioning tension
  const InterrogativeOverlay = () => (
    <AnimatePresence>
      {showInterrogativeEffect && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Dark overlay with red pulsing */}
          <motion.div
            className="absolute inset-0 bg-black/85"
            animate={{
              backgroundColor: [
                "rgba(0,0,0,0.85)",
                "rgba(127,29,29,0.4)",
                "rgba(0,0,0,0.85)",
              ],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Central interrogation effect */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Scanning effect */}
            <motion.div
              className="flex items-center justify-center space-x-4 mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                animate={{
                  rotateY: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Eye className="w-12 h-12 text-red-400" />
              </motion.div>
              <motion.div
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Brain className="w-12 h-12 text-purple-400" />
              </motion.div>
            </motion.div>

            {/* Interrogation text */}
            <motion.div
              className="text-white space-y-2"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <p className="text-3xl font-bold tracking-wider text-red-300">
                INTERROGATING
              </p>
              <motion.p
                className="text-lg text-gray-300"
                animate={{
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Reading micro-expressions...
              </motion.p>
              <motion.div
                className="flex justify-center space-x-1 mt-4"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-red-400 rounded-full"
                    animate={{
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 relative">
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
            <span>Back to Suspects</span>
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Interrogation Room
            </h2>
            <p className="text-gray-300">
              {suspect.maxInteractions - suspect.interactionCount} questions
              remaining
            </p>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </motion.div>

        {/* Suspect Info */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl">{suspect.avatar}</div>
            <div>
              <h3 className="text-xl font-bold text-white">{suspect.name}</h3>
              <p className="text-purple-300">{suspect.role}</p>
            </div>
          </div>
          <p className="text-gray-300 italic">"{suspect.personality}"</p>
        </motion.div>

        {/* Conversation Area */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="p-6 h-96 overflow-y-auto space-y-4">
            {conversation.length === 0 && (
              <div className="text-center text-gray-400 italic">
                The suspect sits across from you, waiting for your first
                question...
              </div>
            )}

            {conversation.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.type === "question" ? "justify-end" : "justify-start"}`}
                initial={{
                  opacity: 0,
                  x: message.type === "question" ? 20 : -20,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === "question"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-gray-700 text-gray-100 px-4 py-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Question Input */}
        {suspect.interactionCount < suspect.maxInteractions ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex space-x-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAskQuestion()}
                placeholder="Ask your question..."
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isTyping}
              />
              <motion.button
                onClick={handleAskQuestion}
                disabled={
                  !question.trim() || isTyping || showInterrogativeEffect
                }
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileHover={
                  !isTyping && !showInterrogativeEffect && question.trim()
                    ? {
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)",
                      }
                    : {}
                }
                whileTap={
                  !isTyping && !showInterrogativeEffect && question.trim()
                    ? { scale: 0.95 }
                    : {}
                }
              >
                {/* Pulsing background when ready */}
                <AnimatePresence>
                  {question.trim() && !isTyping && !showInterrogativeEffect && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-500"
                      animate={{
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  className="relative z-10"
                  animate={
                    question.trim() && !isTyping && !showInterrogativeEffect
                      ? {
                          rotateZ: [0, -5, 5, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: question.trim() ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>

            {/* Suggested Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.slice(0, 4).map((suggested, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(suggested)}
                  className="text-left px-3 py-2 bg-white/5 border border-gray-700/30 rounded-lg text-gray-300 text-sm hover:bg-white/10 transition-all"
                >
                  "{suggested}"
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center p-6 bg-red-900/20 border border-red-500/30 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-300 font-medium">
              "{suspect.name} refuses to answer any more questions."
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InterrogationRoom;
