import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';

interface DreamInputProps {
  onSubmit: (dream: string, autoMode?: boolean) => void;
  isGenerating: boolean;
  onBack: () => void;
}

const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isGenerating, onBack }) => {
  const [dream, setDream] = useState('');
  const [autoMode, setAutoMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim()) {
      onSubmit(dream.trim(), autoMode);
    }
  };

  const examplePrompts = [
    "A platform that helps remote teams collaborate better",
    "An app that uses AI to personalize fitness routines",
    "A service that connects local farmers with restaurants",
    "A tool that automates social media content creation",
    "A marketplace for sustainable home products"
  ];

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center max-w-2xl mx-auto px-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-8">
            <motion.div
              className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            {autoMode ? 'Speed-Running Your Startup...' : 'Analyzing Your Dream...'}
          </h2>
          <p className="text-purple-200 text-lg mb-8">
            Our AI is crafting your complete startup prototype with branding, monetization, and pitch deck.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="space-y-3">
              {[
                'Generating startup name and branding...',
                'Creating monetization strategy...',
                'Analyzing market competition...',
                'Writing investor pitch script...',
                'Finalizing prototype wireframes...'
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <motion.div
        className="max-w-4xl mx-auto px-6 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-sm">Step 1: Share Your Vision</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            What's Your Dream?
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Describe any problem you want to solve or idea you have. Our AI will transform it into a complete startup prototype.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <motion.textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder="Describe your dream, idea, or problem you want to solve..."
              className="w-full h-40 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-300 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            />
            <div className="absolute bottom-4 right-4 text-purple-300 text-sm">
              {dream.length}/500
            </div>
          </div>

          {/* Auto Mode Toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Auto-Mode (10-second generation)</span>
            <motion.button
              type="button"
              onClick={() => setAutoMode(!autoMode)}
              className={`relative w-12 h-6 rounded-full transition-colors ${autoMode ? 'bg-purple-500' : 'bg-gray-600'}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"
                animate={{ x: autoMode ? 24 : 2 }}
              />
            </motion.button>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white border border-white/20 hover:bg-white/20 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </motion.button>

            <motion.button
              type="submit"
              disabled={!dream.trim()}
              className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: dream.trim() ? 1.05 : 1 }}
              whileTap={{ scale: dream.trim() ? 0.95 : 1 }}
            >
              <span className="flex items-center space-x-2">
                <span>{autoMode ? 'Generate in 10 Seconds' : 'Generate My Startup'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </div>
        </form>

        {/* Example Prompts */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-center text-purple-300 mb-6">Need inspiration? Try these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examplePrompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => setDream(prompt)}
                className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 text-left text-purple-200 hover:bg-white/10 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                "{prompt}"
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DreamInput;