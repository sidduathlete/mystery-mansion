import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Users, Clock } from 'lucide-react';

interface MultiplayerInterfaceProps {
  currentPlayer: 1 | 2;
  onSwitchTurn: () => void;
  children: React.ReactNode;
}

const MultiplayerInterface: React.FC<MultiplayerInterfaceProps> = ({ 
  currentPlayer, 
  onSwitchTurn, 
  children 
}) => {
  const [chatMessages, setChatMessages] = useState<Array<{player: number, message: string, timestamp: number}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages(prev => [...prev, {
        player: currentPlayer,
        message: newMessage.trim(),
        timestamp: Date.now()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="relative">
      {/* Player Turn Indicator */}
      <motion.div
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={`px-6 py-3 rounded-full backdrop-blur-sm border ${
          currentPlayer === 1 
            ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' 
            : 'bg-green-600/20 border-green-500/50 text-green-300'
        }`}>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Player {currentPlayer}'s Turn</span>
          </div>
        </div>
      </motion.div>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-purple-600 hover:bg-purple-700 rounded-full text-white shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
        {chatMessages.length > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
            {chatMessages.length}
          </div>
        )}
      </motion.button>

      {/* Chat Panel */}
      {showChat && (
        <motion.div
          className="fixed bottom-24 left-6 w-80 bg-black/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 z-50"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
        >
          <div className="p-4 border-b border-gray-700/50">
            <h3 className="text-white font-semibold">Detective Chat</h3>
          </div>
          
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 ? (
              <p className="text-gray-400 text-sm italic text-center">
                Start discussing your theories...
              </p>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.player === currentPlayer ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.player === 1 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-green-600 text-white'
                  }`}>
                    <div className="font-semibold text-xs mb-1">Player {msg.player}</div>
                    <div>{msg.message}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Switch Turn Button */}
      <motion.button
        onClick={onSwitchTurn}
        className="fixed bottom-6 right-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-orange-500/25 transition-all z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>End Turn</span>
        </span>
      </motion.button>

      {/* Main Game Content */}
      {children}
    </div>
  );
};

export default MultiplayerInterface;